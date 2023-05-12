import { useRef, useEffect } from "react";
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import EstimatePose from "../../utils/estimate-pose";
import AbsoluteArea from "./absolute-area";
import { useState } from "react";
import { Circle, Line } from "../layout/SVGLayout";

const ExerciseScreen = ({ type, setNowCount, isReady, time, isFull, setIsFull }) => {
  const [count, step, checkPoses] = EstimatePose(type);

  useEffect(() => {
    setNowCount(count);
  }, [count, setNowCount]);
  const [keypoints, setKeypoints] = useState();

  const webcamRef = useRef(null);

  const detectWebcam = async (detector) => {
    const loop = async () => {
      if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState === 4) {
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;

        const poses = await detector.estimatePoses(video);
        // const poses = await detector.estimateSinglePose(video);
        if (poses.length > 0) {
          checkPoses(poses);
          setKeypoints(poses[0].keypoints);
        }
      }
      requestAnimationFrame(loop);
    };
    loop();
  };

  const drawKeypoints = () => {
    if (keypoints != null && keypoints.length > 0) {
      const circles = keypoints
        .filter((value) => (value.score ?? 0) > 0.5)
        .map((value) => {
          if (isFull) {
            return <Circle key={value.name} cx={value.x * 2} cy={value.y * 2} r={10} />;
          } else {
            return <Circle key={value.name} cx={value.x} cy={value.y} r={5} />;
          }
        });
      const adjacentKeyPoints = posenet.getAdjacentKeyPoints(keypoints, 0.5).map((value) => {
        if (isFull) {
          return <Line x1={value[0].x * 2} x2={value[1].x * 2} y1={value[0].y * 2} y2={value[1].y * 2} key={value[0].name} color='white' strokeWidth={4} />;
        } else {
          return <Line x1={value[0].x} x2={value[1].x} y1={value[0].y} y2={value[1].y} key={value[0].name} color='white' strokeWidth={2} />;
        }
      });
      if (isFull) {
        return (
          <svg viewBox='0 0 1280 960' stroke='red' fill='white' className='absolute w-[1280px] h-full top-0 left-[16.5%]'>
            {circles}
            {adjacentKeyPoints}
          </svg>
        );
      } else {
        return (
          <svg viewBox='0 0 640 480' stroke='#06CFCB' fill='white' className='absolute w-[640px] h-[480px] top-[23%] left-[33%]'>
            {circles}
            {adjacentKeyPoints}
          </svg>
        );
      }
    }
  };

  const runMovenet = async () => {
    const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet);

    detectWebcam(detector);
  };

  useEffect(() => {
    runMovenet();
  }, []);

  return isFull ? (
    <div className='absolute top-0 left-0 w-full h-full bg-gray-800'>
      <AbsoluteArea step={step} time={time} setIsFull={setIsFull} />
      <Webcam ref={webcamRef} className='absolute top-0 left-0 w-screen h-screen' onReady />
      {/* <canvas ref={canvasRef} className="absolute w-[1280px] h-full top-0 left-[16.67%] scale-[(-1, 1)] translate-[(-200, 0)]" /> */} {drawKeypoints()}
    </div>
  ) : (
    <div>
      <AbsoluteArea step={step} time={time} />
      <Webcam ref={webcamRef} className='flex w-[640px] h-[480px] top-[23%] left-[33%]' />
      {/* <canvas ref={canvasRef} className="absolute w-[640px] h-[480px] top-[23%] left-[33%] scale-[(-1, 1)] translate-[(-200, 0)]" /> */}
      {drawKeypoints()}
    </div>
  );
};

export default ExerciseScreen;
