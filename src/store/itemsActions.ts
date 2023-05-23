import { ItemData } from "./types";

export const addItem = (item: ItemData) => {
  return { type: 'ADD_ITEM', payload: { item } };
};

export const setItems = (items: ItemData[]) => {
  return { type: 'SET_ITEMS', payload: { items } };
};

export const bidItem = (itemName: string, bidAmount: number, bidderId: string) => {
  return { type: 'BID_ITEM', payload: { itemName, bidAmount, bidderId } };
};