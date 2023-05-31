import Image from "next/image";
import img from "../../public/info3.png";

const Info3 = () => {
  return (
    <div className='flex lg:w-[60vw] h-[50vh] lg:h-[40vh] rounded-2xl drop-shadow-md ml-5 mr-10 lg:mr-[10%] my-10 change select-none'>
      <div>
        <Image src={img} className='object-cover lg:w-[40vh] h-full rounded-l-lg' alt='info3' />
      </div>
      <div className='flex flex-col w-full h-full'>
        <div className='flex items-center h-1/4 w-full p-2.5 bg-gray-200 dark:bg-[#383b40] text-xl lg:text-2xl font-bold rounded-tr-lg'>
          <label className='ml-5'>운동 정보 제공</label>
        </div>
        <div className='flex flex-col items-center justify-center w-full bg-white rounded-br-lg h-3/4 dark:bg-black lg:text-lg'>
          <label className='px-5'>운동 코드, 홈 트레이닝 일상생활에서 손 쉽게 접근 가능한 운동 방법이나 자격증 취득을 위한 필수 조건, 시험 내용 등의 정보를 사용자에게 제공합니다.</label>
        </div>
      </div>
    </div>
  );
};

export default Info3;
