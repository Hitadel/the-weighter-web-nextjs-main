const AbsoluteArea = ({ step, time, setIsFull }) => {
  return (
    <div className='flex flex-col items-center justify-center w-full my-5 rounded-lg border-b-1'>
      <div className={`flex flex-col items-center justify-center ${setIsFull ? "w-[30%]" : "w-full"} h-full px-10 text-3xl text-white rounded-lg bg-button shadow-shadow z-10`}>
        <label className='flex items-center justify-center w-full h-full'>
          다음 동작 : <span className='z-10 ml-10 text-8xl'>{step === 1 ? "↑" : "↓"}</span>
        </label>
      </div>
      <div className={`absolute z-10 items-center justify-center ${setIsFull ? "top-[40%] right-[11%]" : "top-[8%] right-[9%]"}  w-[200px] h-[200px] mb-5 text-white bg-black rounded-full text-7xl`}>
        <label className='flex items-center justify-center w-full h-full'>
          {time}
          <label className='flex text-lg'>초</label>
        </label>
      </div>
    </div>
  );
};

export default AbsoluteArea;
