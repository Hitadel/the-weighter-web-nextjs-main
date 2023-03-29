import Image from "next/image"
import leftImage from "../../public/leftImage.png"
import RightSide from "./right_side"

const InnerBox = () => {
  return (
    <div className='flex w-[55%] h-5/6 bg-white shadow-shadow justify-center items-center rounded-3xl'>
      <Image src={leftImage} alt='leftImage' />
      <RightSide />
    </div>
  )
}

export default InnerBox
