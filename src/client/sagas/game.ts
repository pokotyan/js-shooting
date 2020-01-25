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

function* showTurnInfo(text: string) {
  yield put(uiActions.openTurnInfo({ message: text }));
  yield delay(2000);
  yield put(uiActions.closeTurnInfo({ message: text }));
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
    script(field.player.controller);

    const fromEHP = field.enemy.hp.current;

    yield put(gameActions.setPhase({ phase: "PLAYER_TURN" }));
    yield call(showTurnInfo, "PLAYER TURN");
    field.playerAttackPhease();

    const toEHP = field.enemy.hp.current;

    yield call(showTurnInfo, `${fromEHP - toEHP} ダメージ 与えた`);

    yield delay(1000);

    // enemmy turn
    field.enemy.controller.attack();

    const fromPHP = field.player.hp.current;

    yield put(gameActions.setPhase({ phase: "ENEMY_TURN" }));
    yield call(showTurnInfo, "ENEMY TURN");
    field.enemyAttackPhease();

    const toPHP = field.player.hp.current;

    yield call(showTurnInfo, `${fromPHP - toPHP} ダメージ 受けた`);

    yield put(gameActions.setField({ field }));
    yield put(gameActions.setPhase({ phase: "THINK" }));
  }
}

function* rootSaga() {
  yield all([fork(load), fork(start), fork(tick), fork(pause)]);
}

export default rootSaga;
