/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { components } from 'react-select';
import { faCircleInfo, faUserPlus } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from '@shared/components/Button';

export const selectItemTemplate = (props, addRepresentantes, infoIcon) => {
  const {
    data,
    innerProps,
    innerRef,
    getStyles,
    isDisabled,
    isFocused,
    isSelected,
  } = props;
  const { id, nombre, apellidos, persona } = data;
  if (id === 0) {
    return (
      <>
        <div
          className="d-flex justify-content-between"
          type="button"
          tabIndex="-1"
          role="button"
          onClick={() => addRepresentantes()}
        >
          <Button
            type="text-button"
            text="Añadir nuevo firmante"
            className="mr-1 py-2 px-4 hover:bg-primary bg-white hover:text-white text-black "
            link
            icon={faUserPlus}
          />
        </div>
        <div className="separator" />
      </>
    );
  }
  return (
    <article
      {...innerProps}
      className="representantes__item-template"
      ref={innerRef}
      style={{
        ...getStyles('option', props),
        option: true,
        optionIsDisabled: isDisabled,
        optionIsFocused: isFocused,
        optionIsSelected: isSelected,
      }}
    >
      {id === 0 ? (
        <>
          <div
            className="d-flex p-2 justify-content-between"
            type="button"
            tabIndex="-1"
            role="button"
            onClick={() => addRepresentantes()}
          >
            <Button
              type="text-button"
              text="Añadir nuevo firmante"
              className="mr-1 py-2 px-4 hover:bg-primary bg-white hover:text-white text-black "
              link
              icon={faUserPlus}
            />
            <FontAwesomeIcon icon={faCircleInfo} />
          </div>
          <div className="separator" />
        </>
      ) : (
        <>
          <span>
            {nombre || persona?.nombre} {apellidos || persona?.apellidos}
          </span>
          {infoIcon(true)}
        </>
      )}
    </article>
  );
};

export const selectMultiValueLabelTemplate = (props) => {
  const { data, selectProps, innerProps } = props;

  const optionSelected = selectProps?.options?.find((op) => op.id === data.id);

  if (optionSelected) {
    const { nombre, apellidos, persona } = optionSelected;
    return (
      <article {...innerProps}>
        {nombre || persona?.nombre} {apellidos || persona?.apellidos}
      </article>
    );
  }
};

export const SingleValue = ({ children, ...props }) => {
  const {
    data: { id },
  } = props;
  const { iban } = props.options?.find((option) => option.id === id) || {};
  return (
    <components.SingleValue {...props}>
      {iban?.completo || ''}
    </components.SingleValue>
  );
};
