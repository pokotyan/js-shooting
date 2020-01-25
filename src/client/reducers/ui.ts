import { reducerWithInitialState } from "typescript-fsa-reducers";
import produce from "immer";
import * as uiActions from "../actions/ui";

export interface InitialState {
  turnInfo: {
    isOpen: boolean;
    message: string;
  };
}

export const initialState = {
  turnInfo: {
    isOpen: false,
    message: ""
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
  });
