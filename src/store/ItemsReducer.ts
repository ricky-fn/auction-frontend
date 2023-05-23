import { ItemData } from "./types";

interface ItemsState {
  items: ItemData[];
}

const initialState: ItemsState = {
  items: [],
};

interface Action {
  type: string;
  payload: ItemData[] | ItemData;
}

export const itemsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case 'SET_ITEMS':
      return {
        ...state,
        items: action.payload,
      };
    case 'BID_ITEM':
      const { ItemId, highestBid, highestBidder } = action.payload;
      return {
        ...state,
        items: state.items.map((item) =>
          item.itemId === ItemId
            ? {
                ...item,
                highestBid,
                highestBidder
              }
            : item
        ),
      };
    default:
      return state;
  }
};