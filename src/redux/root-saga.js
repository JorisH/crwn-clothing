import { all, call } from "redux-saga/effects";
import shopSagas from "./shop/shop.sagas";

function* rootSaga() {
  yield all([call(shopSagas)]);
}

export default rootSaga;