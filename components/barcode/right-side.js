const RightSide = ({ showData }) => {
  return (
    <div className="flex w-3/5 h-full flex-col items-center justify-center">
      <div className="flex w-[90%] h-4/5 bg-gray-200 rounded-lg p-5 flex-col overflow-auto">
        <div className="flex w-[20%] h-[10%] p-5 bg-gray-400 items-center justify-center text-[25px] rounded-lg text-[550] mb-5">분석 결과</div>
        {showData ? (
          Object.keys(showData).map((value, key) => (
            <div key={showData.value} className="flex w-full h-2/5 justify-center items-center flex-row mb-5">
              <div className="flex w-1/4 h-10 justify-center items-center bg-gray-400">{value}</div>
              <div className="flex w-2/4 h-10 justify-center items-center bg-white">{showData[value] === "N/A" ? 0.0 : showData[value]}</div>
            </div>
          ))
        ) : (
          <div className="flex text-3xl font-bold">데이터가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default RightSide;
