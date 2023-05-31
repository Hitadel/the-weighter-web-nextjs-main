import Image from "next/image";
import banner from "../../public/banner.png";

const Banner = () => {
  return (
    <div className='flex w-full items-center justify-center text-[30px] text-white select-none overflow-hidden'>
      <div className='flex items-center justify-center w-full h-full duration-300 hover:scale-105'>
        <Image src={banner} className='flex items-center justify-center w-full h-[650px] object-cover' alt='banner' priority />
        <div className='absolute left-[12%] items-center justify-center drop-shadow-lg italic'>
          <div className='text-[80px]'>weighter</div>
          일상에서 찾아가는 건강.
        </div>
      </div>
    </div>
  );
};

export default Banner;
