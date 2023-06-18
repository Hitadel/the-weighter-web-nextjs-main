const Background = ({ children }) => {
  return (
    <>
      <div className='flex flex-col items-center justify-center w-full lg:w-[80%] h-full bg-white dark:bg-[#1f2023] dark:border-x-[#2d2f34] border-[#ccc] border-y-0 border-[1px] change'>
        {children}
      </div>
    </>
  );
};

export default Background;
