import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { replace } from 'lodash';

import { InputEmail, InputPassword, InputTextBasic } from '@shared/form';
import { useEmpresaExterna, useUsuarioExterno } from '@shared/hooks';
import { tipoDocumentoString } from '@shared/utils/constants';
import { validateSpanishID } from '@shared/utils/DNIValidator';
import notifications from '@shared/utils/notifications';

import { Spinner } from '@shared/components/Legacy/Spinner';

import SignUpForm from 'components/forms/SignUpForm';

import { optionEnum, product } from './helpers';

const LoginNew = ({
  onSetInfoEffect,
  onRequestLogin,
  logged,
  isAdUser,
  error,
  fetching,
  setLoginData,
  internalLogin,
}) => {
  const [firstStepSignIn, setFirstStepSignIn] = useState(true);
  const [optionSelected, setOptionSelected] = useState(optionEnum.SIGN_IN);
  const [loginValues, setLoginValues] = useState();
  const [loading, setLoading] = useState(false);
  const [librador, setLibrador] = useState({
    isValid: true,
    nifType: 2,
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptCommunications, setAcceptCommunications] = useState(false);

  const rhForm = useForm({ mode: 'onChange' });
  const {
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = rhForm;
  const { postEmpresaExternaValidarCif } = useEmpresaExterna();
  const { postUsuarioExternoForLogin } = useUsuarioExterno();
  const navigate = useNavigate();
  const cifWatcher = watch('libradorCif');

  const companyRegister = async () => {
    setLoading(true);
    const { libradorRazonSocial, firstName, lastName, libradorCif, telefono } =
      getValues();
    const data = {
      aceptaComunicacionesComerciales: acceptCommunications,
      libradorRazonSocial: libradorRazonSocial?.length
        ? libradorRazonSocial
        : `${firstName} ${lastName}`,
      libradorCif,
      telefono,
      signUpCommand: {
        email: loginValues?.email.trim(),
        emailConfirmacionUrl: `${window.location.origin}/confirm-email-backup`,
        firstName,
        lastName,
        password: loginValues?.pass,
        product,
      },
    };
    const resLogin = await postUsuarioExternoForLogin(data);
    if (resLogin.errors?.length > 0) {
      let errorMessage;
      switch (resLogin.errors[0].code) {
        case 'DuplicateEmail':
          errorMessage = 'El email ya está en uso.';
          break;
        case 'DuplicateLibrador':
          errorMessage = 'El CIF o Razón Social ya está en uso.';
          break;
        default:
          errorMessage =
            'Es posible que el usuario ya exista, en cuyo caso pruebe hacer login.';
          break;
      }
      notifications.warning({ body: errorMessage });
    } else {
      setLoginData(resLogin);
    }
    setLoading(false);
  };

  const goToSubirEfectos = () => {
    onSetInfoEffect({
      step: 1,
      tipoEfecto: parseInt(tipoDocumentoString.FACTURA, 10),
      efectos: [],
    });
    navigate('/subir-efectos', replace);
  };

  const onSubmit = (data) => {
    if (optionSelected === optionEnum.SIGN_IN) {
      onRequestLogin(data);
    } else {
      setLoginValues(data);
      setFirstStepSignIn(false);
    }
  };

  if (logged) {
    isAdUser
      ? navigate('/user-ad')
      : !firstStepSignIn
      ? goToSubirEfectos()
      : navigate('/', replace);
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!cifWatcher) return;
      if (!validateSpanishID(cifWatcher)) return;
      const res = await postEmpresaExternaValidarCif(cifWatcher);
      res && setLibrador(res);
    };

    fetchData();
  }, [cifWatcher, postEmpresaExternaValidarCif]);

  return (
    <div className="flex flex-col w-full h-full overflow-y-scroll lg:flex-row">
      <FormProvider {...rhForm}>
        <section className="flex flex-col items-center w-full p-10 bg-primary lg:w-6/12 lg:h-screen md:p-20">
          <div className="m-auto">
            <figure className="h-16 mb-10">
              <img
                className="h-full"
                src={process.env.REACT_APP_LOGO_BLANCO}
                alt="logo-blanco"
              />
            </figure>
            <figure className="mb-10">
              <img
                src="https://finanedi.es/assets/img/business/b1.svg"
                alt="Logo"
              />
            </figure>
            <p className="mb-6 text-2xl text-center text-white">
              Te adelantamos el cobro de tus facturas al instante.
            </p>
          </div>
        </section>

        <div className="flex justify-center w-full p-4 py-10 bg-background lg:py-0 lg:w-6/12">
          {optionSelected === optionEnum.SIGN_IN || firstStepSignIn ? (
            <section className="p-6 m-auto bg-white rounded-md shadow sm:w-8/12 md:w-6/12 lg:w-10/12 xl:w-8/12 xl:p-8 2xl:w-6/12">
              <div className="flex justify-center">
                <figure className="h-10 mb-6">
                  <img
                    className="h-full"
                    src={process.env.REACT_APP_LOGO}
                    alt="logo"
                  />
                </figure>
              </div>
              <h3 className="mb-6 text-xl font-medium text-center text-primary">
                La plataforma de acceso a FinanEDI
              </h3>

              <div className="flex flex-row h-16 mb-6 rounded-md bg-neutral-10">
                <button
                  className={`w-6/12 ${
                    optionSelected === optionEnum.SIGN_IN
                      ? 'text-primary bg-white m-1.5 rounded-md shadow-sm'
                      : ''
                  }`}
                  onClick={() => setOptionSelected(optionEnum.SIGN_IN)}
                  type="button"
                >
                  Iniciar sesión
                </button>
                <button
                  type="button"
                  className={`w-6/12 ${
                    optionSelected === optionEnum.SIGN_UP
                      ? 'bg-white m-1.5 rounded-md shadow-sm'
                      : ''
                  }`}
                  onClick={() => setOptionSelected(optionEnum.SIGN_UP)}
                >
                  Registrarse
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-5 flex-column">
                  {internalLogin ? (
                    <InputTextBasic
                      name="userName"
                      label="Nombre de usuario"
                      placeholder="Introduzca su nombre de usuario"
                      required
                    />
                  ) : (
                    <InputEmail
                      name="email"
                      label="Correo electrónico"
                      placeholder="Introduzca su correo electrónico"
                      required
                    />
                  )}
                  <InputPassword
                    name="pass"
                    label="Contraseña"
                    placeholder="Introduzca su contraseña"
                    required
                    validate={optionSelected === optionEnum.SIGN_UP}
                  />
                </div>
                <div
                  className={`flex justify-end my-1 ${
                    optionSelected === optionEnum.SIGN_IN && !internalLogin
                      ? ''
                      : 'hidden'
                  }`}
                >
                  <button
                    type="button"
                    className="text-text-hyperlink"
                    onClick={() => navigate('/recovery-password-step1-backup')}
                  >
                    Olvidé mi contraseña
                  </button>
                </div>
                <div className="flex items-center justify-center w-full h-12 my-6 text-white rounded-md cursor-pointer bg-primary hover:bg-primary-over">
                  {fetching ? (
                    <Spinner loading color="#FFFFFF" />
                  ) : (
                    <input
                      className="w-full h-full"
                      disabled={fetching}
                      id="iniciarSesion"
                      type="submit"
                      value={`${
                        optionSelected === optionEnum.SIGN_IN
                          ? 'Iniciar sesión'
                          : 'Continuar'
                      }`}
                    />
                  )}
                </div>
              </form>

              {error && (
                <small className="p-invalid">
                  El usuario o la contraseña no son correctos
                </small>
              )}
              <p className="text-sm">
                Nuestra empresa tratará sus datos con la finalidad de que acceda
                al área cliente.&nbsp;
                <a
                  className="underline text-text-hyperlink text-s"
                  href={process.env.REACT_APP_DERECHOS_URL}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Derechos y más info.
                </a>
              </p>
            </section>
          ) : (
            <section className="p-6 m-auto bg-white rounded-md shadow sm:w-8/12 md:w-6/12 lg:w-10/12 xl:w-8/12 xl:p-8 2xl:w-6/12">
              <figure className="h-10 mb-5">
                <img
                  className="h-full"
                  src={process.env.REACT_APP_LOGO}
                  alt="logo"
                />
              </figure>
              <h3 className="mb-6 text-xl font-medium text-primary">
                Datos a completar para su registro
              </h3>
              <SignUpForm
                rhForm={rhForm}
                setAcceptTerms={setAcceptTerms}
                acceptTerms={acceptTerms}
                comesFromLogin
                librador={librador}
                acceptCommunications={acceptCommunications}
                setAcceptCommunications={setAcceptCommunications}
              />
              <button
                className={`w-full h-12 mb-4 text-white rounded-md bg-primary ${
                  !acceptTerms || loading
                    ? 'disabled opacity-25 cursor-default'
                    : ''
                }`}
                type="submit"
                onClick={rhForm.handleSubmit(companyRegister)}
                disabled={!acceptTerms || loading}
              >
                Crear cuenta
              </button>
            </section>
          )}
        </div>
      </FormProvider>
    </div>
  );
};

export default LoginNew;
