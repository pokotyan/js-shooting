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
  type: "HP" | "MP" | "AP";
}) => {
  const width = (current / max) * 100;
  let colorStyle = "";

  if (type === "HP") {
    if (25 >= width) {
      colorStyle = style.lowHpColor;
    } else if (50 >= width) {
      colorStyle = style.middleHpColor;
    } else {
      colorStyle = style.hpColor;
    }
  }
  if (type === "MP") {
    colorStyle = style.mpColor;
  }
  if (type === "AP") {
    colorStyle = style.apColor;
  }

  const { width: animatedWidth } = useSpring({ from: { width }, width });

  return (
    <Bar
      animatedWidth={animatedWidth}
      max={max}
      current={current}
      colorStyle={colorStyle}
    />
  );
};
