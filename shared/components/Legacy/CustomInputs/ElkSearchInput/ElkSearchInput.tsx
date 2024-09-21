/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from 'primereact/autocomplete';
import { AxiosRequestConfig } from 'axios';
import classNames from 'classnames';

import { IUseFetch, useFetch } from '@shared/utils';

import useDebounce from './helpers/useDebounce';
import { elkType, elkUrl } from './constants';
import { IElkSearchInput } from './interfaces';

const elasticSearchConfig: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_ELASTICSEARCH,
};

const ElkSearchInput = ({
  value,
  name,
  onChange,
  onBlur,
  onSelect,
  placeholder,
  error,
  disabled = false,
  type = elkType.CARGO,
}: IElkSearchInput): JSX.Element => {
  const [options, setOptions] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>();
  const { get }: IUseFetch = useFetch('', elasticSearchConfig);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    const fetchData = async () => {
      const resData: string[] = [];
      let response = await get<any>(
        `${
          elkUrl[type]
        }/_search?source_content_type=application/json&source={"query":{"bool":{"must":[{"query_string":{"default_operator":"AND","query": "*${debouncedSearchTerm?.toLowerCase()}*","fields": ["tipo"]}}]}}}`
      );
      response = response?.data?.hits?.hits;
      if (response?.length > 0) {
        if (Array.isArray(response) && response.length) {
          response.forEach((item: any) => {
            resData.push(item._source.tipo);
          });
          setOptions(resData);
        }
      } else {
        setOptions([]);
      }
    };
    if (debouncedSearchTerm) {
      fetchData();
    }
  }, [debouncedSearchTerm, get, type]);

  const searchList = (e: AutoCompleteCompleteEvent) => {
    setSearchTerm(e.query.trim());
  };

  const inputClass = classNames({
    'p-invalid p-mr-2': error,
  });

  return (
    <div className="autocomplete_container">
      <AutoComplete
        inputClassName="data-hj-allow"
        value={value}
        suggestions={options}
        completeMethod={searchList}
        className={inputClass}
        name={name}
        placeholder={placeholder}
        id={name}
        disabled={disabled}
        onChange={(e) => {
          onChange(e.value);
        }}
        onBlur={onBlur}
        onSelect={onSelect}
      />
    </div>
  );
};

export default ElkSearchInput;
