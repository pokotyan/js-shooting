import actionCreatorFactory from "typescript-fsa";

const actionCreator = actionCreatorFactory();

export const OPEN_TURN_INFO = "OPEN_TURN_INFO";
export const openTurnInfo = actionCreator<{ message: string }>(OPEN_TURN_INFO);

export const CLOSE_TURN_INFO = "CLOSE_TURN_INFO";
export const closeTurnInfo = actionCreator<{ message: string }>(
  CLOSE_TURN_INFO
);

export const SHOW_DAMAGE_EFFECT = "SHOW_DAMAGE_EFFECT";
export const showDamageEffect = actionCreator<{ isPlayerTurn: boolean }>(
  SHOW_DAMAGE_EFFECT
);

export const HIDE_DAMAGE_EFFECT = "HIDE_DAMAGE_EFFECT";
export const hideDamageEffect = actionCreator(HIDE_DAMAGE_EFFECT);
