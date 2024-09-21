import React, { createRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { faExclamationCircle } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ContratoViewer from './ContratoViewer';

const VerContrato = ({ contratoDocument, onReset }) => {
  const [currentDocument, setCurrentDocument] = useState(null);
  const [documents, setDocuments] = useState(null);

  const navigate = useNavigate();
  const divRef = createRef();

  const handleNextStep = () => {
    onReset();
    navigate('/');
  };

  useEffect(() => {
    setDocuments([contratoDocument]);
    setCurrentDocument([contratoDocument].length - 1);
  }, [contratoDocument]);

  return (
    <div className="generar-contrato gc-step2 col-9" ref={divRef}>
      <div className="button-finalizar-wrapper">
        <div>
          <span className="title-label">Operación enviada</span>
          <span className="icon-title-label">
            <FontAwesomeIcon icon={faExclamationCircle} />
            Revise su email para la firma
          </span>
        </div>
        <Button label="Finalizar" onClick={handleNextStep} />
      </div>
      {documents &&
        documents.length &&
        documents.map((document, index) => {
          return (
            index === currentDocument && <ContratoViewer document={document} />
          );
        })}
    </div>
  );
};

export default VerContrato;
