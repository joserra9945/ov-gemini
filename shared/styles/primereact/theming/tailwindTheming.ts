import { PrimeReactPTOptions } from 'primereact/api';

import {
  AutoCompletePassThrough,
  DropdownPassThrough,
  InputTextPassThrough,
} from '../passThrough';

const TailwindTheming: PrimeReactPTOptions = {
  autocomplete: AutoCompletePassThrough,
  inputtext: InputTextPassThrough,
  dropdown: DropdownPassThrough,
};

export default TailwindTheming;
