import { useState } from "react";
import MyCanvas from "../layout/MyCanvas";
import * as tf from "@tensorflow/tfjs";
import { useEffect } from "react";
import FoodClass from "../../constants/food-class";

const RightSide = ({ canvasRef, predictions, foods, setFoods }) => {
  const [preds, setPreds] = useState();
  const [data, setData] = useState();
  const [model, setModel] = useState();

  const onChangeButton = (food) => {
    console.log(foods.indexOf(food));
    if (foods.indexOf(food) < 0) {
      const newArr = [...foods, food];
      setFoods(newArr);
    } else {
      const newArr = foods.filter((value) => value !== food);
      console.log(newArr);
      setFoods(newArr);
    }
  };

  const onClickDetail = async (image) => {
    const tensor = tf.browser.fromPixels(image); // imageを認識可能なtensorに変換した後、3dTensorを4dTensorに拡張
    const nomalizedTensor = tensor.div(255).expandDims(0);
    const resizedTensor = nomalizedTensor.resizeBilinear([604, 456]);
    const predictions = model.predict(resizedTensor);
    setPreds(predictions);
  };

  const formatPreds = ({ preds }, food_classes) => {
    if (!preds) return "Loading predictions..";

    const topPreds = tf.topk(preds, 5, true);

    const topPredsVals = topPreds.values.dataSync();
    const topPredsIndx = topPreds.indices.dataSync();

    const newData = [];
    topPredsIndx.forEach((predIdx, predNum) => {
      newData.push({ food: food_classes[predIdx], prob: Math.round(topPredsVals[predNum] * 1000) / 10 });
    });
    setData(newData);
  };

  useEffect(() => {
    formatPreds({ preds }, FoodClass);
  }, [preds]);

  const loadModel = async () => {
    const model = await tf.loadLayersModel("food_model_2/model.json");
    setModel(model);
  };

  useEffect(() => {
    loadModel();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center w-full h-full lg:ml-10 lg:items-start lg:w-3/5 change'>
      <div className='flex w-[90%] lg:w-[25%] h-14 dark:bg-gray-600 bg-gray-400 items-center justify-center text-[25px] rounded-lg mb-5 whitespace-nowrap select-none'>분석 결과</div>
      <div className='flex flex-col w-[90%] h-[60vh] lg:h-4/5 dark:bg-gray-700 mb-5 lg:mb-0 bg-gray-200 rounded-lg p-5'>
        <div className='flex flex-row w-full overflow-auto'>
          {predictions &&
            predictions.map((value, index) => {
              const [x, y, width, height] = value.bbox;
              return (
                <MyCanvas
                  key={index}
                  x={x}
                  y={y}
                  width={width}
                  height={height}
                  image={canvasRef.current}
                  imageWidth={canvasRef.current.width}
                  imageHeight={canvasRef.current.height}
                  onClick={onClickDetail}
                />
              );
            })}
        </div>
        {/* flex items-center justify-center h-full */}
        <div className='flex flex-col items-center justify-center mt-10'>
          {data &&
            data.map(({ food, prob }) => {
              return (
                <div className='flex flex-row w-full' key={food}>
                  <div className='flex w-[15%] border-black dark:border-gray-400 border-x my-3 justify-center items-center py-2'>음식명</div>
                  <div className='flex w-[25%] border-black dark:border-gray-400 border-r my-3 justify-center items-center py-2'>{food}</div>
                  <div className='flex w-[15%] border-black dark:border-gray-400 border-r my-3 justify-center items-center py-2'>확률</div>
                  <div className='flex w-[25%] border-black dark:border-gray-400 border-r my-3 justify-center items-center py-2'>{prob}%</div>
                  <div className='flex w-[20%] border-black dark:border-gray-400 border-r my-3 justify-center items-center '>
                    {foods.indexOf(food) < 0 ? (
                      <button
                        className='flex items-center justify-center w-1/2 h-full text-white rounded-lg bg-button dark:bg-darkButton hover:bg-hover dark:hover:bg-hover active:bg-button dark:active:bg-darkButton'
                        onClick={() => onChangeButton(food)}
                      >
                        추가
                      </button>
                    ) : (
                      <button
                        className='flex items-center justify-center w-1/2 h-full text-white rounded-lg bg-button dark:bg-darkButton hover:bg-hover dark:hover:bg-hover active:bg-button dark:active:bg-darkButton'
                        onClick={() => onChangeButton(food)}
                      >
                        삭제
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default RightSide;
