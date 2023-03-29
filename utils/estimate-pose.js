import Squat from "./detect-pose/squat";
import Situp from "./detect-pose/situp";

export function getKeypointsObject(pose) {
  return pose[0].keypoints.reduce((acc, { part, position, score }) => {
    position["score"] = score;
    acc[part] = position;
    return { ...acc };
  });
}

export function getAngle(x1, y1, x2, y2) {
  const rad = Math.atan2(y2 - y1, x2 - x1);
  return 1 * ((rad * 180) / Math.PI);
}

export default function EstimatePose(type) {
  switch (type) {
    case "squat":
      return Squat();
    case "situp":
      return Situp();
  }
}
