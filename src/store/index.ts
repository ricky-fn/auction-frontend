import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from './userReducer';
import { appReducer } from './appReducer';
import { itemsReducer } from './ItemsReducer';
import { checkSession } from './userActions';
import { endpointsReducer } from './endpointsReducer';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  items: itemsReducer,
  endpoints: endpointsReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

// Dispatch the checkSession action when the app starts
store.dispatch<any>(checkSession());

export default store;