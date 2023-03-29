import axios from "axios"
import Link from "next/link"
import { useState } from "react"

const RightSide = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const onClickSubmitButton = () => {
    if (email && password) {
      axios
        .post("/login/post", { id: email, pw: password })
        .then((res) => console.log(res))
        .catch((err) => console.error(err))
    } else {
      alert("아이디와 비밀번호를 입력해주세요")
    }
  }
  return (
    <div className='flex w-[45%] h-[90%] bg-neutral-200 rounded-r-xl justify-center items-center flex-col'>
      <label className='flex text-4xl font-bold mb-10'>로그인</label>
      <input className='flex w-4/5 h-12 border-gray-400 border-[1px] rounded-lg px-3' placeholder='이메일' type='email' onChange={(e) => setEmail(e.target.value)} />
      <input className='flex w-4/5 h-12 border-gray-400 border-[1px] rounded-lg mt-5 px-3' placeholder='비밀번호' type='password' onChange={(e) => setPassword(e.target.value)} />
      <div className='flex w-4/5 items-end flex-col'>
        <button className='flex w-32 h-12 bg-button mt-5 justify-center items-center rounded-xl text-white text-md' onClick={() => onClickSubmitButton()}>
          로그인
        </button>
        <label className='flex text-neutral-400 mt-2'>
          계정이 존재하지 않나요?
          <Link href='./signup'>
            <label className='flex text-button ml-2 cursor-pointer'>계정 만들기</label>
          </Link>
        </label>
        <Link href='./find_password'>
          <label className='flex text-button mt-2 cursor-pointer'>비밀번호를 잊으셨나요?</label>
        </Link>
      </div>
    </div>
  )
}

export default RightSide
