import Image from "next/image";
import leftImage from "../../public/leftImage.png";
import { useState, useEffect } from "react";
import axios from "axios";
import EmailAuth from "../modal/EmailAuth";

const InnerBox = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isConfirmEmail, setIsConfirmEmail] = useState(false);
  const [isSendEmail, setIsSendEmail] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);
  const [code, setCode] = useState("");

  const [open, setOpen] = useState(false);

  const onClickEmailCheckButton = () => {
    const reg = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email.match(reg)) {
      axios
        .post("/signup/emailCheck/", { email })
        .then((res) => {
          console.log(res.data);
          if (res.data === false) {
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
    if (firstName && lastName && isConfirmEmail && phone.length >= 10 && isConfirmPassword) {
      axios
        .post("/signup/post", { name: firstName + lastName, email, phone, password })
        .then((res) => console.log(res.data))
        .catch((err) => console.error(err));
    } else {
      alert("정보를 다시 확인해 주세요.");
    }
  };

  const onClickSendEmailButton = () => {
    axios
      .post("/signup/evf", { email })
      .then((res) => {
        setCode(res.data.sendEvfcode);
      })
      .catch((err) => {
        console.error(err);
      });
    setOpen(true);
  };

  useEffect(() => {
    const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    if (password.match(reg) && password === passwordConfirm) {
      setIsConfirmPassword(true);
    } else {
      setIsConfirmPassword(false);
    }
  }, [password, passwordConfirm]);

  useEffect(() => {
    setIsConfirmEmail(false);
  }, [email]);

  return (
    <div className="flex w-[55%] h-5/6 bg-white shadow-shadow justify-center items-center rounded-3xl">
      <Image src={leftImage} alt="leftImage" />
      <div className="flex w-[45%] h-[90%] bg-neutral-200 rounded-r-xl justify-center items-center flex-col">
        <label className="flex text-4xl font-bold">회원가입</label>
        <div className="flex w-4/5 justify-between items-center flex-row mt-5">
          <input className="flex w-[48%] h-12 border-gray-400 border-[1px] rounded-lg px-3" placeholder="성" onChange={(e) => setFirstName(e.target.value)} />
          <input className="flex w-[48%] h-12 border-gray-400 border-[1px] rounded-lg px-3" placeholder="이름" onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="flex w-4/5 justify-center items-center flex-row mt-5">
          <input
            className="flex w-4/5 h-12 border-gray-400 border-y-[1px] border-l-[1px] rounded-l-lg px-3"
            placeholder="이메일"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="flex w-1/5 h-12 bg-button rounded-r-lg justify-center items-center text-white" onClick={() => onClickEmailCheckButton()}>
            확인
          </button>
        </div>
        {isConfirmEmail && isSendEmail ? (
          <div className="flex w-4/5 justify-end items-center mt-2">
            <label className="flex text-blue-500 text-sm mr-2">이메일이 확인되었습니다.</label>{" "}
          </div>
        ) : isConfirmEmail ? (
          <div className="flex w-4/5 justify-end items-center mt-2">
            <label className="flex text-blue-500 text-sm mr-2">사용 가능한 이메일입니다.</label>
            <button className="flex w-1/3 h-12 bg-button rounded-lg justify-center items-center text-white" onClick={() => onClickSendEmailButton()}>
              인증메일 전송
            </button>
          </div>
        ) : (
          <label className="flex w-4/5 justify-end text-red-500 text-sm mt-1">이메일을 확인 해주세요.</label>
        )}
        <input
          className="flex w-4/5 h-12 border-gray-400 border-[1px] rounded-lg mt-2 px-3"
          placeholder="휴대폰 번호"
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          className="flex w-4/5 h-12 border-gray-400 border-[1px] rounded-lg mt-5 px-3"
          placeholder="비밀번호"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="flex w-4/5 justify-end text-gray-500 text-sm mt-1">8 - 14자 사이 입력 (0-9, a-z, A-Z)</label>
        <label className="flex w-4/5 justify-end text-gray-500 text-sm mb-1">특수 문자 필요 (!, @, #, $, %)</label>
        <input
          className="flex w-4/5 h-12 border-gray-400 border-[1px] rounded-lg px-3"
          placeholder="비밀번호 확인"
          type="password"
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        {isConfirmPassword ? (
          <label className="flex w-4/5 justify-end text-blue-500 text-sm mt-1">비밀번호가 일치합니다.</label>
        ) : (
          <label className="flex w-4/5 justify-end text-red-500 text-sm mt-1">비밀번호가 일치하지 않습니다.</label>
        )}
        <div className="flex w-4/5 justify-end text-gray-500 text-sm flex-row mt-2">
          <label>
            <label className="text-button">서비스 약관</label>과 <label className="text-button">개인 정보 정책</label>에 동의합니다.
          </label>
          <input type="checkbox" className="w-5 h-5 ml-2" />
        </div>
        <button className="flex w-32 h-12 bg-button mt-5 justify-center items-center rounded-xl text-white text-md" onClick={() => onClickSubmitButton()}>
          계정 생성
        </button>
      </div>
      <EmailAuth open={open} onClose={() => setOpen(!open)} email={email} setIsSendEmail={setIsSendEmail} code={code} />
    </div>
  );
};

export default InnerBox;
