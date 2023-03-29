const RightSide = () => {
  return (
    <div className='flex w-3/5 h-[95%] bg-white rounded-2xl items-center justify-center shadow-shadow text-black font-bold'>
      <div className='flex w-[90%] h-[90%] flex-col items-center justify-center'>
        <button className='flex w-full h-1/7 bg-gray-200 rounded-t-lg p-5 flex-col hover:bg-hover hover:transition'>신체 정보</button>
        <div className='flex w-full h-1/7 bg-gray-400 rounded-b-lg p-5 mb-10 flex-col overflow-auto'>
          <div>나이:{"살"}</div>
          <div>키:{"cm"}</div>
          <div>몸무게:{"kg"}</div>
          <div>질병:{""}</div>
          <div>알러지:{""}</div>
          <button className='flex w-20 h-12 items-center justify-center bg-button rounded-lg shadow-shadow mt-7 text-white text-[15px] hover:bg-hover hover:transition'>변경</button>
        </div>
        <button className='flex w-full h-1/7 bg-gray-200 rounded-t-lg p-5 flex-col hover:bg-hover hover:transition'>영양 기록</button>
        <div className='flex w-full h-1/7 bg-gray-400 rounded-b-lg p-5 mb-10 flex-col overflow-auto'>
          <div>{"달력"}</div>
          <div>{"막대그래프"}</div>
        </div>
        <button className='flex w-full h-1/7 bg-gray-200 rounded-t-lg p-5 flex-co  hover:bg-hover hover:transition'>운동 기록</button>
        <div className='flex w-full h-1/7 bg-gray-400 rounded-b-lg p-5 mb-10 flex-col overflow-auto'>
          <div>{"달력"}</div>
          <div>{"막대그래프"}</div>
        </div>
      </div>
    </div>
  )
}

export default RightSide
