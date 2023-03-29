import Image from "next/image";
import img from "../../public/info3.png";

const Info3 = () => {
  return (
    <div className="flex justify-center items-center rounded-2xl shadow-shadow mr-[5%] m-4">
      <div className="flex w-[12vw] h-[12vw] rounded-l-lg">
        <Image src={img} className="w-full" alt="info3" />
      </div>
      <div className="flex w-[60vw] h-[12vw] flex-col">
        <div className="flex w-full h-1/4 p-2.5 bg-gray-300 text-[20px] font-[550] rounded-tr-lg">
          <label className="ml-5">운동 정보 제공</label>
        </div>
        <div className="flex w-full h-[80%] bg-white justify-center items-center flex-col text-[18px] rounded-br-lg">
          <label>운동 코드, 홈 트레이닝 일상생활에서 손 쉽게 접근 가능한 운동 방법이나 자격증 취득을 위한 필수 조건,</label>
          <label>시험 내용 등의 정보를 사용자에게 제공합니다.</label>
        </div>
      </div>
    </div>
  );
};

export default Info3;
