import { useState, useEffect } from "react";
import ProfileStatusModify from "../../modal/ProfileStatusModify";
import ProfilePersonalModify from "../../modal/ProfilePersonalModify";
import ProfilePasswordModify from "../../modal/ProfilePasswordModify";

const Status = ({ age, height, weight, disease, allergy, profileData }) => {
  const [open, setOpen] = useState(false);
  const [personalOpen, setPersonalOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  return (
    <div className='flex w-[1000px] h-[70vh]'>
      <div className='flex flex-col w-full lg:w-[40%] h-full pt-20 pb-10 lg:pt-0 lg:pb-0 mb-10 lg:mb-0 bg-white dark:bg-black rounded-l-lg items-center justify-center '>
        <div className='flex flex-col items-ceter justify-center w-full h-full ml-5 m-2 bg-white dark:bg-[#2d2f34]'>
          <div className='flex flex-wrap items-center justify-center w-full '>
            <div className='flex flex-col items-center justify-center'>
              <div className='flex items-center justify-center w-full my-1 '>이름:</div>
              <div className='flex items-center justify-center w-full my-1 '>성별:</div>
              <div className='flex items-center justify-center w-full my-1 '>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-6 h-6'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75'
                  />
                </svg>
              </div>
              <div className='flex items-center justify-center w-full my-1'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-6 h-6'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3'
                  />
                </svg>
              </div>
            </div>
            <div className='flex flex-col items-start justify-center mx-4'>
              <div className='flex items-center justify-center w-full my-1 '>{profileData.name}</div>
              <div className='flex items-center justify-center w-full my-1 '>{profileData.gender ? "남성" : "여성"}</div>
              <div className='flex items-center justify-center w-full my-1 '>{profileData.email}</div>
              <div className='flex items-center justify-center w-full my-1 '>{profileData.phone}</div>
            </div>
            <button className='flex items-center justify-center w-12 h-12 dark:bg-darkButton dark:hover:bg-hover dark:active:bg-darkButton active:bg-button bg-button rounded-lg mt-7 text-white text-[15px] hover:bg-hover hover:transition'>
              변경
            </button>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <button
              onClick={() => setPasswordOpen(true)}
              className='flex w-36 h-12 items-center justify-center dark:bg-darkButton dark:hover:bg-hover dark:active:bg-darkButton active:bg-button bg-button rounded-lg  mt-7 text-white text-[15px] hover:bg-hover hover:transition'
            >
              비밀번호 변경
            </button>
            <div className='flex flex-row justify-around w-full'>
              <button
                onClick={() => setPersonalOpen(true)}
                className='flex w-36 h-12 items-center justify-center dark:bg-darkButton dark:hover:bg-hover dark:active:bg-darkButton active:bg-button bg-button rounded-lg mt-7 text-white text-[15px] hover:bg-hover hover:transition'
              >
                정보 수정
              </button>
            </div>
          </div>
        </div>
        <ProfilePersonalModify open={personalOpen} onClose={() => setPersonalOpen(!personalOpen)} name={profileData.name} gender={profileData.gender} email={profileData.email} />
        <ProfilePasswordModify open={passwordOpen} onClose={() => setPasswordOpen(!passwordOpen)} email={profileData.email} />
      </div>

      <div className='flex flex-col items-end justify-center w-[60%] h-full pl-5 p-2 rounded-r-lg overflow-auto text-2xl bg-gray-300 dark:bg-black'>
        <div className='flex flex-col items-end justify-center w-full h-full bg-gray-300 dark:bg-[#2d2f34]'>
          <div className='flex flex-row w-full h-full py-10 rounded-lg'>
            <div className='flex flex-col pl-10'>
              <div className='flex items-center justify-center p-5 my-1 bg-gray-200 rounded-lg dark:bg-[#1f2023]'>나이</div>
              <div className='flex items-center justify-center p-5 my-1 bg-gray-200 rounded-lg dark:bg-[#1f2023]'>키</div>
              <div className='flex items-center justify-center p-5 my-1 bg-gray-200 rounded-lg dark:bg-[#1f2023]'>몸무게</div>
              <div className='flex items-center justify-center p-5 my-1 bg-gray-200 rounded-lg dark:bg-[#1f2023]'>질병</div>
              <div className='flex items-center justify-center p-5 my-1 bg-gray-200 rounded-lg dark:bg-[#1f2023]'>알러지</div>
            </div>
            <div className='flex flex-col pl-10'>
              <div className='p-5 my-1'>{age}</div>
              <div className='p-5 my-1'>{height}</div>
              <div className='p-5 my-1'>{weight}</div>
              <div className='p-5 my-1'>{disease}</div>
              <div className='p-5 my-1'>{allergy}</div>
            </div>
          </div>
          <button
            onClick={() => setOpen(true)}
            className='flex w-20 h-12 m-10 items-center justify-center bg-button dark:bg-darkButton dark:hover:bg-hover dark:active:bg-darkButton rounded-lg mt-7 text-white text-[15px] hover:bg-hover hover:transition'
          >
            변경
          </button>
        </div>

        <ProfileStatusModify open={open} onClose={() => setOpen(!open)} age={age} height={height} weight={weight} disease={disease} allergy={allergy} />
      </div>
    </div>
  );
};

export default Status;
