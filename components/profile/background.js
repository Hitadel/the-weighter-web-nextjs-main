const Background = ({ children }) => {
  return (
    <div className='flex items-center justify-center w-full h-screen lg:w-[80%] bg-white dark:bg-[#1f2023] dark:border-x-[#2d2f34] border-[#ccc] border-y-0 border-[1px] lg:items-center '>
      {children}
    </div>
  );
};

export default Background;
