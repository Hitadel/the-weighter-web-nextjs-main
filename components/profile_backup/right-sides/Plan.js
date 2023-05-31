import { useState, useEffect } from "react";
import { request } from "../../../utils/request";
import CustomCalendar from "./utils/CustomCalendar";
import ExerciseChart from "./utils/ExerciseChart";
import NutritionChart from "./utils/NutritionChart";
import GptExerciseChart from "./utils/GptExerciseChart";
import GptNutritionChart from "./utils/GptNutritionChart";
import AiPlan from "./utils/AiPlan";

const ExerciseStat = () => {
  const [show, setShow] = useState("day");
  const [chartData, setChartData] = useState("");
  const [planData, setPlanData] = useState("");
  const [listData, setListData] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("운동 선택");
  const options = ["squat", "pushup", "situp"];
  const [category, setCategory] = useState("exercise");
  const [showExerciseChart, setShowExerciseChart] = useState(false);
  const [showNutritionChart, setShowNutritionChart] = useState(false);

  const setShowNutritionChartHandler = () => {
    setShowNutritionChart(true);
  };

  const setShowExerciseChartHandler = () => {
    setShowExerciseChart(true);
  };

  const setCategoryHandler = (e) => {
    setCategory(e.target.value);
  };

  const setIsOpenHandler = () => {
    setIsOpen(!isOpen);
  };

  const setSelectedItemHandler = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  
  const adjustData = async (show, date) => {
    let result, resultGpt, aiPlan
    let resultPromise = new Promise((resolve, reject) => {
      request()
      .post("profile/chart", { period: show, date, category, type: selectedItem })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
    })
    let resultGptPromise = new Promise((resolve, reject) => {
      request()
      .post("profile/chart", {period: show, date, category: category+"Plan", type: selectedItem })
      .then((res) => {
        resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
      });
    
    let resultAiPlanPromise = new Promise((resolve, reject) => {
      request()
      .post("profile/aiPlan", {period: show, date, category: category+"Plan", type: selectedItem})
      .then((res) => {
        resolve(res.data);
      }).catch((err) => {
        reject(err);
      })

    })

      try {
        result = await resultPromise;
        resultGpt = await resultGptPromise;
        aiPlan = await resultAiPlanPromise;
      } catch (err) {
        console.log("에러")
        return;
      }
      setChartData(chartFramework(show, result))
      setPlanData(chartFramework(show, resultGpt))
      setListData(aiPlan);
    }

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
          } else
          if (category == "nutrition")
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
        return(newData)
      };
      
  return (
    <div className='flex flex-col w-full h-full p-5 overflow-auto text-black bg-gray-400 dark:bg-gray-700'>
      <ul className='flex justify-center w-1/5 mt-5 text-sm font-medium text-gray-900 rounded-lg sm:flex dark:text-white'>
          <li className='w-full border-b-0 border-r border-gray-200 dark:border-gray-600'>
            <div className='flex items-center pl-3 rounded-l-lg bg-white'>
              <input
                id='checkbox-exercise'
                type='radio'
                name='category'
                value='exercise'
                checked={category === "exercise"}
                onChange={setCategoryHandler}
                className='w-4 h-4 text-blue-600 border-gray-300 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:border-gray-500'
                />
              <label htmlFor='checkbox-exercise' className='w-full py-3 ml-2 text-sm font-medium text-gray-900'>
                운동
              </label>
            </div>
          </li>
          <li className='w-full border-gray-200 dark:border-gray-600'>
            <div className='flex items-center pl-3 rounded-r-lg bg-white'>
              <input
                id='checkbox-category'
                type='radio'
                name='category'
                value='nutrition'
                checked={category === "nutrition"}
                onChange={setCategoryHandler}
                className='w-4 h-4 text-blue-600 border-gray-300 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:border-gray-500'
              />
              <label htmlFor='checkbox-category' className='w-full py-3 ml-2 text-sm font-medium text-gray-900 rounded-r-lg'>
                식단
              </label>
            </div>
          </li>
        </ul>
      <div className='flex flex-col w-[35vh]'>
      <div className='flex flex-row'>
          {['year', 'month', 'week', 'day'].map((type) => (
            <button
              key={type}
              className={`flex w-1/4 h-full bg-gray-200 rounded-tl-lg rounded-tr-lg p-5 flex-col hover:bg-hover hover:transition
                ${show === type ? "bg-blue-500" : ""}`}
              onClick={(e) => setShow(type)}
            >
              {type === "year" && "연간"}
              {type === "month" && "월간"}
              {type === "week" && "주간"}
              {type === "day" && "일간"}
            </button>
          ))}
        </div>
          <CustomCalendar
            show={show}
            adjustData={adjustData}
          />
      </div>
      <div className='items-center mt-5'>
      {category == "exercise" ?
        <div className='relative z-50'>
        <div className='relative z-50'>
          <div className={`flex items-center justify-between px-4 py-2 border border-gray-300 bg-white cursor-pointer`} onClick={setIsOpenHandler}>
            {selectedItem ? selectedItem : "운동 선택"}
            <svg xmlns='http://www.w3.org/2000/svg' className={`h-5 w-5 ${isOpen ? "transform rotate-180" : ""}`} viewBox='0 0 20 20' fill='currentColor'>
              <path fillRule='evenodd' d='M10 14l6-6H4l6 6z' />
            </svg>
          </div>
          {isOpen && (
            <div className='absolute w-full border border-gray-300 top-full'>
              {options.map((option, index) => (
                <div
                  key={index}
                  className={`px-4 py-2 cursor-pointer ${selectedItem === option ? "bg-blue-500 text-white" : "bg-white"}`}
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
        <ExerciseChart
        show = {show}
        chartData = {chartData} 
        />
      <ul>
        <li
          className="flex items-center justify-center p-3 my-5 text-sm text-white rounded-lg cursor-pointer lg:w-full lg:h-full lg:p-2 lg:text-lg bg-button dark:bg-darkButton hover:bg-hover dark:hover:bg-hover active:bg-button dark:active:bg-darkButton"
          onClick={setShowExerciseChartHandler}
        >
          운동 계획
        </li>
      </ul>
      {showExerciseChart && 
  <>
    <GptExerciseChart show={show} planData={planData} />

    {listData.length > 0 ? (
      <AiPlan listData = {listData} category={category}/>
      ) : (
        <p className="text-white mt-5 text-center">현재 계획이 없습니다.</p>
      )}
    </>
    }
      </div>
      : 
      <>
      <NutritionChart
      show = {show}
      chartData = {chartData}
      />
      <ul>
        <li
          className="flex items-center justify-center p-3 my-5 text-sm text-white rounded-lg cursor-pointer lg:w-full lg:h-full lg:p-2 lg:text-lg bg-button dark:bg-darkButton hover:bg-hover dark:hover:bg-hover active:bg-button dark:active:bg-darkButton"
          onClick={setShowNutritionChartHandler}
        >
          식단 계획
        </li>
      </ul>
      {showNutritionChart && 
      <>
      <GptNutritionChart show={show} planData={planData} />

      {listData.length > 0 ? (
      <AiPlan listData = {listData} category={category}/>
      ) : (
        <p className="text-white mt-5 text-center">현재 계획이 없습니다.</p>
      )}
    </>}
      </>
    }
    </div>
    </div>
  );
};

export default ExerciseStat;
