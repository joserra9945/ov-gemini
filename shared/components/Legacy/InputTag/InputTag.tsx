/* eslint-disable */
// @ts-nocheck

import { useEffect, useRef, useState } from 'react';
import isEqual from 'lodash/isEqual';

import { usePrevious } from '@shared/utils';

import { InputTagProps } from './interfaces';

export const InputTag: React.FC<InputTagProps> = ({
  placeholder = '',
  componentClass = '',
  inputStyle = {},
  inputClass = '',
  disabled = false,
  autoFocus = false,
  onChange,
  onBlur,
  separator = ' ',
  keyValue = 'Spacebar',
  value,
  name,
}) => {
  const tagInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [tags, setTags] = useState<string[]>();

  const prevTags = usePrevious(tags);

  useEffect(() => {
    if (
      ((!prevTags && tags) || (prevTags && tags && prevTags !== tags)) &&
      onChange
    ) {
      onChange(tags);
    }
  }, [onChange, prevTags, tags]);

  useEffect(() => {
    setTags((currentTags) => {
      if (value && !isEqual(value, currentTags)) return value;
      return currentTags;
    });
  }, [value]);

  const removeTag = (i: number) => {
    const newTags = [...(tags || [])];
    newTags.splice(i, 1);
    setTags(newTags);
    tagInputRef?.current?.focus();
  };

  const removeAll = () => {
    setTags([]);
    tagInputRef?.current?.focus();
  };

  const checkIfIsInKeys = (eKey: string) => {
    if (Array.isArray(keyValue)) {
      return keyValue.includes(eKey);
    }
    return eKey === keyValue;
  };

  const checkIfIsInSeparators = (eKey: string) => {
    if (Array.isArray(separator)) {
      return separator.includes(eKey);
    }
    return eKey === separator;
  };

  const inputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    let val = target.value;
    if (tags) {
      if ((checkIfIsInSeparators(e.key) || checkIfIsInKeys(e.key)) && val) {
        if (Array.isArray(separator)) {
          val = separator.reduce((finalValue, currentValue) => {
            return finalValue.replace(currentValue, '');
          }, val);
        } else {
          val = val.replace(separator, '');
        }
        target.value = val;
        if (tags.find((tag) => tag.toLowerCase() === val.toLowerCase())) {
          if (tagInputRef?.current?.value) {
            tagInputRef.current.value = '';
            tagInputRef.current.focus();
          }
          return;
        }
        setTags([...tags, val]);
        if (tagInputRef?.current?.value) {
          tagInputRef.current.value = '';
          tagInputRef.current.focus();
        }
      } else if (e.key === 'Backspace' && !val) {
        removeTag(tags.length - 1);
      }
    }
  };

  return (
    <span className={`g-input-wrapper${componentClass || ''}`}>
      <div className="input-tag">
        <ul className="input-tag__tags">
          {tags?.map((tag, i) => (
            <li key={tag}>
              {tag}
              <button
                type="button"
                onClick={() => {
                  removeTag(i);
                }}
              >
                +
              </button>
            </li>
          ))}
          <li
            className="input-tag__tags__input"
            onClick={() => tagInputRef.current.focus()}
          >
            <input
              className={inputClass}
              style={inputStyle}
              type="text"
              placeholder={placeholder}
              onKeyDown={inputKeyDown}
              ref={tagInputRef}
              disabled={disabled}
              autoFocus={autoFocus}
              name={name}
              onBlur={onBlur}
            />
          </li>
        </ul>
        {tags?.length ? (
          <button
            type="button"
            onClick={() => {
              removeAll();
            }}
          >
            +
          </button>
        ) : null}
      </div>
    </span>
  );
};

export default InputTag;
