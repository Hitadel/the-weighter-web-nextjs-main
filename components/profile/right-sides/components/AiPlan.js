import { useState, useEffect } from "react";
import { request } from "../../../../utils/request"

const aiPlan = ({listData = [], category = ""}) => {
    const [checkedItems, setCheckedItems] = useState([]);
    const [alreadyCheckedItems, setAlreadyCheckedItems] = useState([]);
    const [reload, setReload] = useState("false");

    const handleCheckboxChange = (index) => {
      const newCheckedItems = [...checkedItems];
      if (checkedItems.includes(index)) {
        const itemIndex = checkedItems.indexOf(index);
        newCheckedItems.splice(itemIndex, 1);
      } else{
        newCheckedItems.push(index);
      }
      console.log(newCheckedItems,"Debug0");
      setCheckedItems(newCheckedItems);
    };

    const postCheckedItems = (event) => {
      const selectedItems = checkedItems.map((index) => listData[index]);
      console.log(selectedItems,"Debug2 and", checkedItems, "Debug2.5");
      const model = category.charAt(0).toUpperCase() + category.slice(1) + "Plan";
      const unCheckedIndexes = [];
      for (let i = 0; i < alreadyCheckedItems.length; i++) {
        const index = alreadyCheckedItems[i];
        if (!checkedItems.includes(index)) {
          unCheckedIndexes.push(index);
        // already Checked Items.splice(i, 1); // すでに確認された項目から該当インデックスを削除
        // i---// spliceによって配列の長さが変わるのでインデックスを調整
        }
      }
      const unSelectedItems = unCheckedIndexes.map((index) => listData[index]);
      if (event == "save")
        request()
          .post("/profile/checkPost", { items: selectedItems, unCheckedItems: unSelectedItems , model: model })
          .then((res) => {
            alert("저장되었습니다.")
          })
          .catch((err) => {
            console.error(err);
            alert(err.response.status);
          });
          else if (event == "delete"){
            for (let i = selectedItems.length - 1; i >= 0; i--) {
              const index = listData.indexOf(selectedItems[i]);
              if (index !== -1) 
                listData.splice(index, 1);
                // selectedItems.splice(index, 1);
            }
            setCheckedItems(selectedItems);
            request()
              .post("/profile/deletePost", { items: selectedItems, unCheckedItems: unSelectedItems , model: model })
              .then((res) => {
                alert("삭제되었습니다.")
              })
              .catch((err) => {
                console.error(err);
                alert(err.response.status);
              });
              setReload(!reload);
          }
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
           <div className="flex justify-between">
           <button className="flex items-center justify-center p-3 my-5 text-sm text-white cursor-pointer lg:w-1/2 lg:p-2 lg:text-lg bg-button dark:bg-darkButton hover:bg-hover dark:hover:bg-hover active:bg-button dark:active:bg-darkButton"
           onClick = {() => postCheckedItems("save")}
           >저장</button>
            <button className="flex items-center justify-center p-3 my-5 text-sm text-white cursor-pointer lg:w-1/2 lg:p-2 lg:text-lg bg-button dark:bg-darkButton hover:bg-hover dark:hover:bg-hover active:bg-button dark:active:bg-darkButton"
            onClick = {() => postCheckedItems("delete")}
            >삭제</button>
           </div>
           </>
    )
}
    
export default aiPlan;
