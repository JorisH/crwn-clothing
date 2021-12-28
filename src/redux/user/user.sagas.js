import { all, call, put, takeLatest } from "redux-saga/effects"

import UserActionTypes from "./user.action-types"
import { createUserProfileDocument, retrieveUserFromSession, signInWithGoogle } from '../../firebase/firebase.utils';
import { signInFailure, signInSuccess } from "./user.actions";

function* getSnapshotAndSignInUser(firebaseAuthUser) {
  try {
    const userRef = yield createUserProfileDocument(firebaseAuthUser);
    const snapshot = yield userRef.get();
    yield put(signInSuccess({
      id: snapshot.id,
      ...snapshot.data()
    }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* googleSignIn() {
  try {
    const { user: firebaseAuthUser } = yield signInWithGoogle();
    yield call(getSnapshotAndSignInUser, firebaseAuthUser);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* checkUserSession() {
  try {
    const firebaseAuthUser = yield retrieveUserFromSession();
    if (!firebaseAuthUser) return;

    yield call(getSnapshotAndSignInUser, firebaseAuthUser);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

function* watchGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, googleSignIn);
}

function* watchCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, checkUserSession);
}

function* userSagas() {
  yield all([
    call(watchGoogleSignInStart),
    call(watchCheckUserSession)
  ]);
}

export default userSagas;