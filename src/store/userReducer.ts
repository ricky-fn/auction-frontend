import { UserData, LoginResponse } from "./types";

const initialState: UserData = {};

interface Action {
  type: string;
  payload: LoginResponse;
}

export const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'LOGIN':
      // Store session token in local storage
      localStorage.setItem('userData', JSON.stringify(action.payload.user));

      return {
        ...state,
        ...action.payload.user,
      };
    case 'LOGOUT':
      // Remove session token from local storage
      localStorage.removeItem('userData');

      return {
        ...state,
        userId: null,
      };
    case 'DEPOSIT':
      return {
        ...state,
        balance: state.balance + action.payload.amount,
      };
    default:
      return state;
  }
};