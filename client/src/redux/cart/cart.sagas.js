import { all, call, put, select, takeLatest } from "redux-saga/effects";

import { getUserCartRef } from "../../firebase/firebase.utils";

import UserActionTypes from "../user/user.action-types";
import CartActionTypes from "./cart.action-types";
import { clearCart, setCartFromFirebase } from "./cart.actions";
import { selectCurrentUser } from "../user/user.selectors";
import { selectCartItems } from "./cart.selectors";

function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* syncCartWithFirebase({ payload: user }) {
  const cartRef = yield getUserCartRef(user.id);
  const items = yield select(selectCartItems);
  // if empty cart when signing in, sync cart from firebase
  if (!items.length) {
    const cartSnapshot = yield cartRef.get();
    yield put(setCartFromFirebase(cartSnapshot.data().items));

  } else { // else sync cart to firebase
    yield cartRef.update({ items });
  }
}

export function* updateCartInFirebase() {
  const currentUser = yield select(selectCurrentUser);
  if (currentUser) {
    try {
      const cartRef = yield getUserCartRef(currentUser.id);
      const items = yield select(selectCartItems);
      yield cartRef.update({ items });
    } catch (error) {
      console.log(error);
    }
  }
}

function* watchUserSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

function* watchUserSignInSuccess() {
  yield takeLatest(UserActionTypes.SIGN_IN_SUCCESS, syncCartWithFirebase);
}

export function* watchCartChanges() {
  yield takeLatest(
    [
      CartActionTypes.ADD_ITEM,
      CartActionTypes.REMOVE_ITEM,
      CartActionTypes.CLEAR_ITEM_FROM_CART
    ],
    updateCartInFirebase
  );
}

function* cartSagas() {
  yield all([
    call(watchUserSignOutSuccess),
    call(watchUserSignInSuccess),
    call(watchCartChanges),
  ])
}

export default cartSagas;