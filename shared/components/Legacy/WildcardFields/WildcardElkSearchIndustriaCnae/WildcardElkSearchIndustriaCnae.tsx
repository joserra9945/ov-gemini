/* eslint-disable */
// @ts-nocheck

import { useCallback, useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';

import {
  ElkSearchIndustriaCnae,
  Error,
} from '@shared/components/Legacy/CustomInputs';

import { IWildcardFields } from '../interfaces/IWildcardFields';
import { fieldHasError } from '../utils/forms';
import WildcardSelectFilter from '../WildcardSelectFilter';

import { IOption } from './interfaces';

interface Props extends IWildcardFields {
  inputName: string;
  inputLabel: string;
  required?: boolean;
  onSelect?: (e: any) => void;
  type?: number;
  inputNameCnae?: string;
  inputNameIndustria?: string;
  inputLabelCnae?: string;
  inputLabelIndustria?: string;
  cnaeProp?: string;
  industriaProp?: string;
  esAutonomo?: boolean;
  className?: string;
  classNameIndustria?: string;
  classNameCnae?: string;
}

const WildcardElkSearchIndustriaCnae = ({
  data = {},
  cnaeProp = 'cnae',
  industriaProp = 'industria',
  rhForm,
  isDisabled = false,
  required = false,
  index,
  inputName,
  inputLabel,
  inputNameCnae = 'cnae',
  inputNameIndustria = 'industria',
  inputLabelCnae = 'CNAE',
  inputLabelIndustria = 'Actividad principal',
  esAutonomo = false,
  className,
  classNameIndustria,
  classNameCnae,
}: Props): JSX.Element => {
  const autocompleteWatch = rhForm?.watch(inputName || undefined);
  const industriaWatch = rhForm?.watch(
    inputNameIndustria,
    data[industriaProp] || undefined
  );
  const cnaeWatch = rhForm?.watch(inputNameCnae, data[cnaeProp] || undefined);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [cnaeOpts, setCnaeOpts] = useState<IOption[]>([]);
  const [industriaOpts, setIndustriaOpts] = useState<IOption[]>([]);

  const handleSelect = (e: any) => {
    if (e?.value) {
      setSelectedOption(e?.value);
    }
  };

  const isRequired = useCallback(() => {
    if (esAutonomo) {
      return required && data?.industria?.id !== industriaWatch?.id;
    }
    return (
      required &&
      (data?.industria?.id !== industriaWatch?.id ||
        data?.cnae?.id !== cnaeWatch?.id)
    );
  }, [
    cnaeWatch?.id,
    data?.cnae?.id,
    data?.industria?.id,
    esAutonomo,
    industriaWatch?.id,
    required,
  ]);

  useEffect(() => {
    if (
      autocompleteWatch !== selectedOption &&
      (rhForm.formState?.dirtyFields[inputNameIndustria] ||
        rhForm.formState?.dirtyFields[inputNameCnae] ||
        rhForm.formState?.dirtyFields[inputName])
    ) {
      setSelectedOption(null);
      setCnaeOpts([]);
      setIndustriaOpts([]);
      rhForm.setValue(inputNameCnae, '');
      rhForm.trigger(inputNameCnae);
      rhForm.setValue(inputNameIndustria, '');
      rhForm.trigger(inputNameIndustria);
    }
  }, [
    autocompleteWatch,
    inputName,
    inputNameCnae,
    inputNameIndustria,
    rhForm,
    selectedOption,
  ]);

  useEffect(() => {
    if (cnaeOpts?.length) {
      rhForm.setValue(inputNameCnae, cnaeOpts[0], { shouldDirty: true });
      rhForm.trigger(inputNameCnae);
    }
  }, [cnaeOpts, esAutonomo, inputNameCnae, rhForm]);

  useEffect(() => {
    if (industriaOpts?.length) {
      rhForm.setValue(inputNameIndustria, industriaOpts[0], {
        shouldDirty: true,
      });
      rhForm.trigger(inputNameIndustria);
    }
  }, [industriaOpts, inputNameIndustria, rhForm]);

  useEffect(() => {
    if (
      !industriaWatch?.id &&
      rhForm?.formState?.dirtyFields[inputNameIndustria]
    ) {
      rhForm.setValue(inputNameCnae, null, { shouldDirty: true });
      rhForm.trigger(inputNameCnae);
    }
  }, [industriaWatch?.id, inputNameCnae, inputNameIndustria, rhForm]);

  useEffect(() => {
    if (esAutonomo) return;
    if (!cnaeWatch?.id && rhForm?.formState?.dirtyFields[inputNameCnae]) {
      rhForm.setValue(inputNameIndustria, null, { shouldDirty: false });
      rhForm.trigger(inputNameIndustria);
    }
  }, [cnaeWatch?.id, inputNameIndustria, inputNameCnae, rhForm, esAutonomo]);

  const canShowInput = useCallback(
    (data) => {
      if (esAutonomo) {
        return (
          (!data[industriaProp]?.id &&
            !rhForm?.formState?.dirtyFields[inputNameIndustria]) ||
          (!industriaWatch?.id &&
            rhForm?.formState?.dirtyFields[inputNameIndustria])
        );
      }
      return (
        (!data[cnaeProp]?.id &&
          !rhForm?.formState?.dirtyFields[inputNameCnae]) ||
        (!industriaWatch?.id &&
          rhForm?.formState?.dirtyFields[inputNameIndustria]) ||
        (!data[industriaProp]?.id &&
          !rhForm.formState?.dirtyFields[inputNameIndustria]) ||
        (!cnaeWatch?.id && rhForm?.formState?.dirtyFields[inputNameCnae])
      );
    },
    [
      cnaeProp,
      cnaeWatch?.id,
      esAutonomo,
      industriaProp,
      industriaWatch?.id,
      inputNameCnae,
      inputNameIndustria,
      rhForm.formState?.dirtyFields,
    ]
  );

  const disabledInputIndustria = useCallback(() => {
    if (
      (!rhForm?.formState?.dirtyFields[inputNameIndustria] &&
        (!data[industriaProp]?.id || !industriaWatch?.id)) ||
      (!industriaWatch?.id && !cnaeWatch?.id)
    ) {
      return true;
    }
    return false;
  }, [
    cnaeWatch?.id,
    data,
    industriaProp,
    industriaWatch?.id,
    inputNameIndustria,
    rhForm?.formState?.dirtyFields,
  ]);

  const disabledInputCnae = useCallback(() => {
    if (
      (!rhForm?.formState?.dirtyFields[inputNameCnae] &&
        (!data[cnaeProp]?.id || !cnaeWatch?.id)) ||
      !industriaWatch?.id ||
      !cnaeWatch?.id
    ) {
      return true;
    }
    return false;
  }, [
    cnaeProp,
    cnaeWatch?.id,
    data,
    industriaWatch?.id,
    inputNameCnae,
    rhForm?.formState?.dirtyFields,
  ]);

  const {
    control,
    formState: { errors },
  } = rhForm;
  return (
    <div
      className={`actividad-cnae-combo__container${
        className ? ` ${className}` : ''
      }`}
    >
      <div className={`g-field ${inputName}-field`}>
        <div className="label">
          <label htmlFor={inputName}>{inputLabel}</label>
        </div>
        {canShowInput(data) ? (
          <div className="p-fluid">
            <div className="p-field">
              <Controller
                render={({ field: { onChange, onBlur, value, name } }) => (
                  <ElkSearchIndustriaCnae
                    value={value}
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    onSelect={handleSelect}
                    error={fieldHasError(errors, inputName)}
                    disabled={isDisabled}
                    setCnaeOpts={setCnaeOpts}
                    setIndustriaOpts={setIndustriaOpts}
                  />
                )}
                rules={{
                  required: {
                    value: isRequired(),
                    message: `El campo ${inputLabel} es obligatorio`,
                  },
                }}
                name={inputName}
                control={control}
                defaultValue={data ? data[inputName] : ''}
              />
              <Error property={inputName} errors={errors} index={index} />
            </div>
          </div>
        ) : null}
      </div>
      <WildcardSelectFilter
        rhForm={rhForm}
        data={data}
        inputName={inputNameIndustria}
        inputLabel={inputLabelIndustria}
        labelProperty="descripcion"
        options={industriaOpts}
        isDisabled={isDisabled || disabledInputIndustria()}
        isClearable
        required={required}
        className={classNameIndustria}
      />
      {!esAutonomo && (
        <WildcardSelectFilter
          rhForm={rhForm}
          data={data}
          inputName={inputNameCnae}
          inputLabel={inputLabelCnae}
          labelProperty="descripcion"
          options={cnaeOpts}
          isDisabled={isDisabled || disabledInputCnae()}
          isClearable
          required={!!cnaeOpts?.length && required}
          className={classNameCnae}
        />
      )}
    </div>
  );
};

export default WildcardElkSearchIndustriaCnae;
