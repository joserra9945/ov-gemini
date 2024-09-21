export const checkIfDNIIsIncomplete = (element) => {
  return (
    (element?.fechaVencimiento && !element.files?.length) ||
    (!element?.fechaVencimiento && element.files?.length)
  );
};

export const DniIncompleted = (element) => {
  return (
    (!element?.fechaVencimiento || !element?.fechaVencimiento?.length) &&
    (!element?.files?.length || !element?.files)
  );
};
