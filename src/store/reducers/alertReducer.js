import { cloneDeep } from 'lodash';

const initialState = {
  items: [],
};

const alertReducer = (state = initialState, action) => {
  let tmpItems = [];
  let index = -1;
  switch (action.type) {
    case 'REMOVE_BY_INDEX':
      const { itemId } = action.payload;
      // eslint-disable-next-line no-undef
      tmpItems = _.remove(state.items, ({ id }) => id !== itemId);
      return {
        items: tmpItems,
      };
    case 'ADD_ITEM':
      const { newItem } = action.payload;
      tmpItems = cloneDeep(state.items);
      index = tmpItems.findIndex((_item) => _item.id === newItem.id);
      if (index !== -1) {
        tmpItems[index] = newItem;
      } else {
        tmpItems.push(newItem);
      }
      return {
        items: tmpItems,
      };
    case 'ADD_ITEM_BULK':
      const { newItems } = action.payload;
      return {
        items: [...state.items, ...newItems],
      };
    case 'SET_ITEMS':
      return {
        items: action.payload.items || state.items,
      };
    case 'REMOVE_BY_ID':
      const { idItem } = action.payload;
      return {
        ...state,
        items: state.items.filter((item) => item.id !== idItem),
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export default alertReducer;
