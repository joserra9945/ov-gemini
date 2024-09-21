import { connection } from 'utils/services/config/signalr.config';
import * as SignalR from '@microsoft/signalr';

export const createSignalInstace = (baseURL, hub, token) =>
  connection(`${baseURL}/${hub}`, {
    transport: SignalR.HttpTransportType.WebSockets,
    accessTokenFactory: () => token,
  });
