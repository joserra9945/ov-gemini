/* eslint-disable */
// @ts-nocheck

import { IWildcardInput } from './interfaces/IWildcardFields';
import WildcardCalendar from './WildcardCalendar';
import WildcardCheckbox from './WildcardCheckbox';
import WildcardElkSearchIndustriaCnae from './WildcardElkSearchIndustriaCnae';
import WildcardElkSearchInput from './WildcardElkSearchInput';
import WildcardFilepond from './WildcardFilepond';
import WildcardInputCurrency from './WildcardInputCurrency';
import WildcardInputEmail from './WildcardInputEmail';
import WildcardInputIban from './WildcardInputIban';
import WildcardInputLocation from './WildcardInputLocation';
import WildcardInputMask from './WildcardInputMask';
import WildcardInputNumber from './WildcardInputNumber';
import WildcardInputNumberAddon from './WildcardInputNumberAddon';
import WildcardInputNumberCheckbox from './WildcardInputNumberCheckbox';
import WildcardInputNumberCheckboxAddon from './WildcardInputNumberCheckboxAddon';
import WildcardInputPassword from './WildcardInputPassword';
import WildcardInputPercentage from './WildcardInputPercentage';
import WildcardInputPercentageCheckbox from './WildcardInputPercentageCheckbox';
import WildcardInputRadio from './WildcardInputRadio';
import WildcardInputText from './WildcardInputText';
import WildcardInputTextArea from './WildcardInputTextArea';
import WildcardPhone from './WildcardPhone';
import WildcardSelect from './WildcardSelect';
import WildcardSelectFilter from './WildcardSelectFilter';
import WildcardSwitch from './WildcardSwitch';

export const actionEnum = {
  LESS_AND_CLEAR: 1,
  MORE_AND_SET: 2,
};

export const wildcardEnum = {
  CALENDAR: 0,
  PERCENTAGE: 1,
  NUMBER: 2,
  CURRENCY: 3,
  TEXT: 4,
  PASSWORD: 5,
  PHONE: 6,
  SELECT: 7,
  SELECT_FILTER: 8,
  RADIO: 9,
  MASK: 10,
  PERCENTAGE_CHECKBOX: 11,
  LOCATION: 12,
  IBAN: 13,
  NUMBER_CHECKBOX: 14,
  CHECKBOX: 15,
  NUMBER_ADDON: 16,
  SWITCH: 17,
  CHECKBOX_ADDON: 18,
  TEXT_AREA: 19,
  ELK_SEARCH: 20,
  FILEPOND: 21,
  ELK_INDUSTRIA_CNAE: 22,
  INPUT_EMAIL: 23,
};

export const wildcardInputs: IWildcardInput[] = [
  {
    id: wildcardEnum.CALENDAR,
    template: WildcardCalendar,
  },
  {
    id: wildcardEnum.PERCENTAGE,
    template: WildcardInputPercentage,
  },
  {
    id: wildcardEnum.NUMBER,
    template: WildcardInputNumber,
  },
  {
    id: wildcardEnum.CURRENCY,
    template: WildcardInputCurrency,
  },
  {
    id: wildcardEnum.TEXT,
    template: WildcardInputText,
  },
  {
    id: wildcardEnum.PASSWORD,
    template: WildcardInputPassword,
  },
  {
    id: wildcardEnum.PHONE,
    template: WildcardPhone,
  },
  {
    id: wildcardEnum.SELECT,
    template: WildcardSelect,
  },
  {
    id: wildcardEnum.SELECT_FILTER,
    template: WildcardSelectFilter,
  },
  {
    id: wildcardEnum.RADIO,
    template: WildcardInputRadio,
  },
  {
    id: wildcardEnum.MASK,
    template: WildcardInputMask,
  },
  {
    id: wildcardEnum.PERCENTAGE_CHECKBOX,
    template: WildcardInputPercentageCheckbox,
  },
  {
    id: wildcardEnum.LOCATION,
    template: WildcardInputLocation,
  },
  {
    id: wildcardEnum.IBAN,
    template: WildcardInputIban,
  },
  {
    id: wildcardEnum.NUMBER_CHECKBOX,
    template: WildcardInputNumberCheckbox,
  },
  {
    id: wildcardEnum.CHECKBOX,
    template: WildcardCheckbox,
  },
  {
    id: wildcardEnum.NUMBER_ADDON,
    template: WildcardInputNumberAddon,
  },
  {
    id: wildcardEnum.SWITCH,
    template: WildcardSwitch,
  },
  {
    id: wildcardEnum.CHECKBOX_ADDON,
    template: WildcardInputNumberCheckboxAddon,
  },
  {
    id: wildcardEnum.TEXT_AREA,
    template: WildcardInputTextArea,
  },
  {
    id: wildcardEnum.ELK_SEARCH,
    template: WildcardElkSearchInput,
  },
  {
    id: wildcardEnum.FILEPOND,
    template: WildcardFilepond,
  },
  {
    id: wildcardEnum.ELK_INDUSTRIA_CNAE,
    template: WildcardElkSearchIndustriaCnae,
  },
  {
    id: wildcardEnum.INPUT_EMAIL,
    template: WildcardInputEmail,
  },
];

export const formatNumber = (number: number): string => {
  const formatter = new Intl.NumberFormat('de-DE', {
    style: 'decimal',
    minimumFractionDigits: 2,
    useGrouping: true,
  });
  return formatter.format(number).replace('€', '');
};
