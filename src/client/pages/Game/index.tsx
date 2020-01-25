import React from "react";
import { useSelector } from "react-redux";
import Editor from "./Editor";
import Arena from "./Arena";
import Status from "./Status";
import TurnInfo from "./TurnInfo";
import { AppState } from "../../reducers";

const Game: React.FC = () => {
  const { turnInfo } = useSelector((state: AppState) => state.ui);

  return (
    <div
      style={{
        display: "flex"
      }}
    >
      <div
        style={{
          width: "40vw",
          height: "100vh"
        }}
      >
        <Editor />
      </div>
      <div
        style={{
          width: "60vw",
          position: "relative"
        }}
      >
        <div
          style={{
            height: "50vh",
            width: "100%"
          }}
        >
          <Arena />
        </div>
        <div
          style={{
            height: "50vh",
            width: "100%"
          }}
        >
          <Status />
        </div>
        <TurnInfo turnInfo={turnInfo} />
      </div>
    </div>
  );
};

export default Game;
