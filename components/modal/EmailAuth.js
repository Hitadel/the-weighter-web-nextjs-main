import React, { useState } from "react";
import { Modal, Box } from "@mui/material";
import axios from "axios";

const EmailAuth = ({ open, onClose, email, code, setIsSendEmail }) => {
  const [inputCode, setInputCode] = useState("");
  const onClickSubmitButton = () => {
    if (code === inputCode) {
      console.log("success");
      setIsSendEmail(true);
      onClose();
    } else {
      alert("코드가 일치하지 않습니다. 다시 인증해주세요.");
      onClose();
    }
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box className='flex items-center justify-center w-[77%] h-[33%] left-[10%] top-[33%] bg-white border-2 dark:border-gray-500 border-black dark:bg-gray-700 absolute lg:w-1/3 lg:top-1/3 lg:left-1/3 lg:h-1/3 rounded-xl shadow-shadow text-gray-700 dark:text-white'>
        <div className='flex flex-col items-center justify-center w-full h-full'>
          <div className='flex items-center justify-center w-4/5 border-b-2 border-black dark:border-gray-300 h-1/3'>{email + " "}메일 주소로 확인 코드를 발송했습니다.</div>
          <div className='flex items-center justify-center w-4/5 h-1/2'>
            <input className='flex w-1/2 h-12 border-gray-400 border-[1px] rounded-lg px-3 mr-2 outline-none' placeholder='확인 코드' onChange={(e) => setInputCode(e.target.value)} />
            <button
              className='flex items-center justify-center w-20 h-12 text-white bg-button hover:bg-hover active:bg-button dark:bg-darkButton dark:hover:bg-hover dark:active:bg-darkButton rounded-xl text-md'
              onClick={() => onClickSubmitButton()}
            >
              확인
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default EmailAuth;
