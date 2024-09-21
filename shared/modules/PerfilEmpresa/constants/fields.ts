import { IEnum } from '@shared/interfaces/IEnum';

import { wildcardEnum } from '@shared/components/Legacy/WildcardFields';
import { IEnumPaises } from '@shared/interfaces/Legacy/IEnum/IEnum';

import { ICnaIndustria, IKycForm, ISocios } from '../interfaces';

import { defaultCountryEsp } from './utils';

export const selectFilterBasicConfig = {
  menuPosition: 'fixed',
  isClearable: false,
  menuPlacement: 'bottom',
  menuPortalTarget: document.body,
};
export const valueEnum = { ValueNo: 1, ValueYes: 2, EmptyValue: 3 };
export const INFO_CLIENTE_FIELDS = (autonomo: boolean) => [
  {
    id: 'razonSocial',
    className: 'col-span-12',
    type: +wildcardEnum.TEXT,
    config: {
      inputName: 'razonSocial',
      inputLabel: 'Razón social',
    },
  },
  {
    id: 'cif',
    className: 'col-span-6',
    type: +wildcardEnum.TEXT,
    config: {
      inputName: 'cif',
      inputLabel: 'NIF/CIF',
    },
  },
  {
    id: 'fechaConstitucion',
    className: 'col-span-6',
    type: +wildcardEnum.CALENDAR,
    config: {
      inputName: 'fechaConstitucion',
      inputLabel: autonomo ? 'Fecha de nacimiento' : 'Fecha de constitución',
      required: true,
      maxDate: new Date(),
    },
  },
];

export const DIRECCIONES_FIELDS = (
  tipos: any,
  paises: any,
  provincias: any,
  poblaciones: any,
  direccion?: any
) => {
  return [
    {
      id: 'perfil_empresa-tipo_direccion',
      className: 'col-span-12',
      type: +wildcardEnum.SELECT,
      config: {
        inputName: 'tipoDireccion',
        inputLabel: 'Tipo',
        required: true,
        options: tipos,
        optionValue: 'id',
        optionLabel: 'description',
        defaultValue: direccion?.tipo?.id,
      },
    },
    {
      id: 'perfil_empresa-direccion',
      className: 'col-span-12',
      type: +wildcardEnum.TEXT,
      config: {
        inputName: 'calle',
        inputLabel: 'Dirección',
        required: true,
      },
    },
    {
      id: 'perfil_empresa-codigo_postal',
      className: 'col-span-6',
      type: +wildcardEnum.MASK,
      config: {
        inputName: 'codigoPostal',
        inputLabel: 'Código postal',
        required: true,
        mask: '99999',
      },
    },
    {
      id: 'perfil_empresa-provincias',
      className: 'col-span-6',
      type: +wildcardEnum.SELECT_FILTER,
      config: {
        inputName: 'provincia',
        inputLabel: 'Provincia',
        required: true,
        options: provincias || [],
        valueProperty: 'id',
        labelProperty: 'nombre',
        ...selectFilterBasicConfig,
      },
    },
    {
      id: 'perfil_empresa_poblacion',
      className: 'col-span-6',
      type: +wildcardEnum.SELECT_FILTER,
      config: {
        inputName: 'poblacion',
        inputLabel: 'Población',
        required: true,
        options: poblaciones || [],
        valueProperty: 'id',
        labelProperty: 'nombre',
        ...selectFilterBasicConfig,
      },
    },
    {
      id: 'perfil_empresa-pais',
      className: 'col-span-6',
      type: +wildcardEnum.SELECT,
      config: {
        inputName: 'pais',
        inputLabel: 'País',
        required: true,
        options: paises || [],
        optionValue: 'id',
        optionLabel: 'nombre',
        defaultValue: defaultCountryEsp.id,
      },
    },
  ];
};

export const PARTICIPACION_EMPRESA_FIELDS = [
  {
    id: 'id-01',
    className: 'col-span-12',
    type: +wildcardEnum.RADIO,
    config: {
      inputName: 'datosRepresentacion',
      inputLabel:
        '¿Existen personas físicas que tengan una participación, directa o indirecta, igual o superior al 25% del capital social?',
      items: [
        { id: 1, label: 'Sí', value: valueEnum.ValueYes },
        { id: 2, label: 'No', value: valueEnum.ValueNo },
      ],
      col: '1',
      required: true,
      defaultValue: valueEnum.ValueYes,
    },
  },
];

export const ACTIVIDAD_FIELDS = (
  industrias: any,
  paises: any,
  finalidades: any,
  origenes: any,
  cnaes: any,
  autonomo: boolean,
  finalidad: any,
  origen: any,
  kyc: IKycForm,
  porcentajesCobro: IEnum[],
  cnaesSecundario: ICnaIndustria[]
) => {
  const fields = [
    {
      id: 'actividadPrincipal',
      className: 'col-span-6 mobile:col-span-12',
      type: +wildcardEnum.SELECT_FILTER,
      config: {
        inputName: 'actividadPrincipal',
        inputLabel: 'Actividad principal',
        required: !autonomo,
        options: industrias,
        valueProperty: 'id',
        labelProperty: 'descripcion',
        ...selectFilterBasicConfig,
        isClearable: true,
        placeholder: 'Seleccione actividad principal',
      },
    },
    {
      id: 'cnaeNombre',
      className: 'col-span-6 mobile:col-span-12',
      type: +wildcardEnum.SELECT_FILTER,
      config: {
        inputName: 'CNAE',
        inputLabel: 'CNAE',
        options: cnaes,
        required: !autonomo,
        valueProperty: 'id',
        labelProperty: 'descripcion',
        ...selectFilterBasicConfig,
        isClearable: true,
        placeholder: 'Seleccione CNAE',
      },
    },
    {
      id: 'actividadSecundaria',
      className: 'col-span-6 mobile:col-span-12',
      type: +wildcardEnum.SELECT_FILTER,
      config: {
        inputName: 'actividadSecundaria',
        inputLabel: 'Actividad secundaria',
        options: industrias,
        valueProperty: 'id',
        labelProperty: 'descripcion',
        ...selectFilterBasicConfig,
        isClearable: true,
        placeholder: 'Sin actividad secundaria',
      },
    },
    {
      id: 'CNAESecundarioNombre',
      className: 'col-span-6 mobile:col-span-12',
      type: +wildcardEnum.SELECT_FILTER,
      config: {
        inputName: 'cnaeSecundario',
        inputLabel: 'CNAE secundario',
        options: cnaesSecundario,
        valueProperty: 'id',
        labelProperty: 'descripcion',
        ...selectFilterBasicConfig,
        isClearable: true,
        placeholder: 'Sin CNAE secundario',
      },
    },
    {
      id: 'paisesOperantes',
      className: 'col-span-6 mobile:col-span-12',
      type: +wildcardEnum.SELECT_FILTER,
      config: {
        inputName: 'paisesOperantes',
        inputLabel: 'Países en los que opera, que supere el 10% de sus ventas',
        required: true,
        options: paises,
        valueProperty: 'id',
        labelProperty: 'nombre',
        isMulti: true,
        ...selectFilterBasicConfig,
      },
    },
    {
      id: 'porcentajeDeCobro',
      className: 'col-span-6 mobile:col-span-12',
      type: +wildcardEnum.SELECT_FILTER,
      config: {
        inputName: 'porcentajeDeCobroEnEfectivo',
        inputLabel: 'Cobro en efectivo sobre sus ventas',
        required: true,
        options: porcentajesCobro,
        valueProperty: 'id',
        labelProperty: 'description',
        isDisabled: true,
        ...selectFilterBasicConfig,
      },
    },
    {
      id: 'finalidad',
      className: 'col-span-12',
      type: +wildcardEnum.SELECT_FILTER,
      config: {
        inputName: 'finalidad',
        inputLabel: 'Finalidad de los importes que nos solicita',
        required: true,
        options: finalidades,
        valueProperty: 'id',
        labelProperty: 'description',
        isDisabled: true,
        ...selectFilterBasicConfig,
      },
    },
    {
      id: 'origen',
      className: 'col-span-12',
      type: +wildcardEnum.SELECT_FILTER,
      config: {
        inputName: 'origen',
        inputLabel:
          'Origen de las cantidades con las que, en su caso, nos reintegrará las sumas debidas',
        required: true,
        options: origenes,
        valueProperty: 'id',
        labelProperty: 'description',
        ...selectFilterBasicConfig,
      },
    },
  ];

  if (finalidad?.description === 'Otros') {
    const newObjectToArray = {
      id: 'id-01',
      className: 'col-span-12',
      type: +wildcardEnum.TEXT,
      config: {
        inputName: 'finalidad_description',
        inputLabel: 'Otras Finalidades',
        defaultValue: kyc?.descripcionFinalidad,
        required: true,
      },
    };
    const index = fields.findIndex((el: any) => el.id === 'finalidad');
    fields.splice(index + 1, 0, newObjectToArray as any);
  }

  if (origen?.description === 'Otros') {
    const newObjectToArray = {
      id: 'id-02',
      className: 'col-span-12',
      type: +wildcardEnum.TEXT,
      config: {
        inputName: 'origen_description',
        inputLabel: 'Otros origenes',
        defaultValue: kyc?.descripcionOrigen,
        required: true,
      },
    };
    const index = fields.findIndex((el: any) => el.id === 'origen');
    fields.splice(index + 1, 0, newObjectToArray as any);
  }
  return fields;
};

export const PERSONA_PARTICIPACION = (
  paises: IEnumPaises[],
  persona?: ISocios
) => [
  {
    id: 'id-01',
    className: 'col-span-12',
    type: +wildcardEnum.TEXT,
    config: {
      inputName: 'dni',
      inputLabel: 'DNI/NIE',
      required: true,
    },
  },
  {
    id: 'id-02',
    className: 'col-span-12',
    type: +wildcardEnum.TEXT,
    config: {
      inputName: 'nombreCompleto',
      inputLabel: 'Nombre y apellidos',
      required: true,
    },
  },
  {
    id: 'id-04',
    className: 'col-span-6',
    type: +wildcardEnum.PERCENTAGE,
    config: {
      inputName: 'porcentajeParticipacion',
      inputLabel: '% de participación',
      required: true,
      minValue: 0,
      maxValue: 100,
      placeholder: 'Añadir un porcentaje mayor o igual al 25%',
    },
  },
  {
    id: 'id-05',
    className: 'col-span-6',
    type: +wildcardEnum.CALENDAR,
    config: {
      inputName: 'fechaNacimiento',
      inputLabel: 'Fecha nacimiento/constitución',
      maxDate: new Date(),
      required: true,
    },
  },
  {
    id: 'id-06',
    className: 'col-span-6',
    type: +wildcardEnum.SELECT,
    config: {
      inputName: 'paisNacionalidad',
      inputLabel: 'Nacionalidad',
      required: true,
      options: paises,
      optionValue: 'id',
      optionLabel: 'nombre',
      defaultValue: persona?.paisNacionalidad?.id ?? defaultCountryEsp.id,
    },
  },
  {
    id: 'id-07',
    className: 'col-span-6',
    type: +wildcardEnum.SELECT,
    config: {
      inputName: 'paisResidencia',
      inputLabel: 'Residencia',
      required: true,
      options: paises,
      optionValue: 'id',
      optionLabel: 'nombre',
      defaultValue:
        persona?.paisResidencia?.id ??
        (persona?.paisNacionalidad?.id ? null : defaultCountryEsp),
    },
  },
];
