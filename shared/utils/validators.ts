export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .trim()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// .trim().match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);

export const validateRange = (rango: string) => {
  return String(rango)
    .replace(/ /g, '')
    .match(/^([0-9,-]+$)/);
};
