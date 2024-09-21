export const toggleLayoutWidth = (layout) => {
  return {
    type: 'TOGGLE_LAYOUT_WIDTH',
    payload: layout,
  };
};

export const toggleLeftMenu = (toggle) => {
  return {
    type: 'TOGGLE_LEFT_MENU',
    payload: toggle,
  };
};
