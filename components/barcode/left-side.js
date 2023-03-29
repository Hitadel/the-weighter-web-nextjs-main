import Image from "next/image";
import camera from "../../public/camera.png";
import { getName } from "../../utils/function/barcode";
const LeftSide = ({ src, setSrc, decode, barcode, setBarcode, setName, onClickSaveButton }) => {
  return (
    <div className="flex w-[30%] h-full flex-col items-center justify-center">
      {src ? (
        <Image src={src} width={200} height={200} className="w-full rounded-2xl" alt="src" />
      ) : (
        <label className="flex w-[20vw] h-[20vw] bg-neutral-200 rounded-2xl shadow-shadow items-center justify-center flex-col cursor-pointer">
          <Image src={camera} width={200} height={200} alt="camera" />
          이미지를 첨부합니다.
          <input type="file" className="hidden" accept="image/*" onChange={(e) => decode(e, setBarcode, setSrc)} />
        </label>
      )}
      <label>{barcode}</label>
      <div className="flex w-full flex-row justify-around">
        <button
          className="flex w-36 h-12 items-center justify-center bg-button rounded-lg shadow-shadow mt-7 text-white text-[15px] hover:bg-hover hover:transition"
          onClick={() => getName(barcode, setName)}
        >
          바코드 분석
        </button>
        <button
          className="flex w-36 h-12 items-center justify-center bg-button rounded-lg shadow-shadow mt-7 text-white text-[15px] hover:bg-hover hover:transition"
          onClick={onClickSaveButton}
        >
          영양정보 등록
        </button>
      </div>
    </div>
  );
};

export default LeftSide;
