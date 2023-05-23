import { UserData } from "./types";

const initialState: UserData = {
  userId: null,
  balance: 0,
};

interface Action {
  type: string;
  payload: UserData;
}

export const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        userId: action.payload.userId,
      };
    case 'LOGOUT':
      return {
        ...state,
        userId: null,
      };
    case 'DEPOSIT':
      return {
        ...state,
        balance: state.balance + action.payload.balance,
      };
    default:
      return state;
  }
};