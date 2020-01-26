import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import { createRootReducer } from "../reducers";
import { rootSaga } from "../sagas";

export const history = createBrowserHistory();

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, logger];

  const store = createStore(
    createRootReducer(history),
    {},
    applyMiddleware(...middlewares)
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

const store = configureStore();

export default store;
