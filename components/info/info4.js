import { useState } from "react";
import useInterval from "../../utils/useInterval";
import Image from "next/image";
import img1 from "../../public/info4.png";
import img2 from "../../public/info5.png";

const Info4 = () => {
  const [id, setId] = useState(undefined);
  const [menu, setMenu] = useState("");
  const [text, setText] = useState("");
  const [compo, setCompo] = useState([""]);
  const [landingTitle, setLandingTitle] = useState("");
  const [count, setCount] = useState(0);

  // 受信するデータ
  const list = [
    { id: 0, menu: "평가 기준", text: "국내 남녀 각 운동의 건강 체력기준은 다음과 같습니다.", compo: [] },
    { id: 1, menu: "소방 공무원", text: "소방 공무원 시험 기준은 다음과 같습니다.", compo: [] },
    { id: 2, menu: "경찰 공무원", text: "경찰 공무원 필수 자격은 다음과 같습니다.", compo: ["내용1", "내용2", "내용3"] },
    { id: 3, menu: "테스트", text: "overflow test / ".repeat(200), compo: [] },
    { id: 4, menu: "테스트", text: "overflow test / ".repeat(200), compo: [] },
  ];

  // タイピング効果
  useInterval(() => {
    if (count >= text.length) {
      return;
    }

    setLandingTitle((prev) => {
      let result = prev ? prev + text[count] : text[0];

      setCount((prev) => prev + 1);

      return result;
    });
  }, 15);

  const onClickHandler = (v) => {
    setLandingTitle("");
    setCount(0);
    setId(v.id);
    setMenu(v.menu);
    setText(v.text);
    setCompo(v.compo);

    console.log(v);
    console.log(v.compo);
  };

  return (
    <>
      <div className='flex items-center justify-center text-3xl select-none m-7'>기준표</div>
      <div className='flex lg:flex-row flex-col my-5 items-center justify-center w-full lg:w-[70%] lg:h-[79.9vh] shadow-shadow'>
        {/* 左側 */}
        <ul className='flex flex-row lg:flex-col px-5 w-full lg:w-[50vh] lg:m-0 h-full items-center justify-around bg-white dark:bg-gray-700 lg:rounded-l-lg lg:rounded-r-none rounded-lg text-lg font-bold change select-none'>
          {list.map((v, idx) => {
            return (
              <li
                className='flex items-center justify-center p-3 my-5 text-sm text-white rounded-lg cursor-pointer lg:w-full lg:h-full lg:p-2 lg:text-lg bg-button dark:bg-darkButton hover:bg-hover dark:hover:bg-hover active:bg-button dark:active:bg-darkButton'
                key={idx}
                onClick={() => {
                  onClickHandler(v);
                }}
              >
                {v.menu}
              </li>
            );
          })}
        </ul>
        {/* 右側 */}
        <div className='flex flex-col w-full h-[80vh] lg:mt-0 mt-5 p-10 overflow-auto text-xl font-bold bg-gray-300 lg:rounded-l-none lg:rounded-r-lg rounded-lg lg:h-full dark:bg-gray-500 change'>
          {menu ? (
            <div className='flex lg:w-[20vw] p-2 lg:p-5 items-center justify-center rounded-lg drop-shadow lg:text-3xl bg-white dark:bg-gray-400 mb-10 select-none'>{menu}</div>
          ) : (
            <div className='flex items-center justify-center'>메뉴를 눌러 확인해 보세요.</div>
          )}
          <div className='mb-10 text-sm lg:text-lg'>{landingTitle}</div>
          {id == 0 ? <Image src={img1} alt='info4' /> : id == 1 ? <Image src={img2} alt='info5' /> : <></>}
          {/* 追加機能  */}
          {compo.map((v, idx) => {
            return (
              <div key={idx} className='my-2 lg:text-2xl'>
                {v}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Info4;
