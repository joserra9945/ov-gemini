const PurchaseNoData = (): JSX.Element => {
  return (
    <div className="retir-purshase__no-data flex flex-col justify-center items-center p-3 w-100">
      <img
        src="https://mkt-gestion.com/8000/aplicativos/PRAS/informes.svg"
        height="172.3"
        width="172.3"
        alt="informes.svg"
        className="mb-4"
      />
      <span>NO HAY DATOS EN EL RETIR</span>
    </div>
  );
};

export default PurchaseNoData;
