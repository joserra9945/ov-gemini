import { FC, useState } from 'react';
import { Control, Controller, FieldValues } from 'react-hook-form';

import { GenericAutoComplete } from '@shared/components/GenericAutocomplete';

export interface IOption {
  label: string;
  value: string;
  [key: string]: string;
}

interface IProps {
  control: Control<FieldValues>;
  key: string;
  className: string;
  label: string;
  name: string;
  inputClassName: string;
  suggestions: IOption[];
  error: string;
  optionLabel: string;
  dropdown: boolean | undefined;
  multiple: boolean | undefined;
  placeholder: string;
}

const TurboFormAutocomplete: FC<IProps> = ({
  control,
  key,
  className,
  label,
  name,
  inputClassName,
  suggestions,
  error,
  optionLabel,
  dropdown,
  multiple,
  placeholder,
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState(suggestions);
  const filterSuggestions = (query: string) => {
    const filtered = suggestions.filter((suggestion: IOption) =>
      suggestion[optionLabel]?.toLowerCase()?.includes(query.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  };

  return (
    <div key={key} className={className}>
      <label className="mb-2">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <GenericAutoComplete
            field={optionLabel}
            multiple={multiple}
            options={filteredSuggestions}
            className={`${inputClassName}`}
            searchMethod={filterSuggestions}
            dropdown={dropdown}
            invalid={!!error}
            placeholder={placeholder}
            {...field}
          />
        )}
      />
      {error && <div className="text-danger text-xs">{error}</div>}
    </div>
  );
};

export default TurboFormAutocomplete;
