import { useForm } from 'react-hook-form';

import WildcardSelectFilter from './WildcardSelectFilter';

import '@shared/styles/main.scss';

export const SingleSelectFilter = (): JSX.Element => {
  const rhForm = useForm();
  return (
    <WildcardSelectFilter
      rhForm={rhForm}
      data={{}}
      inputName="selectFilter"
      inputLabel="SingleSelectFilter"
      labelProperty="description"
      valueProperty="id"
      options={[
        { id: 1, description: 'Uno' },
        { id: 2, description: 'Dos' },
        { id: 3, description: 'Tres' },
        { id: 4, description: 'Cuatro' },
        { id: 5, description: 'Cinco' },
      ]}
    />
  );
};

export const MultiSelectFilter = (): JSX.Element => {
  const rhForm = useForm({ mode: 'onBlur' });
  return (
    <WildcardSelectFilter
      rhForm={rhForm}
      data={{}}
      inputName="selectFilter"
      inputLabel="MultiSelectFilter"
      labelProperty="description"
      valueProperty="id"
      options={[
        { id: 1, description: 'Uno' },
        { id: 2, description: 'Dos' },
        { id: 3, description: 'Tres' },
        { id: 4, description: 'Cuatro' },
        { id: 5, description: 'Cinco' },
      ]}
      isClearable={false}
      required
      isMulti
    />
  );
};
