import ExerciseScreen from "./exercise-screen";

const MotionLayout = ({ time, type, setNowCount, onClickStartButton, nowCount }) => {
  <>
    <div className="absolute w-1/3 h-[8%] text-3xl mb-[35%] bg-button justify-center items-center flex-col rounded-lg text-white shadow-shadow">
      <label className="flex w-full h-full justify-center items-center">다음 동작 :</label>
    </div>
    <div className="absolute ml-[66%] w-[200px] h-[200px] bg-black text-white rounded-full mb-5 text-7xl justify-center items-center">
      <label className="flex w-full h-full justify-center items-center">
        {time}
        <label className="flex text-lg">초</label>
      </label>
    </div>
    <div className="flex w-2/3 h-4/5 shadow-shadow bg-white justify-center items-center rounded-xl">
      <ExerciseScreen type={type} setNowCount={setNowCount} />
      <div className="flex mt-[42%] w-1/5 h-[10%] justify-center items-center bg-button rounded-lg shadow-shadow text-white flex-row text-2xl mx-10 opacity-80">
        <label className="flex w-1/2 h-full justify-center items-center">총 개수 :</label>
        <label className="flex w-1/4 h-3/5 bg-black text-white justify-center items-center ml-3 rounded-lg">{nowCount}</label>
      </div>
      <button
        className="flex mt-[42%] mx-10 w-[150px] h-[10%] justify-center items-center text-white rounded-lg bg-button text-2xl shadow-shadow"
        onClick={() => onClickStartButton()}
      >
        START
      </button>
    </div>
  </>;
};

export default MotionLayout;
