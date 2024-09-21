/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { isNumber } from 'lodash';

// eslint-disable-next-line import/no-extraneous-dependencies
import { usePrevious } from '@shared/utils';

import { actionEnum, wildcardEnum, wildcardInputs } from './helpers';
import { IWildcardFieldsProps } from './IWildcardFieldsProps';

const WildcardFields = ({
  rhForm,
  fields,
  data,
  setData = null,
  requireds,
  disableds = false,
}: IWildcardFieldsProps): JSX.Element => {
  const [fieldsConfig, setFieldsConfig] = useState([]);
  const prevRequireds = usePrevious(requireds);
  const obHasProperty = (object: any, key: PropertyKey) => {
    return object ? Object.hasOwnProperty.call(object, key) : false;
  };
  const getDifferenceBetweenArr = (arr1: string[], arr2: string[]) => {
    return arr1?.filter((x: string) => arr2?.indexOf(x) === -1);
  };
  const checkAndAction = useCallback(
    (action) => {
      let difference: string[] = [];
      if (Array.isArray(requireds)) {
        difference =
          action === actionEnum.LESS_AND_CLEAR
            ? getDifferenceBetweenArr(prevRequireds, requireds)
            : getDifferenceBetweenArr(requireds, prevRequireds);
      } else {
        const names: string[] = [];
        fieldsConfig?.forEach((f: any) => {
          if (
            f?.inputName &&
            data &&
            (data[f?.inputName] === null || data[f?.inputName] === undefined)
          ) {
            names.push(f?.inputName);
          }
        });
        difference =
          action === actionEnum.LESS_AND_CLEAR
            ? getDifferenceBetweenArr([], names)
            : getDifferenceBetweenArr(names, []);
      }
      if (difference?.length) {
        difference.forEach((str: string) => {
          if (
            action === actionEnum.LESS_AND_CLEAR &&
            obHasProperty(rhForm?.formState?.errors, str)
          ) {
            rhForm.clearErrors(str);
          } else if (
            action === actionEnum.MORE_AND_SET &&
            !obHasProperty(rhForm?.formState?.errors, str)
          ) {
            const f: any = fieldsConfig?.find(
              (field: any) => field?.inputName === str
            );
            rhForm.setError(str, {
              type: 'manual',
              message: `El campo ${f?.inputLabel} es obligatorio`,
            });
          }
        });
      }
    },
    [data, fieldsConfig, prevRequireds, requireds, rhForm]
  );

  const checkRequireds = useCallback(() => {
    if (requireds === undefined) return;

    if (Array.isArray(requireds)) {
      checkAndAction(
        requireds?.length < prevRequireds?.length
          ? actionEnum.LESS_AND_CLEAR
          : actionEnum.MORE_AND_SET
      );
    } else {
      checkAndAction(
        !requireds ? actionEnum.LESS_AND_CLEAR : actionEnum.MORE_AND_SET
      );
      rhForm?.trigger();
    }
  }, [checkAndAction, prevRequireds?.length, requireds, rhForm]);

  const setProperty = (_: boolean | string[], inputName: string) =>
    Array.isArray(_) ? _?.indexOf(inputName) !== -1 : _;

  const getDefaultProps = useCallback(
    (field: any) => {
      if (!field?.ignoreDefaultProps) {
        return {
          rhForm,
          data,
          setData,
        };
      }
      return {};
    },
    [data, rhForm, setData]
  );

  const getConditionalProps = useCallback(
    (field: any) => {
      return {
        ...getDefaultProps(field),
        ...field?.config,
        required:
          requireds !== undefined
            ? setProperty(requireds, field?.config?.inputName)
            : field?.config?.required,
        isDisabled:
          disableds !== undefined
            ? setProperty(disableds, field?.config?.inputName)
            : field?.config?.isDisabled,
      };
    },
    [disableds, getDefaultProps, requireds]
  );

  const getProps = useCallback(
    (field: any) => {
      if (field?.config) {
        return getConditionalProps(field);
      }

      return getDefaultProps(field);
    },
    [getConditionalProps, getDefaultProps]
  );

  const parsefieldsConfig = useCallback(() => {
    const res = fields?.map((f: any) => f?.config);
    setFieldsConfig(res);
  }, [fields]);

  useEffect(() => {
    if (fieldsConfig?.length) {
      checkRequireds();
    } else {
      parsefieldsConfig();
    }
  }, [checkRequireds, parsefieldsConfig, fieldsConfig]);

  useEffect(() => {
    if (!data) {
      throw new Error('You must be send data object property for working');
    }
    if (!rhForm) {
      throw new Error(
        'You must be send rhForm property, which is useForm react-hook-form v7 var, for working'
      );
    }
  }, [data, rhForm]);

  const memorizedFields = useMemo(
    () =>
      fields?.map((field: any) => {
        return (
          <div key={field.id} className={field.className || 'col-span-12'}>
            {createElement(
              field?.Template
                ? field.Template
                : wildcardInputs[
                    isNumber(field?.type) ? field.type : wildcardEnum.TEXT
                  ].template,
              { ...getProps(field) }
            )}
          </div>
        );
      }),
    [fields, getProps]
  );

  if (!rhForm || !data) return <div />;

  return (
    <div className="wildcardfiels__container">
      <div className="grid gap-2 grid-cols-12">{memorizedFields}</div>
    </div>
  );
};

export default WildcardFields;
