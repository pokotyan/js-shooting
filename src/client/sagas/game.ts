import { all, fork, take, put, select, delay, call } from "redux-saga/effects";
import * as gameActions from "../actions/game";
import * as uiActions from "../actions/ui";
import { load as scriptLoad } from "../../core/ScriptLoader/ExposedScriptLoader";
import { AppState } from "../reducers";
import store from "../store";
import { Field } from "../../core/Field";

function* load() {
  while (true) {
    const {
      payload: { code }
    } = yield take(gameActions.LOAD);
    const script = scriptLoad(code);

    yield put(gameActions.setScript({ script }));
  }
}

function* start() {
  while (true) {
    yield take(gameActions.START);

    yield put(gameActions.setPhase({ phase: "THINK" }));
    let requestId: number = 0;

    try {
      const loop = () => {
        store.dispatch(gameActions.tick());

        requestId = window.requestAnimationFrame(loop);
      };

      window.requestAnimationFrame(loop);
    } finally {
      window.cancelAnimationFrame(requestId);
    }
  }
}

function* pause() {
  while (true) {
    yield take(gameActions.PAUSE);

    const isPause = yield select((state: AppState) => state.game.isPause);

    yield put(gameActions.setPause({ isPause: !isPause }));
  }
}

function* show(text: string) {
  yield put(uiActions.openTurnInfo({ message: text }));
  yield delay(2000);
  yield put(uiActions.closeTurnInfo({ message: text }));
}

function* showPlayerTurn() {
  const { field }: { field: Field } = yield select((state: AppState) => state.game);

  if (field.player.def) {
    yield call(show, `ピカチューは ガードしている`);
  }

  const damage = field.dump.enemy.hp - field.enemy.hp.current;

  if (damage) {
    yield call(show, `${damage} ダメージ 与えた`);
  }
}

function* showEnemyTurn() {
  const { field }: { field: Field } = yield select((state: AppState) => state.game);

  if (field.enemy.def) {
    yield call(show, `敵は ガードしている`);
  }

  yield call(show, `${field.dump.player.hp - field.player.hp.current} ダメージ 受けた`);
}

function* checkFinish(field: Field) {
  const {
    win,
    lose
  } = field.checkFinish();

  if (win) {
    yield put(gameActions.setPhase({ phase: "WIN" }));
    yield call(show, "WIN");
    return true;
  }
  if (lose) {
    yield put(gameActions.setPhase({ phase: "LOSE" }));
    yield call(show, "LOSE");
    return true;
  } 

  return false;
}

function* tick() {
  while (true) {
    yield take(gameActions.TICK);

    // ポーズ機能なくてもいい気がする
    // const { isPause } = yield select((state: AppState) => state.game);

    // if (isPause) {
    //   continue;
    // }

    yield take(gameActions.START_ACTION);

    const {
      field,
      script
    }: {
      field: Field;
      script: any;
    } = yield select((state: AppState) => state.game);

    // player turn
    try {
      script(field.player.controller);
    } catch(err) {
      yield call(show, "SCRIPT ERROR");

      // @todo 通知コンポーネント作ってそれでエラー表示する
      window.confirm(`コードに問題があります。API仕様を確認してください。err: ${err}`)
      continue;
    }

    yield put(gameActions.setPhase({ phase: "PLAYER_TURN" }));
    yield call(show, "PLAYER TURN");

    field.playerPhease();

    yield call(showPlayerTurn);

    if (yield call(checkFinish, field)) {
      return;
    }

    yield delay(1000);

    // enemmy turn
    field.enemy.controller.attack();

    yield put(gameActions.setPhase({ phase: "ENEMY_TURN" }));
    yield call(show, "ENEMY TURN");
    field.enemyPhease();

    yield call(showEnemyTurn);

    if (yield call(checkFinish, field)) {
      return;
    }

    field.endPhease();

    yield put(gameActions.setField({ field }));
    yield put(gameActions.setPhase({ phase: "THINK" }));
  }
}

function* rootSaga() {
  yield all([fork(load), fork(start), fork(tick), fork(pause)]);
}

export default rootSaga;
