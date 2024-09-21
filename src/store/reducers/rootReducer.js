import { combineReducers } from 'redux';

import alertReducer from './alertReducer';
import apiReducer from './apiReducer';
import contactReducer from './contactReducer';
import effectsReducer from './effectsReducer';
import layoutReducer from './layoutReducer';
import routerReducer from './routerReducer';
import stepperReducer from './stepperReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  userState: userReducer,
  apiState: apiReducer,
  routerState: routerReducer,
  stepState: stepperReducer,
  layoutState: layoutReducer,
  effectsState: effectsReducer,
  alertState: alertReducer,
  contactState: contactReducer,
});

export default rootReducer;
