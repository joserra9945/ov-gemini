export const alertType = {
  WARNING: 'alert-warning',
  ERROR: 'alert-error',
  SIMPLE: 'alert-simple',
};

export const getAlertClass = (type: string) => {
  switch (type) {
    case alertType.WARNING:
      return 'bg-warning-10 border-warning text-warning';
    case alertType.ERROR:
      return 'bg-danger-10 text-danger';
    case alertType.SIMPLE:
      return 'bg-blank text-neutral';
    case 'alert-info':
      return 'bg-info-10 border-info text-info';
    default:
      return 'bg-blank text-neutral';
  }
};
