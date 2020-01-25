import { reducerWithInitialState } from "typescript-fsa-reducers";
import produce from "immer";
import * as gameActions from "../actions/game";
import { Controller } from "../../core/Controller";
import { genField } from "../../core/Field";

export type PHASE = "INITIAL" | "THINK" | "PLAYER_TURN" | "ENEMY_TURN";

export interface InitialState {
  code: string;
  phase: PHASE;
  controller: Controller;
  isPause: boolean;
  script: (controller: Controller) => void;
}

export const initialState = {
  code: `const script = controller => {
  controller.attack();
};
return script;`,
  phase: "INITIAL" as PHASE,
  field: genField(),
  isPause: false,
  script: (controller: Controller) => {}
};

export default reducerWithInitialState(initialState)
  .case(gameActions.setCode, (state, { code }) => {
    return produce(state, draftState => {
      draftState.code = code;
    });
  })
  .case(gameActions.setScript, (state, { script }) => {
    return produce(state, draftState => {
      draftState.script = script;
    });
  })
  .case(gameActions.setPhase, (state, { phase }) => {
    return produce(state, draftState => {
      draftState.phase = phase;
    });
  })
  .case(gameActions.setField, (state, { field }) => {
    return produce(state, draftState => {
      draftState.field = field;
    });
  })
  .case(gameActions.setPause, (state, { isPause }) => {
    return produce(state, draftState => {
      draftState.isPause = isPause;
    });
  });
