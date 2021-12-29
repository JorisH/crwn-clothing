import { all, call, put, takeLatest } from "redux-saga/effects";

import UserActionTypes from "../user/user.action-types";
import { clearCart } from "./cart.actions";

function* clearCartOnSignOut() {
  yield put(clearCart());
}

function* watchUserSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

function* cartSagas() {
  yield all([
    call(watchUserSignOutSuccess),
  ])
}

export default cartSagas;