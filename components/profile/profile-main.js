import { useState, useEffect } from "react";
import Status from "./right-sides/Status";
import Plan from "./right-sides/Plan";

const ProfileMain = ({ profileData, statusData }) => {
  const [show, setShow] = useState("status");

  return (
    <div className='flex flex-col items-center justify-center w-full h-full p-10 overflow-auto rounded lg:flex-row '>
      <div className='flex w-full lg:w-[100px] h-full lg:flex-col justify-center'>
        <button
          className={`flex w-full items-center justify-center h-[50%] text-xl p-5 hover:bg-hover dark:hover:bg-hover hover:transition ${
            show === "status" ? "bg-gray-200 dark:bg-[#383b40]" : "bg-gray-100 dark:bg-gray-500"
          }`}
          onClick={(e) => setShow("status")}
        >
          사용자 정보
        </button>
        <button
          className={`flex w-full items-center justify-center h-[50%] text-xl p-5 hover:bg-hover dark:hover:bg-hover hover:transition ${
            show === "plan" ? "bg-gray-200 dark:bg-[#383b40]" : "bg-gray-100 dark:bg-gray-500"
          }`}
          onClick={(e) => setShow("plan")}
        >
          기록
        </button>
      </div>
      <div className='flex flex-col items-center justify-center w-full h-full bg-gray-200 dark:bg-[#383b40]'>
        {show === "status" && (
          <Status
            profileData={profileData}
            age={statusData && statusData.age ? statusData.age : 0}
            height={statusData && statusData.height ? statusData.height : 0}
            weight={statusData && statusData.weight ? statusData.weight : 0}
            disease={statusData && statusData.disease ? statusData.disease : "정보 없음"}
            allergy={statusData && statusData.allergy ? statusData.allergy : "정보 없음"}
          />
        )}
        {show === "plan" && <Plan />}
      </div>
    </div>
  );
};

export default ProfileMain;
