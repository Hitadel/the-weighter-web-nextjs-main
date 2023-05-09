import { useState, useEffect } from "react";
import EmailAuth from "./EmailAuth";
import axios from "axios";
import { request } from "../../utils/request";
import { Modal, Box } from "@mui/material";

const ProfileStatusModify = ({ open, onClose, age, height, weight, disease, allergy }) => {
  const [ageValue, setAgeValue] = useState(age);
  const [heightValue, setHeightValue] = useState(height);
  const [weightValue, setWeightValue] = useState(weight);
  const [diseaseValue, setDiseaseValue] = useState(disease);
  const [allergyValue, setAllergyValue] = useState(allergy);
  //ProfileStatusModify 자체는 부모 컴포넌트에서 정의하자마자 바로 실행됨 (next.js는 모든 페이지를 사전 렌더링함)
  //-> age 등등의 프로퍼티는 서버에서 받아오기 전에도 받아옴 (즉, 비어있음)
  //프로퍼티는 이 창이 열릴 때 다시 한 번 더 받아오는 듯함. 그 때 ProfileStatusModify 함수가 다시 실행되지는 않고 프로퍼티를 부여만 하는 것 같음
  //useState는 ProfileStatusModify가 실행될 때 딱 한 번만 실행되는 듯 함. 즉, useState로 지정은 해뒀지만 서버에서 받기도 전에 할당되는 지라 이걸로 할당되지 않음

  const onClickSubmitButton = () => {
    request()
      .post("/profile/statusModify", { age: ageValue, height: heightValue, weight: weightValue, disease: diseaseValue, allergy: allergyValue })
      .then((res) => {
        onClose();
        return (window.location.href = "/profile");
      })
      .catch((err) => {
        console.error(err);
        alert(err.response.status);
      });
  };

  useEffect(() => {
    //반대로, useEffect는 이 함수가 실행될 때도, 이 창이 열릴 때도 실행이 되는 듯함. 여기서 선언하면 값이 저장됨
    // console.log(age, height, weight, disease, allergy, "ㄴㄴ")
    // console.log(ageValue, heightValue, weightValue, diseaseValue, allergyValue, "ㅇㅇ"); // 이 함수를 실행하면 모두 받아오기 전의 기본값만 나옴
    setAgeValue(age);
    setHeightValue(height);
    setWeightValue(weight);
    setDiseaseValue(disease);
    setAllergyValue(allergy);
    // console.log(ageValue, heightValue, weightValue, diseaseValue, allergyValue, "ㅇㅇ3"); // 이 함수를 실행하면 모두 받아오기 전의 기본값만 나옴
  }, [age, height, weight, disease, allergy]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box className='absolute flex w-2/6 h-[70%] bg-white rounded-2xl items-center justify-center shadow-shadow mr-20 text-black top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col'>
        <label className='flex text-4xl font-bold'>개인정보 변경</label>
        <div className='flex-col items-center justify-center mt-8 flex-full'>
          <label>나이</label>
          <div className='flex mb-3'>
            <input
              className='flex w-full h-8 border-gray-400 border-[1px] rounded-lg px-2'
              type='number'
              defaultValue={ageValue}
              onChange={(e) => {
                setAgeValue(e.target.value);
              }}
            />
          </div>
          <label>키</label>
          <div className='flex mb-3'>
            <input
              className='flex w-full h-8 border-gray-400 border-[1px] rounded-lg px-2'
              type='number'
              defaultValue={heightValue}
              onChange={(e) => {
                setHeightValue(e.target.value);
              }}
            />
          </div>
          <label>몸무게</label>
          <div className='flex mb-3'>
            <input
              className='flex w-full h-8 border-gray-400 border-[1px] rounded-lg px-2'
              type='number'
              defaultValue={weightValue}
              onChange={(e) => {
                setWeightValue(e.target.value);
              }}
            />
          </div>
          <label>질병</label>
          <label className='flex w-full mt-1 text-sm text-gray-500'>콤마로 구분지어주세요. (예: 당뇨병, 고혈압)</label>
          <div className='flex mb-3'>
            <textarea
              className='flex w-full h-20 border-gray-400 border-[1px] rounded-lg px-2'
              type='text'
              defaultValue={diseaseValue}
              onChange={(e) => {
                setDiseaseValue(e.target.value);
              }}
            />
          </div>
          <label>알러지</label>
          <label className='flex w-full mt-1 text-sm text-gray-500'>콤마로 구분지어주세요. (예: 견과, 갑각류)</label>
          <div className='flex mb-3'>
            <textarea
              className='flex w-full h-20 border-gray-400 border-[1px] rounded-lg px-2'
              type='text'
              defaultValue={allergyValue}
              onChange={(e) => {
                setAllergyValue(e.target.value);
              }}
            />
          </div>
        </div>
        <button
          className='flex w-36 h-12 items-center justify-center bg-button rounded-lg shadow-shadow mt-7 text-white text-[15px] hover:bg-hover hover:transition'
          onClick={() => onClickSubmitButton()}
        >
          수정 완료
        </button>
      </Box>
    </Modal>
  );
};

export default ProfileStatusModify;
