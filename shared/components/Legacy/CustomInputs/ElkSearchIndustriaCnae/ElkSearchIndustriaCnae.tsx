/* eslint-disable */
// @ts-nocheck
import { useEffect, useState } from 'react';
import {
  AutoComplete,
  AutoCompleteCompleteEvent,
  AutoCompleteSelectEvent,
} from 'primereact/autocomplete';
import { AxiosRequestConfig } from 'axios';
import classNames from 'classnames';

import { IUseFetch, useFetch } from '@shared/utils';

import useDebounce from './helpers/useDebounce';
import { IElkSearchInputIndustriaCnae } from './interfaces';

const elasticSearchConfig: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_ELASTICSEARCH,
};

const ElkSearchIndustriaCnae = ({
  value,
  name,
  onChange,
  onBlur,
  onSelect,
  placeholder,
  error,
  disabled = false,
  setCnaeOpts,
  setIndustriaOpts,
}: IElkSearchInputIndustriaCnae): JSX.Element => {
  const [options, setOptions] = useState<string[]>([]);
  const [currentResponse, setCurrentResponse] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState<string>();
  const { get }: IUseFetch = useFetch('', elasticSearchConfig);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchCnaeByIndustriaId = async (industriaId: number) => {
    let response = await get<any>(
      `/cnae/_search?source_content_type=application/json&source={"size": 500,"query": {"bool": {"must": [{"match": {"industriaid": "${industriaId}"}},{"match": {"discriminator": "CNAE"}}]}}}`
    );
    response = response?.data?.hits?.hits;
    if (response?.length > 0) {
      setCnaeOpts &&
        setCnaeOpts(
          response?.map((res: any) => ({
            id: res?._source?.entityid,
            descripcion: res?._source?.descripcion,
          }))
        );
    } else {
      setCnaeOpts && setCnaeOpts([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const resData: string[] = [];
      let response = await get<any>(
        `/cnae/_search?source_content_type=application/json&source={"size":500,"query":{"bool":{"must":{"query_string":{"default_operator":"AND","query":"*${debouncedSearchTerm?.toLowerCase()}*","fields":["descripcion"]}},"should":[{"match":{"discriminator":"*CNAE*"}}]}}}`
      );
      response = response?.data?.hits?.hits;
      if (response?.length > 0) {
        response.forEach((item: any) => {
          resData.push(item._source.descripcion);
        });
        setOptions(resData);
        setCurrentResponse(response?.map((res: any) => res?._source));
      } else {
        setOptions([]);
        setCurrentResponse([]);
      }
    };
    if (debouncedSearchTerm) {
      fetchData();
    }
  }, [debouncedSearchTerm, get]);

  const searchList = (e: AutoCompleteCompleteEvent) => {
    setSearchTerm(e.query.trim());
  };

  const inputClass = classNames({
    'p-invalid p-mr-2': error,
  });

  const getSelectedItem = (value: string) =>
    currentResponse?.find((item: any) => item?.descripcion === value);

  const handleSelect = async (e: AutoCompleteSelectEvent) => {
    const item = getSelectedItem(e?.value);
    if (item?.discriminator?.toLowerCase() === 'cnae') {
      setCnaeOpts &&
        setCnaeOpts([{ id: item?.entityid, descripcion: item?.descripcion }]);
      setIndustriaOpts &&
        setIndustriaOpts([
          { id: item?.industriaid, descripcion: item?.industria },
        ]);
    } else {
      await fetchCnaeByIndustriaId(item?.entityid);
      setIndustriaOpts &&
        setIndustriaOpts([
          { id: item?.entityid, descripcion: item?.descripcion },
        ]);
    }
    if (onSelect) {
      onSelect(e);
    }
  };

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
        onSelect={handleSelect}
      />
    </div>
  );
};

export default ElkSearchIndustriaCnae;
