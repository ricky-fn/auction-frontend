import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from './userReducer';
import { itemsReducer } from './ItemsReducer';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
  // Add other reducers here
  user: userReducer,
  items: itemsReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;