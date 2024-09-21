import { lazy } from 'react';

import FichaPrestamo from '@shared/modules/DirectLending/components/FichaPrestamo';
import { config } from '@shared/modules/DirectLending/config';

import DirectLending from 'pages/DirectLending';
import { Step1, Step2 } from 'pages/RecoveryPassword';

const SubirEfectos = lazy(() => import('pages/SubirEfectos'));
const NuevaOperacion = lazy(() => import('pages/NuevaOperacion'));
const MiDocumentacion = lazy(() => import('pages/MiDocumentacion'));
const EfectosContainer = lazy(() => import('pages/Efectos'));
const UserAdLandingPage = lazy(() => import('pages/UserAdLandingPage'));
const ConfirmEmailPage = lazy(() => import('pages/ConfirmEmailPage'));
const Cuentas = lazy(() => import('pages/Cuentas'));
const AfterbanksPage = lazy(() =>
  import('components/Afterbanks/AfterbanksPage')
);
const FichaOperacion = lazy(() => import('pages/FichaOperacion'));
const DetalleEfectoPage = lazy(() => import('pages/DetalleEfectoPage'));
const Cesiones = lazy(() => import('pages/Cesiones'));
const CesionesDetalle = lazy(() => import('pages/CesionesDetalle'));
const CesionesForm = lazy(() =>
  import('@shared/modules/CesionesForm/CesionesForm')
);
const OperacionesContainer = lazy(() =>
  import('pages/Operaciones/OperacionesContainer')
);
const PerfilPage = lazy(() => import('pages/PerfilPage'));
const GestionContactos = lazy(() => import('pages/GestionContactos'));
const PerfilEmpresa = lazy(() =>
  import('@shared/modules/PerfilEmpresa/PerfilEmpresa')
);
const DocumentViewer = lazy(() => import('pages/DocumentViewer'));
const Card = lazy(() => import('components/Hocs/Card'));
const CuentaCliente = lazy(() => import('@shared/modules/CuentaCliente'));

export const privateRoutes = (libradorId, isAdUser = false) => {
  const prRoutes = [
    {
      path: '/',
      component: <OperacionesContainer />,
      restrict: true,
    },
    {
      path: '/prestamos',
      component: <DirectLending config={config.prestamos} />,
      restrict: true,
    },
    {
      path: '/prestamos/ficha-prestamo/:id',
      component: <FichaPrestamo config={config.prestamos} />,
      restrict: true,
    },
    {
      path: '/subir-efectos/',
      component: <SubirEfectos />,
      restrict: true,
    },
    {
      path: '/subir-efectos/:entryPointFlow',
      component: <SubirEfectos />,
      restrict: true,
    },
    {
      path: '/efecto/:tipo/:id/',
      component: <EfectosContainer />,
      restrict: true,
    },
    {
      path: '/efecto/:tipo/:id/:entryPointFlow',
      component: <EfectosContainer />,
      restrict: true,
    },
    {
      path: '/perfil',
      component: <PerfilPage />,
      restrict: true,
    },
    {
      path: '/mi-documentacion',
      component: <MiDocumentacion />,
      restrict: true,
    },
    {
      path: '/doc-requerida',
      component: <MiDocumentacion />,
      restrict: true,
    },
    {
      path: '/document-viewer/:id',
      component: <DocumentViewer />,
      restrict: true,
    },
    {
      path: '/document-viewer/:id/:comesFromOperation',
      component: <DocumentViewer />,
      restrict: true,
    },
    {
      path: '/user-ad',
      component: <UserAdLandingPage />,
      restrict: false,
    },
    {
      path: '/nueva-operacion',
      component: <NuevaOperacion />,
      restrict: true,
    },
    {
      path: '/nueva-operacion/:entryPointFlow',
      component: <NuevaOperacion />,
      restrict: true,
    },
    {
      path: '/afterbanks',
      component: <AfterbanksPage />,
      restrict: true,
    },
    {
      path: '/cesiones',
      component: <Cesiones />,
      restrict: true,
    },
    {
      path: '/cesiones/create',
      component: <CesionesForm libradorId={libradorId} isAdUser={isAdUser} />,
      restrict: true,
    },
    {
      path: '/cesiones/complete/:id',
      component: <CesionesForm />,
      restrict: true,
    },
    {
      path: '/cesiones/detalle/:id',
      component: <CesionesDetalle />,
      restrict: true,
    },
    {
      path: '/cuentas',
      component: <Cuentas />,
      restrict: true,
    },
    {
      path: '/cuenta-cliente',
      component: <CuentaCliente isAdUser={isAdUser} />,
      restrict: true,
    },
    {
      path: '/ficha-operacion/:id',
      component: <FichaOperacion />,
      restrict: true,
    },
    {
      path: '/detalle/efecto/:efectoId/',
      component: <DetalleEfectoPage />,
      restrict: true,
    },
    {
      path: '/detalle/efecto/:efectoId/:operacionState',
      component: <DetalleEfectoPage />,
      restrict: true,
    },
    {
      path: '/firmantes',
      component: <GestionContactos />,
      restrict: true,
    },
    {
      path: '/perfil-empresa',
      component: (
        <div className="w-full p-4">
          <Card className="flex flex-col p-6 rounded-lg shadow-md grow">
            <h2 className="px-2 py-4 title-h2">Perfil de empresa</h2>
            <PerfilEmpresa />
          </Card>
        </div>
      ),
      restrict: true,
    },
  ];
  return prRoutes;
};

export const routes = [
  {
    path: '/confirm-email-backup',
    component: <ConfirmEmailPage />,
  },
  {
    path: '/recovery-password-step1-backup',
    component: <Step1 />,
  },
  {
    path: '/recovery-password-step2-backup',
    component: <Step2 />,
  },
];
