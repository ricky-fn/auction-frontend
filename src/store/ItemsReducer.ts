import { ItemData } from "./types";

type ItemsState = ItemData[];

const initialState: ItemsState = [];

interface ItemAction {
  type: string;
  payload: ItemsState | ItemData;
}

export const itemsReducer = (state = initialState, action: ItemAction) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, action.payload];
    case 'SET_ITEMS':
      return action.payload;
    case 'BID_ITEM':
      return state.map((item) => item.itemId === (action.payload as ItemData).itemId ? action.payload : item)
    default:
      return state;
  }
};