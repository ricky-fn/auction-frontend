import { EndpointsState } from "./types";

const initialState: EndpointsState = {
  loginEndpoint: ' https://q6y7yqelab.execute-api.us-east-1.amazonaws.com/Prod/login',
  registerEndpoint: ' https://q6y7yqelab.execute-api.us-east-1.amazonaws.com/Prod/register',
  getItemsEndpoint: 'https://q6y7yqelab.execute-api.us-east-1.amazonaws.com/Prod/get-items',
  validateTokenEndpoint: 'https://q6y7yqelab.execute-api.us-east-1.amazonaws.com/Prod/session',
  depositEndpoint: 'https://q6y7yqelab.execute-api.us-east-1.amazonaws.com/Prod/deposit',
  itemCreationEndpoint: 'https://q6y7yqelab.execute-api.us-east-1.amazonaws.com/Prod/create',
  bidItemEndpoint: 'https://q6y7yqelab.execute-api.us-east-1.amazonaws.com/Prod/bid'
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