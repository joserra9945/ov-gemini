export const paginatorLayouts = {
  mobile: {
    paginatorLeft: '',
    pageLinkSize: 1,
    paginatorTemplate:
      'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
    currentPageReportTemplate: '',
  },
  tablet: {
    paginatorLeft: '',
    pageLinkSize: 5,
    paginatorTemplate:
      'RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink  PageLinks NextPageLink LastPageLink',
    currentPageReportTemplate: '{first} - {last} de {totalRecords}',
  },
  desktop: {
    paginatorLeft: 'Filas por página',
    pageLinkSize: 5,
    paginatorTemplate:
      'RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink  PageLinks NextPageLink LastPageLink',
    currentPageReportTemplate: '{first} - {last} de {totalRecords}',
  },
};
