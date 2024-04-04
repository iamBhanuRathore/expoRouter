import React, { useEffect, useState } from "react";
import Slider from "@react-native-community/slider";

type Props = {};
let max = 10;
const PlayerSlider = ({}: Props) => {
  const [state, setState] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setState((p) => {
        if (p >= max) return 0;
        return p + 1;
      });
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <Slider
      style={{
        width: "100%",
        height: 10,
        margin: 0,
        padding: 0,
        transform: [
          {
            scaleX: 1.06,
          },
        ],
      }}
      minimumValue={0}
      maximumValue={max}
      step={1}
      minimumTrackTintColor="#FFFFFF"
      maximumTrackTintColor="#000000"
      value={state}
    />
  );
};

export default PlayerSlider;
