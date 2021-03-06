import UserActionTypes from "./user.action-types";

export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START
});

export const emailSignInStart = (email, password) => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: { email, password }
});

export const signInSuccess = (user) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user
});

export const signInFailure = (error) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error
})

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = (error) => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error
})

export const signUpStart = (displayName, email, password) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: { displayName, email, password }
});

export const signUpSuccess = (firebaseAuthUser, additionalData) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: { firebaseAuthUser, additionalData }

});

export const signUpFailure = (error) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error
})