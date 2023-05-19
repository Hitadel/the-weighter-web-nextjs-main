const Background = ({ children }) => {
  return (
    <>
      <div className='mb-10 text-3xl font-bold text-black'>식단 분석</div>
      <div className='flex w-4/5 h-[80%] bg-white rounded-2xl items-center justify-center shadow-shadow text-black'>{children}</div>
    </>
  )
}

export default Background
