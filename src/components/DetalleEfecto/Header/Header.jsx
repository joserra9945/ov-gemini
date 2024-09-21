import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfiguracionDocumentoEfecto from 'utils/services/configuracion-documento-efecto';
import DocumentoEfectoService from 'utils/services/documento-efecto-service';
import { faArrowLeft } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from '@shared/components/Button';
import { EstadoOperacionTemplate } from '@shared/templates';
import { formatCurrency } from '@shared/utils/formatters';

import SubirDocumento from 'components/Dialogs/SubirDocumento';

const configuracionDocumentoEfecto = new ConfiguracionDocumentoEfecto();
const documentoEfectoService = new DocumentoEfectoService();

const Header = ({ efecto, setRefreshDocumentos, showAddButton }) => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState();
  const [modalSubirDoc, setModalSubirDoc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newDocuments, setNewDocuments] = useState({ files: [] });
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const getConfiguracionEfecto = async () => {
      const res =
        await configuracionDocumentoEfecto.getConfiguracionDeEfectoInicial(
          null,
          efecto.tipoDocumentoId
        );
      if (res) {
        setOptions(res);
      }
    };
    getConfiguracionEfecto();
  }, [efecto]);

  const handleUpload = async () => {
    setLoading(true);
    try {
      await documentoEfectoService.postDocumentoDeEfecto({
        files: newDocuments.files,
        efectoId: efecto.id,
        tipoDocumentoId: selectedOption,
      });

      setLoading(false);
      setModalSubirDoc(false);
      setRefreshDocumentos((e) => !e);
    } catch {
      setLoading(false);
    }
  };

  const resetModal = () => {
    setSelectedOption();
    setNewDocuments({ files: [] });
  };

  return (
    <>
      <div className="detalle-efecto__header">
        <div className="d-flex flex-column">
          <div className="flex justify-between">
            <div className="flex gap-3 items-center">
              <Button
                type="icon-button"
                className="flex bg-transparent text-primary hover:bg-transparent "
                onClick={() => navigate(-1)}
                icon={faArrowLeft}
              />
              <p className="text-xl font-semibold items-center">
                Ficha documento del efecto
              </p>
            </div>
            {showAddButton && (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setModalSubirDoc(true);
                }}
                text="Añadir"
                type="button"
                className="text-base py-2 px-6 rounded-md"
              />
            )}
          </div>
          <div className="detalle-efecto__subheader-data">
            <span className="bolder">{`${
              efecto?.libradoRazonSocial && `${efecto.libradoRazonSocial} |`
            }
              ${
                efecto?.tipoDocumentoNombre && `${efecto.tipoDocumentoNombre} |`
              }
              ${efecto?.numero ? `${efecto.numero} |` : ''}
              ${
                !Number.isNaN(efecto?.importeNominal) &&
                formatCurrency(efecto?.importeNominal)
              }
              `}</span>
            {efecto?.operacionEstadoCliente?.id && (
              <p className="flex items-center gap-2">
                Número de operación: {efecto?.operacionNuero ?? '-'} |
                <div>
                  <EstadoOperacionTemplate
                    estado={efecto?.operacionEstadoCliente}
                    isClientView
                  />
                </div>
              </p>
            )}
          </div>
        </div>
      </div>
      <SubirDocumento
        isOpen={modalSubirDoc}
        toggle={() => {
          setModalSubirDoc(!modalSubirDoc);
          resetModal();
        }}
        cancelFunc={() => {
          setModalSubirDoc(false);
          resetModal();
        }}
        loading={loading}
        data={newDocuments}
        setData={setNewDocuments}
        handleUpload={handleUpload}
        header="Añadir documento de efecto"
        options={options}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        optionValue="id"
        optionLabel="description"
      />
    </>
  );
};

export default Header;
