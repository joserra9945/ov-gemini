/* eslint-disable import/no-extraneous-dependencies */
import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
// Configuración de Persistencia y Cifrado del Store
import { persistReducer, persistStore } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import createSagaMiddleware from 'redux-saga';

import watcherSaga from '../middleware/sagas';
// Nuestro Root Reducer
import rootReducer from '../reducers/rootReducer';

export function createStoreWithSagaMiddleware() {
  // Creamos un Middleware de tipo Saga
  const sagaMiddleware = createSagaMiddleware();

  // Configuración de Persistencia y Cifrado
  const persistStoreConfig = {
    key: 'root', // ciframos todo el storage de la aplicación, le llamaremos "root"
    storage: storageSession,
    transform: [
      encryptTransform({
        secretKey: 'MI_CLAVE_SECRETA', // TODO: Cambiarlo por una variable de entorno
        blacklist: ['apiState'],
        onError(error) {
          console.error(`Error al cifrar el store de la aplicación: ${error}`);
        },
      }),
    ],
  };

  // Vinculamos la configuración de la persistencia con el Root Reducer del store
  const persistedReducer = persistReducer(persistStoreConfig, rootReducer);

  // Creamos nuestro STORE a partir del RootReducer
  // y le aplicamos el Saga Middleware + los DevTools
  // para analizar el store y acciones en el navegador
  let store;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    store = createStore(
      persistedReducer,
      composeWithDevTools(applyMiddleware(sagaMiddleware))
    );
  } else {
    store = createStore(
      persistedReducer,
      compose(applyMiddleware(sagaMiddleware))
    );
  }
  // Definimos el Persistor
  const persistor = persistStore(store);

  // Poner a correr el WATCHER SAGA que hayamos creado
  // podríamos poner más de un watcher saga
  sagaMiddleware.run(watcherSaga);

  return { store, persistor };
}

export default createStoreWithSagaMiddleware;
