/**
 * Añade un elemento a items.Si se facilita la propiedad
 * `position` se alterará el orden de prioridad del elemento añadido en items
 * @param {any} item
 * @param {number | null} position
 * @returns
 */
const setHideProperty = (item) => ({ ...item, hide: item?.hide || false });

export const add = (item, position = false) => {
  const res = setHideProperty(item);

  if (position) {
    console.error('posiciona');
  }
  return {
    type: 'ADD_ITEM',
    payload: {
      newItem: res,
    },
  };
};

/**
 * Elimina un item del array de elementos.
 * @param {string} itemId
 */
export const clear = (itemId) => {
  return {
    type: 'REMOVE_BY_INDEX',
    payload: {
      itemId,
    },
  };
};

/**
 * Busca un item por su id y cambia la propiedad de show a false.
 * @param {string} itemId
 * @returns
 */
export const hide = (itemId, items) => {
  const res = items.map((item) => {
    if (item?.id === itemId) {
      const cItem = item;
      cItem.hide = true;
      return cItem;
    }
    return item;
  });

  return {
    type: 'SET_ITEMS',
    payload: {
      items: res,
    },
  };
};

export const getCurrentItem = (items, hidden = false) => {
  return items?.find((item) => item.hide === hidden);
};

export const resetAlerts = () => {
  return {
    type: 'RESET',
    payload: {
      items: {},
    },
  };
};
