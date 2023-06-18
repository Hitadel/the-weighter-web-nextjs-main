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
  // ProfileStatusModify自体は親コンポーネントで定義するとすぐに実行される (next.jsはすべてのページを事前レンダリングする)
  // -> ageなどのプロパティはサーバーから取得する前でも取得される（つまり、空である）
  // プロパティはこのウィンドウが開いたときにもう一度取得されるようです。その時にProfileStatusModify関数が再実行されるわけではなく、プロパティを付与するだけのようです。
  // useStateはProfileStatusModifyが実行される時に一度だけ実行されるようです。つまり、useStateで指定はしたけど、サーバーから受け取る前に割り当てられるので、これで割り当てられない

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
    // 逆に、useEffect はこの関数が実行されるときも、このウィンドウが開くときも実行されるようだ。 ここで宣言すると値が保存される
    // // console.log(age, height, weight, disease, allergy, "ㄴㄴ")
    // console.log(ageValue, heightValue, weightValue, diseaseValue, allergyValue, "ㅇㅇ"); // この関数を実行すると、すべて受け取る前のデフォルト値だけが表示されます
    setAgeValue(age);
    setHeightValue(height);
    setWeightValue(weight);
    setDiseaseValue(disease);
    setAllergyValue(allergy);
    // console.log(ageValue, heightValue, weightValue, diseaseValue, allergyValue, "ㅇㅇ3"); // この関数を実行すると、すべて取得する前のデフォルト値しか出ません
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
