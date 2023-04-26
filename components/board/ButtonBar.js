import Link from "next/link";

const ButtonBar = () => {
  return (
    <div className='flex w-[80%] h-[10%] justify-end items-center mb-4 select-none '>
      <Link href='board/create'>
        <button className='flex items-center justify-center w-32 text-white rounded-lg h-14 bg-button'>게시글 작성</button>
      </Link>
    </div>
  );
};

export default ButtonBar;
