import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../reducers";
import pikachu from "../../../../assets/pikachu/pikachu.gif";
import snoopy from "../../../../assets/snoopy/snoopy.png";
import style from "./style.module.scss";

const Arena: React.FC = () => {
  const {
    ui: {
      effect: {
        damage: { player, enemy }
      }
    },
    game: { phase }
  } = useSelector((state: AppState) => state);
  // const [frame, setFrame] = useState(0);
  // const { isPause } = useSelector((state: AppState) => state.game);

  // const requestId = requestAnimationFrame(() => {
  //   setFrame(frame + 1);
  // });

  // if (isPause) {
  //   cancelAnimationFrame(requestId);
  // }
  const destroyEffect = `${style.fadeOut} ${style.shake}`;

  return (
    <div className={style.container}>
      <div className={`${style.bg}`}>
        <img
          className={`${style.player} ${player ? style.shake : ""} ${
            phase === "LOSE" ? destroyEffect : ""
          }`}
          src={pikachu}
          alt="player"
        />
        <img
          className={`${style.enemy} ${enemy ? style.shake : ""} ${
            phase === "WIN" ? destroyEffect : ""
          }`}
          src={snoopy}
          alt="enemy"
        />
      </div>
    </div>
  );
};

export default Arena;
