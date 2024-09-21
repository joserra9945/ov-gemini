import { INotificationReducer } from '../INotifications/INotificationReducer';
import { IPagoReducer } from '../IPago/IPagoReducer';
import { IUserReducer } from '../IUser/IUserReducer';

export interface IRootReducer {
  userState: IUserReducer;
  pagoState: IPagoReducer;
  notificationState: INotificationReducer;
}
