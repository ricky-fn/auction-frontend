import { Dispatch } from 'redux';
import axios from 'axios';
import { UserData, LoginResponse } from './types';

export const login = (userData: LoginResponse) => {
  return { type: 'LOGIN', payload: userData };
};

export const logout = () => {
  return { type: 'LOGOUT' };
};

export const deposit = (amount: number) => {
  return { type: 'DEPOSIT', payload: { amount } };
};

export const checkSession = () => {
  return (dispatch: Dispatch, getState) => {
    const rawUserData: string | null = localStorage.getItem('userData') ;
    const userData: UserData = rawUserData ? JSON.parse(rawUserData) : null;
    if (userData) {
      const { validateTokenEndpoint } = getState().endpoints
      axios
        .post(validateTokenEndpoint, { sessionId: userData.sessionId })
        .then((response) => {
          const data: LoginResponse = response.data;
          dispatch(login(data));
        })
        .catch(() => {
          dispatch(logout());
        });
    } else {
      dispatch(logout());
    }
  };
};