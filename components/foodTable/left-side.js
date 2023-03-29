import Image from "next/image"
import camera from "../../public/camera.png"
const LeftSide = () => {
  return (
    <div className='flex flex-col w-[40%] h-full items-center justify-center'>
      <label className='flex flex-col w-[80%] h-[50%] items-center justify-center bg-neutral-200 rounded-2xl shadow-shadow cursor-pointer'>
        <Image src={camera} width={180} height={180} alt='camera' />
        여기를 눌러 이미지를 첨부합니다.
        <input type='file' className='hidden' accept='image/*' />
      </label>

      <div className='flex flex-row w-[90%] justify-around'>
        <button className='flex w-36 h-12 items-center justify-center bg-button rounded-lg shadow-shadow mt-7 text-white text-[15px] hover:bg-hover hover:transition'>식탁 분석</button>
        <button className='flex w-36 h-12 items-center justify-center bg-button rounded-lg shadow-shadow mt-7 text-white text-[15px] hover:bg-hover hover:transition'>정보 등록</button>
      </div>
    </div>
  )
}

export default LeftSide
