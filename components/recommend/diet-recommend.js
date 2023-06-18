import { request } from "../../utils/request";
import axios from "axios";
import { useState, useEffect } from "react";
import { parseData } from "./parseData";

const Recommend = ({ gender, age, height, weight, disease, allergy }) => {
  const [activated, setActivated] = useState(false); // ローディングボタン
  const [res, setRes] = useState({
    flag: 0,
    menus: "",
    gender,
    age,
    height,
    weight,
    disease,
    allergy,
    buttonType: 0,
    dateString: "",
  });

  useEffect(() => {
    setRes((prevState) => ({
      ...prevState,
      gender,
      age,
      height,
      weight,
      disease,
      allergy,
    }));
  }, [gender, age, height, weight, disease, allergy]); // 性別, ステータスpropsに移るたびに(props.genderが変動するたびに)

  const [data, setData] = useState(""); // 食生活の推奨された値が含まれています
  const onClickSubmitButton = async (e) => {
    e.preventDefault();
    setActivated(true);
    // 現在の日付を取得するためにDateオブジェクトを生成
    const date = new Date();
    // 日付と時刻の情報を取得
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"][date.getDay()];
    const dateString = `${year}.${month}.${day} ${dayOfWeek}`;
    const buttonType = e.target.id === "button1" ? 0 : 1;
    const newRes = { ...res, buttonType, dateString };
    setRes(newRes);
    if (e.target.id === "button1") {
      // おすすめボタンをクリック
      const response = await axios.post("/api/chat", { prompt: newRes });
      setData(response.data.response.replace(/^\n+/, ""));
    } else if (e.target.id === "button2") {
      const dateString = `${year}-${month}-${day}`;
      try {
        const response = await request().post("/planner/planCheck", { date: dateString, partition: "nutrition" });
        if (response.data.confirm === true) {
          console.log("계획 반영");
          try {
            const jsonData = parseData(data);
            await request().post("/planner/nutrition", { plan: jsonData });
            console.log("NutritionPlan sent to server");
            setActivated(false);
          } catch (err) {
            console.log(err);
          }
        } else if (response.data.confirm === false) {
          alert("해당 날짜에 이미 계획이 있습니다.");
          setActivated(false);
        }
      } catch (err) {
        console.error(err);
      }
    }
    setActivated(false);
  };

  const handleChange = (e) => {
    // input value値ハンドラ
    const { name, value } = e.target; //発生したイベントのname値とvalue値を分割代入、変数として指定
    setRes((prevState) => ({ ...prevState, [name]: value })); // prevStateパラメータを使用して以前のres値をコピーし、新しい値を更新、既存の値を維持しながらアップデート
    // nameに[]大括弧を打ったのはparameterを使うため。 []抜くとプロパテ
  };

  return (
    <div className='flex flex-col items-center justify-center w-full lg:w-[80%] my-10 lg:my-0 lg:flex-row bg-white dark:bg-[#1f2023] h-screen dark:border-x-[#2d2f34] border-[#ccc] border-y-0 border-[1px]'>
      <div className='flex flex-col items-center justify-center p-10 bg-gray-100 rounded-lg shadow-md lg:mx-10 dark:bg-[#383b40] change'>
        <div className='flex justify-center mb-2'>
          <div className='mr-2'>
            <label className='flex items-center'>
              <input type='radio' name='gender' value='남성' onChange={handleChange} checked={res.gender === "남성"} />
              <span className='ml-2'>남성</span>
            </label>
          </div>
          <div>
            <label className='flex items-center'>
              <input type='radio' name='gender' value='여성' onChange={handleChange} checked={res.gender === "여성"} />
              <span className='ml-2'>여성</span>
            </label>
          </div>
        </div>
        <div className='flex flex-row mb-2'>
          <label htmlFor='age' className='flex items-center justify-center w-24 h-12 font-bold bg-gray-200 dark:bg-[#1f2023]  rounded-l-lg '>
            나이
          </label>
          <input
            type='text'
            name='age'
            value={res.age}
            className='px-4 py-2 leading-tight bg-white border-2 border-l-0 border-gray-200 dark:bg-[#1f2023] rounded-r-lg appearance-none dark:bg-[#1f2023] focus:outline-none focus:bg-white focus:border-blue-500'
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-row mb-2'>
          <label htmlFor='height' className='flex items-center justify-center w-24 h-12 font-bold bg-gray-200 dark:bg-[#1f2023] rounded-l-lg '>
            키
          </label>
          <input
            type='text'
            name='height'
            value={res.height}
            className='px-4 py-2 leading-tight bg-white border-2 border-l-0 border-gray-200 dark:bg-[#1f2023] rounded-r-lg appearance-none dark:bg-[#1f2023] focus:outline-none focus:bg-white focus:border-blue-500'
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-row mb-2'>
          <label htmlFor='weight' className='flex items-center justify-center w-24 h-12 font-bold bg-gray-200 dark:bg-[#1f2023] rounded-l-lg '>
            체중(kg)
          </label>
          <input
            type='text'
            name='weight'
            value={res.weight}
            className='px-4 py-2 leading-tight bg-white border-2 border-l-0 border-gray-200 dark:bg-[#1f2023] rounded-r-lg appearance-none dark:bg-[#1f2023] focus:outline-none focus:bg-white focus:border-blue-500'
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-row mb-2'>
          <label htmlFor='disease' className='flex items-center justify-center w-24 h-12 font-bold bg-gray-200 dark:bg-[#1f2023] rounded-l-lg '>
            질병, 질환
          </label>
          <input
            type='text'
            name='disease'
            value={res.disease || ""}
            className='px-4 py-2 leading-tight bg-white border-2 border-l-0 border-gray-200 dark:bg-[#1f2023] rounded-r-lg appearance-none dark:bg-[#1f2023] focus:outline-none focus:bg-white focus:border-blue-500'
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-row mb-2'>
          <label htmlFor='allergy' className='flex items-center justify-center w-24 h-12 font-bold bg-gray-200 dark:bg-[#1f2023] rounded-l-lg '>
            알레르기
          </label>
          <input
            type='text'
            name='allergy'
            value={res.allergy || ""}
            className='px-4 py-2 leading-tight bg-white border-2 border-l-0 border-gray-200 dark:bg-[#1f2023] rounded-r-lg appearance-none dark:bg-[#1f2023] focus:outline-none focus:bg-white focus:border-blue-500'
            onChange={handleChange}
          />
        </div>
        <button
          id='button1'
          className='flex flex-row items-center justify-center px-4 py-2 font-bold text-white rounded-lg bg-button dark:bg-darkButton hover:bg-hover dark:hover:bg-hover active:bg-button dark:active:bg-darkButton focus:outline-none focus:shadow-outline'
          onClick={onClickSubmitButton}
        >
          {activated ? (
            <svg
              aria-hidden='true'
              className='w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black dark:fill-white'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='currentColor'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentFill'
              />
            </svg>
          ) : (
            <></>
          )}
          입력
        </button>
      </div>
      <div className='flex w-[90%] lg:w-full min-h-[200px] lg:min-h-[600px] p-20 mt-5 bg-white dark:bg-black mr-5 border-gray-200 dark:border-gray-600 border-2 whitespace-pre-line rounded-lg overflow-auto change'>
        <label className='flex w-full h-full'>{data && data}</label>
      </div>
      <div>
        {data && (
          <button id='button2' className='px-4 py-2 font-bold text-white bg-blue-500 rounded-lg hover:bg-blue-700 focus:outline-none focus:shadow-outline' onClick={onClickSubmitButton}>
            {activated ? (
              <svg
                aria-hidden='true'
                className='w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-black dark:fill-white'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
            ) : (
              <></>
            )}
            계획 반영
          </button>
        )}
      </div>
    </div>
  );
};

export default Recommend;
