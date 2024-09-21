/**
 * ValidateSpanishID. Returns the type of document and checks its validity.
 *
 * Usage:
 *     ValidateSpanishID( str );
 *
 *     > ValidateSpanishID( '12345678Z' );
 *     // { type: 'dni', valid: true }
 *
 *     > ValidateSpanishID( 'B83375575' );
 *     // { type: 'cif', valid: false }
 *
 * The algorithm is adapted from other solutions found at:
 * - http://www.compartecodigo.com/javascript/validar-nif-cif-nie-segun-ley-vigente-31.html
 * - http://es.wikipedia.org/wiki/C%C3%B3digo_de_identificaci%C3%B3n_fiscal
 */

/* https://www.agenciatributaria.es/AEAT.internet/Inicio/La_Agencia_Tributaria/Campanas/_Campanas_/Fiscalidad_de_no_residentes/_Identificacion_/Preguntas_frecuentes_sobre_obtencion_de_NIF_de_no_Residentes/_Que_tipos_de_NIF_de_personas_fisicas_utiliza_la_normativa_tributaria_espanola_.shtml */
const DNI_REGEX = /^([LK]?\d{7,8})([A-Z])$/;
const CIF_REGEX = /^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$/;
const NIE_REGEX = /^[XYZM]\d{7,8}[A-Z]$/;

const validDNI = (dni) => {
  const dniLetters = 'TRWAGMYFPDXBNJZSQVHLCKE';
  const letter = dniLetters.charAt(parseInt(dni, 10) % 23);

  return letter === dni.charAt(8);
};

const validNIE = (nie) => {
  // Change the initial letter for the corresponding number and validate as DNI
  let niePrefix = nie.charAt(0);

  switch (niePrefix) {
    case 'X':
      niePrefix = 0;
      break;
    case 'Y':
      niePrefix = 1;
      break;
    case 'Z':
      niePrefix = 2;
      break;
    default:
      break;
  }

  return validDNI(niePrefix + nie.substr(1));
};

// this function comes from another resource:  https://jsfiddle.net/juglan/rexdzh6v/
const validCIF = (cif) => {
  if (!cif || cif.length !== 9) {
    return false;
  }

  const letters = ['J', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  const digits = cif.substr(1, cif.length - 2);
  const letter = cif.substr(0, 1);
  const control = cif.substr(cif.length - 1);
  let sum = 0;
  let i;
  let digit;

  if (!letter.match(/[A-Z]/)) {
    return false;
  }

  for (i = 0; i < digits.length; i += 1) {
    digit = parseInt(digits[i], 10);

    if (Number.isNaN(digit)) {
      return false;
    }

    if (i % 2 === 0) {
      digit *= 2;
      if (digit > 9) {
        digit = parseInt(digit / 10, 10) + (digit % 10);
      }

      sum += digit;
    } else {
      sum += digit;
    }
  }

  sum %= 10;
  if (sum !== 0) {
    digit = 10 - sum;
  } else {
    digit = sum;
  }

  if (letter.match(/[ABEH]/)) {
    return String(digit) === control;
  }
  if (letter.match(/[NPQRSW]/)) {
    return letters[digit] === control;
  }

  return String(digit) === control || letters[digit] === control;
};

const spainIdType = (str) => {
  if (str.match(DNI_REGEX)) {
    return 'dni';
  }
  if (str.match(CIF_REGEX)) {
    return 'cif';
  }
  if (str.match(NIE_REGEX)) {
    return 'nie';
  }
};

export const validateSpanishID = (str) => {
  // Ensure upcase and remove whitespace
  const normalizedStr = str.toUpperCase().replace(/\s/g, '').replace('-', '');

  let valid = false;
  const type = spainIdType(normalizedStr);

  switch (type) {
    case 'dni':
      valid = validDNI(normalizedStr);
      break;
    case 'nie':
      valid = validNIE(normalizedStr);
      break;
    case 'cif':
      valid = validCIF(normalizedStr);
      break;
    default:
      break;
  }

  return valid;
};

export const validateDniNie = (str) => {
  const normalizedStr = str.toUpperCase().replace(/\s/g, '').replace('-', '');

  let valid = false;
  const type = spainIdType(normalizedStr);

  switch (type) {
    case 'dni':
      valid = validDNI(normalizedStr);
      break;
    case 'nie':
      valid = validNIE(normalizedStr);
      break;
    default:
      break;
  }

  return valid;
};
