import { useState, useEffect } from "react";
import ProfileStatusModify from "../../modal/ProfileStatusModify";

const Status = ({ age, height, weight, disease, allergy }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='flex flex-col justify-center w-full h-full p-5 overflow-auto text-2xl bg-gray-400 dark:bg-gray-700'>
        <div className='flex flex-row py-10 bg-gray-200 rounded-lg dark:bg-gray-500'>
          <div className='flex flex-col pl-10'>
            <div className='p-5 my-1 bg-gray-300 rounded-lg dark:bg-gray-600'>나이:</div>
            <div className='p-5 my-1 bg-gray-300 rounded-lg dark:bg-gray-600'>키:</div>
            <div className='p-5 my-1 bg-gray-300 rounded-lg dark:bg-gray-600'>몸무게:</div>
            <div className='p-5 my-1 bg-gray-300 rounded-lg dark:bg-gray-600'>질병:</div>
            <div className='p-5 my-1 bg-gray-300 rounded-lg dark:bg-gray-600'>알러지:</div>
          </div>
          <div className='flex flex-col pl-10'>
            <div className='p-5 my-1'>{age}</div>
            <div className='p-5 my-1'>{height}</div>
            <div className='p-5 my-1'>{weight}</div>
            <div className='p-5 my-1'>{disease}</div>
            <div className='p-5 my-1'>{allergy}</div>
          </div>
        </div>
        <button onClick={() => setOpen(true)} className='flex w-20 h-12 items-center justify-center bg-button rounded-lg shadow-shadow mt-7 text-white text-[15px] hover:bg-hover hover:transition'>
          변경
        </button>
      </div>
      <ProfileStatusModify open={open} onClose={() => setOpen(!open)} age={age} height={height} weight={weight} disease={disease} allergy={allergy} />
    </>
  );
};

export default Status;
