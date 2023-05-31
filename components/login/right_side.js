import axios from "axios";
import Link from "next/link";
import { useRef, useState } from "react";

const useForm = () => {
  const inputRefs = useRef({});

  const register = (key) => {
    const ref = (el) => {
      inputRefs.current[key] = el;
    };

    return { ref };
  };

  const handleSubmit = (cb) => {
    const body = {};
    Object.keys(inputRefs.current).forEach((el) => {
      body[el] = inputRefs.current[el].value;
    });
    cb(body);
  };

  return { register, handleSubmit };
};

const RightSide = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { register, handleSubmit } = useForm();

  const activeEnter = (e) => {
    // Login with Enter
    if (e.key === "Enter") {
      console.log(e);
      handleSubmit(onClickSubmitButton);
    }
  };

  const onClickSubmitButton = async () => {
    try {
      const res = await axios.post("/login/post", { id: email, pw: password }, { withCredentials: true });
      const token = {
        value: res.data.data,
        expire: Date.now() + 3600000,
      };
      localStorage.setItem("token", JSON.stringify(token));
      window.location.href = "/";
    } catch (err) {
      if (err.response.data.message) alert(err.response.data.message);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center w-full lg:w-[45%] h-[80vh] dark:bg-neutral-700 bg-[#efefef] rounded-b-3xl lg:rounded-bl-none lg:rounded-r-3xl drop-shadow-lg change'>
      <label className='flex mb-10 text-4xl font-bold'>로그인</label>
      <input className='flex w-4/5 h-12 border-gray-400 border-[1px] rounded-lg px-3' placeholder='이메일' type='email' onChange={(e) => setEmail(e.target.value)} />
      <input
        className='flex w-4/5 h-12 border-gray-400 border-[1px] rounded-lg mt-5 px-3'
        placeholder='비밀번호'
        type='password'
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => activeEnter(e)}
      />
      <div className='flex flex-col items-end w-4/5'>
        <button className='flex items-center justify-center w-32 h-12 mt-5 text-white bg-button rounded-xl text-md' onClick={() => handleSubmit(onClickSubmitButton)}>
          로그인
        </button>
        <label className='flex mt-2 text-neutral-400'>
          계정이 존재하지 않나요?
          <Link href='./signup'>
            <label className='flex ml-2 cursor-pointer text-button'>계정 만들기</label>
          </Link>
        </label>
        <Link href='./find_password'>
          <label className='flex mt-2 cursor-pointer text-button'>비밀번호를 잊으셨나요?</label>
        </Link>
      </div>
    </div>
  );
};

export default RightSide;
