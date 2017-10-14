import Auth from '../Auth/Auth';

const initState = {
  authenticated: false,
  userDetails: null
};

const updateUserDetails = (userDetails = null) => {
  return { type: 'AUTH/UPDATE_USER_DETAILS', userDetails };
};

const getUserDetailsThunk = (auth: Auth) => (dispatch, getState) => {
  auth.getProfile((error, userDetails) => {
    if (error) {
      console.log(error);
      return dispatch(updateUserDetails());
    }

    dispatch(updateUserDetails(userDetails));
  });
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

export { authReducer, getUserDetailsThunk, updateUserDetails };
