import { all, call, put, takeLatest } from "redux-saga/effects"

import UserActionTypes from "./user.action-types"
import { createUserProfileDocument, signInWithGoogle } from '../../firebase/firebase.utils';
import { signInFailure, signInSuccess } from "./user.actions";

function* googleSignIn() {
  try {
    const { user } = yield signInWithGoogle();
    const userRef = yield createUserProfileDocument(user);
    const snapshot = yield userRef.get();
    yield put(signInSuccess({
      id: snapshot.id,
      ...snapshot.data()
    }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* watchGoogleSignInStart(){
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, googleSignIn);
}

function* userSagas() {
  yield all([call(watchGoogleSignInStart)]);
}

export default userSagas;