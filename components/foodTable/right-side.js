const RightSide = ({ data }) => {
  data = false
  return (
    <div className='flex flex-col w-3/5 h-full items-start justify-center'>
      <div className='flex w-[15%] h-12 bg-gray-400 items-center justify-center text-[25px] rounded-lg mb-5'>
        <div className='flex items-center justify-center '>분석 결과</div>
      </div>
      <div className='flex flex-col w-[90%] h-4/5 bg-gray-200 rounded-lg p-5'>
        {data ? (
          <>
            <div className='flex flex-row w-full h-1/5 items-center justify-between overflow-auto'>
              <div className='flex w-1/2 h-12 items-center justify-center bg-zinc-400 rounded-lg mx-2 hover:bg-hover cursor-pointer hover:transition'>{"A객체"}</div>
              <div className='flex w-1/2 h-12 items-center justify-center bg-zinc-400 rounded-lg mx-2 hover:bg-hover cursor-pointer hover:transition'>{"B객체"}</div>
              <div className='flex w-1/2 h-12 items-center justify-center bg-zinc-400 rounded-lg mx-2 hover:bg-hover cursor-pointer hover:transition'>{"C객체"}</div>
              <div className='flex w-1/2 h-12 items-center justify-center bg-zinc-400 rounded-lg mx-2 hover:bg-hover cursor-pointer hover:transition'>{"D객체"}</div>
            </div>
            <div className='flex flexscol w-full h-[70%] bg-gray-400 rounded-lg items-start justify-start'>
              <div className='flex w-full h-[20%] items-center justify-start pl-5 text-2xl bg-gray-500 rounded-t-lg text-white'>{"선택된 객체"}</div>
              <div className='relative flex-col w-full h-full items-start ml-5 overflow-auto'>
                <div className='flex w-[90%] h-12 items-center bg-gray-300 rounded-lg my-5 pl-5'>이름: {""}</div>
                <div className='flex w-[90%] h-12 items-center bg-gray-300 rounded-lg my-5 pl-5'>영양1: {"정보"}</div>
                <div className='flex w-[90%] h-12 items-center bg-gray-300 rounded-lg my-5 pl-5'>영양2: {"정보"}</div>
                <div className='flex w-[90%] h-12 items-center bg-gray-300 rounded-lg my-5 pl-5'>영양3: {"정보"}</div>
                <div className='flex w-[90%] h-12 items-center bg-gray-300 rounded-lg my-5 pl-5'>영양4: {"정보"}</div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className='flex text-2xl mt-5 font-bold'>분석 데이터가 없습니다.</div>
          </>
        )}
      </div>
    </div>
  )
}

export default RightSide
