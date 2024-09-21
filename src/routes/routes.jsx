/* eslint-disable react/jsx-props-no-spreading */
import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { getCurrentItem } from 'store/actions/actions-alert';

import { MultiStepForm } from '../pages/DirectLending/components/MultiStepForm';

import { privateRoutes, routes } from './config';

const LoginContainer = lazy(() => import('../pages/Login/LoginContainer'));
const EntryPoint = lazy(() => import('pages/EntryPoint'));
const SharedEntryPoint = lazy(() => import('pages/SharedEntryPoint'));
const SharedEntryPointInvoice = lazy(() =>
  import('pages/SharedEntryPointInvoice')
);
const PrivateAuthLayout = lazy(() => import('./AuthLayout'));

const CreateRoutes = ({ layoutWidth }) => {
  const [currentAlert, setCurrentAlert] = useState(null);
  const { items } = useSelector((state) => state.alertState);
  const { isAdUser, libradorId } = useSelector((state) => state.userState);

  const prRoutes = useMemo(
    () => privateRoutes(libradorId, isAdUser),
    [libradorId, isAdUser]
  );

  const getCurrentAlert = useCallback(() => {
    if (items) {
      const res = getCurrentItem(items);
      if (res) {
        setCurrentAlert(res);
      } else {
        setCurrentAlert(null);
      }
    }
  }, [items]);

  useEffect(() => {
    if (items) getCurrentAlert();
    else {
      setCurrentAlert(null);
    }
  }, [getCurrentAlert, items]);

  return (
    <Router>
      <Suspense>
        <Routes>
          <Route path="/login-backup" element={<LoginContainer />} />
          <Route
            path="/entry-point/:formType/:userId/:firstName/:email?"
            element={<EntryPoint />}
          />
          <Route path="/shared-entry-point" element={<SharedEntryPoint />} />
          <Route path="/invoice-import" element={<SharedEntryPointInvoice />} />
          <Route path="/prestamos/asistente" element={<MultiStepForm />} />
          {routes.map((route) => (
            <Route
              path={route.path}
              element={route.component}
              key={route.path}
            />
          ))}
          <Route
            element={
              <PrivateAuthLayout
                layoutWidth={layoutWidth}
                currentAlert={currentAlert}
                items={items}
                getCurrentAlert={getCurrentAlert}
              />
            }
          >
            {prRoutes.map((route) => (
              <Route
                path={route.path}
                element={route.component}
                key={route.path}
              />
            ))}
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default CreateRoutes;
