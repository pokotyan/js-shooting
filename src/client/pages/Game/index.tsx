import React from "react";
import { useSelector } from "react-redux";
import Editor from "./Editor";
import Arena from "./Arena";
import Status from "./Status";
import TurnInfo from "./TurnInfo";
import { AppState } from "../../reducers";
import { useWindowDimensions } from "../../components/WindowDimensions";

const Game: React.FC = () => {
  const { turnInfo } = useSelector((state: AppState) => state.ui);
  const { width } = useWindowDimensions();
  const isSP = width < 740;

  return (
    <div
      style={{
        display: isSP ? "inline" : "flex"
      }}
    >
      <div
        style={{
          width: isSP ? "100vw" : "40vw",
          height: isSP ? "30vh" : "100vh"
        }}
      >
        <Editor />
      </div>
      <div
        style={{
          width: isSP ? "100vw" : "60vw",
          position: isSP ? "static" : "relative"
        }}
      >
        <div
          style={{
            height: isSP ? "40vh" : "50vh",
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
