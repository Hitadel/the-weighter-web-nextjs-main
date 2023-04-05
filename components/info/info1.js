import Image from "next/image"
import img from "../../public/info1.png"

const Info1 = () => {
  return (
    <div className='flex justify-center items-center rounded-2xl shadow-shadow mr-[5%] m-4 dark:text-black'>
      <div className='flex w-[12vw] h-[12vw] rounded-l-lg'>
        <Image src={img} className='w-full' alt='info1' />
      </div>
      <div className='flex w-[60vw] h-[12vw] flex-col'>
        <div className='flex w-full h-1/4 p-2.5 bg-gray-300 text-[20px] font-[550] rounded-tr-lg'>
          <label className='ml-5'>AI 식단 추천</label>
        </div>
        <div className='flex w-full h-[80%] bg-white justify-center items-center flex-col text-[18px] rounded-br-lg'>
          <label>사용자의 식단을 지속적으로 학습하여 AI가 평균적인 식단을 분석 후 사용자에게 부족한 영양소 등을 보충한</label>
          <label>식단을 추천해 주어 편항적인 식습관을 개선할 수 있습니다.</label>
        </div>
      </div>
    </div>
  )
}

export default Info1
