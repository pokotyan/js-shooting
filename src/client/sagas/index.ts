import { all, fork } from "redux-saga/effects";
import game from "./game";

export function* rootSaga() {
  yield all([fork(game)]);
}
