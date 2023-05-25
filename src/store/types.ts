export interface ItemData {
  itemId: string;
  name: string;
  startingPrice: number;
  startTime: number;
  endTime: number;
  status: string;
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

export interface EndpointsState {
  loginEndpoint: string;
  getItemsEndpoint: string;
  registerEndpoint: string;
  validateTokenEndpoint: string;
}

export interface LoginResponse {
  user: UserData;
  timestamp: number;
}

export interface RootState {
  user: UserData;
  items: ItemData[];
  endpoints: EndpointsState
}