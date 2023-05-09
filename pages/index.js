import CommonLayout from "../components/layout/CommonLayout";
import Banner from "../components/main/banner";
import Link from "next/link";

export default function Home() {
  return (
    <CommonLayout>
      <Banner />
      <div className='flex flex-col select-none lg:flex-row'>
        <div className='m-10'>
          <Link href='/food'>
            <div className='flex flex-col items-center justify-center text-2xl font-bold bg-gray-500 rounded-lg hover:bg-gray-400'>
              <div className='flex flex-col items-center justify-center lg:p-40 p-28 change hover:scale-110 whitespace-nowrap'>
                식탁 사진 촬영
                <div className='text-sm font-normal pointer-cursor'>식단 관리는 중요합니다.</div>
              </div>
            </div>
          </Link>
        </div>
        <div className='m-10'>
          <Link href='/motion?type=squat'>
            <div className='flex flex-col items-center justify-center text-2xl font-bold bg-gray-500 rounded-lg hover:bg-gray-400'>
              <div className='flex flex-col items-center justify-center lg:p-40 p-28 change hover:scale-110 whitespace-nowrap'>
                스쿼트 기록 측정
                <div className='text-sm font-normal pointer-cursor'>체력 관리를 해볼까요?</div>
              </div>
            </div>
          </Link>
        </div>
      </div>
      {/* <button onClick={() => console.log(localStorage.getItem("token"))}>버튼</button> */}
    </CommonLayout>
  );
}
