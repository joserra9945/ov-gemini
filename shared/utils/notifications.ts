import { Store } from 'react-notifications-component';
import { isAxiosError } from 'axios';
import { asError } from 'catch-unknown';

interface IMessage {
  title?: string;
  body?: string;
}

const DURATION = 10000;
export default {
  unknownError(catchedError: unknown): void {
    if (!isAxiosError(catchedError)) {
      const message: IMessage = {
        title: 'Se ha producido un error de origen desconocido.',
        body: asError(catchedError).message,
      };
      this.errorServidor(message);
      return console.error(catchedError);
    }
  },
  errorServidor(message?: IMessage, countDown?: boolean): void {
    Store.addNotification({
      title: message?.title || '¡Error!',
      message:
        message?.body ||
        'Ha ocurrido un error en el servidor, inténtelo de nuevo más tarde',
      type: 'danger',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'adeOut'],
      dismiss: {
        duration: DURATION,
        onScreen: !!countDown,
      },
    });
  },
  warning(message?: IMessage): void {
    Store.addNotification({
      title: message?.title || 'Aviso',
      message: message?.body || 'Ha habido un error de validación',
      type: 'warning',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'adeOut'],
      dismiss: {
        duration: DURATION,
      },
    });
  },
  success(message?: IMessage): void {
    Store.addNotification({
      title: message?.title || 'Éxito',
      message: message?.body || 'La operación se ha completado con éxito',
      type: 'success',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'adeOut'],
      dismiss: {
        duration: DURATION,
      },
    });
  },
  info(message?: IMessage): void {
    Store.addNotification({
      title: message?.title || '',
      message: message?.body || '',
      type: 'info',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animated', 'fadeIn'],
      animationOut: ['animated', 'adeOut'],
      dismiss: {
        duration: DURATION,
      },
    });
  },
};
