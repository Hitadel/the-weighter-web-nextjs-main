import Image from "next/image";
import img from "../../public/info2.png";

const Info2 = () => {
  return (
    <div className='flex lg:w-[60vw] h-[50vh] lg:h-[40vh] rounded-2xl shadow-shadow ml-10 mr-5 lg:ml-[10%] my-10 change select-none'>
      <div>
        <Image src={img} className='object-cover lg:w-[40vh] h-full rounded-l-lg' alt='info2' />
      </div>
      <div className='flex flex-col w-full h-full'>
        <div className='flex items-center h-1/4 w-full p-2.5 bg-gray-300 dark:bg-gray-500 text-xl lg:text-2xl font-bold rounded-tr-lg'>
          <label className='ml-5'>바코드를 촬영하여 영양 성분 확인</label>
        </div>
        <div className='flex flex-col items-center justify-center w-full bg-white rounded-br-lg h-3/4 dark:bg-gray-700 lg:text-lg'>
          <label className='px-5'>식품에 붙어 있는 바코드를 촬영할 시 식별번호를 확인 후 해당 식품의 영양 성분을 확인할 수 있습니다.</label>
        </div>
      </div>
    </div>
  );
};

export default Info2;
