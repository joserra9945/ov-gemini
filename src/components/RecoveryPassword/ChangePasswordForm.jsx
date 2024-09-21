import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import Swal from 'sweetalert2';
import RecoveryPasswordService from 'utils/services/recovery-password-service';

const recoveryPasswordService = new RecoveryPasswordService();

const ChangePasswordForm = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState } = useForm({
    mode: 'onChange',
  });

  const { errors } = formState;

  const password = useRef({});
  password.current = watch('password');

  const onSubmit = async (data) => {
    setIsSubmitted(true);
    recoveryPasswordService
      .resetPassword(data, token, userId)
      .then(() => {
        Swal.fire({
          title: 'Éxito!',
          text: 'Contraseña cambiada correctamente',
          icon: 'success',
        }).then(() => {
          navigate('/');
        });
      })
      .catch(() => {
        setIsSubmitted(false);
      });
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUserId(params.get('user'));
    setToken(encodeURIComponent(params.get('token')));
  }, []);

  return (
    <div className="recovery-password rp-s2">
      <div className="card">
        <div className="header">
          <div className="title">
            <h2>Cambia tu contraseña</h2>
          </div>
        </div>
        <div className="content">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="p-field field field-password">
              <label htmlFor="password">Contraseña:</label>
              <input
                className={
                  errors?.password
                    ? 'p-inputtext p-component p-filled p-invalid'
                    : 'p-inputtext p-component p-filled'
                }
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register('password', {
                  required: 'Contraseña obligatoria',
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[!@#$%&/\\()?¿*\-+=^,;.:_{}[\]])(?=.*[A-Z])(?=.*[0-9]).{8,}$/,
                    message:
                      'La contraseña debe estar formada mínimo por 1 mayúscula, 1 minúscula, 1 caracter especial y 1 número con una extensión mínima de 8 carateres.',
                  },
                })}
                type="password"
              />
              {errors?.password && (
                <small className="p-error p-d-block">
                  {errors?.password.message}
                </small>
              )}
            </div>
            <div className="p-field field field-password-repeat">
              <label htmlFor="password">Repite la contraseña:</label>
              <input
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...register('password_repeat', {
                  validate: (value) =>
                    value === password.current ||
                    'Las contraseñas no coinciden',
                })}
                type="password"
                className={
                  errors?.password_repeat
                    ? 'p-inputtext p-component p-filled p-invalid'
                    : 'p-inputtext p-component p-filled'
                }
              />
              {errors?.password_repeat && (
                <small className="p-error p-d-block">
                  {errors?.password_repeat.message}
                </small>
              )}
            </div>

            <Button
              label="Cambiar contraseña"
              disabled={!formState.isValid || isSubmitted}
              onClick={handleSubmit(onSubmit)}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
