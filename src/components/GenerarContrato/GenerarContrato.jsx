/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/no-shadow */
import { createRef, useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import VidSignerLogo from 'assets/vidsigner_logo_white_bg.jpg';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import CuentaService from 'utils/services/cuenta-service';
import EmpresaService from 'utils/services/empresa-externa-service';
import GenerarContratoService from 'utils/services/generar-contrato-service';
import PersonaService from 'utils/services/persona-service';
import RepresentanteService from 'utils/services/representante-service';
import {
  faCheckCircle,
  faChevronLeft,
  faTimesCircle,
} from '@fortawesome/pro-light-svg-icons';
import { faSignature } from '@fortawesome/pro-solid-svg-icons';

import { Button } from '@shared/components/Button';
import ConfirmDialogModal from '@shared/components/ConfirmDialogModal';
import { Modal } from '@shared/components/Modal';
import NuevoContacto from '@shared/modules/NuevoContacto/NuevoContacto';
import PerfilEmpresa from '@shared/modules/PerfilEmpresa/PerfilEmpresa';
import { operacionesPageTabEnum } from '@shared/utils/constants';

import Afterbanks from 'components/Afterbanks';
import Card from 'components/Hocs/Card';
import InfoIconToOverlay from 'components/InfoIconToOverlay';
import { resetAlerts } from 'store/actions/actions-alert';
import { getDocumentosPendientesLibrador } from 'store/actions/actions-api';

import Fields from './components/Fields';

import './styles.scss';

const empresaService = new EmpresaService();
const MySwal = withReactContent(Swal);
const generarContratoService = new GenerarContratoService();
const representanteService = new RepresentanteService();
const cuentaService = new CuentaService();
const personaService = new PersonaService();

const GenerarContrato = ({
  onPreviousStep = false,
  libradorId,
  setContratoDocument,
  selectedEfectos,
}) => {
  const divRef = createRef();
  const [buttonState, setButtonState] = useState('');
  const [defaultUser, setDefaultUser] = useState();
  const [defaultPersona, setDefaultPersona] = useState();
  const [isDownloading, setIsDownloading] = useState(false);
  const [optionsRepresentante, setOptionsRepresentante] = useState();
  const [optionsCuenta, setOptionsCuenta] = useState();
  const [isOpenAfterbanks, setIsOpenAfterbanks] = useState(false);
  const [isOpenRepresentantes, setIsOpenRepresentantes] = useState(false);
  const [selectedRepresentantes, setSelectedRepresentantes] = useState([]);
  const [selectedCuenta, setSelectedCuenta] = useState();
  const [askUserForRepresentante, setAskUserForRepresentante] = useState(false);
  const [resumenKYC, setResumenKYC] = useState();
  const [isOpenResumenKyc, setIsOpenResumenKyc] = useState(false);
  const [openCompleteKyc, setOpenCompleteKyc] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { state: locationState } = useLocation();

  const [validKycFromPerfilEmpresa, setValidKycFromPerfilEmpresa] = useState(
    !!resumenKYC
  );
  const [kycCompleto, setKycCompleto] = useState(false);
  const rhForm = useForm({ mode: 'onChange' });
  const { setValue, trigger, handleSubmit } = rhForm;

  const handleNextStep = useCallback(
    (success) => {
      navigate('/', {
        state: success ? { tab: operacionesPageTabEnum.OPERACIONES } : null,
      });
    },
    [navigate]
  );

  const toggleRepresentantes = () => {
    setIsOpenRepresentantes((prevStatus) => !prevStatus);
  };
  const toggleAfterbanks = () =>
    setIsOpenAfterbanks((prevStatus) => !prevStatus);

  const askAndSetDefaultPersona = (response = true) => {
    if (response) {
      setDefaultPersona({ ...defaultUser, esRepresentante: true });
    } else {
      setDefaultPersona({ esRepresentante: true });
    }
    setIsOpenRepresentantes(true);
    setAskUserForRepresentante(false);
  };

  const fetchAndParseRepresentantes = useCallback(async () => {
    const libradorId = sessionStorage.getItem('libradorId');
    if (libradorId) {
      const representantesResponse =
        await representanteService.getRepresentanteByEmpresaId(libradorId);
      const resultado = [{ id: 0 }];

      if (representantesResponse) {
        if (representantesResponse?.items?.length) {
          representantesResponse?.items?.forEach((representante) => {
            resultado.push({
              id: representante.id,
              nombre: representante.persona.nombre,
              apellidos: representante.persona.apellidos,
            });
          });
        }
        setOptionsRepresentante(resultado);
      }
      if (!representantesResponse?.items?.length) {
        const empresaId = sessionStorage.getItem('libradorId');
        const personas = await personaService.get(empresaId, '');
        if (personas?.items?.length) {
          setDefaultUser(personas.items.find((persona) => persona.esUsuario));
        }
      }
      return resultado || [];
    }
  }, []);

  const fetchCuentas = useCallback(async () => {
    const tmpCuentas = await cuentaService.getCuentaByEmpresaId(libradorId);
    if (tmpCuentas) {
      const options = [...tmpCuentas.items];
      const addBankAcc = [{ id: 0 }];
      setOptionsCuenta([...addBankAcc, ...options]);
    }
  }, [libradorId]);

  const fetchResumenKYC = useCallback(async () => {
    const res = await empresaService.getResumenKYC(libradorId);
    if (res) {
      const kycProps = res && Object.values(res);
      const isValidKYC = kycProps && kycProps.every((el) => el);
      setKycCompleto(isValidKYC);
      setResumenKYC(res);
      if (
        res.tieneDireccionSocial &&
        res.tieneFirmantes &&
        res.tieneTelefonoYCorreo
      ) {
        setValidKycFromPerfilEmpresa(true);
      } else {
        setValidKycFromPerfilEmpresa(false);
      }
    }
  }, [libradorId]);

  useEffect(() => {
    if (!selectedEfectos?.length && !locationState?.efectos?.length) {
      handleNextStep();
    }
  }, [handleNextStep, locationState?.efectos?.length, selectedEfectos?.length]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchAndParseRepresentantes();
      await fetchCuentas();
      await fetchResumenKYC();
    };
    fetchData();
    dispatch(resetAlerts());
  }, [dispatch, fetchAndParseRepresentantes, fetchCuentas, fetchResumenKYC]);

  const checkValues = useCallback(
    (goBackPage = false) => {
      if (goBackPage) navigate('/');
      if (optionsRepresentante && optionsCuenta && resumenKYC) {
        if (!validKycFromPerfilEmpresa) {
          setIsOpenResumenKyc(true);
        }

        if (validKycFromPerfilEmpresa && optionsCuenta.length <= 1) {
          setIsOpenResumenKyc(false);
          setIsOpenAfterbanks(true);
        }
      }
    },
    [
      navigate,
      optionsCuenta,
      optionsRepresentante,
      resumenKYC,
      validKycFromPerfilEmpresa,
    ]
  );

  useEffect(() => {
    checkValues();
  }, [checkValues, resumenKYC]);

  const executeDownloadFunc = async () => {
    setIsDownloading(true);
    const filteredRepresentantes = optionsRepresentante
      ?.filter((x) => x.id !== 0)
      .map((x) => {
        return x.id;
      });
    const res = await generarContratoService.generacionContratoKyByEmpresaId(
      libradorId,
      filteredRepresentantes
    );

    if (res) {
      const a = document.createElement('a');
      a.href = `data:application/pdf;base64,${res}`;
      a.download = `kyc.pdf`;
      a.click();
      setIsDownloading(false);
    }
  };

  const firmarContrato = async () => {
    const representatesIds = selectedRepresentantes.map(
      (representante) => representante.id
    );
    try {
      setButtonState('loading');
      const response = await generarContratoService.signContrato(
        selectedEfectos.length ? selectedEfectos : locationState?.efectos,
        representatesIds,
        selectedCuenta?.id
      );

      if (response) {
        dispatch(
          getDocumentosPendientesLibrador(
            libradorId || sessionStorage.getItem('libradorId')
          )
        );
        setContratoDocument(response);
        MySwal.fire({
          title: '¡Éxito!',
          html: `<div class="generar-contrato__message text-left">${
            locationState?.isPagareType
              ? `<p>
              Para dar curso a su operación de pagarés, necesitamos que envíe sus pagarés físicamente. Deberá hacernos llegar
              <span class="font-bold">el pagaré firmado por detrás*</span> a través de MRW.
            </p>
            <br />
            <p>
              Para utilizar el servicio de MRW, llame al teléfono <span>902300400 // 963393350 </span>
              utilizando el servicio BAG 19, nº oficina 04323 y de abonado 692 y dirija el sobre a la siguiente dirección:
            </p>
            <br />
            <div class="bg-[#F3F8FB] p-4 rounded font-bold text-center">
              Calle San Vicente Mártir nº 81 1-1, 46007 Valencia. A la atención de tesorería.
            </div>
            <br />
            <p>* Recuerde que los pagarés deberán de estar endosados.</p>
            <br />
            <p class="italic">¿Cómo se puede endosar un pagaré?</p>
            <br />
            <p>
              Si es <span class="text-sky-500 font-medium">empresa</span> debe de poner
              <span class="font-bold">sello de la empresa y firma</span>. En el caso de que el sello no contenga el CIF, deberá de
              estar obligatoriamente la denominación social completa. Si no tienen cuño, sería necesario escribir el nombre completo y CIF
              de la empresa junto con la firma de los administradores o apoderados.
            </p>
            <br />
            <p>
              Si eres <span class="text-sky-500 font-medium">autónomo</span> debe de conten
              <span class="font-bold">nombre y apellidos</span> completos (tal y como indique el DNI), 
              <span class="font-bold">DNI</span> y <span class="font-bold">firma</span>.
            </p>`
              : '<p>El contrato se está generando, pronto recibirá una notificación.</p>'
          }<p><img class="verisign_logo mt-6" src=${VidSignerLogo} /></p></div>`,
          icon: 'success',
          target: divRef.current,
          allowOutsideClick: false,
          customClass: locationState?.isPagareType
            ? 'swal-generar-contrato --big'
            : 'swal-generar-contrato',
        }).then((result) => {
          if (result.isConfirmed) {
            handleNextStep(true);
          }
        });
      }
    } catch (err) {
      setButtonState('');
      MySwal.fire({
        title: 'Error!',
        text: err?.errors[0]?.toString(),
        icon: 'error',
        target: divRef.current,
        allowOutsideClick: false,
      });
    }
    setButtonState('');
  };

  const selectCuenta = async () => {
    let tmpCuentas = await cuentaService.getCuentaByEmpresaId(libradorId);
    tmpCuentas = tmpCuentas?.items || [];
    const res = tmpCuentas[tmpCuentas.length - 1];
    if (res) {
      setValue('selectCuentas', res);
      trigger('selectCuentas');
      const addBankAcc = [{ id: 0 }];
      setOptionsCuenta([...addBankAcc, ...tmpCuentas]);
      setSelectedCuenta(res);
    }
    setIsOpenAfterbanks(false);
  };

  const infoIcon = (isCompleted) => {
    return (
      <InfoIconToOverlay
        iconClasses={isCompleted ? 'text-success' : 'text-danger'}
        icon={isCompleted ? faCheckCircle : faTimesCircle}
        tooltipContent={isCompleted ? '' : 'Debe completar la información.'}
        type="tooltip"
      />
    );
  };

  const formField = useCallback(() => {
    return (
      <form>
        <Fields
          selectedCuenta={selectedCuenta}
          setSelectedCuenta={setSelectedCuenta}
          optionsCuenta={optionsCuenta}
          selectedRepresentantes={selectedRepresentantes}
          setSelectedRepresentantes={setSelectedRepresentantes}
          optionsRepresentante={optionsRepresentante}
          infoIcon={infoIcon}
          addRepresentantes={toggleRepresentantes}
          addCuenta={toggleAfterbanks}
          rhForm={rhForm}
        />
      </form>
    );
  }, [
    optionsCuenta,
    optionsRepresentante,
    rhForm,
    selectedCuenta,
    selectedRepresentantes,
  ]);

  return (
    <div className="generar-contrato gc-step1 w-3/5" ref={divRef}>
      <Card className="card--add-padding card-table">
        <div className="row">
          <div className="mb-3 col-md-12">
            <h2 className="title-h2">Generar contrato</h2>
          </div>
          <div
            className="mb-4 col-md-12"
            onClick={() => setOpenCompleteKyc(true)}
          >
            {validKycFromPerfilEmpresa && kycCompleto ? (
              <div
                className="kyc--completed d-flex justify-content-between align-items-center"
                role="button"
                tabIndex="-1"
                aria-hidden="true"
                onClick={() =>
                  !isDownloading ||
                  (validKycFromPerfilEmpresa && executeDownloadFunc())
                }
              >
                <div className="kyc--logo">
                  {infoIcon(kycCompleto)}
                  <span className="ml-1">
                    Perfil de empresa (KYC) completado. Haga clic aquí si desea
                    visualizarlo.
                  </span>
                </div>
              </div>
            ) : (
              <div className="kyc--incomplete">
                <div className="kyc--logo">
                  {infoIcon(kycCompleto)}{' '}
                  <span className="ml-1">
                    Perfil de empresa (KYC) incompleto. Haga clic aquí si desea
                    completarlo.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        {formField()}

        <div className="footer-buttons">
          {onPreviousStep && (
            <Button
              icon={faChevronLeft}
              text="Paso anterior"
              onClick={onPreviousStep}
              type="text-button"
            />
          )}
          <Button
            color="primary"
            id="generarContrato"
            loading={buttonState}
            onClick={
              resumenKYC?.tieneFirmantes &&
              resumenKYC?.tieneDireccionSocial &&
              resumenKYC?.tieneTelefonoYCorreo
                ? handleSubmit(firmarContrato)
                : () => setIsOpenResumenKyc(true)
            }
            text="Generar contrato"
            type="button"
          />
        </div>
      </Card>
      <Modal
        open={isOpenAfterbanks && optionsRepresentante && optionsCuenta}
        onClose={toggleAfterbanks}
        header="Añadir cuenta bancaria"
        className="afterbanks-dialog h-[83%]"
        closable={false}
      >
        <Afterbanks
          cancelar={toggleAfterbanks}
          onNextStep={() => selectCuenta()}
        />
      </Modal>
      <Modal
        open={isOpenRepresentantes && optionsRepresentante && optionsCuenta}
        onClose={() => toggleRepresentantes()}
        header="Nuevo firmante"
        className="contacto-form__dialog"
      >
        <NuevoContacto
          className="contacto-form__container"
          personaAEditar={
            !optionsRepresentante?.length <= 1 ? defaultPersona : {}
          }
          libradorId={libradorId}
          setIsOpen={setIsOpenRepresentantes}
          fetchRepresentantesOnClose={fetchAndParseRepresentantes}
        />
      </Modal>

      <ConfirmDialogModal
        bodyText={`<p>¿Desea crear un nuevo firmante a partir de la persona <b>${defaultUser?.nombre} ${defaultUser?.apellidos}</b>?</p>`}
        labelCancell="No"
        labelConfirm="Sí"
        onDeny={() => askAndSetDefaultPersona(false)}
        onClose={() => setAskUserForRepresentante(false)}
        onConfirm={() => askAndSetDefaultPersona(true)}
        isOpen={askUserForRepresentante}
        iconHeader={faSignature}
        colorIconHeader="primary"
      />

      {isOpenResumenKyc && (
        <Modal
          open={isOpenResumenKyc}
          onClose={() => {
            checkValues(true);
            fetchResumenKYC();
            setIsOpenResumenKyc(false);
          }}
          header="Datos para la operación"
          className="resumen-kyc__modal-generarContrato"
        >
          <PerfilEmpresa
            fetchResumenKYC={fetchResumenKYC}
            setIsOpenResumenKyc={setIsOpenResumenKyc}
            checkValues={checkValues}
            setValidKycFromPerfilEmpresa={setValidKycFromPerfilEmpresa}
            fetchRepresentantesOnClose={fetchAndParseRepresentantes}
            vieneDeGenerarContrato
          />
        </Modal>
      )}
      {openCompleteKyc && (
        <Modal
          open={openCompleteKyc}
          onClose={() => {
            fetchResumenKYC();
            checkValues();
            setOpenCompleteKyc(false);
          }}
          header="Perfil de empresa"
          className="resumen-kyc__modal-generarContrato"
        >
          <PerfilEmpresa
            setIsOpenResumenKyc={setIsOpenResumenKyc}
            setOpenCompleteKyc={setOpenCompleteKyc}
            checkValues={checkValues}
            setValidKycFromPerfilEmpresa={setValidKycFromPerfilEmpresa}
            fetchRepresentantesOnClose={fetchAndParseRepresentantes}
          />
        </Modal>
      )}
    </div>
  );
};

export default GenerarContrato;
