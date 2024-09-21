import { INotificationReducer } from './INotificationReducer';

export const ADD_ALL = 'ADD_ALL';
export const RESET = 'RESET_NOTIFICATIONS';

interface IAdd {
  type: typeof ADD_ALL;
  payload: INotificationReducer;
}

interface IResetNotifications {
  type: typeof RESET;
  payload?: any;
}

export type INotificationActions = IAdd | IResetNotifications;
