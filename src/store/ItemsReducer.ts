import { ItemData } from "./types";

type ItemsState = ItemData[];

const initialState: ItemsState = [];

interface Action {
  type: string;
  payload: ItemsState | ItemData;
}

export const itemsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return [...state, action.payload];
    case 'SET_ITEMS':
      return action.payload;
    case 'BID_ITEM':
      const { ItemId, highestBid, highestBidder } = action.payload;
      return state.map((item) =>
        item.itemId === ItemId
          ? {
              ...item,
              highestBid,
              highestBidder
            }
          : item
      )
    default:
      return state;
  }
};