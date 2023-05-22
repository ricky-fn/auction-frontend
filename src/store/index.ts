import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from './reducers';
import thunkMiddleware from 'redux-thunk';

const rootReducer = combineReducers({
  user: userReducer,
  // Add other reducers here
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

export default store;