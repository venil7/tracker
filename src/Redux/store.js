import { applyMiddleware, createStore, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { authReducer, updateUserDetails } from './reducers/index';
import {
  routerReducer,
  routerMiddleware as createRouterMiddleware
} from 'react-router-redux';
import history from '../history';
import auth from '../Auth/Auth';

const loggerMiddleware = createLogger();
const routerMiddleware = createRouterMiddleware(history);

const mainReducer = combineReducers({
  authentication: authReducer,
  router: routerReducer
});
const preloadedState = {
  authentication: authReducer(null, updateUserDetails(auth.userProfile))
};

export const newStore = () => {
  const enhancer = applyMiddleware(thunk, loggerMiddleware, routerMiddleware);
  return createStore(mainReducer, preloadedState, enhancer);
};
