import React from "react";
import { Provider } from "react-redux";
import store from "./client/store";
import Game from "./client/pages/Game";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  );
};

export default App;
