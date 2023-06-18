import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const FoundPassword = (props) => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);
  const [isConfirmPattern, setIsConfirmPattern] = useState(false);
  const [email, setEmail] = useState(props.email);

  const onClickSubmitButton = () => {
    if (isConfirmPassword && isConfirmPattern) {
      // 変更したパスワードが一致した場合
      axios
        .post("/found_password/post", { password, email }) //パスワード変更時に入力したパスワードバックに転送
        .then((res) => console.log(res.data))
        .catch((err) => console.error(err));
      alert("변경되었습니다.");

      return router.push("/auth/login"); // ログイン画面に移動
    } else {
      // 不一致
      alert("정보를 다시 확인해 주세요.");
    }
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
    <div className='flex flex-col items-center justify-center w-full lg:w-[45%] h-[80vh] dark:bg-neutral-700 bg-neutral-200 rounded-b-3xl lg:rounded-bl-none lg:rounded-r-3xl change'>
      <label className='flex text-4xl font-bold'>비밀번호 재설정</label>
      <input className='flex w-4/5 h-12 border-gray-400 border-[1px] rounded-lg mt-5 px-3' placeholder='비밀번호' type='password' onChange={(e) => setPassword(e.target.value)} />
      {isConfirmPattern ? (
        <label className='flex justify-end w-4/5 mt-1 text-sm text-blue-500'>올바른 패턴입니다.</label>
      ) : (
        <label className='flex justify-end w-4/5 mt-1 text-sm text-red-500'>패턴이 올바르지 않습니다.</label>
      )}
      <label className='flex justify-end w-4/5 mt-1 text-sm text-gray-500'>8 - 14자 사이 입력 (0-9, a-z, A-Z)</label>
      <label className='flex justify-end w-4/5 mb-1 text-sm text-gray-500'>숫자, 특수 문자 필요 (!, @, #, $, %)</label>
      <input className='flex w-4/5 h-12 border-gray-400 border-[1px] rounded-lg px-3' placeholder='비밀번호 확인' type='password' onChange={(e) => setPasswordConfirm(e.target.value)} />
      {isConfirmPassword ? (
        <label className='flex justify-end w-4/5 mt-1 text-sm text-blue-500'>비밀번호가 일치합니다.</label>
      ) : (
        <label className='flex justify-end w-4/5 mt-1 text-sm text-red-500'>비밀번호가 일치하지 않습니다.</label>
      )}
      <button className='flex items-center justify-center w-32 h-12 mt-5 text-white bg-button rounded-xl text-md' onClick={() => onClickSubmitButton()}>
        변경
      </button>
    </div>
  );
};

export default FoundPassword;
