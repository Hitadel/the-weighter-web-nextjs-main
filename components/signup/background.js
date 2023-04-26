const Background = ({ children }) => {
  return <div className='flex items-center justify-center bg-center bg-cover lg:w-screen w-full h-[120vh] lg:h-screen bg-auth dark:text-white'>{children}</div>;
};

export default Background;
