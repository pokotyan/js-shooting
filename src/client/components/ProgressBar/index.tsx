import React from "react";
import { useSpring, animated } from "react-spring";
import style from "./style.module.scss";

const Bar = ({
  animatedWidth,
  current,
  max,
  colorStyle
}: {
  animatedWidth: any;
  current: number;
  max: number;
  colorStyle: string;
}) => {
  return (
    <div className={`${style.BarContainer}`}>
      <animated.div
        style={{
          width: animatedWidth.interpolate((width: number) => `${width}%`)
        }}
        className={`${style.BarInner} ${colorStyle}`}
      >
        <div className={style.BarInnerText}>
          {current}/{max}
        </div>
      </animated.div>
    </div>
  );
};

export default ({
  max,
  current,
  type
}: {
  max: number;
  current: number;
  type: "HP" | "MP";
}) => {
  const width = (current / max) * 100;
  const colorStyle = type === "HP" ? style.hpColor : style.mpColor;
  const { width: animatedWidth } = useSpring({ from: { width: 100 }, width });

  return (
    <Bar
      animatedWidth={animatedWidth}
      max={max}
      current={current}
      colorStyle={colorStyle}
    />
  );
};
