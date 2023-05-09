import Image from "next/image";
import leftImage from "../../public/leftImage.png";
import { useState, useEffect } from "react";
import axios from "axios";
import EmailAuth from "../modal/EmailAuth";

const InnerBox = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isConfirmEmail, setIsConfirmEmail] = useState(false);
  const [isSendEmail, setIsSendEmail] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);
  const [isConfirmPattern, setIsConfirmPattern] = useState(false);
  const [code, setCode] = useState("");
  const [gender, setGender] = useState("male");

  const [open, setOpen] = useState(false);

  const setGenderHandler = (e) => {
    setGender(e.target.value);
  };

  const setEmailHandler = (e) => {
    setEmail(e.target.value);
    setIsConfirmEmail(false);
    setIsSendEmail(false);
  };

  const onClickEmailCheckButton = () => {
    const reg = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email.match(reg)) {
      axios
        .post("/signup/emailCheck/", { email })
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
    if (name && isConfirmEmail && phone.length >= 10 && isConfirmPassword && isSendEmail) {
      axios
        .post("/signup/post", { name, email, phone, password, gender })
        .then((res) => (window.location.href = "/auth/login"))
        .catch((err) => {
          console.error(err);
          alert("500: 서버 에러");
        });
    } else {
      alert("정보를 다시 확인해 주세요.");
    }
  };

  const onClickSendEmailButton = () => {
    axios
      .post("/signup/evf", { id: email })
      .then((res) => {
        setCode(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
    setOpen(true);
  };

  useEffect(() => {
    const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    if (password.match(reg)) {
      setIsConfirmPattern(true);
    } else setIsConfirmPattern(false);
    if (password === passwordConfirm) setIsConfirmPassword(true);
    else setIsConfirmPassword(false);
  }, [password, passwordConfirm]);

  return (
    <div className='flex flex-col lg:flex-row w-[90%] lg:w-[70%] h-[85vh] lg:mb-10 bg-white dark:bg-neutral-500  justify-center items-center rounded-3xl'>
      <Image src={leftImage} className='flex w-full h-[30vh] object-center object-cover lg:w-[30%] lg:h-[80vh] rounded-t-3xl lg:rounded-tr-none lg:rounded-l-3xl ' alt='leftImage' />
      <div className='flex flex-col items-center justify-center lg:py-0 py-10 w-full lg:w-[45%] h-[80vh] dark:bg-neutral-700 bg-neutral-200 rounded-b-3xl lg:rounded-bl-none lg:rounded-r-3xl change'>
        <label className='flex text-4xl font-bold'>회원가입</label>
        <div className='flex flex-row items-center justify-center w-4/5 mt-5 '>
          <input
            className='flex w-full h-12 border-gray-400 border-[1px] rounded-lg mt-2 px-3 dark:bg-neutral-900
            dark'
            placeholder='이름 (닉네임)'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <ul className='flex justify-center w-4/5 mt-5 text-sm font-medium text-gray-900 rounded-lg sm:flex dark:text-white'>
          <li className='w-full border-b-0 border-r border-gray-200 dark:border-gray-600'>
            <div className='flex items-center pl-3 rounded-l-lg bg-neutral-300 dark:bg-neutral-500'>
              <input
                id='checkbox-male'
                type='radio'
                name='gender'
                value='male'
                checked={gender === "male"}
                onChange={setGenderHandler}
                className='w-4 h-4 text-blue-600 border-gray-300 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:border-gray-500'
              />
              <label htmlFor='checkbox-male' className='w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>
                남성
              </label>
            </div>
          </li>
          <li className='w-full border-gray-200 dark:border-gray-600'>
            <div className='flex items-center pl-3 rounded-r-lg bg-neutral-300 dark:bg-neutral-500'>
              <input
                id='checkbox-female'
                type='radio'
                name='gender'
                value='female'
                checked={gender === "female"}
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
          <input
            className='flex w-4/5 h-12 border-gray-400 border-y-[1px] border-l-[1px] rounded-l-lg px-3 dark:bg-neutral-900
            '
            placeholder='이메일'
            type='email'
            onChange={setEmailHandler}
          />
          <button className='flex items-center justify-center w-1/5 h-12 text-white rounded-r-lg bg-button' onClick={() => onClickEmailCheckButton()}>
            확인
          </button>
        </div>
        {isConfirmEmail && isSendEmail ? (
          <div className='flex items-center justify-end w-4/5 mt-2'>
            <label className='flex mr-2 text-sm text-blue-500'>이메일이 확인되었습니다.</label>{" "}
          </div>
        ) : isConfirmEmail ? (
          <div className='flex items-center justify-end w-4/5 mt-2'>
            <label className='flex mr-2 text-sm text-red-500'>이메일을 인증해주세요.</label>
            <button className='flex items-center justify-center w-1/3 h-12 text-white rounded-lg bg-button' onClick={() => onClickSendEmailButton()}>
              인증메일 전송
            </button>
          </div>
        ) : (
          <label className='flex justify-end w-4/5 mt-1 text-sm text-red-500'>이메일을 확인 해주세요.</label>
        )}
        <input
          className='flex w-4/5 h-12 border-gray-400 border-[1px] rounded-lg mt-2 px-3 dark:bg-neutral-900
          '
          placeholder='휴대폰 번호'
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          className='flex w-4/5 h-12 border-gray-400 border-[1px] rounded-lg mt-5 px-3 dark:bg-neutral-900
          '
          placeholder='비밀번호'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        {isConfirmPattern ? (
          <label className='flex justify-end w-4/5 mt-1 text-sm text-blue-500'>올바른 패턴입니다.</label>
        ) : (
          <label className='flex justify-end w-4/5 mt-1 text-sm text-red-500'>패턴이 올바르지 않습니다.</label>
        )}
        <label className='flex justify-end w-4/5 mt-1 text-sm text-gray-500'>8 - 14자 사이 입력 (0-9, a-z, A-Z)</label>
        <label className='flex justify-end w-4/5 mb-1 text-sm text-gray-500'>숫자, 특수 문자 필요 (!, @, #, $, %)</label>
        <input
          className='flex w-4/5 h-12 border-gray-400 border-[1px] rounded-lg px-3 dark:bg-neutral-900
          '
          placeholder='비밀번호 확인'
          type='password'
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        {isConfirmPassword ? (
          <label className='flex justify-end w-4/5 mt-1 text-sm text-blue-500'>비밀번호가 일치합니다.</label>
        ) : (
          <label className='flex justify-end w-4/5 mt-1 text-sm text-red-500'>비밀번호가 일치하지 않습니다.</label>
        )}
        <div className='flex flex-row justify-end w-4/5 mt-2 text-sm text-gray-500'>
          <label>
            <label className='text-button'>서비스 약관</label>과 <label className='text-button'>개인 정보 정책</label>에 동의합니다.
          </label>
          <input type='checkbox' className='w-5 h-5 ml-2' />
        </div>
        <button className='flex items-center justify-center w-32 h-12 mt-5 text-white bg-button rounded-xl text-md' onClick={() => onClickSubmitButton()}>
          계정 생성
        </button>
      </div>
      <EmailAuth open={open} onClose={() => setOpen(!open)} email={email} setIsSendEmail={setIsSendEmail} code={code} />
    </div>
  );
};

export default InnerBox;
