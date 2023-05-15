import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { request } from "../../utils/request";

const ModifyTable = () => {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("default");
  const [content, setContent] = useState("");

  const onClickSubmitButton = () => {
    if (title && category && content) {
      request()
        .post(`${process.env.NEXT_PUBLIC_API_URL}/board/update`, { title, category, content, id })
        .then((res) => {
          if (res.data.result) {
            router.back();
          }
        })
        .catch((err) => console.error(err));
    } else {
      alert("제목, 내용을 모두 입력해주세요.");
    }
  };

  useEffect(() => {
    axios
      .get(`show/${id}`, { withCredentials: true })
      .then((res) => {
        setCategory(res.data.board.category);
        setTitle(res.data.board.title);
        setContent(res.data.board.content);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className='flex flex-col items-center justify-center w-3/5 bg-white border-2 h-4/5 border-neutral-400'>
      <div className='flex w-full h-[10%] justify-between border-neutral-400 border-b-2 items-center'>
        <div className='flex w-[10%] h-full justify-center items-center border-neutral-400 bg-neutral-300 border-r'>제목</div>
        <input className='flex w-[90%] h-full px-5' onChange={(e) => setTitle(e.target.value)} value={title} />
      </div>
      <div className='flex w-full h-[10%] justify-between border-neutral-400 border-b-2 items-center'>
        <div className='flex w-[10%] h-full justify-center items-center border-neutral-400 border-r bg-neutral-300'>카테고리</div>
        <div className='flex w-[90%] h-full justify-start items-center p-5'>
          <input type='radio' value='default' checked={category === "default"} onChange={(e) => setCategory(e.target.value)} />
          <label className='flex ml-2 mr-5'>기본</label>
          <input type='radio' value='qna' checked={category === "qna"} onChange={(e) => setCategory(e.target.value)} />
          <label className='flex ml-2 mr-5'>QnA</label>
          <input type='radio' value='community' checked={category === "community"} onChange={(e) => setCategory(e.target.value)} />
          <label className='flex ml-2'>커뮤니티</label>
        </div>
      </div>
      <div className='flex w-full h-[70%] justify-between border-neutral-400 border-b items-center'>
        <div className='flex w-[10%] h-full justify-center items-center border-neutral-400 border-r bg-neutral-300'>내용</div>
        <textarea className='flex w-[90%] h-full p-5 resize-none' onChange={(e) => setContent(e.target.value)} value={content} />
      </div>
      <div className='flex w-full h-[10%] justify-start border-neutral-400 border-b items-center bg-neutral-300'>
        <button className='flex items-center justify-center w-24 h-12 ml-3 text-white rounded-lg bg-button' onClick={() => onClickSubmitButton()}>
          수정
        </button>
        <Link href='/board'>
          <button className='flex items-center justify-center w-24 h-12 ml-10 text-white rounded-lg bg-neutral-500'>취소</button>
        </Link>
      </div>
    </div>
  );
};

export default ModifyTable;
