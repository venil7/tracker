import { applyMiddleware, createStore, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { authReducer, updateUserDetails } from './Redux/authReducer';
import auth from './Auth/Auth';

const loggerMiddleware = createLogger();

const mainReducer = combineReducers({ authentication: authReducer });
const preloadedState = {
  authentication: authReducer(null, updateUserDetails(auth.userProfile))
};

export const newStore = () => {
  const enhancer = applyMiddleware(thunk, loggerMiddleware);
  return createStore(mainReducer, preloadedState, enhancer);
};
