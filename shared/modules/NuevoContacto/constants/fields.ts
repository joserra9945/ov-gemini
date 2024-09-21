import { nanoid } from 'nanoid';

import { ICargos, IPaises } from '@shared/interfaces/ICargo/ICargo';
import { validateSpanishID } from '@shared/utils/DNIValidator';

import { wildcardEnum } from '@shared/components/Legacy/WildcardFields';
import { IEnum } from '@shared/interfaces/Legacy/IEnum';

import { IFieldsWildCard, IRepresentante } from '../interfaces';

const actualDate = new Date();
const tomorrow = actualDate.setDate(actualDate.getDate() + 1);
export const valueEnum = { ValueYes: 1, ValueNo: 2 };

export const NombreFields = [
  {
    id: nanoid(),
    className: 'col-span-6 mobile:col-span-12',
    type: +wildcardEnum.TEXT,
    config: {
      inputName: 'nombre',
      inputLabel: 'Nombre',
      required: true,
    },
  },
  {
    id: nanoid(),
    className: 'col-span-6 mobile:col-span-12',
    type: +wildcardEnum.TEXT,
    config: {
      inputName: 'apellidos',
      inputLabel: 'Apellidos',
      required: true,
    },
  },
  {
    id: nanoid(),
    className: 'col-span-6 mobile:col-span-12',
    type: +wildcardEnum.TEXT,
    config: {
      inputName: 'departamento',
      inputLabel: 'Departamento (Opcional)',
      required: false,
    },
  },
  {
    id: nanoid(),
    className: 'col-span-6 mobile:col-span-12',
    type: +wildcardEnum.TEXT,
    config: {
      inputName: 'puesto',
      inputLabel: 'Puesto (Opcional)',
      required: false,
    },
  },
];

export const FormaContactoFields = (
  esRepresentante: boolean
): IFieldsWildCard[] => {
  return [
    {
      id: nanoid(),
      className: 'col-span-6 mobile:col-span-12',
      config: {
        inputName: 'email',
        inputLabel: 'Email',
        required: true,
        pattern: {
          value: /^[\w.-]+@[\w.-]+\.\w{2,}$/,
          message: 'El email no es válido',
        },
      },
    },
    {
      id: nanoid(),
      className: 'col-span-6 mobile:col-span-12',
      type: +wildcardEnum.PHONE,
      config: {
        inputName: `telefono`,
        inputLabel: 'Teléfono',
        required: esRepresentante,
      },
    },
  ];
};

export const notificacionesFields = (etiquetas: IEnum[]) => {
  return [
    {
      id: nanoid(),
      type: wildcardEnum.SELECT_FILTER,
      config: {
        inputName: 'etiquetas',
        inputLabel: 'Tipo email',
        isMulti: true,
        options: etiquetas,
        valueProperty: 'id',
        labelProperty: 'description',
      },
    },
  ];
};

export const representanteFields = (
  cargos: ICargos[],
  paises: IPaises[],
  spainId?: IPaises,
  representante?: IRepresentante
) => [
  {
    id: 'DNI-field',
    className: 'col-span-6 mobile:col-span-12 mobile:pt-0',
    type: +wildcardEnum.MASK,
    config: {
      inputName: 'numeroDni',
      inputLabel: 'Nº DNI',
      required: true,
      mask: '*9999999*',
      validationFunc: (dni: string) => {
        const valid = validateSpanishID(dni);
        if (!valid) {
          return 'El documento no es correcto';
        }
      },
    },
  },
  {
    id: nanoid(),
    className: 'col-span-6 mobile:col-span-12 mobile:pt-0',
    type: +wildcardEnum.SELECT,
    config: {
      inputName: 'cargo',
      inputLabel: 'Cargo',
      options: cargos,
      optionValue: 'id',
      optionLabel: 'description',
      required: true,
      defaultValue:
        representante && representante.cargo ? representante.cargo.id : null,
    },
  },
  {
    id: `fechaNaci${nanoid()}`,
    className: 'col-span-6 mobile:col-span-12 mobile:pt-0',
    type: +wildcardEnum.CALENDAR,
    config: {
      inputName: 'fechaNacimiento',
      inputLabel: 'Fecha de nacimiento',
      required: true,
      placeholder: 'DD/MM/YYYY',
    },
  },
  {
    id: nanoid(),
    className: 'col-span-6 mobile:col-span-12 mobile:pt-0',
    type: +wildcardEnum.SELECT,
    config: {
      inputName: 'pais',
      inputLabel: 'Nacionalidad',
      required: true,
      options: paises,
      optionValue: 'id',
      optionLabel: 'nombre',
      defaultValue: representante?.paisNacionalidadId
        ? representante.paisNacionalidadId
        : spainId
        ? spainId.id
        : null,
    },
  },
  {
    id: nanoid(),
    className: 'col-span-6 mobile:col-span-12 mobile:pt-0',
    type: +wildcardEnum.SELECT,
    config: {
      inputName: 'residencia',
      inputLabel: 'Residencia',
      required: true,
      options: paises,
      optionValue: 'id',
      optionLabel: 'nombre',
      defaultValue: representante?.paisResidenciaId
        ? representante.paisResidenciaId
        : null,
    },
  },
  {
    id: nanoid(),
    className: 'col-span-6 pt-6 ml-1 mobile:col-span-12 mobile:pt-0',
    type: +wildcardEnum.CHECKBOX,
    config: {
      inputName: 'esPuestoPublico',
      inputLabel: 'Persona de responsabilidad pública',
    },
  },
];

export const DNIField = [
  {
    id: nanoid(),
    className: 'col-span-6',
    type: +wildcardEnum.TEXT,
    config: {
      inputName: 'numeroDni',
      inputLabel: 'Nº DNI',
    },
  },
  {
    id: `fechaVenci${nanoid()}`,
    className: 'col-span-6',
    type: +wildcardEnum.CALENDAR,
    config: {
      inputName: 'fechaVencimiento',
      inputLabel: 'Fecha de Vencimiento',
      required: true,
      placeholder: 'DD/MM/YYYY',
    },
  },
];

// TODO: No borrar DNIArchivos, esto se usará para cuando tengamos los eps de anverso y reverso por separado

export const DNIArchivos = (fechaVenc: string) => [
  {
    id: 'dniField',
    className: 'col-span-12',
    type: +wildcardEnum.FILEPOND,
    config: {
      inputName: 'files',
      inputLabel: 'Anverso y reverso de su DNI',
      maxFiles: fechaVenc ? 1 : 2,
    },
  },
  //   {
  //     id: nanoid(),
  //     className: 'col-span-6 reverso',
  //     type: +wildcardEnum.FILEPOND,
  //     config: {
  //       inputName: 'files',
  //       inputLabel: 'REVERSO',
  //       required: false,
  //       maxFiles: 2,
  //     },
  //   },
];

export const escriturasDeNombramiento = [
  {
    id: nanoid(),
    className: 'col-span-6',
    type: +wildcardEnum.TEXT,
    config: {
      inputName: 'cargoEDN',
      inputLabel: 'Cargo',
    },
  },
  {
    id: nanoid(),
    className: 'col-span-6',
    type: wildcardEnum.CALENDAR,
    config: {
      inputName: 'fechaVencimientoEDN',
      inputLabel: 'Fecha de validez',
      minDate: new Date(tomorrow),
      maxDate: new Date('December 31, 2035'),
      required: true,
    },
  },
  {
    id: 'EscriturasDeNobramientosFields',
    className: 'col-span-12',
    type: +wildcardEnum.FILEPOND,
    config: {
      inputName: 'filesEDN',
      inputLabel: 'Escrituras de nombramiento',
      maxFiles: 1,
    },
  },
];
