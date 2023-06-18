import { useState, useEffect } from "react";
import axios from "axios";
import { request } from "../../utils/request";
import { Modal, Box } from "@mui/material";

const ProfilePasswordModify = ({ open, onClose, email }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [isCurrentPassword, setIsCurrentPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isConfirmPattern, setIsConfirmPattern] = useState(false);
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);

  const setCurrentPasswordHandler = (e) => {
    setCurrentPassword(e.target.value);
    setIsCurrentPassword(false);
  };

  const onClickSubmitButton = () => {
    if (isConfirmPassword && isConfirmPattern && isCurrentPassword) {
      // 変更のパスワードが一致した時
      if (currentPassword === password) return alert("현재 비밀번호에서 변경점이 없습니다.");
      request()
        .post("/found_password/post", { password, email }) // パスワード変更時に入力したパスワードとメールをバックに転送する
        .then((res) => console.log(res.data))
        .catch((err) => console.error(err));
      alert("변경되었습니다.");
      onClose();
      return (window.location.href = "/profile");
    } else {
      // 不一致
      return alert("정보를 다시 확인해 주세요.");
    }
  };

  const onClickCurrentPasswordCheckButton = () => {
    if (currentPassword) {
      request()
        .post("/profile/currentPassword", { password: currentPassword })
        .then((res) => {
          if (res.data.result) setIsCurrentPassword(true);
        })
        .catch((err) => {
          console.error(err);
          alert(err.response.data.message);
        });
    } else {
      alert("현재 비밀번호를 입력해주세요.");
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
    <Modal open={open} onClose={onClose}>
      <Box className='absolute flex w-2/6 h-[70%] bg-white rounded-2xl items-center justify-center shadow-shadow mr-20 text-black top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex-col'>
        <label className='flex text-4xl font-bold'>비밀번호 재설정</label>
        <div className='flex flex-row items-center justify-center w-4/5 mt-5'>
          <input className='flex w-4/5 h-12 border-gray-400 border-[1px] mt-5 px-3' placeholder='현재 비밀번호' type='password' onChange={setCurrentPasswordHandler} />
          <button className='flex items-center justify-center w-1/5 h-12 px-3 mt-5 text-white rounded-r-lg bg-button' onClick={() => onClickCurrentPasswordCheckButton()}>
            확인
          </button>
        </div>
        {isCurrentPassword ? (
          <div className='flex items-center justify-end w-4/5 mt-2'>
            <label className='flex mr-2 text-sm text-blue-500'>비밀번호 확인 완료</label>{" "}
          </div>
        ) : (
          <div className='flex items-center justify-end w-4/5 mt-2'>
            <label className='flex mr-2 text-sm text-red-500'>비밀번호를 확인해주세요.</label>
          </div>
        )}
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
      </Box>
    </Modal>
  );
};

export default ProfilePasswordModify;
