import ExerciseScreen from "./exercise-screen";

const InsideBox = ({ type, setNowCount, nowCount, onClickStartButton, isReady, time, isFull, setIsFull }) => {
  return (
    <div className={`flex flex-col items-center ${isFull ? "w-[60%] flex-col justify-end" : "w-[70%] justify-center"} h-[85vh] bg-white dark:bg-gray-600 shadow-shadow rounded-xl`}>
      <ExerciseScreen type={type} setNowCount={setNowCount} isReady={isReady} time={time} isFull={isFull} setIsFull={setIsFull} />
      <div className={`flex ${isFull ? "flex-row" : "flex-col mt-5"} items-center justify-center h-`}>
        <div className='z-10 flex flex-row items-center justify-center w-full h-full p-2 mx-10 text-2xl text-white rounded-lg bg-button shadow-shadow'>
          <label className='flex items-center justify-center w-[50%] h-full'>총 개수 :</label>
          <label className='flex items-center justify-center ml-3 text-white bg-black rounded-lg w-[40%] h-full'>{nowCount}</label>
          <button
            className='flex items-center justify-center w-[50%] h-full ml-5 border-l border-black'
            onClick={() => {
              console.log(isFull);
              setIsFull(!isFull);
            }}
          >
            전체화면
          </button>
        </div>
        <button
          className={`flex ${isFull ? "w-[250px] h-full" : "w-[150px] h-[100px] my-5"}  justify-center items-center text-white rounded-lg bg-button text-2xl shadow-shadow  z-10`}
          onClick={() => onClickStartButton()}
        >
          START
        </button>
      </div>
    </div>
  );
};

export default InsideBox;
