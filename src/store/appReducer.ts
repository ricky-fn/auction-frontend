import { AppData, ToastData } from "./types";

const initialState: AppData = {
  isLoading: false,
  toastType: 'light',
  toastMessage: null,
  showToast: false
};

type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SHOW_TOAST'; payload: ToastData }
  | { type: 'HIDE_TOAST' };

export const appReducer = (state = initialState, action: AppAction) => {
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