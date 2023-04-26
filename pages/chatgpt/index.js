import axios from "axios";
import { useState } from "react";
import CommonLayout from "../../components/layout/CommonLayout";

const Index = () => {
  const [res, setRes] = useState("");
  const [data, setData] = useState("");
  const [meal, setMeal] = useState([]);
  const [purpose, setPurpose] = useState("");

  const onClickSubmitButton = () => {
    axios.post("/api/chat", { prompt: res }).then((res) => {
      console.log(res.data);
      setData(res.data.response.replace(/^\n+/, ""));
    });
  };

  return (
    <CommonLayout>
      <div className="flex w-full justify-center items-center flex-row">
        <textarea className="flex w-1/2 h-24 resize-none p-3 border-neutral-400 border rounded-xl" onChange={(e) => setRes(e.target.value)} />
        <button className="flex w-24 h-24 justify-center items-center bg-button rounded-xl ml-10 text-white" onClick={() => onClickSubmitButton()}>
          입력
        </button>
      </div>
      {/* <div className="flex w-3/5 h-24">
        <div className="flex w-1/3 mt-5 flex-col justify-center items-center">
          <label>식사</label>
          <div className="flex flex-row">
            <input
              type="checkbox"
              value="아침"
              onChange={(e) => {
                if (e.target.value in meal) {
                }
              }}
            />
            <label className="ml-2">아침</label>
          </div>
          <div className="flex flex-row">
            <input type="checkbox" value="점심" />
            <label className="ml-2">점심</label>
          </div>
          <div className="flex flex-row">
            <input type="checkbox" value="저녁" />
            <label className="ml-2">저녁</label>
          </div>
        </div>
        <div className="flex w-1/3 mt-5 flex-col justify-center items-center">
          <label>목적</label>
          <div className="flex flex-row">
            <input type="radio" value="다이어트" checked={purpose === "다이어트"} onChange={(e) => setPurpose(e.target.value)} />
            <label className="ml-2">다이어트</label>
          </div>
          <div className="flex flex-row">
            <input type="radio" value="체중유지" checked={purpose === "체중유지"} onChange={(e) => setPurpose(e.target.value)} />
            <label className="ml-2">체중 유지</label>
          </div>
          <div className="flex flex-row">
            <input type="radio" value="체중증량" checked={purpose === "체중증량"} onChange={(e) => setPurpose(e.target.value)} />
            <label className="ml-2">체중 증량</label>
          </div>
        </div>
        <div className="flex w-1/3 mt-5 flex-col justify-center items-center">
          <label>보유 질환</label>
          <div className="flex flex-row">
            <input type="checkbox" />
            <label className="ml-2">고혈압</label>
          </div>
          <div className="flex flex-row">
            <input type="checkbox" />
            <label className="ml-2">당뇨</label>
          </div>
          <div className="flex flex-row">
            <input type="checkbox" />
            <label className="ml-2">천식</label>
          </div>
        </div>
      </div> */}
      <div className="flex w-3/5 min-h-[100px] mt-5 border-black border-2 whitespace-pre-line p-3 rounded-lg">
        <label className="flex w-full h-full">{data && data}</label>
      </div>
    </CommonLayout>
  );
};

export default Index;
