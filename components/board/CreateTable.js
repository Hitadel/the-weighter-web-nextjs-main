import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { request } from "../../utils/request";

const CreateTable = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("default");
  const [content, setContent] = useState("");

  const onClickSubmitButton = () => {
    if (title && category && content) {
      request()
        .post("board/create", { title, category, content })
        .then((res) => {
          if (res.data.result) {
            router.push("/board");
          } else {
            alert("실패했습니다.");
          }
        })
        .catch((err) => console.error(err));
    } else {
      alert("제목, 내용을 모두 입력해주세요.");
    }
  };

  return (
    <div className='flex flex-col items-center justify-center w-[80%] h-[80vh] dark:bg-gray-500 bg-white border-2  dark:border-neutral-800 border-neutral-400 change'>
      <div className='flex items-center justify-between w-full border-b-2 h-[10%] dark:border-neutral-800 border-neutral-400'>
        <div className='flex items-center justify-center h-full border-r w-[10%] dark:bg-gray-700 dark:border-neutral-800 border-neutral-400 bg-gray-300'>제목</div>
        <input className='flex h-full px-5 w-[90%] outline-none' onChange={(e) => setTitle(e.target.value)} value={title} />
      </div>
      <div className='flex w-full h-[10%] justify-between dark:border-neutral-800 border-neutral-400 border-b-2 items-center'>
        <div className='flex w-[10%] h-full justify-center items-center dark:bg-gray-700 dark:border-neutral-800 border-neutral-400 border-r bg-gray-300'>카테고리</div>
        <div className='flex w-[90%] h-full justify-start items-center p-5 bg-gray-100 dark:bg-gray-500'>
          <input type='radio' value='default' checked={category === "default"} onChange={(e) => setCategory(e.target.value)} />
          <label className='flex ml-2 mr-5'>기본</label>
          <input type='radio' value='qna' checked={category === "qna"} onChange={(e) => setCategory(e.target.value)} />
          <label className='flex ml-2 mr-5'>QnA</label>
          <input type='radio' value='community' checked={category === "community"} onChange={(e) => setCategory(e.target.value)} />
          <label className='flex ml-2'>커뮤니티</label>
        </div>
      </div>
      <div className='flex w-full h-[70%] justify-between dark:border-neutral-800 border-neutral-400 border-b items-center'>
        <div className='flex w-[10%] h-full justify-center items-center dark:bg-gray-700 dark:border-neutral-800 border-neutral-400 border-r bg-gray-300'>내용</div>
        <textarea className='flex w-[90%] h-full p-5 resize-none outline-none' onChange={(e) => setContent(e.target.value)} value={content} />
      </div>
      <div className='flex w-full h-[10%] justify-start dark:border-neutral-800 border-neutral-400 border-b items-center dark:bg-gray-700 bg-gray-300'>
        <button
          className='flex items-center justify-center w-24 h-12 ml-3 text-white rounded-lg dark:bg-darkButton bg-button hover:bg-hover dark:hover:bg-hover active:bg-button dark:active:bg-darkButton'
          onClick={() => onClickSubmitButton()}
        >
          작성
        </button>
        <Link href='/board'>
          <button className='flex items-center justify-center w-24 h-12 ml-10 text-white rounded-lg bg-neutral-500 hover:bg-neutral-400 active:bg-neutral-500 dark:bg-neutral-500 dark:hover:bg-neutral-400 dark:active:bg-neutral-500'>
            취소
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CreateTable;
