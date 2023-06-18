import { useState } from "react";

const Choice = ({ setCategory }, category) => {
  const setCategoryHandler = (e) => {
    setCategory(e.target.value);
  };

  return (
    <ul className='flex justify-center w-[50%] h-fit text-sm font-medium sm:flex '>
      <li className='w-full border-b-0 border-r border-gray-200 dark:border-gray-600'>
        <div className='flex items-center pl-3 bg-white rounded-l-lg'>
          <input
            id='checkbox-exercise'
            type='radio'
            name='category'
            value='exercise'
            checked={category === "exercise"}
            onChange={(e) => setCategoryHandler(e)}
            className='w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:border-gray-500'
          />
          <label htmlFor='checkbox-exercise' className='w-full py-3 ml-2 text-sm font-medium text-gray-900'>
            운동
          </label>
        </div>
      </li>
      <li className='w-full border-gray-200 dark:border-gray-600'>
        <div className='flex items-center pl-3 bg-white rounded-r-lg'>
          <input
            id='checkbox-category'
            type='radio'
            name='category'
            value='nutrition'
            checked={category === "nutrition"}
            onChange={(e) => setCategoryHandler(e)}
            className='w-4 h-4 text-blue-600 border-gray-300 rounded-lg focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:border-gray-500'
          />
          <label htmlFor='checkbox-category' className='w-full py-3 ml-2 text-sm font-medium text-gray-900 rounded-r-lg'>
            식단
          </label>
        </div>
      </li>
    </ul>
  );
};

export default Choice;
