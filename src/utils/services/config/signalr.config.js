import * as signalR from '@microsoft/signalr';

export const connection = (url, config) =>
  new signalR.HubConnectionBuilder()
    .withUrl(url, config)
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Error)
    .build();
