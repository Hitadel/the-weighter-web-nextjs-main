const AbsoluteArea = ({ step, time }) => {
  return (
    <div className="flex w-full h-[88vh] justify-center items-center border-b-1 flex-col bg-neutral-200 rounded-lg">
      <div className="absolute w-1/3 h-[8%] text-3xl left-[33%] top-[12%] bg-button justify-center items-center flex-col rounded-lg text-white shadow-shadow">
        <label className="flex w-full h-full justify-center items-center">다음 동작 : {step === 1 ? "↑" : "↓"}</label>
      </div>
      <div className="absolute right-[11.5%] w-[200px] h-[200px] bg-black text-white rounded-full mb-5 text-7xl justify-center items-center">
        <label className="flex w-full h-full justify-center items-center">
          {time}
          <label className="flex text-lg">초</label>
        </label>
      </div>
    </div>
  );
};

export default AbsoluteArea;
