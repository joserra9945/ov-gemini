/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AutoComplete } from 'primereact/autocomplete';
import { InputText } from 'primereact/inputtext';

import { useEmpresaExterna, useUsuarioInterno } from '@shared/hooks';
import useDebounce from '@shared/hooks/useDebounce';

import { Button } from '@shared/components/Legacy/Button';

import { getDocumentosPendientesLibrador } from 'store/actions/actions-api';

import './userAdLandingPage.scss';

const razonSocialName = 'razon-social';

const UserAdLandingPage = ({ onModifyCompany }) => {
  const [empresas, setEmpresas] = useState([]);
  const [razonSociales, setRazonSociales] = useState([]);
  const [razonSocial, setRazonSocial] = useState('');
  const [empresa, setEmpresa] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const {
    getEmpresaExternaLibradorByCif,
    getEmpresaExternaLibradorByRazonSocial,
  } = useEmpresaExterna();

  const { suplantarIdentidadEmpresa } = useUsuarioInterno();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleSubmit, setValue, trigger, control, watch } = useForm({
    mode: 'onBlur',
  });

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const watchRazonSocial = watch(razonSocialName);
  const watchNIF = watch('nif');

  useEffect(() => {
    if (watchRazonSocial && watchNIF) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [watchRazonSocial, watchNIF]);

  useEffect(() => {
    const fetchEmpresasByName = async () => {
      const resRazonSocial = [];
      const response = await getEmpresaExternaLibradorByRazonSocial(
        debouncedSearchTerm.toLowerCase()
      );
      if (response?.items?.length > 0) {
        const { items } = response;
        if (Array.isArray(items) && items.length) {
          items.forEach((item) => {
            resRazonSocial.push(item.razonSocial);
          });
          setEmpresas(items);
          setRazonSociales(resRazonSocial);
        }
      } else {
        setRazonSociales([]);
      }
    };
    if (debouncedSearchTerm) {
      fetchEmpresasByName();
    } else {
      setEmpresas([]);
    }
  }, [debouncedSearchTerm, getEmpresaExternaLibradorByRazonSocial]);

  const fetchEmpresasByCif = async (value) => {
    const response = await getEmpresaExternaLibradorByCif(value);
    if (response) {
      setRazonSocial(response.razonSocial);
      setValue(razonSocialName, response.razonSocial);
      trigger(razonSocialName);
      setEmpresa(response);
    }
  };

  const suplantarIdentidad = async () => {
    const res = await suplantarIdentidadEmpresa(empresa?.id);
    if (res) {
      onModifyCompany(empresa);
      dispatch(getDocumentosPendientesLibrador(empresa?.id));
      navigate('/');
    }
  };

  const searchList = (e) => {
    setSearchTerm(e.query.trim());
  };
  return (
    <div className="h-full flex flex-col items-center justify-center poseer-librador grow">
      <div className="bg-white m-4 p-6 rounded-md shadow-md sm:w-8/12 md:w-6/12 xl:w-4/12  2xl:w-3/12">
        <h3 className="text-2xl text-primary font-medium mb-6 text-center">
          Seleccione el librador a utilizar
        </h3>
        <form onSubmit={handleSubmit(suplantarIdentidad)} className="text-base">
          <Controller
            render={({ field }) => {
              const { onChange, value, name } = field;
              return (
                <AutoComplete
                  value={value}
                  suggestions={razonSociales}
                  onChange={onChange}
                  name={name}
                  completeMethod={searchList}
                  placeholder="Seleccione la razón social"
                  id="razonSocial"
                  onSelect={(e) => {
                    setRazonSocial(e.value);
                    if (empresas.length > 0) {
                      const res = empresas.find(
                        (empresa) => empresa?.razonSocial === e.value
                      );
                      if (res) {
                        setValue(razonSocialName, res?.razonSocial);
                        setValue('nif', res?.cif);
                        trigger();
                        setEmpresa(res);
                      }
                    }
                  }}
                />
              );
            }}
            value={razonSocial}
            rules={{ required: true }}
            name="razon-social"
            control={control}
          />

          <Controller
            render={({ field }) => {
              const { onChange, value, name } = field;
              return (
                <InputText
                  className="mb-1 text-text"
                  value={value}
                  name={name}
                  placeholder="Busque por NIF"
                  onChange={onChange}
                  onBlur={(e) => {
                    trigger();
                    if (e?.currentTarget?.value?.trim().length > 0) {
                      fetchEmpresasByCif(e.target.value.trim());
                    }
                  }}
                />
              );
            }}
            value={empresa?.cif}
            rules={{ required: true, minLength: 8 }}
            name="nif"
            control={control}
          />
          <Button
            className="h-12 w-100 mt-10 text-white w-full"
            disabled={buttonDisabled}
            id="buscar"
            label="Buscar"
            name="login"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default UserAdLandingPage;
