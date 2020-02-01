import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as gameActions from "../../../actions/game";
import { AppState } from "../../../reducers";
import Slide from "../../../components/Slide";
import ProgressBar from "../../../components/ProgressBar";
import GithubIcon from "./GithubIcon";
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
        <Slide phase={phase}>
          <div
            className={`${style.turnInfo} ${style.DeepBlue} ${style.link}`}
            onClick={() => {
              dispatch(gameActions.start());
            }}
          >
            START
          </div>
          <div
            className={`${style.turnInfo} ${style.blue} ${style.link}`}
            onClick={() => {
              dispatch(gameActions.load({ code }));
              dispatch(gameActions.startAction());
            }}
          >
            戦闘開始
          </div>
          <div className={`${style.turnInfo} ${style.red}`}>PLAYER TURN</div>
          <div className={`${style.turnInfo} ${style.red}`}>ENEMY TURN</div>
          <div className={`${style.turnInfo} ${style.yellow}`}>WIN</div>
          <div className={`${style.turnInfo} ${style.WildApple}`}>LOSE</div>
        </Slide>
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
        <div
          style={{
            display: "flex"
          }}
        >
          <div className={style.statusTitle}>AP　</div>
          <ProgressBar
            max={field.player.ap.max}
            current={field.player.ap.current}
            type="AP"
          />
        </div>
        <a
          href="https://github.com/pokotyan/js-game"
          rel="noopener noreferrer"
          target="_blank"
        >
          <div
            style={{
              bottom: "10px",
              position: "fixed",
              right: "10px",
              zIndex: 100
            }}
          >
            <GithubIcon />
          </div>
        </a>
      </div>
    </div>
  );
};
