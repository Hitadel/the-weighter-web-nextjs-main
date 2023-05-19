// 운동추천 자식 컴포넌트
import axios from "axios";
import { useState, useEffect } from "react";

// props.gender 구조분해할당
const TrainingRecommend = ({ gender, age, height, weight }) => {
  const [activated, setActivated] = useState(false); // 로딩 버튼
  // pages/training/recommend에서 받아온 prop값인 gender : 정상적으로 받아오는 것 확인
  // 원랜 gender = props.gender, props.status처럼 받아와야 하지만 겍체 구조 분해 할당을 통해 위처럼 받아옴
  const [res, setRes] = useState({
    // 입력값 변수
    flag: 1,
    ...{ gender, age, height, weight },
    goalWeight: "",
    training: "",
    buttonType:0,
    dateString:"",
  });
  const [data, setData] = useState(""); // chatGPT 응답값 변수
  // const [plan, setPlan] = useState(""); // Json형태로 반환된 운동계획
  
  useEffect(() => {
    setRes((prevState) => ({ ...prevState, gender: gender, age: age, height: height, weight: weight }));
  }, [gender, age, height, weight]); // 성별, 스테이터스가 props로 넘어올때마다(props.gender가 변동 있을때 마다)

  const onClickSubmitButton = (e) => {// 입력버튼 누르면
    e.preventDefault();
    setActivated(true);
    if(e.target.id === 'button1'){ // 운동 추천
      console.log("운동 추천")
      // 현재 날짜를 가져오기 위해 Date 객체 생성
      const date = new Date();
      // 날짜와 시간 정보를 가져오기
      const year = date.getFullYear(); // 연도
      const month = date.getMonth() + 1; // 월 (0부터 시작하므로 1을 더해줌)
      const day = date.getDate(); // 일
      const dayOfWeek = ["일요일","월요일","화요일","수요일","목요일","금요일","토요일"][date.getDay()];
      // 문자열 생성
      const dateString = `${year}.${month}.${day} ${dayOfWeek}`;
      const newRes = { ...res, buttonType: 0, dateString}
      setRes(newRes)
      // prompt 변수에 res값을 담아서 포스트요청(api/chat.ts로)
      axios.post("/api/chat", { prompt:newRes }).then((res) => {
        setData(res.data.response.replace(/^\n+/, "")); // chat.ts에서 응답받은 요청값을 data에 셋팅, 문장 맨 앞 줄바꿈 제거
        setActivated(false);
      });
    }else if(e.target.id === 'button2'){ // 계획 반영
      console.log("계획 반영")
      const newRes = { ...res, buttonType: 1}
      setRes(newRes)
      axios.post("/api/chat", { prompt: newRes, data: data}).then((res) => {
        const planJSON = JSON.parse(res.data.response.replace(/^\n+/, "")); // chat.ts에서 응답받은 요청값을 plan에 셋팅, 문장 맨 앞 줄바꿈 제거
        console.log('planJSON',planJSON);
        // 위 코드에서 변환된 JSON 객체를 서버로 전송하는 부분을 추가
        request()
          .post("/planner/exercise", { plan: planJSON })
          .then((res) => {console.log("Plan sent to server:", res.data);}).catch((err) => {
          console.error(err);
        });
        setActivated(false);
      });
    }
  };

  const handleChange = (e) => {
    // input value값 핸들러
    const { name, value } = e.target; // 발생한 이벤트의 name값과 value값을 구조할당분해, 변수로 지정
    setRes((prevState) => ({ ...prevState, [name]: value })); // prevState 매개변수를 사용해 이전 res값을 복사하고, 새로운 값을 업데이트, 기존 값들을 유지하며 업데이트
    // name에 []대괄호 친 것은 parameter를 사용하기 위함. []빼면 프로퍼티
  };

  return (
    <div className='flex flex-col items-center justify-center w-[80%] my-10 lg:my-0 lg:p-20 lg:flex-row'>
      <div className='flex flex-col items-center justify-center p-10 bg-gray-200 rounded-lg shadow-md lg:mr-20 dark:bg-gray-500 change'>
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
        <div className='flex mb-2'>
          <div className='mr-2'>
            <label className='flex items-center'>
              <input type='radio' name='training' value='Cardio' onChange={handleChange} />
              <span className='ml-2'>유산소</span>
            </label>
          </div>
          <div>
            <label className='flex items-center'>
              <input type='radio' name='training' value='근력 운동' onChange={handleChange} />
              <span className='ml-2'>무산소(웨이트)</span>
            </label>
          </div>
        </div>
        <div className='flex flex-row mb-2'>
          <label htmlFor='age' className='flex items-center justify-center w-24 h-12 font-bold bg-gray-400 rounded-l-lg '>
            나이
          </label>
          <input
            type='text'
            name='age'
            id='age'
            value={res.age}
            className='px-4 py-2 leading-tight bg-white border-2 border-l-0 border-gray-400 rounded-r-lg appearance-none dark:bg-gray-700 focus:outline-none focus:bg-white focus:border-blue-500'
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-row mb-2'>
          <label htmlFor='height' className='flex items-center justify-center w-24 h-12 font-bold bg-gray-400 rounded-l-lg '>
            키
          </label>
          <input
            type='text'
            name='height'
            id='height'
            value={res.height}
            className='px-4 py-2 leading-tight bg-white border-2 border-l-0 border-gray-400 rounded-r-lg appearance-none dark:bg-gray-700 focus:outline-none focus:bg-white focus:border-blue-500'
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-row mb-2'>
          <label htmlFor='weight' className='flex items-center justify-center w-24 h-12 font-bold bg-gray-400 rounded-l-lg '>
            체중(kg)
          </label>
          <input
            type='text'
            name='weight'
            id='weight'
            value={res.weight}
            className='px-4 py-2 leading-tight bg-white border-2 border-l-0 border-gray-400 rounded-r-lg appearance-none dark:bg-gray-700 focus:outline-none focus:bg-white focus:border-blue-500'
            onChange={handleChange}
          />
        </div>
        <div className='flex flex-row mb-2'>
          <label htmlFor='goalWeight' className='flex items-center justify-center w-24 h-12 font-bold bg-gray-400 rounded-l-lg '>
            목표 체중(kg)
          </label>
          <input
            type='text'
            name='goalWeight'
            className='px-4 py-2 leading-tight bg-white border-2 border-l-0 border-gray-400 rounded-r-lg appearance-none dark:bg-gray-700 focus:outline-none focus:bg-white focus:border-blue-500'
            onChange={handleChange}
          />
        </div>
        <button id='button1' className='flex flex-row items-center justify-center px-4 py-2 font-bold text-white rounded-lg bg-button dark:bg-darkButton hover:bg-hover dark:hover:bg-hover active:bg-button dark:active:bg-darkButton focus:outline-none focus:shadow-outline' onClick={onClickSubmitButton}>
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
      <div className='flex w-[90%] lg:w-full min-h-[100px] p-20 mt-5 bg-white dark:bg-gray-700 border-gray-400 dark:border-gray-400 border-2 whitespace-pre-line rounded-lg overflow-auto change'>
        <label className='flex w-full h-full '>{data && data}</label>
        {/* {data & data} 3항연산자 왼쪽 값이 참이면 오른쪽 값 표시 */}
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

export default TrainingRecommend;
