/* eslint-disable */
// @ts-nocheck

import {
  ChangeEvent,
  FocusEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { isNumber, toNumber } from 'lodash';

import { IInputNumber } from './interfaces';

const InputNumber = ({
  inputMode = 'decimal',
  onChange,
  onFocus,
  onBlur,
  localeOptions,
  className,
  inputStyle,
  locale,
  step,
  min,
  max,
  suffix,
  value,
  defaultValue,
  disabled,
  decimals = 2,
  ...rest
}: IInputNumber): JSX.Element => {
  const [lastValue, setLastValue] = useState<string | number | null>();
  const [internalValue, setInternalValue] = useState<
    string | number | null | undefined
  >(null);
  const [type, setType] = useState('number');
  const isMounted = useRef<boolean>();
  const inputRef = useRef<HTMLInputElement>(null);
  const previusValue = useRef<string | number>();

  const textToNumber = () => {
    setType('number');
    setInternalValue(lastValue || '');
  };

  const numberToText = useCallback(
    (num) => {
      setType('');
      const tmpNumber =
        num?.length && num !== '' && num !== undefined && num !== null
          ? toNumber(num)
          : num;
      let tmpValue = isNumber(tmpNumber) ? tmpNumber : null;

      if (
        min !== undefined &&
        !Number.isNaN(min) &&
        isNumber(tmpValue) &&
        tmpValue < min
      ) {
        tmpValue = isNumber(min) ? min : null;
      }

      if (
        max !== undefined &&
        !Number.isNaN(max) &&
        isNumber(tmpValue) &&
        tmpValue > max
      ) {
        tmpValue = max;
      }
      setLastValue(tmpValue);
      const res =
        tmpValue == null
          ? undefined
          : Number.isNaN(tmpValue)
          ? undefined
          : `${(+tmpValue).toLocaleString(locale, localeOptions)}${
              suffix ? ` ${suffix}` : ''
            }`;
      setInternalValue(res);
    },
    [min, max, locale, localeOptions, suffix]
  );

  useEffect(() => {
    if (internalValue === null) {
      numberToText(
        isNumber(value)
          ? value
          : isNumber(defaultValue)
          ? defaultValue
          : undefined
      );
    }
  }, [value, internalValue, numberToText, defaultValue]);

  useEffect(() => {
    if (isNumber(value) && value !== previusValue?.current && type === '') {
      previusValue.current = value;
      numberToText(value);
    }
  }, [value, numberToText, type]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  const onFocusLocal = (e: FocusEvent<HTMLInputElement, Element>) => {
    textToNumber();
    onFocus && onFocus(e);
  };

  const onBlurLocal = (e: FocusEvent<HTMLInputElement, Element>) => {
    numberToText(inputRef?.current?.value);
    onBlur && onBlur(e);
  };

  const onChangeLocal = (e: ChangeEvent<HTMLInputElement>) => {
    const reg = new RegExp(`^-?\\d+(?:(,|\\.)\\d{1,${decimals}})?$`);
    if (inputRef?.current?.value != null) {
      const { value } = inputRef?.current;
      if (reg.test(value) || value === '') {
        setInternalValue(value);
        onChange &&
          onChange({
            originalEvent: e,
            value:
              value?.length &&
              value !== '' &&
              value !== undefined &&
              value !== null
                ? toNumber(value)
                : undefined,
          });
      }
    }
  };

  const imposeMinMax = (el: KeyboardEvent<HTMLInputElement>) => {
    if (el.currentTarget.value != '') {
      if (min && parseInt(el.currentTarget.value) < min) {
        el.currentTarget.value = `${min}`;
      }
      if (max && parseInt(el.currentTarget.value) > max) {
        el.currentTarget.value = `${max}`;
      }
      onChangeLocal(el as any);
    }
  };

  return (
    <span className="p-inputnumber p-component p-inputwrapper-filled">
      <input
        {...rest}
        style={inputStyle}
        className={`g-input-number${className ? ` ${className}` : ''}`}
        ref={inputRef}
        step={step}
        type={type}
        value={
          internalValue
            ? (internalValue as string | number | readonly string[] | undefined)
            : ''
        }
        inputMode={inputMode || 'decimal'}
        onChange={onChangeLocal}
        onFocus={onFocusLocal}
        onBlur={onBlurLocal}
        onKeyUp={imposeMinMax}
        disabled={disabled}
      />
    </span>
  );
};

export default InputNumber;
