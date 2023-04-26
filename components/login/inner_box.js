import Image from "next/image";
import leftImage from "../../public/leftImage.png";
import RightSide from "./right_side";

const InnerBox = () => {
  return (
    <div className='flex flex-col lg:flex-row w-[90%] lg:w-[70%] h-[85vh] mb-10 bg-white dark:bg-neutral-500 justify-center items-center rounded-3xl'>
      <Image src={leftImage} className='flex w-full h-[30vh] object-center object-cover lg:w-[30%] lg:h-[80vh] rounded-t-3xl lg:rounded-tr-none lg:rounded-l-3xl' alt='leftImage' />
      <RightSide />
    </div>
  );
};

export default InnerBox;
