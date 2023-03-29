import { useState, useEffect } from "react"
import axios from "axios"

const FindPassword = (props) => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [isConfirmEmail, setIsConfirmEmail] = useState(false)
  const [phone, setPhone] = useState("")

  const onClickEmailCheckButton = () => {
    const reg = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    if (email.match(reg)) {
      axios
        .post("/signup/emailCheck/", { email })
        .then((res) => {
          console.log(res.data)
          if (res.data === false) {
            setIsConfirmEmail(true)
          } else {
            alert("가입되어있지 않은 이메일입니다.")
          }
        })
        .catch((err) => console.error(err))
    } else {
      alert("이메일 형식이 올바르지 않습니다.")
    }
  }

  const onClickSubmitButton = () => {
    if (firstName && lastName && isConfirmEmail && phone.length >= 10) {
      sendCorrect()
    } else {
      alert("정보를 다시 확인해 주세요.")
    }
  }

  const sendCorrect = () => {
    props.getCorrect(true)
  }

  useEffect(() => {
    setIsConfirmEmail(false)
  }, [email])

  return (
    <div className='flex w-[45%] h-[90%] bg-neutral-200 rounded-r-xl justify-center items-center flex-col'>
      <label className='flex text-4xl font-bold'>비밀번호 찾기</label>
      <div className='flex w-4/5 justify-between items-center flex-row mt-5'>
        <input className='flex w-[48%] h-12 border-gray-400 border-[1px] rounded-lg px-3' placeholder='성' onChange={(e) => setFirstName(e.target.value)} />
        <input className='flex w-[48%] h-12 border-gray-400 border-[1px] rounded-lg px-3' placeholder='이름' onChange={(e) => setLastName(e.target.value)} />
      </div>
      <div className='flex w-4/5 justify-center items-center flex-row mt-5'>
        <input className='flex w-4/5 h-12 border-gray-400 border-y-[1px] border-l-[1px] rounded-l-lg px-3' placeholder='이메일' type='email' onChange={(e) => setEmail(e.target.value)} />
        <button className='flex w-1/5 h-12 bg-button rounded-r-lg justify-center items-center text-white' onClick={() => onClickEmailCheckButton()}>
          확인
        </button>
      </div>
      {isConfirmEmail ? (
        <div className='flex w-4/5 justify-end items-center mt-2'>
          <label className='flex text-blue-500 text-sm mr-2'>이메일이 확인되었습니다.</label>{" "}
        </div>
      ) : (
        <label className='flex w-4/5 justify-end text-red-500 text-sm mt-1'>이메일을 확인 해주세요.</label>
      )}
      <input className='flex w-4/5 h-12 border-gray-400 border-[1px] rounded-lg mt-2 px-3' placeholder='휴대폰 번호' onChange={(e) => setPhone(e.target.value)} />

      <button className='flex w-32 h-12 bg-button mt-5 justify-center items-center rounded-xl text-white text-md' onClick={() => onClickSubmitButton()}>
        확인
      </button>
    </div>
  )
}

export default FindPassword
