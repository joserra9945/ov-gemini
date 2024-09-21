export const parseHeaderToClassName = (str: string): string => {
  if (!str || !str.length) return '';

  return str
    .replace(/\s/g, '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase();
};
