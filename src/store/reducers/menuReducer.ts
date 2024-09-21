const initialState = {
  showSidebar: false,
  showHeader: false,
};

enum stateActions {
  TOGGLE_SIDEBAR,
  TOGGLE_HEADER,
}

const toggleSidebar = (newValue: boolean) => ({
  type: stateActions.TOGGLE_HEADER,
  payload: newValue,
});

const toggleHeader = (newValue: boolean) => ({
  type: stateActions.TOGGLE_SIDEBAR,
  payload: newValue,
});

const menuReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case stateActions.TOGGLE_SIDEBAR:
      return {
        ...state,
        showSidebar: action.payload,
      };
    case stateActions.TOGGLE_HEADER:
      return {
        ...state,
        showHeader: action.payload,
      };
    default:
      return state;
  }
};

export { menuReducer, toggleHeader, toggleSidebar };
