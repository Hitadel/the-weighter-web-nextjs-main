import { useState, useEffect } from "react";
import ProfilePersonalModify from "../modal/ProfilePersonalModify";
import ProfilePasswordModify from "../modal/ProfilePasswordModify";

const LeftSide = ({ name, gender, email, phone }) => {
  const [personalOpen, setPersonalOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);

  return (
    <div className='flex flex-col items-center justify-center w-full h-full'>
      <div className='flex flex-wrap w-full lg:w-[50vh] h-full pt-20 pb-10 lg:pb-0 mb-10 lg:mb-0 bg-white dark:bg-gray-600 rounded-2xl items-center justify-center shadow-shadow text-black dark:text-white change'>
        <div className='flex flex-wrap justify-center w-full '>
          <div>
            <div>이름:</div>
            <div>성별:</div>
            <div>이메일 주소:</div>
            <div>전화 번호:</div>
          </div>

          <div className='flex flex-col items-start mx-4'>
            <div>{name}</div>
            <div>{gender}</div>
            <div>{email}</div>
            <div>{phone}</div>
          </div>
          <button className='flex items-center justify-center w-12 h-12 dark:bg-darkButton dark:hover:bg-hover dark:active:bg-darkButton active:bg-button bg-button rounded-lg shadow-shadow mt-7 text-white text-[15px] hover:bg-hover hover:transition'>
            변경
          </button>
        </div>
        <div>
          <button
            onClick={() => setPasswordOpen(true)}
            className='flex w-36 h-12 items-center justify-center dark:bg-darkButton dark:hover:bg-hover dark:active:bg-darkButton active:bg-button bg-button rounded-lg shadow-shadow mt-7 text-white text-[15px] hover:bg-hover hover:transition'
          >
            비밀번호 변경
          </button>
          <div className='flex flex-row justify-around w-full'>
            {/* <Link href="/profile/personal-modify" 
        className='flex w-36 h-12 items-center justify-center dark:bg-darkButton dark:hover:bg-hover dark:active:bg-darkButton active:bg-button bg-button rounded-lg shadow-shadow mt-7 text-white text-[15px] hover:bg-hover hover:transition'>정보 수정
          </Link> */}
            <button
              onClick={() => setPersonalOpen(true)}
              className='flex w-36 h-12 items-center justify-center dark:bg-darkButton dark:hover:bg-hover dark:active:bg-darkButton active:bg-button bg-button rounded-lg shadow-shadow mt-7 text-white text-[15px] hover:bg-hover hover:transition'
            >
              정보 수정
            </button>
          </div>
        </div>
      </div>
      {/* <Link href="/profile/password-modify"
        className='flex w-36 h-12 items-center justify-center dark:bg-darkButton dark:hover:bg-hover dark:active:bg-darkButton active:bg-button bg-button rounded-lg shadow-shadow mt-7 text-white text-[15px] hover:bg-hover hover:transition'>비밀번호 변경
        </Link> */}

      <ProfilePersonalModify open={personalOpen} onClose={() => setPersonalOpen(!personalOpen)} name={name} gender={gender} email={email} />
      <ProfilePasswordModify open={passwordOpen} onClose={() => setPasswordOpen(!passwordOpen)} email={email} />
    </div>
  );
};

export default LeftSide;
