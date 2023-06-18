import CommonLayout from "../components/layout/CommonLayout";
import Banner from "../components/main/banner";
import Link from "next/link";
import Image from "next/image";

import squatImage from "../public/main_squat.png";
import foodImage from "../public/main_food.png";
import basisImage from "../public/main_basis.png";

export default function Home() {
  return (
    <CommonLayout>
      <Banner />
      <div className='flex flex-col items-center justify-center lg:w-[80%] bg-white dark:bg-[#1f2023] dark:border-x-[#2d2f34] border-[#ccc] border-y-0 border-[1px] select-none change'>
        <div className='mt-10 mb-5'>
          <span className='text-xl select-none'>
            Weighter의 <span className='text-4xl text-button'>주요 기능</span>들을 확인해보세요.
          </span>
        </div>
        <div className='flex flex-col mb-5 lg:flex-row'>
          <div className='mx-5 mt-5'>
            <Link href='/information'>
              <div className='flex flex-col items-center justify-center overflow-hidden text-2xl font-bold rounded-lg hover:brightness-90'>
                <div className='flex items-center justify-center hover:scale-110 change'>
                  <Image src={basisImage} className='object-cover w-[600px] h-[400px] lg:h-[600px] rounded-t-lg lg:w-[200px]' alt='basisImage' />
                  <div className='absolute p-10 text-white shadow lg:px-0 lg:py-20 shadow-black rounded-xl bg-black/40'>
                    <span className='flex items-center justify-center'>기준표</span>
                    <div className='flex items-center justify-center text-sm font-normal'>체력 기준을 확인할 수 있어요.</div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          <div className='flex flex-col'>
            <div className='flex flex-col lg:flex-row'>
              <div className='mx-5 mt-5'>
                <Link href='/food'>
                  <div className='flex flex-col items-center justify-center overflow-hidden text-2xl font-bold rounded-lg hover:brightness-90'>
                    <div className='flex items-center justify-center hover:scale-110 change'>
                      <Image src={foodImage} className='object-cover h-[400px] rounded-t-lg lg:w-[400px]' alt='foodImage' />
                      <div className='absolute p-10 text-white shadow shadow-black rounded-xl bg-black/40'>
                        <span className='flex items-center justify-center'>식탁 사진 촬영</span>
                        <div className='flex items-center justify-center text-sm font-normal'>식단 관리는 중요합니다.</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className='mx-5 mt-5'>
                <Link href='/motion?type=squat'>
                  <div className='flex flex-col items-center justify-center overflow-hidden text-2xl font-bold rounded-lg hover:brightness-90'>
                    <div className='flex items-center justify-center hover:scale-110 change'>
                      <Image src={squatImage} className='object-cover h-[400px] rounded-t-lg lg:w-[400px]' alt='squatImage' />
                      <div className='absolute p-10 text-white shadow shadow-black rounded-xl bg-black/40'>
                        <span className='flex items-center justify-center'>스쿼트 기록 측정</span>
                        <div className='flex items-center justify-center text-sm font-normal'>체력 관리를 해볼까요?</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className='flex flex-row p-20 mx-5 mt-5 text-white bg-gray-400 rounded-lg dark:bg-gray-500'>
              <div>이 곳에는 기본적인 내용이 들어갑니다.</div>
              <div className='w-2 h-2 ml-1 bg-[red] rounded-lg animate-ping'></div>
            </div>
          </div>
        </div>
      </div>

      {/* <button onClick={() => console.log(localStorage.getItem("token"))}>버튼</button> */}
    </CommonLayout>
  );
}
