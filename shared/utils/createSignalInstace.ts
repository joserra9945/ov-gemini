import * as SignalR from '@microsoft/signalr';

import { connection } from './signalr.config';

export const createSignalInstace = (
  baseURL: string,
  hub: string,
  token: string
): SignalR.HubConnection =>
  connection(`${baseURL}${hub}`, {
    transport: SignalR.HttpTransportType.WebSockets,
    accessTokenFactory: () => token,
  });
