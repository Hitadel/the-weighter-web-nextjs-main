const RightSide = ({ showData }) => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full lg:w-3/5 change'>
      <div className='flex w-[90%] h-4/5 dark:bg-gray-700 bg-gray-200 rounded-lg p-5 flex-col overflow-auto'>
        <div className='flex lg:w-[10vw] p-5 h-14 dark:bg-gray-500 bg-gray-400 items-center justify-center text-[25px] rounded-lg text-[550] mb-5 whitespace-nowrap select-none'>분석 결과</div>
        {showData ? (
          Object.keys(showData).map((value, key) => (
            <div key={showData.value} className='flex flex-row items-center justify-center w-full mb-5 h-2/5'>
              <div className='flex items-center justify-center h-10 bg-gray-400 w-[35%] lg:w-1/4 dark:bg-gray-500 text-sm lg:text-base'>{value}</div>
              <div className='flex items-center justify-center h-10 bg-white w-[65%] lg:w-2/4 dark:bg-gray-300 text-sm lg:text-base text-black'>
                {showData[value] === "N/A" ? 0.0 : showData[value]}
              </div>
            </div>
          ))
        ) : (
          <div className='flex p-5 text-3xl font-bold'>데이터가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default RightSide;
