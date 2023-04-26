const Background = ({ children }) => {
  return (
    <>
      <div className='justify-center m-5 text-3xl font-bold text-black select-none dark:text-white'>바코드 분석</div>
      <div className='flex flex-col lg:flex-row items-center justify-center w-4/5 h-full lg:h-[78.2vh] mb-5 bg-white dark:bg-gray-500 rounded-2xl shadow-shadow'>{children}</div>
    </>
  );
};

export default Background;
