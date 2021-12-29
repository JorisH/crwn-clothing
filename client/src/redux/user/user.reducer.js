import UserActionTypes from "./user.action-types";

const INITIAL_STATE = {
  currentUser: null,
  error: null
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null
      }
    case UserActionTypes.SIGN_IN_FAILURE:
      return {
        ...state,
        currentUser: null,
        error: action.payload
      }
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null
      }
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload
      }

    case UserActionTypes.GOOGLE_SIGN_IN_START: // handled by saga
    case UserActionTypes.EMAIL_SIGN_IN_START:  // handled by saga
    case UserActionTypes.CHECK_USER_SESSION:   // handled by saga
    case UserActionTypes.SIGN_OUT_START:       // handled by saga
    case UserActionTypes.SIGN_UP_START:        // handled by saga
    case UserActionTypes.SIGN_UP_SUCCESS:      // handled by saga
    default:
      return state
  }
}

export default userReducer;