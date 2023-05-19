import { useState, useEffect } from "react";
import { request } from "../../../../utils/request"

const aiPlan = ({listData = [], category = ""}) => {
    const [checkedItems, setCheckedItems] = useState([]);
    const [alreadyCheckedItems, setAlreadyCheckedItems] = useState([]);

    const handleCheckboxChange = (index) => {
      const newCheckedItems = [...checkedItems];
      if (checkedItems.includes(index)) {
        const itemIndex = checkedItems.indexOf(index);
        newCheckedItems.splice(itemIndex, 1);
      } else{
        newCheckedItems.push(index);
      }
      setCheckedItems(newCheckedItems);
    };

    const postCheckedItems = () => {
      const selectedItems = checkedItems.map((index) => listData[index]);
      const model = category.charAt(0).toUpperCase() + category.slice(1) + "Plan";
      const unCheckedIndexes = [];
      for (let i = 0; i < alreadyCheckedItems.length; i++) {
        const index = alreadyCheckedItems[i];
        if (!checkedItems.includes(index)) {
          unCheckedIndexes.push(index);
          alreadyCheckedItems.splice(i, 1); // 이미 확인된 항목에서 해당 인덱스를 제거
          i--; // splice로 인해 배열의 길이가 변하므로 인덱스를 조정
        }
      }
      const unSelectedItems = unCheckedIndexes.map((index) => listData[index]);
      request()
        .post("/profile/checkPost", { items: selectedItems, unCheckedItems: unSelectedItems , model: model })
        .then((res) => {
          alert("저장되었습니다.")
        })
        .catch((err) => {
          console.error(err);
          alert(err.response.status);
        });
    };

    useEffect(() => {
      const updatedCheckedItems = [];
      for (const item of listData) {
        if (item.check)
          updatedCheckedItems.push(listData.indexOf(item));
      }
      setCheckedItems(updatedCheckedItems);
      setAlreadyCheckedItems(updatedCheckedItems);
    }, [listData]);

    return (
      <>
        <ul className="divide-y divide-gray-300">
             {listData.map((item, index) => (
               <li key={index} className="flex items-center py-2">
                 <label htmlFor={`checkbox-${index}`} className="mr-2 text-white">수행 여부</label>
                 <input
                   type="checkbox"
                   id={`checkbox-${index}`}
                   checked={checkedItems.includes(index)}
                   onChange={() => handleCheckboxChange(index)}
                 />
                <div className="ml-4">
                  <span className='font-bold block text-blue-500'>
                    {item.createdAt}
                  </span>
                  <span className="font-bold block text-green-500">
                    {category === "nutrition" ? item.name : item.type}
                  </span>
                  {category == "nutrition" ?
                  <>
                  <span className="text-gray-500 block">칼로리: {item.calorie}</span>
                  <span className="text-gray-500 block">탄수화물: {item.cho}</span>
                  <span className="text-gray-500 block">단백질: {item.protein}</span>
                  <span className="text-gray-500 block">지방: {item.fat}</span>
                  </>
                :
                <span className="text-gray-500 block">횟수: {item.count}</span>
                }
                </div>
               </li>
             ))}
           </ul>
           <button className="flex items-center justify-center p-3 my-5 text-sm text-white rounded-lg cursor-pointer lg:w-full lg:p-2 lg:text-lg bg-button dark:bg-darkButton hover:bg-hover dark:hover:bg-hover active:bg-button dark:active:bg-darkButton"
           onClick = {postCheckedItems}
           >저장</button>
           </>
    )
}
    
export default aiPlan;
