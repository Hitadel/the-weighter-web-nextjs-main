import { useState, useEffect } from "react";

import Image from "next/image";
import leftImage from "../../public/leftImage.png";
import FindPassword from "./find_password"; // 비밀번호 찾기
import FoundPassword from "./found_password"; // 비밀번호 재등록

const InnerBox = () => {
  const [correct, setCorrect] = useState(false); // true 시 재등록 페이지
  const [email, setEmail] = useState(""); // 비밀번호 찾기에서 추가

  const getData = (param) => {
    setCorrect(true);
    setEmail(param);
  };

  return (
    <div className='flex flex-col lg:flex-row w-[90%] lg:w-[70%] h-[85vh] mb-10 bg-white dark:bg-neutral-500 justify-center items-center rounded-3xl'>
      <Image src={leftImage} className='flex w-full h-[30vh] object-center object-cover lg:w-[30%] lg:h-[80vh] rounded-t-3xl lg:rounded-tr-none lg:rounded-l-3xl' alt='leftImage' />
      {correct ? <FoundPassword email={email} /> : <FindPassword getData={getData} />}
    </div>
  );
};

export default InnerBox;
