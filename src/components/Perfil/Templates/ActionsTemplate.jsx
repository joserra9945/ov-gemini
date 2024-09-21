import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { CertificationApiService } from 'utils/services/certification-api-service';
import { faCheckCircle } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button as GButton } from '@shared/components/Legacy/Button';
import { Dialog } from '@shared/components/Legacy/Dialog';

import Afterbanks from 'components/Afterbanks/Afterbanks';

import './actionsTemplate.scss';

const certificationApiService = new CertificationApiService();

const ActionsTemplate = ({ validada }, fetchData) => {
  const [isOpen, setIsOpen] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [isOpenAfterbanks, setIsOpenAfterbanks] = useState(false);
  const { userId } = useSelector((state) => state.userState);
  const MySwal = withReactContent(Swal);

  const toogle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const toggleAfterbanks = () =>
    setIsOpenAfterbanks((prevStatus) => !prevStatus);

  const errorCallback = () => {
    MySwal.fire({
      title: '¡Error!',
      html: `<p>La petición ha fallado.</p>`,
      icon: 'warning',
      allowOutsideClick: false,
    });
  };

  const handleNext = () => {
    fetchData();
    toggleAfterbanks();
  };

  const handleValidate = async () => {
    setDisabledButton(true);
    try {
      const res = await certificationApiService.getCerfiticationByIdentityId(
        userId,
        errorCallback
      );
      if (res) {
        MySwal.fire({
          title: '¡Éxito!',
          html: `<p>La empresa ha sido validada con éxito.</p>`,
          icon: 'success',
          allowOutsideClick: false,
        }).then(() => {
          handleNext();
        });
      }
      setDisabledButton(false);
    } catch (err) {
      console.error(err);
      setDisabledButton(false);
    }
  };

  return (
    <div className="actions-table">
      {!validada ? (
        <>
          <button
            className="h-10 px-6 text-white rounded-md bg-secondary hover:bg-secondary-over"
            aria-label="Verificar empresa"
            onClick={toogle}
            type="button"
          >
            Verificar empresa
          </button>
          <Dialog
            isOpen={isOpen}
            close={toogle}
            className="verificar-empresa-dialog"
          >
            <div className="verificar-empresa-content">
              <b>
                ¿Desea verificar su empresa con certificado o a través de una
                cuenta bancaria?
              </b>
            </div>
            <div className="verificar-empresa-buttons">
              <GButton
                label="Cuenta bancaria"
                color="light"
                onClick={toggleAfterbanks}
              />
              <GButton
                label="Certificado digital"
                onClick={handleValidate}
                disabled={disabledButton}
              />
            </div>
          </Dialog>
          <Dialog
            isOpen={isOpenAfterbanks}
            close={toggleAfterbanks}
            header="Añadir cuenta bancaria"
            closeButtonLinkAppareance
            closeButtonColor="secondary"
            className="afterbanks-dialog"
            clickOutsideToClose={false}
          >
            <Afterbanks cancelar={toggleAfterbanks} onNextStep={handleNext} />
          </Dialog>
        </>
      ) : (
        <div className="empresa-verificada">
          <FontAwesomeIcon className="is-verificada" icon={faCheckCircle} />
          <label htmlFor="verificada" className="text-verificada">
            Empresa verificada
          </label>
        </div>
      )}
    </div>
  );
};
export default ActionsTemplate;
