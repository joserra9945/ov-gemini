import { instrumentos, productsTypes } from '@shared/utils/constants';

const isDev = () => process.env?.NODE_ENV !== 'production';

const esDenegadoPRAS = (rating) =>
  rating === 'M' || rating === 'Z' || rating === 'D' || rating === 'L';

export { esDenegadoPRAS, instrumentos, isDev, productsTypes };
