import { EndpointsState } from "./types";

const initialState: EndpointsState = {
  login: ' https://q6y7yqelab.execute-api.us-east-1.amazonaws.com/Prod/login',
  getItems: 'https://q6y7yqelab.execute-api.us-east-1.amazonaws.com/Prod/get-items',
  validateToken: 'https://q6y7yqelab.execute-api.us-east-1.amazonaws.com/Prod/session'
};

type EndpointsAction = {
  type: 'UPDATE_ENDPOINTS';
  payload: Partial<EndpointsState>;
};

export const endpointsReducer = (
  state: EndpointsState = initialState,
  action: EndpointsAction
): EndpointsState => {
  switch (action.type) {
    case 'UPDATE_ENDPOINTS':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};