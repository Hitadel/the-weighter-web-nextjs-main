import Image from "next/image";
import banner from "../../public/banner.png";

const Banner = () => {
  return (
    <div className='flex w-full items-center justify-center text-[30px] text-white select-none overflow-hidden'>
      <div className='flex items-center justify-center w-full h-full duration-700 hover:scale-105'>
        <Image src={banner} className='flex items-center justify-center w-full h-[500px] object-cover' alt='banner' />
        <div className='absolute items-center justify-center'>일상에서 찾아가는 건강</div>
      </div>
    </div>
  );
};

export default Banner;
