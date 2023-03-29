import React from 'react';
import { Modal, Box } from '@mui/material';

const MotionResult = ({open, onClose, count, pose, _TIME, onClickResetButton, onClickSaveButton, type}) => {
  return (
        <Modal open={open} onClose={onClose}>
          <Box className="absolute top-1/4 left-1/4 w-1/2 h-3/5 bg-white border-black border-2 rounded-xl shadow-shadow">
            <div className="flex w-full h-full justify-center items-center flex-col px-10">
              <label className="flex w-full h-[15%] text-3xl justify-center border-b-2 border-neutral-500 items-center font-extrabold">
            <label className="flex w-1/2 h-3/4 bg-button text-white justify-center items-center rounded-xl">{type} 결과</label>
              </label>
              <div className="flex w-full h-2/3 text-5xl border-b-2 border-neutral-300 justify-center items-center bg-neutral-300 mt-4 font-extrabold">
                <div className="flex w-1/2 h-full flex-col justify-center items-end">
                  <label className="my-5 text-neutral-600">소요시간 :</label>
                  <label className="my-5 text-neutral-600">갯수 :</label>
                  <label className="my-5 text-neutral-600">총 점수 :</label>
                </div>
                <div className="flex w-1/2 h-full flex-col justify-center">
                  <label className="my-5 mx-10">{_TIME}초</label>
                  <label className="my-5 mx-10">{count}개</label>
                  <label className="my-5 mx-10">{count} / 10점</label>
                </div>
              </div>
              <div className="flex w-full h-[15%] justify-center items-center">
                <button className="flex w-[150px] h-[50px] justify-center items-center text-white rounded-lg bg-neutral-500 mt-5 text-xl mx-5 shadow-shadow" onClick={() => onClickResetButton()}>다시하기</button>  
                <button className="flex w-[150px] h-[50px] justify-center items-center text-white rounded-lg bg-button mt-5 text-xl mx-5 shadow-shadow" onClick={() => onClickSaveButton()}>저장</button>  
              </div>
            </div>
          </Box>
        </Modal>
  );
};

export default MotionResult;