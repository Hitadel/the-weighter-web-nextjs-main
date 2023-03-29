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
      <Box className="absolute top-1/3 left-1/3 w-1/3 h-1/3 bg-white border-black border-2 rounded-xl shadow-shadow">
        <div className="flex w-full h-full justify-center items-center flex-col">
          <div className="flex w-4/5 h-1/3 border-black border-b-2 justify-center items-center">{email + " "}메일 주소로 확인 코드를 발송했습니다.</div>
          <div className="flex w-4/5 h-1/2 justify-center items-center">
            <input
              className="flex w-1/2 h-12 border-gray-400 border-[1px] rounded-lg px-3 mr-2"
              placeholder="확인 코드"
              onChange={(e) => setInputCode(e.target.value)}
            />
            <button className="flex w-20 h-12 bg-button justify-center items-center rounded-xl text-white text-md" onClick={() => onClickSubmitButton()}>
              확인
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default EmailAuth;
