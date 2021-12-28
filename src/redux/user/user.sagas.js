import { all, call, put, takeLatest } from "redux-saga/effects"

import UserActionTypes from "./user.action-types"
import { auth, createUserProfileDocument, retrieveUserFromSession, signInWithGoogle } from '../../firebase/firebase.utils';
import { signInFailure, signInSuccess, signOutFailure, signOutSuccess, signUpFailure, signUpSuccess } from "./user.actions";

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

function* emailSignIn({ payload: { email, password } }) {
  try {
    const { user: firebaseAuthUser } = yield auth.signInWithEmailAndPassword(email, password);
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

function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user: firebaseAuthUser } = yield auth.createUserWithEmailAndPassword(email, password);
    const userRef = yield createUserProfileDocument(firebaseAuthUser, { displayName });
    const snapshot = yield userRef.get();
    yield put(signUpSuccess({
      id: snapshot.id,
      ...snapshot.data()
    }));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

function* signUpSuccessSaga({ payload: user }) {
  yield put(signInSuccess(user));
}

function* watchGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, googleSignIn);
}

function* watchEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

function* watchCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, checkUserSession);
}

function* watchSignOut() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

function* watchSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

function* watchSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signUpSuccessSaga);
}

function* userSagas() {
  yield all([
    call(watchGoogleSignInStart),
    call(watchEmailSignInStart),
    call(watchCheckUserSession),
    call(watchSignOut),
    call(watchSignUpStart),
    call(watchSignUpSuccess),
  ]);
}

export default userSagas;