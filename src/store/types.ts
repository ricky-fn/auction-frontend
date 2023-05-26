import { Variant } from "react-bootstrap/esm/types";

export interface ItemData {
  itemId: string;
  name: string;
  startingPrice: number;
  timestamp: number,
  expirationTime: number,
  highestBid: number;
  highestBidder: string;
  createdBy: string;
}

export interface UserData {
  userId?: string | null;
  balance?: number;
  createdDate?: number;
  sessionId?: string;
}

export interface AppData {
  isLoading: boolean,
  toastType: Variant,
  toastMessage: null | string,
  showToast: boolean
}

export interface ToastData {
  type: Variant,
  message: string,
}

export interface EndpointsState {
  loginEndpoint: string;
  getItemsEndpoint: string;
  registerEndpoint: string;
  validateTokenEndpoint: string;
  depositEndpoint: string;
  itemCreationEndpoint: string;
  bidItemEndpoint: string;
  logoutEndpoint: string;
}

export interface LoginResponse {
  user: UserData;
  timestamp: number;
}

export interface DepositResponse {
  amount: number;
  timestamp: number;
}

export interface ItemCreationResponse {
  item: ItemData;
  timestamp: number;
}

export interface BidItemResponse {
  item: ItemData;
  timestamp: number;
}

export interface RootState {
  user: UserData;
  items: ItemData[];
  endpoints: EndpointsState;
  app: AppData
}