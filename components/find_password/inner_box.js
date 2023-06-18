import { useState, useEffect } from "react";

import Image from "next/image";
import leftImage from "../../public/leftImage.png";
import FindPassword from "./find_password"; // パスワードを検索
import FoundPassword from "./found_password"; // パスワードを再登録

const InnerBox = () => {
  const [correct, setCorrect] = useState(false); // true時の再登録ページ
  const [email, setEmail] = useState(""); // パスワード検索から追加

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
