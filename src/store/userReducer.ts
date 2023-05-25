import axios from "axios";
import { UserData, LoginResponse, depositResponse } from "./types";

const initialState: UserData = {};

interface Action {
  type: string;
  payload: LoginResponse | depositResponse;
}

export const userReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'LOGIN':
      // Store session token in local storage
      localStorage.setItem('userData', JSON.stringify(action.payload.user));

      // Update the authorization header when a user logs in
      axios.defaults.headers.common['Authorization'] = `Bearer ${action.payload.user.sessionId}`;

      return {
        ...state,
        ...action.payload.user,
      };
    case 'LOGOUT':
      // Remove session token from local storage
      localStorage.removeItem('userData');

      // Remove the authorization header when a user logs out
      delete axios.defaults.headers.common['Authorization'];

      return {
        ...state,
        userId: null,
      };
    case 'DEPOSIT':
      return {
        ...state,
        balance: action.payload.amount,
      };
    default:
      return state;
  }
};