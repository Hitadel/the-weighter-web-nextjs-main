import { useState, useEffect } from "react";
import { getKeypointsObject, getAngle } from "../estimate-pose";
import "@tensorflow/tfjs-backend-webgl";

export default function Squat() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(0);

  const [down, setDown] = useState(false);
  const [up, setUp] = useState(false);

  const checkPoses = (pose) => {
    const { right_hip, right_knee, left_hip, left_knee } = getKeypointsObject(pose);
    console.log(getKeypointsObject(pose));

    const angleKnee = {
      rightHigh: getAngle(right_hip.x, right_hip.y, right_knee.x, right_knee.y),
      leftHigh: getAngle(left_hip.x, left_hip.y, left_knee.x, left_knee.y),
    };

    console.log(angleKnee);

    if (right_knee.score > 0.5 && left_knee.score > 0.5) {
      setUp(checkUp(angleKnee));
      setDown(checkDown(angleKnee));
    } else {
      setUp(false);
      setDown(false);
    }
  };

  useEffect(() => {
    if (step == 0 && down) {
      console.log("down");
      setStep((step) => 1);
    }
  }, [step, down]);

  useEffect(() => {
    if (step == 1 && up) {
      console.log("up");
      setStep((step) => 0);
      setCount((count) => count + 1);
    }
  }, [up, step, count]);

  return [count, step, checkPoses];
}

const checkDown = (angleKnee) => {
  if (angleKnee.rightHigh > 0 && angleKnee.rightHigh < 30) {
    return true;
  } else if (angleKnee.leftHigh > 150 && angleKnee.leftHigh < 180) {
    return true;
  } else {
    return false;
  }
};

const checkUp = (angleKnee) => {
  if (angleKnee.leftHigh > 60 && angleKnee.leftHigh < 90) {
    return true;
  } else if (angleKnee.rightHigh > 90 && angleKnee.rightHigh < 120) {
    return true;
  } else {
    return false;
  }
};
