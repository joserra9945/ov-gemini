const initialState = {
  layoutWidth: 'open',
  leftMenu: false,
};

const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_LAYOUT_WIDTH':
      return {
        ...state,
        layoutWidth: action.payload,
      };
    case 'TOGGLE_LEFT_MENU':
      return {
        ...state,
        leftMenu: action.payload,
      };
    default:
      return state;
  }
};

export default layoutReducer;
