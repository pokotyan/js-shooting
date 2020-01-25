import actionCreatorFactory from "typescript-fsa";
import { Field } from "../../core/Field";
import { PHASE } from "../reducers/game";

const actionCreator = actionCreatorFactory();

export const LOAD = "LOAD";
export const load = actionCreator<{ code: string }>(LOAD);

export const SET_PHASE = "SET_PHASE";
export const setPhase = actionCreator<{ phase: PHASE }>(SET_PHASE);

export const SET_CODE = "SET_CODE";
export const setCode = actionCreator<{ code: string }>(SET_CODE);

export const SET_SCRIPT = "SET_SCRIPT";
export const setScript = actionCreator<{ script: any }>(SET_SCRIPT);

export const SET_FIELD = "SET_FIELD";
export const setField = actionCreator<{ field: Field }>(SET_FIELD);

export const TICK = "TICK";
export const tick = actionCreator(TICK);

export const START = "START";
export const start = actionCreator(START);

export const END = "END";
export const end = actionCreator(END);

export const PAUSE = "PAUSE";
export const pause = actionCreator(PAUSE);

export const SET_PAUSE = "SET_PAUSE";
export const setPause = actionCreator<{ isPause: boolean }>(SET_PAUSE);

export const START_ACTION = "START_ACTION";
export const startAction = actionCreator(START_ACTION);
