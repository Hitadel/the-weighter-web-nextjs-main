import NextImage from "next/image";
import camera from "../../public/camera.png";
import { useEffect, useRef, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs-backend-webgl";

const LeftSide = ({ image, setImage, predictions, setPredictions, canvasRef, handleOpen }) => {
  const onChangeImage = async (file) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      console.log(img.width, img.height);
      canvas.width = img.width;
      canvas.height = img.height;

      if (img.width > img.height) {
        img.width = 450;
        img.height = (canvas.height * 450) / canvas.width;
      } else {
        img.width = (canvas.width * 300) / canvas.height;
        img.height = 300;
      }

      canvas.height = img.height;
      canvas.width = img.width;

      console.log(canvas.width, canvas.height);

      ctx.drawImage(img, 0, 0, img.width, img.height);
    };
    img.src = URL.createObjectURL(file);
  };

  const predict = async () => {
    const img = canvasRef.current;
    await cocoSsd
      .load({
        base: "mobilenet_v2",
      })
      .then((model) => {
        const tensor = tf.browser.fromPixels(img);
        model.detect(tensor, 20, 0.05).then((prediction) => {
          setPredictions(prediction.filter((value) => value.class === "bowl"));
        });
      });
  };

  const drawCanvas = (predictions) => {
    const img = canvasRef.current;
    const ctx = img.getContext("2d");

    predictions.forEach((prediction) => {
      if (prediction.class === "bowl") {
        const [x, y, width, height] = prediction.bbox;

        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.strokeStyle = "#FF00FF";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });
  };

  useEffect(() => {
    if (image) {
      onChangeImage(image);
    }
  }, [image]);

  useEffect(() => {
    if (predictions) {
      drawCanvas(predictions);
    }
  }, [predictions]);

  return (
    <div className='flex flex-col items-center justify-center w-[65%] lg:w-[30%] h-full pt-10 pb-5 lg:ml-10 lg:py-0 change select-none'>
      {image ? (
        <div className='flex items-center justify-center w-full lg:mr-5 h-1/2'>
          <canvas ref={canvasRef} alt='image' className='flex w-full lg:w-90%]' width={450} />
        </div>
      ) : (
        <label className='flex flex-col items-center justify-center w-[50vw] lg:w-[20vw] lg:h-[20vw] dark:bg-neutral-400 bg-neutral-200 rounded-2xl cursor-pointer'>
          <NextImage src={camera} width={200} height={200} alt='camera' />
          여기를 눌러 이미지를 첨부합니다.
          <input type='file' className='hidden' accept='image/*' onChange={(e) => setImage(e.target.files[0])} />
        </label>
      )}
      <div className='flex flex-row justify-around w-full'>
        <button
          className='flex w-40 lg:w-36 h-12 mx-2 items-center justify-center dark:bg-darkButton bg-button active:bg-button dark:active:bg-darkButton rounded-lg mt-7 text-white text-[15px] dark:hover:bg-hover hover:bg-hover hover:transition whitespace-nowrap'
          onClick={() => {
            setImage("");
            setPredictions("");
          }}
        >
          초기화
        </button>
        <button
          className='flex w-36 h-12 mx-2 items-center justify-center dark:bg-darkButton bg-button active:bg-button dark:active:bg-darkButton rounded-lg mt-7 text-white text-[15px] dark:hover:bg-hover hover:bg-hover hover:transition whitespace-nowrap'
          onClick={predict}
        >
          식탁 분석
        </button>
        <button
          className='flex w-36 h-12 mx-2 items-center justify-center dark:bg-darkButton bg-button active:bg-button dark:active:bg-darkButton rounded-lg mt-7 text-white text-[15px] dark:hover:bg-hover hover:bg-hover hover:transition whitespace-nowrap'
          onClick={handleOpen}
        >
          정보 등록
        </button>
      </div>
    </div>
  );
};

export default LeftSide;
