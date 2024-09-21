import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Notifications = {
  errorServidor(message, duration = 3000) {
    const mob = window.screen.width <= '800';

    const swalToast = MySwal.mixin({
      icon: 'error',
      title:
        message?.body ||
        'Ha ocurrido un error en el servidor, inténtelo de nuevo más tarde',
      toast: true,
      position: mob ? 'top' : 'top-end',
      showConfirmButton: false,
      timer: duration,
      backdrop: false,
      width: mob ? '100%' : '30%',
    });
    swalToast.fire();
  },
  warning(message, duration = 3000) {
    const mob = window.screen.width <= '800';
    MySwal.fire({
      icon: 'warning',
      title: message?.body || 'Algo no va como debería',
      toast: true,
      position: mob ? 'top' : 'top-end',
      showConfirmButton: false,
      timer: duration,
      backdrop: false,
      width: mob ? '100%' : '30%',
    });
  },
  validacion(message, duration = 5000) {
    const mob = window.screen.width <= '800';
    MySwal.fire({
      icon: 'warning',
      title: message?.body || 'Uno de los campos es incorrecto',
      toast: true,
      position: mob ? 'top' : 'top-end',
      showConfirmButton: false,
      timer: duration,
      backdrop: false,
      width: mob ? '100%' : '30%',
    });
  },
  success(message, duration = 5000) {
    const mob = window.screen.width <= '800';

    const swalToast = MySwal.mixin({
      icon: 'success',
      title: message?.body || 'La operación se ha completado con éxito',
      toast: true,
      position: mob ? 'top' : 'top-end',
      showConfirmButton: false,
      timer: duration,
      backdrop: false,
      width: mob ? '100%' : '30%',
    });
    swalToast.fire();
  },
  info(message, duration = 3000) {
    const mob = window.screen.width <= '800';

    const swalToast = MySwal.mixin({
      icon: 'info',
      title: message?.body || '',
      toast: true,
      position: mob ? 'top' : 'top-end',
      showConfirmButton: false,
      timer: duration,
      backdrop: false,
      width: mob ? '100%' : '30%',
    });
    swalToast.fire();
  },
};

export default Notifications;
