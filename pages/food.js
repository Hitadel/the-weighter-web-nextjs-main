import { useState, useEffect } from "react";
import CommonLayout from "../components/layout/CommonLayout";
import LeftSide from "../components/food/left-side";
import RightSide from "../components/food/right-side";
import Background from "../components/food/background";
import { Modal, Box } from "@mui/material";
import { useRef } from "react";
import axios from "axios";
import { request } from "../utils/request";
import Image from "next/image";

const Food = () => {
  const [image, setImage] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [foods, setFoods] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState([]);
  const canvasRef = useRef(null);

  const nutrition_data = require("../public/nutrition_data.json");

  const handleOpen = () => {
    setModalOpen(true);
    getNutritionData();
  };

  const getNutritionData = () => {
    foods.map((food) => {
      const obj = nutrition_data.records.filter((value) => value["식품명"] === food);
      if (obj.length > 0) {
        const newArr = modalData;
        newArr.push(obj[0]);
        console.log(newArr);
        setModalData(newArr);
      }
    });
  };

  const onClickSubmitButton = (food) => {
    const obj = modalData.filter((value) => value.식품명 === food)[0];
    request()
      .post(
        "barcode/save",
        {
          data: {
            DESC_KOR: obj["식품명"],
            ANIMAL_PLANT: obj["식품대분류명"],
            SERVING_WT: obj["영양성분함량기준량"],
            NUTR_CONT1: obj["에너지(kcal)"],
            NUTR_CONT2: obj["탄수화물(g)"],
            NUTR_CONT3: obj["단백질(g)"],
            NUTR_CONT4: obj["지방(g)"],
            NUTR_CONT5: obj["당류(g)"],
            NUTR_CONT6: obj["나트륨(mg)"],
            NUTR_CONT7: obj["콜레스테롤(mg)"],
            NUTR_CONT8: obj["포화지방산(g)"],
            NUTR_CONT9: obj["트랜스지방산(g)"],
          },
        },
        { withCredentials: true }
      )
      .then((res) => setModalData(modalData.filter((value) => value["식품명"] !== obj["식품명"])))
      .catch((err) => console.error(err));
  };

  return (
    <CommonLayout>
      <Background>
        <LeftSide image={image} setImage={setImage} predictions={predictions} setPredictions={setPredictions} canvasRef={canvasRef} foods={foods} handleOpen={() => handleOpen()} />
        <RightSide image={image} predictions={predictions} canvasRef={canvasRef} foods={foods} setFoods={setFoods} />
      </Background>
      <Modal open={modalOpen}>
        <Box className='absolute top-[12%] left-[12%] w-3/4 h-3/4 bg-white text-black dark:text-white dark:bg-gray-700 border-black dark:border-gray-500 border-2 rounded-xl shadow-shadow change'>
          <div className='flex flex-col items-center justify-center w-full h-full'>
            <div
              className='absolute rounded-lg cursor-pointer right-5 top-4 dark:bg-gray-400 dark:hover:bg-gray-200'
              onClick={() => {
                setModalOpen(!modalOpen);
                setModalData([]);
              }}
            >
              <Image src={"https://www.svgrepo.com/show/503004/close.svg"} width={30} height={30} alt='close' />
            </div>
            <label className='text-3xl'>영양 정보 등록</label>
            <div className='flex flex-col w-full p-3'>
              <div className='flex flex-row w-full border border-black'>
                <div className='flex p-3 w-[9%] justify-center border-black border-r'>음식명</div>
                <div className='flex p-3 w-[9%] justify-center border-black border-r'>칼로리</div>
                <div className='flex p-3 w-[9%] justify-center border-black border-r'>탄수화물</div>
                <div className='flex p-3 w-[9%] justify-center border-black border-r'>단백질</div>
                <div className='flex p-3 w-[9%] justify-center border-black border-r'>지방</div>
                <div className='flex p-3 w-[9%] justify-center border-black border-r'>당류</div>
                <div className='flex p-3 w-[9%] justify-center border-black border-r'>나트륨</div>
                <div className='flex p-3 w-[9%] justify-center border-black border-r'>콜레스테롤</div>
                <div className='flex p-3 w-[9%] justify-center border-black border-r'>포화지방</div>
                <div className='flex p-3 w-[9%] justify-center border-r border-black'>트랜스지방</div>
                <div className='flex p-3 w-[10%] justify-center'>등록하기</div>
              </div>
              {modalData &&
                modalData.map((value, index) => {
                  return (
                    <div key={index} className='flex flex-row border-b border-black border-x'>
                      <label className='flex p-3 h-14 w-[9%] justify-center items-center border-black border-r'>{value.대표식품명}</label>
                      <label className='flex p-3 h-14 w-[9%] justify-center items-center border-black border-r'>{value["에너지(kcal)"]}kcal</label>
                      <label className='flex p-3 h-14 w-[9%] justify-center items-center border-black border-r'>{value["탄수화물(g)"]}g</label>
                      <label className='flex p-3 h-14 w-[9%] justify-center items-center border-black border-r'>{value["단백질(g)"]}g</label>
                      <label className='flex p-3 h-14 w-[9%] justify-center items-center border-black border-r'>{value["지방(g)"]}g</label>
                      <label className='flex p-3 h-14 w-[9%] justify-center items-center border-black border-r'>{value["당류(g)"]}g</label>
                      <label className='flex p-3 h-14 w-[9%] justify-center items-center border-black border-r'>{value["나트륨(mg)"]}mg</label>
                      <label className='flex p-3 h-14 w-[9%] justify-center items-center border-black border-r'>{value["콜레스테롤(mg)"]}mg</label>
                      <label className='flex p-3 h-14 w-[9%] justify-center items-center border-black border-r'>{value["포화지방산(g)"]}g</label>
                      <label className='flex p-3 h-14 w-[9%] justify-center items-center border-r border-black'>{value["트랜스지방산(g)"]}g</label>
                      <div className='flex p-3 h-14 w-[10%] justify-center items-center'>
                        <button
                          className='flex items-center justify-center h-full px-3 text-white rounded-lg bg-button dark:bg-darkButton hover:bg-hover dark:hover:bg-hover active:bg-button dark:active:bg-darkButton'
                          onClick={() => {
                            onClickSubmitButton(value.대표식품명);
                          }}
                        >
                          등록
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </Box>
      </Modal>
    </CommonLayout>
  );
};

export default Food;
