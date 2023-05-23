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
  userId: string | null;
  balance: number;
}