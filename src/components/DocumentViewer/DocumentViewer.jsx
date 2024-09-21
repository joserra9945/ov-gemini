import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faPlus } from '@fortawesome/pro-light-svg-icons';

import { useDocumentoDeEmpresa, useTipoDocumento } from '@shared/hooks';
import useWindowSize from '@shared/hooks/useWindowsSize';
import { toLocalFormat } from '@shared/utils/formatters';

import { Button } from '@shared/components/Legacy/Button';
import { TurboTable } from '@shared/components/Legacy/TurboTable';

import SubirDocumento from 'components/Dialogs/SubirDocumento';
import Card from 'components/Hocs/Card';
import PDFViewer from 'components/PDFViewer/PDFViewer';

import './documentViewer.scss';

const rows = 9;

const DocumentViewer = ({
  documents,
  isLoading,
  onRowSelect,
  rowSelected,
  FicheroNoExisteTemplate,
  tableColumns,
  OpcionesTemplate,
  selectedBase64,
  buttonBar,
  title,
  subTitle,
  fetchDocuments,
}) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const goToOperaciones = () => {
    navigate('/');
  };
  const [selectedOption, setSelectedOption] = useState();
  const [modalSubirDoc, setModalSubirDoc] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newDocuments, setNewDocuments] = useState({ files: [] });
  const [options, setOptions] = useState([]);
  const windowSize = useWindowSize();

  const { documentoDeEmpresaPost, loading: loadingDocumentoEmpresa } =
    useDocumentoDeEmpresa();

  const { documentoDeEmpresaGet } = useTipoDocumento();

  useEffect(() => {
    setCurrentPage(0);
  }, [OpcionesTemplate]);

  useEffect(() => {
    const getConfiguracionEfecto = async () => {
      const res = await documentoDeEmpresaGet();
      setOptions(res || []);
    };
    getConfiguracionEfecto();
  }, [documentoDeEmpresaGet]);

  const onPage = (e) => {
    setCurrentPage(e.first);
    const libradorId = sessionStorage.getItem('libradorId');
    const urlParams = `?MaxResult=${e.rows}&SkipCount=${e.first}`;
    fetchDocuments(libradorId, urlParams);
  };

  const resetModal = () => {
    setSelectedOption();
    setNewDocuments({ files: [] });
  };

  const handleUpload = async (files, datos) => {
    setLoading(true);
    const libradorId = sessionStorage.getItem('libradorId');
    try {
      await documentoDeEmpresaPost(
        selectedOption,
        toLocalFormat(datos?.fechaEmision),
        toLocalFormat(datos?.fechaVencimiento),
        libradorId,
        newDocuments.files
      );
      setLoading(false);
      setModalSubirDoc(false);
      fetchDocuments(libradorId);
    } catch {
      setLoading(false);
    }
    resetModal();
  };

  return (
    <>
      <Card className="w-full p-8 h-100">
        <div className="flex flex-row justify-between gap-2 flex-nowrap overflow-overlay">
          <div className="w-full h-full">
            <div className="flex items-start justify-between mb-5">
              <div className="flex flex-row items-center">
                {title && <h2 className="title-h2">{title}</h2>}
                {subTitle && <h3>{subTitle}</h3>}
              </div>
              {buttonBar && (
                <Button
                  icon={faPlus}
                  onClick={() => setModalSubirDoc(true)}
                  label=" Añadir documento"
                />
              )}
            </div>
            <TurboTable
              columns={tableColumns(OpcionesTemplate, FicheroNoExisteTemplate)}
              value={documents?.items}
              className="p-datatable-responsive tabla-mi-documentacion p-datatable-striped"
              totalRecords={documents?.totalCount}
              isLoading={isLoading}
              showSelectColumns={false}
              showFilter={false}
              header={false}
              selection={rowSelected}
              selectionMode="single"
              first={currentPage}
              onRowSelect={(e) => onRowSelect(e)}
              onPage={onPage}
              paginator
              rows={rows}
              lazy
            />
          </div>
          {documents?.items?.length > 0 && (
            <div className="w-full min-h-full document-viewer">
              <PDFViewer pdf={selectedBase64} />
            </div>
          )}

          <Button
            className="p-button p-component p-button-raised display-mobile"
            onClick={goToOperaciones}
            label="Volver"
          />
        </div>
      </Card>
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
        loading={loading || loadingDocumentoEmpresa}
        data={newDocuments}
        setData={setNewDocuments}
        handleUpload={handleUpload}
        header="Añadir documento"
        options={options}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        optionLabel="description"
      />
    </>
  );
};

DocumentViewer.propTypes = {};

export default DocumentViewer;
