import { appData } from "./types";

const initialState: appData = {
  isLoading: false,
  toastType: 'light',
  toastMessage: null,
  showToast: false
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SHOW_TOAST':
      return {
        ...state,
        toastType: action.payload.type,
        toastMessage: action.payload.message,
        showToast: true
      }
    case 'HIDE_TOAST':
      return {
        ...state,
        showToast: false
      }
    default:
      return state;
  }
};