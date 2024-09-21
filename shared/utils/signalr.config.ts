import * as signalR from '@microsoft/signalr';

export const connection = (
  url: string,
  config: signalR.IHttpConnectionOptions
): signalR.HubConnection =>
  new signalR.HubConnectionBuilder()
    .withUrl(url, config)
    .configureLogging(signalR.LogLevel.Error)
    .build();
