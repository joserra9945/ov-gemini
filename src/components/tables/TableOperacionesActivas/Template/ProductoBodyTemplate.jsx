import React from 'react';

const ProductoBodyTemplate = (rowData) => {
  return (
    <>
      <span className="p-column-title">Producto</span>
      <div>{rowData?.producto?.description || ''}</div>
    </>
  );
};

export default ProductoBodyTemplate;
