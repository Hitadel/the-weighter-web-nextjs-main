import Image from "next/image";
import camera from "../../public/camera.png";
import { getName } from "../../utils/function/barcode";
const LeftSide = ({ src, setSrc, decode, barcode, setBarcode, setName, onClickSaveButton }) => {
  return (
    <div className='flex flex-col items-center justify-center w-[70%] lg:w-[30%] h-full pt-10 pb-5 lg:py-0 change select-none'>
      {src ? (
        <Image src={src} width={200} height={200} className='w-full rounded-2xl' alt='src' />
      ) : (
        <label className='flex w-[50vw] lg:w-[20vw] lg:h-[20vw] dark:bg-neutral-400 bg-neutral-200 rounded-2xl  items-center justify-center flex-col cursor-pointer'>
          <Image src={camera} width={200} height={200} alt='camera' />
          이미지를 첨부합니다.
          <input type='file' className='hidden' accept='image/*' onChange={(e) => decode(e, setBarcode, setSrc)} />
        </label>
      )}
      <label>{barcode}</label>
      <div className='flex flex-row justify-around w-full'>
        <button
          className='flex w-36 h-12 mx-2 items-center justify-center dark:bg-darkButton bg-button active:bg-button dark:active:bg-darkButton rounded-lg  mt-7 text-white text-[15px] hover:bg-hover dark:hover:bg-hover hover:transition  whitespace-nowrap'
          onClick={() => getName(barcode, setName)}
        >
          바코드 분석
        </button>
        <button
          className='flex w-36 h-12 mx-2 items-center justify-center dark:bg-darkButton bg-button active:bg-button dark:active:bg-darkButton rounded-lg  mt-7 text-white text-[15px] hover:bg-hover dark:hover:bg-hover hover:transition whitespace-nowrap'
          onClick={onClickSaveButton}
        >
          영양정보 등록
        </button>
      </div>
    </div>
  );
};

export default LeftSide;
