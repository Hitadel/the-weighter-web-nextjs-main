import ExerciseScreen from "./exercise-screen";

const InsideBox = ({ type, setNowCount, nowCount, onClickStartButton, isReady, time, isFull, setIsFull }) => {
  return (
    <div className='flex items-center justify-center w-2/3 bg-white h-4/5 shadow-shadow rounded-xl'>
      <ExerciseScreen type={type} setNowCount={setNowCount} isReady={isReady} time={time} isFull={isFull} setIsFull={setIsFull} />
      <div className='flex mt-[42%] w-1/3 h-[10%] justify-center items-center bg-button rounded-lg shadow-shadow text-white flex-row text-2xl mx-10 opacity-80'>
        <label className='flex items-center justify-center w-1/4 h-full'>총 개수 :</label>
        <label className='flex items-center justify-center w-1/4 ml-3 text-white bg-black rounded-lg h-3/5'>{nowCount}</label>
        <button
          className='flex items-center justify-center w-1/3 h-full ml-10 border-l border-black'
          onClick={() => {
            console.log(isFull);
            setIsFull(!isFull);
          }}
        >
          전체화면
        </button>
      </div>
      <button className='flex mt-[42%] mx-10 w-[150px] h-[10%] justify-center items-center text-white rounded-lg bg-button text-2xl shadow-shadow' onClick={() => onClickStartButton()}>
        START
      </button>
    </div>
  );
};

export default InsideBox;
