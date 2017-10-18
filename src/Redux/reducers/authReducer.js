import { Auth } from '../../Auth/Auth';

const initState = {
  authenticated: false,
  userDetails: null
};

const updateUserDetails = (userDetails = null) => {
  return { type: 'AUTH/UPDATE_USER_DETAILS', userDetails };
};

const getUserDetailsThunk = (auth: Auth) => async (dispatch, getState) => {
  try {
    const userDetails = await auth.getProfile();
    dispatch(updateUserDetails(userDetails));
  } catch (error) {
    dispatch(updateUserDetails());
  }
};

const logoutThunk = (auth: Auth) => (dispatch, getState) => {
  auth.logout();
  return dispatch(updateUserDetails());
};

const loginThunk = (auth: Auth) => (dispatch, getState) => {
  auth.login();
  return dispatch(updateUserDetails());
};

const authReducer = (state = initState, action): void => {
  switch (action.type) {
    case 'AUTH/UPDATE_USER_DETAILS': {
      return {
        ...state,
        authenticated: action.userDetails !== null,
        userDetails: action.userDetails
      };
    }
    default:
      return state;
  }
};

export {
  authReducer,
  getUserDetailsThunk,
  logoutThunk,
  loginThunk,
  updateUserDetails
};
