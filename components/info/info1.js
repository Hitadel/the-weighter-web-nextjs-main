import Image from "next/image";
import img from "../../public/info1.png";

const Info1 = () => {
  return (
    <div className='flex lg:w-[60vw] h-[50vh] lg:h-[40vh] rounded-2xl drop-shadow-md ml-5 mr-10 lg:mr-[10%] my-10 change select-none'>
      <div>
        <Image src={img} className='object-cover lg:w-[40vh] h-full rounded-l-lg' alt='info1' />
      </div>
      <div className='flex flex-col w-full h-full '>
        <div className='flex items-center h-1/4 w-full p-2.5 bg-gray-200 dark:bg-[#383b40] text-xl lg:text-2xl font-bold rounded-tr-lg'>
          <label className='ml-5'>AI 식단 추천</label>
        </div>
        <div className='flex flex-col items-center justify-center w-full bg-white rounded-br-lg h-3/4 dark:bg-black lg:text-lg'>
          <label className='px-5'>사용자의 식단을 지속적으로 학습하여 AI가 평균적인 식단을 분석 후 사용자에게 부족한 영양소 등을 보충한 식단을 추천해 주어 편항적인 식습관을 개선할 수 있습니다.</label>
        </div>
      </div>
    </div>
  );
};

export default Info1;
