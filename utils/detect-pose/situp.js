import { useState, useEffect, useCallback } from "react";
import { getKeypointsObject, getAngle } from "../estimate-pose";
import "@tensorflow/tfjs-backend-webgl";

export default function Situp() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(0);

  const [down, setDown] = useState(false);
  const [up, setUp] = useState(false);

  const checkPoses = useCallback((pose) => {
    const { rightHip, leftHip, rightShoulder, leftShoulder } = getKeypointsObject(pose);

    const angleHip = {
      rightHigh: getAngle(rightShoulder.x, rightShoulder.y, rightHip.x, rightHip.y),
      leftHigh: getAngle(leftShoulder.x, leftShoulder.y, leftHip.x, leftHip.y),
    };

    if (rightShoulder.score > 0.5 && leftShoulder.score > 0.5) {
      setUp(checkUp(angleHip));
      setDown(checkDown(angleHip));
    } else {
      setUp(false);
      setDown(false);
    }
  });

  useEffect(() => {
    if (step == 0 && up) {
      console.log("up");
      setStep(1);
    }
  }, [step, up]);

  useEffect(() => {
    if (step == 1 && down) {
      console.log("down");
      setStep(0);
      setCount(count + 1);
    }
  }, [down, step, count]);

  return [count, step, checkPoses];
}

const checkUp = (angleHip) => {
  if (angleHip.rightHigh > 90 && angleHip.rightHigh < 120) {
    return true;
  } else if (angleHip.leftHigh > 60 && angleHip.leftHigh < 90) {
    return true;
  } else {
    return false;
  }
};

const checkDown = (angleHip) => {
  if (angleHip.rightHigh > 150 && angleHip.rightHigh < 180) {
    return true;
  } else if (angleHip.leftHigh > 0 && angleHip.left > 30) {
    return true;
  } else {
    return false;
  }
};
