import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"

const FoundPassword = () => {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [isConfirmPassword, setIsConfirmPassword] = useState(false)

  const onClickSubmitButton = () => {
    if (isConfirmPassword) {
      axios
        .post("/found_password/post", { password })
        .then((res) => console.log(res.data))
        .catch((err) => console.error(err))
      alert("변경되었습니다.")
      return router.push("/auth/login")
    } else {
      alert("정보를 다시 확인해 주세요.")
    }
  }

  useEffect(() => {
    const reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/
    if (password.match(reg) && password === passwordConfirm) {
      setIsConfirmPassword(true)
    } else {
      setIsConfirmPassword(false)
    }
  }, [password, passwordConfirm])

  return (
    <div className='flex w-[45%] h-[90%] bg-neutral-200 rounded-r-xl justify-center items-center flex-col'>
      <label className='flex text-4xl font-bold'>비밀번호 재설정</label>
      <input className='flex w-4/5 h-12 border-gray-400 border-[1px] rounded-lg mt-5 px-3' placeholder='비밀번호' type='password' onChange={(e) => setPassword(e.target.value)} />
      <label className='flex w-4/5 justify-end text-gray-500 text-sm mt-1'>8 - 14자 사이 입력 (0-9, a-z, A-Z)</label>
      <label className='flex w-4/5 justify-end text-gray-500 text-sm mb-1'>특수 문자 필요 (!, @, #, $, %)</label>
      <input className='flex w-4/5 h-12 border-gray-400 border-[1px] rounded-lg px-3' placeholder='비밀번호 확인' type='password' onChange={(e) => setPasswordConfirm(e.target.value)} />
      {isConfirmPassword ? <label className='flex w-4/5 justify-end text-blue-500 text-sm mt-1'>비밀번호가 일치합니다.</label> : <label className='flex w-4/5 justify-end text-red-500 text-sm mt-1'>비밀번호가 일치하지 않습니다.</label>}
      <button className='flex w-32 h-12 bg-button mt-5 justify-center items-center rounded-xl text-white text-md' onClick={() => onClickSubmitButton()}>
        변경
      </button>
    </div>
  )
}

export default FoundPassword
