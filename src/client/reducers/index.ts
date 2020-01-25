import { combineReducers } from "redux";
import { History } from "history";
import game, { initialState as gameState } from "./game";
import ui, { initialState as uiState } from "./ui";

export type AppState = {
  game: typeof gameState;
  ui: typeof uiState;
};

export const createRootReducer = (history: History) =>
  combineReducers<AppState>({
    game,
    ui
  });
