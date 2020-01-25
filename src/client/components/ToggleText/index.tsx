import React from "react";
import { useTrail, animated } from "react-spring";
import style from "./style.module.scss";

const config = { mass: 5, tension: 2000, friction: 200 };

export default ({ isOpen, text }: { isOpen: boolean; text: string }) => {
  const texts = text.split(" ");
  const trail = useTrail(texts.length, {
    config,
    opacity: isOpen ? 1 : 0,
    x: isOpen ? 0 : 20,
    height: isOpen ? 80 : 0,
    from: { opacity: 0, x: 20, height: 0 }
  });

  return (
    <div className={style.trailsMain}>
      <div>
        {trail.map(({ x, height, ...rest }, index) => (
          <animated.div
            key={texts[index]}
            className={style.trailsText}
            style={{
              ...rest,
              transform: (x as any).interpolate(
                (x: any) => `translate3d(0,${x}px,0)`
              )
            }}
          >
            <animated.div style={{ height }}>{texts[index]}</animated.div>
          </animated.div>
        ))}
      </div>
    </div>
  );
};
