import { useState, useEffect } from "react";
import EmailAuth from "./EmailAuth";
import axios from "axios";
import { request } from "../../utils/request";
import { Modal, Box } from "@mui/material";

const ProfilePersonalModify = ({ open, onClose, name, gender, email }) => {
  const [emailValue, setEmailValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [genderValue, setGenderValue] = useState("");
  const [isConfirmEmail, setIsConfirmEmail] = useState(true);
  const [isSendEmail, setIsSendEmail] = useState(true);
  const [code, setCode] = useState("");
  const [emailOpen, setEmailOpen] = useState(false);

  const setGenderHandler = (e) => {
    setGenderValue(e.target.value);
  };

  const setEmailHandler = (e) => {
    setEmailValue(e.target.value);
    setIsSendEmail(false);
    setIsConfirmEmail(false);
  };
  const setNameHandler = (e) => {
    setNameValue(e.target.value);
  };

  const onClickEmailCheckButton = () => {
    const reg = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email == emailValue) {
      setIsSendEmail(true);
      setIsConfirmEmail(true);
      return;
    }
    if (emailValue.match(reg)) {
      axios
        .post("/signup/emailCheck/", { email: emailValue })
        .then((res) => {
          console.log(res.data);
          if (res.data.result === false) {
            alert("이미 가입된 이메일입니다.");
          } else {
            setIsConfirmEmail(true);
          }
        })
        .catch((err) => console.error(err));
    } else {
      alert("이메일 형식이 올바르지 않습니다.");
    }
  };

  const onClickSubmitButton = () => {
    if (nameValue && isConfirmEmail && isSendEmail) {
      request()
        .post("/profile/personalModify", { name: nameValue, email: emailValue, gender: genderValue })
        .then((res) => {
          localStorage.removeItem("token");
          const token = {
            value: res.data.data,
            expire: Date.now() + 3600000,
          };
          localStorage.setItem("token", JSON.stringify(token));
          onClose();
          return (window.location.href = "/profile");
        })
        .catch((err) => {
          console.error(err);
          alert(err.response.status);
        });
    } else {
      return alert("정보를 다시 확인해 주세요.");
    }
  };

  const onClickSendEmailButton = () => {
    axios
      .post("/signup/evf", { id: emailValue })
      .then((res) => {
        setCode(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
    setEmailOpen(true);
  };

  useEffect(() => {
    const trueName = name ? name.split("#")[0] : "";
    let trueGender;
    if (gender == "남성") trueGender = "male";
    else trueGender = "female";
    setEmailValue(email);
    setNameValue(trueName);
    setGenderValue(trueGender);
  }, [email, name, gender]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box className='absolute flex items-center justify-center w-2/6 h-[70%] mr-20 text-black transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-700 dark:text-white rounded-2xl shadow-shadow top-1/2 left-1/2'>
        <div className='flex w-[90%] h-full flex-col items-center justify-center'>
          <div className='flex mb-32'>{"이미지"}</div>
          <label>이름</label>
          <input className='flex w-2/5 max-w-[200%] border-gray-400 border-[1px] rounded-lg px-3' type='name' value={nameValue} onChange={setNameHandler} />
          <label>성별</label>
          <ul className='flex justify-center w-3/5 text-sm font-medium text-gray-900 dark:text-white'>
            <li className='w-full border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600'>
              <div className='flex items-center pl-3 dark:bg-neutral-500'>
                <input
                  id='checkbox-male'
                  type='radio'
                  name='gender'
                  value='male'
                  checked={genderValue === "male"}
                  onChange={setGenderHandler}
                  className='w-4 h-4 text-blue-600 border-gray-300 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:border-gray-500'
                />
                <label htmlFor='checkbox-male' className='w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                  남성
                </label>
              </div>
            </li>
            <li className='w-full'>
              <div className='flex items-center pl-3 dark:bg-neutral-500'>
                <input
                  id='checkbox-female'
                  type='radio'
                  name='gender'
                  value='female'
                  checked={genderValue === "female"}
                  onChange={setGenderHandler}
                  className='w-4 h-4 text-blue-600 border-gray-300 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:border-gray-500'
                />
                <label htmlFor='checkbox-female' className='w-full py-3 ml-2 text-sm font-medium text-gray-900 rounded-r-lg dark:text-gray-300'>
                  여성
                </label>
              </div>
            </li>
          </ul>
          <div className='flex flex-row items-center justify-center w-4/5 mt-5'>
            <input className='flex w-full max-w-[200%] h-12 border-gray-400 border-[1px] rounded-lg px-3' type='email' value={emailValue} onChange={setEmailHandler} />
            <button className='flex w-1/4 h-12 items-center justify-center bg-button rounded-lg shadow-shadow text-white text-[15px] mt-1' onClick={() => onClickEmailCheckButton()}>
              확인
            </button>
          </div>
          {isConfirmEmail && isSendEmail ? (
            <div className='flex items-center justify-end w-3/5 mt-2'>
              <label className='flex mr-2 text-sm text-blue-500'>이메일이 확인되었습니다.</label>{" "}
            </div>
          ) : isConfirmEmail ? (
            <div className='flex items-center justify-end w-3/5 mt-2'>
              <label className='flex mr-2 text-sm text-red-500'>이메일을 인증해주세요.</label>
              <button className='flex items-center justify-center w-2/5 h-12 text-white rounded-lg bg-button' onClick={() => onClickSendEmailButton()}>
                인증메일 전송
              </button>
            </div>
          ) : (
            <label className='flex justify-end w-4/5 mt-1 text-sm text-red-500'>이메일을 확인 해주세요.</label>
          )}
          <div className='flex flex-row justify-around w-full'>
            <button
              className='flex w-36 h-12 items-center justify-center bg-button rounded-lg shadow-shadow mt-7 text-white text-[15px] hover:bg-hover hover:transition'
              onClick={() => onClickSubmitButton()}
            >
              수정 완료
            </button>
          </div>
        </div>
        <EmailAuth open={emailOpen} onClose={() => setEmailOpen(!emailOpen)} email={email} setIsSendEmail={setIsSendEmail} code={code} />
      </Box>
    </Modal>
  );
};

export default ProfilePersonalModify;
