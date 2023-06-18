import { useState, useEffect } from "react";
import axios from "axios";
import EmailAuth from "../modal/EmailAuth";

const FindPassword = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isConfirmEmail, setIsConfirmEmail] = useState(false); // メールの存在確認
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [isSendEmail, setIsSendEmail] = useState(false);
  const [open, setOpen] = useState(false);

  const onClickEmailCheckButton = () => {
    const reg = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email.match(reg)) {
      axios
        .post("/signup/emailCheck/", { email }) // ※ signup -> find_passwordに切り替えることが望ましい
        .then((res) => {
          console.log(res.data.result); // false = 存在するメール, true = 存在しないメール
          if (res.data.result === false) {
            setIsConfirmEmail(true);
          } else {
            alert("가입되어있지 않은 이메일입니다.");
          }
        })
        .catch((err) => console.error(err));
    } else {
      alert("이메일 형식이 올바르지 않습니다.");
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

  const onClickSubmitButton = () => {
    if (name && isConfirmEmail && (phone.length >= 10) & isSendEmail) {
      sendData();
    } else {
      alert("정보를 다시 확인해 주세요.");
    }
  };

  const sendData = () => {
    props.getData(email);
  };

  const setEmailHandler = (e) => {
    setEmail(e.target.value);
    setIsConfirmEmail(false);
    setIsSendEmail(false);
  };

  return (
    <div className='flex flex-col items-center justify-center w-full lg:w-[45%] h-[80vh] dark:bg-neutral-700 bg-neutral-200 rounded-b-3xl lg:rounded-bl-none lg:rounded-r-3xl change'>
      <label className='flex text-4xl font-bold'>비밀번호 찾기</label>
      <div className='flex flex-row items-center justify-center w-4/5 mt-5'>
        <input className='flex w-full h-12 border-gray-400 border-[1px] rounded-lg mt-2 px-3' placeholder='이름 (닉네임)' onChange={(e) => setName(e.target.value)} />
      </div>
      <div className='flex flex-row items-center justify-center w-4/5 mt-5'>
        <input className='flex w-4/5 h-12 border-gray-400 border-y-[1px] border-l-[1px] rounded-l-lg px-3' placeholder='이메일' type='email' onChange={setEmailHandler} />
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
      <input className='flex w-4/5 h-12 border-gray-400 border-[1px] rounded-lg mt-2 px-3' placeholder='휴대폰 번호' onChange={(e) => setPhone(e.target.value)} />

      <button className='flex items-center justify-center w-32 h-12 mt-5 text-white bg-button rounded-xl text-md' onClick={() => onClickSubmitButton()}>
        확인
      </button>
      <EmailAuth open={open} onClose={() => setOpen(!open)} email={email} setIsSendEmail={setIsSendEmail} code={code} />
    </div>
  );
};

export default FindPassword;
