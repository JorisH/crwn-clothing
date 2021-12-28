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

    case UserActionTypes.GOOGLE_SIGN_IN_START: // handled by saga
    default:
      return state
  }
}

export default userReducer;