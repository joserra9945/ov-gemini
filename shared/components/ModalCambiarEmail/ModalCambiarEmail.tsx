import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';

import { InputEmail } from '@shared/form';
import { useAuthentication } from '@shared/hooks';
import { IAuthUserGet } from '@shared/interfaces/api/IAuth/IAuthUserGet';
import notifications from '@shared/utils/notifications';

import { Button } from '../Button';
import { Modal } from '../Modal';
import { Spinner } from '../Spinner';

interface IModalCambiarEmail {
  userId: string;
  showModalCambiarEmail: boolean;
  isLoading?: boolean;
  handleCloseModalShowCambiarEmail: Dispatch<SetStateAction<boolean>>;
  fetchDataUser?: () => Promise<void>;
}

const ModalCambiarEmail = ({
  userId,
  showModalCambiarEmail,
  isLoading,
  handleCloseModalShowCambiarEmail,
  fetchDataUser,
}: IModalCambiarEmail) => {
  const { authUserGet, authUserPut } = useAuthentication();
  const [user, setUser] = useState<IAuthUserGet>({} as IAuthUserGet);

  const rhForm = useForm({ mode: 'onBlur' });

  const fetchData = useCallback(async () => {
    const res = await authUserGet(userId);
    res && setUser(res);
  }, [authUserGet, userId]);

  const cambiarEmail = useCallback(
    async (formData: FieldValues) => {
      if (user?.email === formData?.email) {
        notifications.warning({
          body: 'El email introducido debe ser diferente al registrado',
        });
      } else {
        const data = {
          userId: user.id,
          firstName: user.firstName,
          email: formData.email || user.email,
          lastName: user.lastName,
          phoneNumber: '',
        };
        const res = await authUserPut(data);
        if (res) {
          notifications.success({ body: 'Email actualizado con éxito' });
          handleCloseModalShowCambiarEmail(false);
          fetchDataUser && fetchDataUser();
        }
      }
      handleCloseModalShowCambiarEmail(false);
    },
    [authUserPut, fetchDataUser, handleCloseModalShowCambiarEmail, user]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData, userId]);

  return (
    <Modal
      open={showModalCambiarEmail}
      onClose={() => handleCloseModalShowCambiarEmail(false)}
      header="Email de inicio de sesión"
      className="w-1/3"
    >
      {isLoading || !user.email ? (
        <div className="text-center">
          <Spinner />
        </div>
      ) : (
        <FormProvider {...rhForm}>
          <div className="w-full">
            <div>
              <InputEmail
                name="email"
                className="mb-2 w-full"
                defaultValue={user?.email}
                placeholder="Correo electrónico"
                label="Email"
                labelClassName="text-base flex"
              />
            </div>
          </div>
          <div className="buttons__container flex justify-end">
            <Button
              color="primary"
              text="Cancelar"
              type="text-button"
              onClick={() => handleCloseModalShowCambiarEmail(false)}
            />
            <Button
              color="primary"
              text="Cambiar"
              type="button"
              onClick={rhForm.handleSubmit(cambiarEmail)}
              loading={isLoading}
            />
          </div>
        </FormProvider>
      )}
    </Modal>
  );
};

export default ModalCambiarEmail;
