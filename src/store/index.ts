import { legacy_createStore as createStore, applyMiddleware, combineReducers, Store, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from './userReducer';
import { appReducer } from './appReducer';
import { itemsReducer } from './ItemsReducer';
import { checkSession } from './userActions';
import { endpointsReducer } from './endpointsReducer';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import { RootState } from './types';

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  items: itemsReducer,
  endpoints: endpointsReducer
});

const store: Store<RootState, AnyAction> & { dispatch: ThunkDispatch<RootState, unknown, AnyAction> } = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);

// Dispatch the checkSession action when the app starts
store.dispatch(checkSession());

export default store;
