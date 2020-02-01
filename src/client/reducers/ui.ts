import { reducerWithInitialState } from "typescript-fsa-reducers";
import produce from "immer";
import * as uiActions from "../actions/ui";

export interface InitialState {
  turnInfo: {
    isOpen: boolean;
    message: string;
  };
  effect: {
    damage: {
      player: boolean;
      enemy: boolean;
    };
  };
}

export const initialState = {
  turnInfo: {
    isOpen: false,
    message: ""
  },
  effect: {
    damage: {
      player: false,
      enemy: false
    }
  }
};

export default reducerWithInitialState(initialState)
  .case(uiActions.openTurnInfo, (state, { message }) => {
    return produce(state, draftState => {
      draftState.turnInfo.isOpen = true;
      draftState.turnInfo.message = message;
    });
  })
  .case(uiActions.closeTurnInfo, (state, { message }) => {
    return produce(state, draftState => {
      draftState.turnInfo.isOpen = false;
      draftState.turnInfo.message = message;
    });
  })
  .case(uiActions.showDamageEffect, (state, { isPlayerTurn }) => {
    return produce(state, draftState => {
      if (isPlayerTurn) {
        draftState.effect.damage.player = false;
        draftState.effect.damage.enemy = true;
      } else {
        draftState.effect.damage.player = true;
        draftState.effect.damage.enemy = false;
      }
    });
  })
  .case(uiActions.hideDamageEffect, state => {
    return produce(state, draftState => {
      draftState.effect.damage.player = false;
      draftState.effect.damage.enemy = false;
    });
  });
