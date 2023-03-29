import Image from "next/image";
import img from "../../public/info2.png";

const Info2 = () => {
  return (
    <div className="flex justify-center items-center rounded-2xl shadow-shadow ml-[5%] m-4">
      <div className="flex w-[12vw] h-[12vw] rounded-l-lg">
        <Image src={img} className="w-full" alt="info2" />
      </div>
      <div className="flex w-[60vw] h-[12vw] flex-col">
        <div className="flex w-full h-1/4 p-2.5 bg-gray-300 text-[20px] font-[550] rounded-tr-lg">
          <label className="ml-5">바코드를 촬영하여 영양 성분 확인</label>
        </div>
        <div className="flex w-full h-[80%] bg-white justify-center items-center flex-col text-[18px] rounded-br-lg">
          <label>식품에 붙어 있는 바코드를 촬영할 시 식별번호를 확인 후 해당 식품의 영양 성분을 확인할 수 있습니다.</label>
        </div>
      </div>
    </div>
  );
};

export default Info2;
