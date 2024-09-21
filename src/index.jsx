import ReactDOM from 'react-dom/client';
import TagManager from 'react-gtm-module';
import { ReactNotifications } from 'react-notifications-component';
import { Provider } from 'react-redux';
import { PrimeReactProvider } from 'primereact/api';
import { PersistGate } from 'redux-persist/es/integration/react';

import { AxiosInterceptor } from '@shared/components/AxiosInterceptor';

import { createStoreWithSagaMiddleware } from './store/config/store.config';
import AppContainer from './App';
import * as serviceWorker from './serviceWorker';

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'react-notifications-component/dist/theme.css';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import 'filepond-plugin-pdf-preview/dist/filepond-plugin-pdf-preview.min.css';
import 'filepond-plugin-media-preview/dist/filepond-plugin-media-preview.min.css';
import '@shared/styles/main.scss';
import 'react-circular-progressbar/dist/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/app-styles/main.scss';

const { store, persistor } = createStoreWithSagaMiddleware();

const tagManagerArgs = {
  gtmId: 'GTM-T8X7T37',
};

if (process.env.REACT_APP_API_ENV.includes('PRODUCTION')) {
  TagManager.initialize(tagManagerArgs);
}

const root = ReactDOM.createRoot(document.getElementById('app-root'));
root.render(
  <AxiosInterceptor>
    <PrimeReactProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ReactNotifications />
          <AppContainer />
        </PersistGate>
      </Provider>
    </PrimeReactProvider>
  </AxiosInterceptor>
);

serviceWorker.unregister();
