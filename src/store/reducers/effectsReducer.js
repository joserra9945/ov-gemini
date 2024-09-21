const initialState = {
  error: false,
  efectoId: null,
  efectos: [],
  selectedEfectos: [],
  step: null,
  tipoEfecto: null,
  esFicticio: false,
  razonSocial: null,
  cif: null,
  pagareFormData: null,
  facturaFormData: null,
  createdFacturas: [],
  vincularFormData: null,
};

const stepperReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_EFFECT':
      return {
        ...state,
        error: false,
      };
    case 'SUCCESS_CURRENT_EFFECT_STEP':
      return {
        ...state,
        error: false,
        step: action.payload.step,
      };
    case 'SUCCESS_CURRENT_EFFECT_INFO':
      return {
        ...state,
        error: false,
        efectoId: action.payload.efectoId || state.efectoId,
        step: action.payload.step || state.step,
        efectos: action.payload.efectos || state.efectos,
        tipoEfecto: action.payload.tipoEfecto || state.efectos,
        esFicticio: !!action.payload.esFicticio,
        razonSocial: action.payload.razonSocial || state.razonSocial,
        cif: action.payload.cif || state.cif,
        originEditionUrl: action.payload.originEditionUrl,
        createdFacturas: action.payload.createdFacturas,
      };
    // case "SET_FACTURA_PAGARE":
    //   return {
    //     ...state,
    //     razonSocial: action.payload.razonSocial,
    //     cif: action.payload.cif,
    //   };
    case 'ERROR_CURRENT_EFFECT':
      return {
        ...state,
        error: true,
        efectos: [],
        step: null,
        tipoEfecto: null,
        esFicticio: false,
      };
    case 'EFFECT_DEL_STATE':
      return {
        ...state,
      };
    case 'SET_SELECTED_EFFECT':
      return {
        ...state,
        selectedEfectos: action.payload.selectedEfectos,
      };
    case 'SWITCH_EFFECT_VIEW':
      return {
        ...state,
        step: action.payload.step || state.step,
        tipoEfecto: action.payload.tipoEfecto || state.tipoEfecto,
      };
    case 'PERSIST_PAGARE_FORM_DATA':
      return {
        ...state,
        pagareFormData: action.payload,
      };
    case 'PERSIST_FACTURA_FORM_DATA':
      return {
        ...state,
        facturaFormData: action.payload,
      };
    case 'RESET_PAGARE_FORM_DATA':
      return {
        ...state,
        pagareFormData: null,
      };
    case 'RESET_FACTURA_FORM_DATA':
      return {
        ...state,
        facturaFormData: null,
      };
    case 'APPEND_FACTURA_TO_PAGARE_FORM':
      return {
        ...state,
        pagareFormData: {
          ...state.pagareFormData,
          facturas: [...(state.pagareFormData?.facturas || []), action.payload],
        },
      };
    case 'PERSIST_VINCULAR_FORM_DATA':
      return {
        ...state,
        vincularFormData: action.payload,
      };
    case 'RESET_VINCULAR_FORM_DATA':
      return {
        ...state,
        vincularFormData: null,
      };
    default:
      return state;
  }
};

export default stepperReducer;
