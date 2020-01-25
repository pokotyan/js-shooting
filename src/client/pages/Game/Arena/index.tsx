import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../reducers";
import pikachu from "../../../../assets/pikachu/pikachu.gif";
import snoopy from "../../../../assets/snoopy/snoopy.png";

import style from "./style.module.scss";

const Bot = ({ color, x, y }: { color: string; x: number; y: number }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect
        transform="rotate(45, 0, 0)"
        ry="2"
        y="-2"
        x="-16"
        height="4"
        width="18"
        fill="#fff"
      />
      <rect
        transform="rotate(45, 0, 0)"
        ry="1"
        y="-1"
        x="-15"
        height="2"
        width="16"
        fill={color}
      />
      <rect
        transform="rotate(-45, 0, 0)"
        ry="2"
        y="-2"
        x="-16"
        height="4"
        width="18"
        fill="#fff"
      />
      <rect
        transform="rotate(-45, 0, 0)"
        ry="1"
        y="-1"
        x="-15"
        height="2"
        width="16"
        fill={color}
      />
      <circle r="12" cy="0" cx="0" fill="#fff" />
      <circle r="11" cy="0" cx="0" fill={color} />
      <circle r="9" cy="0" cx="0" fill="#fff" />
      <rect ry="2" y="-2" x="-16" height="4" width="31" fill="#fff" />
      <rect ry="1" y="-1" x="-15" height="2" width="29" fill={color} />
      <circle r="4" cy="0" cx="4" fill="#fff" />
      <circle r="3" cy="0" cx="4" fill={color} />
      <circle r="1" cy="0" cx="4" fill="#fff" />
    </g>
  );
};

const Lazer = ({ x, y }: { x: number; y: number }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect fill="red" width="14" height="4" x="-7" y="-2" ry="2" />
      <rect fill="red" width="12" height="2" x="-6" y="-1" ry="1" />
    </g>
  );
};

const Arena: React.FC = () => {
  const [frame, setFrame] = useState(0);
  const { field, isPause } = useSelector((state: AppState) => state.game);

  const requestId = requestAnimationFrame(() => {
    setFrame(frame + 1);
  });

  if (isPause) {
    cancelAnimationFrame(requestId);
  }

  return (
    <div className={style.container}>
      {/* <svg className={style.canvas} width="50vw" height="100vh">
        <Bot
          color={field.player.color}
          x={field.player.position.x}
          y={field.player.position.y}
        />
        {field.enemies.map((e, i) => (
          <Bot color={e.color} key={i} x={e.position.x} y={e.position.y} />
        ))}
        {field.shots.length
          ? field.shots.map(shot => <Lazer x={shot.x} y={shot.y} />)
          : null}
      </svg> */}
      <div className={`${style.bg}`}>
        <img className={style.player} src={pikachu} alt="player" />
        <img className={style.enemy} src={snoopy} alt="enemy" />
      </div>
    </div>
  );
};

export default Arena;
