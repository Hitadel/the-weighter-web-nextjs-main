import { useState, useEffect } from "react";
import { request } from "../../../utils/request";
import CustomCalendar from "./components/CustomCalendar";
import ExerciseChart from "./components/ExerciseChart";
import NutritionChart from "./components/NutritionChart";
import GptExerciseChart from "./components/GptExerciseChart";
import GptNutritionChart from "./components/GptNutritionChart";
import AiPlan from "./components/AiPlan";
import Choice from "./components/Choice";

const ExerciseStat = () => {
  const [show, setShow] = useState("day");
  const [chartData, setChartData] = useState("");
  const [planData, setPlanData] = useState("");
  const [listData, setListData] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("운동 선택");
  const options = ["squat", "pushup", "situp"];
  const [category, setCategory] = useState("exercise");

  const setIsOpenHandler = () => {
    setIsOpen(!isOpen);
  };

  const setSelectedItemHandler = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  const adjustData = async (show, date) => {
    let result, resultGpt, aiPlan;
    let resultPromise = new Promise((resolve, reject) => {
      request()
        .post("profile/chart", { period: show, date, category, type: selectedItem })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
    let resultGptPromise = new Promise((resolve, reject) => {
      request()
        .post("profile/chart", { period: show, date, category: category + "Plan", type: selectedItem })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });

    let resultAiPlanPromise = new Promise((resolve, reject) => {
      request()
        .post("profile/aiPlan", { period: show, date, category: category + "Plan", type: selectedItem })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });

    try {
      result = await resultPromise;
      resultGpt = await resultGptPromise;
      aiPlan = await resultAiPlanPromise;
    } catch (err) {
      console.log("에러");
      return;
    }
    setChartData(chartFramework(show, result));
    setPlanData(chartFramework(show, resultGpt));
    setListData(aiPlan);
  };

  const chartFramework = (show, result) => {
    let item, data;
    let input = [];
    let newData = [];

    switch (show) {
      case "week":
        input = new Array(7);
        break;
      case "day":
        input = new Array(4);
        break;
      case "year":
        input = new Array(12);
        break;
      case "month":
        input = new Array(31);
        break;
      default:
        return;
    }

    for (let i = 0; i < input.length; i++) {
      data = result[i].time;
      if (result) {
        const cho = result[i].cho * 4;
        const protein = result[i].protein * 4;
        const fat = result[i].fat * 9;
        if (category == "nutrition")
          item = {
            name: data,
            cho: cho,
            protein: protein,
            fat: fat,
            etc: result[i].calorie - (cho + protein + fat),
            createdAt: result[i].createdAt,
          };
        else
          item = {
            name: data,
            type: result[i].type,
            count: result[i].count,
            score: result[i].score,
            timer: result[i].timer,
            createdAt: result[i].createdAt,
          };
      } else if (category == "nutrition")
        item = {
          name: data,
          cho: 0,
          protein: 0,
          fat: 0,
          etc: 0,
          createdAt: "기록 없음",
        };
      else
        item = {
          name: data,
          type: "휴식",
          count: 0,
          score: 0,
          timer: 0,
          createdAt: "기록 없음",
        };
      newData.push(item);
    }
    return newData;
  };

  return (
    <div className='flex flex-col w-full h-full p-5 overflow-auto'>
      <div className='flex flex-col items-center justify-center'>
        {category == "exercise" ? (
          <div className='flex flex-row w-[50%]'>
            {/* 메뉴, 드롭 사이즈 */}
            <div className='z-50 flex w-full'>
              <Choice setCategory={setCategory} category={category} />
              <div className='flex flex-col w-[50%]'>
                <div className={`flex items-center justify-between px-4 py-2 border text-black border-gray-300 bg-white cursor-pointer`} onClick={setIsOpenHandler}>
                  {selectedItem ? selectedItem : "운동 선택"}
                  <svg xmlns='http://www.w3.org/2000/svg' className={`h-5 w-5 ${isOpen ? "transform rotate-180" : ""}`} viewBox='0 0 20 20' fill='currentColor'>
                    <path fillRule='evenodd' d='M10 14l6-6H4l6 6z' />
                  </svg>
                </div>
                {isOpen && (
                  <div className='relative border border-gray-300'>
                    {options.map((option, index) => (
                      <div
                        key={index}
                        className={`px-4 py-2 cursor-pointer ${selectedItem === option ? "bg-blue-500 " : "bg-white"}`}
                        onMouseEnter={() => setSelectedItem(option)}
                        onMouseLeave={() => setSelectedItem("")}
                        onClick={() => setSelectedItemHandler(option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className='w-[50%]'>
            <Choice setCategory={setCategory} category={category} />
          </div>
        )}
        {/* 캘린더 사이즈 */}
        <div className='flex flex-col w-[50%]'>
          <div className='flex flex-row'>
            {["year", "month", "week", "day"].map((type) => (
              <button
                key={type}
                className={`flex w-1/4 h-full bg-white dark:bg-gray-500 dark:hover:bg-hover p-5 flex-col hover:bg-hover hover:transition
                ${show === type ? "bg-blue-500 dark:bg-[#2d2f34]" : ""}`}
                onClick={(e) => setShow(type)}
              >
                {type === "year" && "연간"}
                {type === "month" && "월간"}
                {type === "week" && "주간"}
                {type === "day" && "일간"}
              </button>
            ))}
          </div>
          <CustomCalendar show={show} adjustData={adjustData} />
        </div>
      </div>

      <div className='items-center mt-5'>
        {category == "exercise" ? (
          <div className='relative z-50'>
            <div className='flex'>
              <ExerciseChart show={show} chartData={chartData} />
              <GptExerciseChart show={show} planData={planData} />
            </div>

            {listData.length > 0 ? <AiPlan listData={listData} category={category} /> : <p className='mt-5 text-center '>현재 계획이 없습니다.</p>}
          </div>
        ) : (
          <div>
            <div className='flex'>
              <NutritionChart show={show} chartData={chartData} />
              <GptNutritionChart show={show} planData={planData} />
            </div>
            {listData.length > 0 ? <AiPlan listData={listData} category={category} /> : <p className='mt-5 text-center '>현재 계획이 없습니다.</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseStat;
