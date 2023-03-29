const LeftSide = () => {
  return (
    <div className='flex w-1/4 h-[70%] bg-white rounded-2xl items-center justify-center shadow-shadow mr-20 text-black'>
      <div className='flex w-[50%] h-full flex-col items-center justify-center'>
        <div className='flex mb-32'>{"이미지"}</div>
        <div>이름:{"이름"}</div>
        <div>성별:{"성별"}</div>
        <div>이메일 주소:{"test@test.com"}</div>
        <div className='flex items-center justify-center '>
          <div>전화 번호:{"010-0000-0000"}</div>
          <button className='flex w-12 h-12 items-center justify-center bg-button rounded-lg shadow-shadow mt-7 text-white text-[15px] hover:bg-hover hover:transition'>변경</button>
        </div>
        <button className='flex w-36 h-12 items-center justify-center bg-button rounded-lg shadow-shadow mt-7 text-white text-[15px] hover:bg-hover hover:transition'>비밀번호 변경</button>

        <div className='flex w-full flex-row justify-around'>
          <button className='flex w-36 h-12 items-center justify-center bg-button rounded-lg shadow-shadow mt-7 text-white text-[15px] hover:bg-hover hover:transition'>정보 수정</button>
        </div>
      </div>
    </div>
  )
}

export default LeftSide
