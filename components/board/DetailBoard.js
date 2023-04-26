import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { request } from "../../utils/request";

const DetailBoard = ({ data, comment, setComment }) => {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [nowHit, setNowHit] = useState(data.like);

  const onClickWriteComment = () => {
    if (content) {
      request()
        .post("board/comment/create", { content, board_id: data.id })
        .then((res) => {
          setComment(res.data);
          window.location.reload();
        })
        .catch((err) => console.error(err));
    }
  };

  const onClickHitButton = () => {
    request()
      .post("board/like", { id: data.id, like: data.like })
      .then((res) => setNowHit(res.data));
  };

  const onClickDeleteButton = () => {
    request()
      .post("board/delete", { id: data.id })
      .then((res) => {
        if (res.data.result) {
          router.back();
        } else {
          alert("실패했습니다.");
        }
      });
  };

  const onClickModifyButton = () => {
    router.push({ pathname: "/board/modify", query: { id: data.id } });
  };

  const onClickDeleteComment = (id) => {
    request.post("board/comment/delete", { id, board_id: data.id }).then((res) => setComment(res.data));
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className='flex flex-col items-end justify-center w-[90%] text-sm lg:w-[80%] my-10 bg-white dark:bg-gray-800 border-2 border-neutral-400 dark:border-neutral-500 rounded-lg change'>
      <div className='flex items-center justify-between w-full border-b-2 h-14 border-neutral-400 dark:border-neutral-500'>
        <div className='flex w-[10%] h-full justify-center items-center border-neutral-400  dark:bg-neutral-600 bg-neutral-300 border-r rounded-tl-md'>글번호</div>
        <div className='flex w-[5%] h-full items-center p-5 justify-center border-neutral-400 dark:border-neutral-500 border-r'>{data.id}</div>
        <div className='flex w-[85%] h-full items-center p-5 justify-end select-none'>
          <button className='flex items-center justify-center w-16 text-white bg-red-500 rounded-lg h-11' onClick={() => onClickDeleteButton()}>
            삭제
          </button>
          <button className='flex items-center justify-center w-16 ml-5 text-white bg-green-500 rounded-lg h-11' onClick={() => onClickModifyButton()}>
            수정
          </button>
        </div>
      </div>
      <div className='flex items-center justify-between w-full border-b-2 h-14 border-neutral-400 dark:border-neutral-500'>
        <div className='flex w-[10%] h-full justify-center items-center border-neutral-400 dark:bg-neutral-600 bg-neutral-300 border-r'>제목</div>
        <div className='flex w-[90%] h-full px-5 items-center justify-start'>{data.title}</div>
      </div>
      <div className='flex items-center justify-between w-full border-b-2 h-14 border-neutral-400 dark:border-neutral-500'>
        <div className='flex w-[10%] h-full justify-center items-center border-neutral-400  dark:bg-neutral-600 bg-neutral-300 border-r'>작성자</div>
        <div className='flex w-[15%] h-full items-center p-5 justify-center'>{data.user_name}</div>
        <div className='flex w-[10%] h-full justify-center items-center border-neutral-400 dark:bg-neutral-600 bg-neutral-300 border-x'>조회수</div>
        <div className='flex w-[5%] h-full items-center p-5 justify-center'>{data.hit}</div>
        <div className='flex w-[10%] h-full justify-center items-center border-neutral-400 border-x dark:bg-neutral-600 bg-neutral-300'>카테고리</div>
        <div className='flex w-[10%] h-full items-center p-5 justify-center'>{data.category === "default" ? "기본" : data.category === "community" ? "커뮤니티" : "QnA"}</div>
        <div className='flex w-[10%] h-full justify-center items-center border-neutral-400 dark:bg-neutral-600 bg-neutral-300 border-x'>작성일</div>
        <div className='flex w-[15%] h-full items-center p-5 justify-center'>{moment(data.createdAt).format("YYYY-MM-DD")}</div>
      </div>
      <div className='flex w-full min-h-[300px] justify-between border-neutral-400 dark:border-neutral-500 border-b-2 items-center'>
        <div className='flex w-[10%] min-h-[300px] justify-center items-center border-neutral-400 border-r dark:bg-neutral-600 bg-neutral-300'>내용</div>
        <div className='flex w-[90%] h-full p-5'>{data.content}</div>
      </div>
      <div className='flex flex-col items-center justify-center w-full p-3 select-none'>
        <button className='flex flex-col items-center justify-center w-24 h-24 text-white rounded-full bg-button dark:bg-darkButton' onClick={() => onClickHitButton()}>
          <label className='cursor-pointer'>{nowHit ? nowHit : data.like}</label>
          <label className='cursor-pointer'>추천</label>
        </button>
        <div className='flex mt-2 select-none'>
          <button className='flex items-center justify-center w-24 text-white rounded-lg h-14 bg-neutral-500' onClick={() => router.push("/board")}>
            목록
          </button>
        </div>
      </div>
      <div className='flex w-full min-h-[150px] justify-center items-center border-neutral-400 dark:border-neutral-500 border-t flex-col'>
        <div className='flex items-center justify-center w-full h-12 border-b select-none dark:bg-neutral-600 bg-neutral-300 border-neutral-400 dark:border-neutral-500'>댓글</div>
        {comment.length >= 1 &&
          comment.map((value) => {
            return (
              <div className='flex items-center justify-between w-full border-b-2 h-14 border-neutral-400 dark:border-neutral-500' key={value.id}>
                <div className='flex w-[10%] h-14 justify-center items-center border-neutral-400 border-r border-y dark:bg-neutral-600 bg-neutral-300'>{value.user_name}</div>
                <div className='flex w-[70%] h-full px-5 items-center'>{value.content}</div>
                <div className='flex w-[20%] h-full items-center justify-end pr-1 select-none'>
                  <button className='flex items-center justify-center w-16 h-12 text-white bg-red-500 rounded-l-lg' onClick={() => onClickDeleteComment(value.id)}>
                    삭제
                  </button>
                  <button className='flex items-center justify-center w-16 h-12 text-white bg-green-500 rounded-r-lg'>수정</button>
                </div>
              </div>
            );
          })}
        <div className='flex w-full min-h-[100px] justify-between pl-5 p-2 select-none'>
          <textarea className='flex w-[90%] border-neutral-400 border resize-none p-3 rounded-md' onChange={(e) => setContent(e.target.value)} />
          <div className='flex w-[10%] border-neutral-400 border-l ml-2 justify-center items-center'>
            <button className='flex items-center justify-center w-4/5 h-16 text-white rounded bg-button dark:bg-darkButton' onClick={() => onClickWriteComment()}>
              작성
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailBoard;
