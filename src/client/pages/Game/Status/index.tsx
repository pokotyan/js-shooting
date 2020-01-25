import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as gameActions from "../../../actions/game";
import { AppState } from "../../../reducers";
import Slide from "../../../components/Slide";
import ProgressBar from "../../../components/ProgressBar";
import style from "./style.module.scss";

export default () => {
  const { code, phase, field } = useSelector((state: AppState) => state.game);
  const dispatch = useDispatch();

  return (
    <div className={`${style.container}`}>
      <div
        style={{
          height: "30%"
        }}
      >
        {phase === "INITIAL" ? (
          <div
            className={`${style.turnInfo} ${style.DeepBlue} ${style.link}`}
            onClick={() => {
              dispatch(gameActions.start());
            }}
          >
            START
          </div>
        ) : (
          <Slide phase={phase}>
            <div
              className={`${style.turnInfo} ${style.blue} ${style.link}`}
              onClick={() => {
                dispatch(gameActions.load({ code }));
                dispatch(gameActions.startAction());
              }}
            >
              戦闘開始
            </div>
            <div className={`${style.turnInfo} ${style.red}`}>戦闘中</div>
          </Slide>
        )}
      </div>
      <div
        style={{
          margin: "30px"
        }}
      >
        <div
          style={{
            display: "flex"
          }}
        >
          <div className={style.statusTitle}>HP　</div>
          <ProgressBar
            max={field.player.hp.max}
            current={field.player.hp.current}
            type="HP"
          />
        </div>
        <div
          style={{
            display: "flex"
          }}
        >
          <div className={style.statusTitle}>MP　</div>
          <ProgressBar
            max={field.player.mp.max}
            current={field.player.mp.current}
            type="MP"
          />
        </div>
      </div>
    </div>
  );
};
