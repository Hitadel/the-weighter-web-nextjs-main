import { useState } from "react";
import { request } from "../../utils/request"

const aiNutritionPlan = ({listData = []}) => {
    const [checkedItems, setCheckedItems] = useState([]);

    const handleCheckboxChange = (index) => {
      const newCheckedItems = [...checkedItems];
      if (checkedItems.includes(index)) {
        const itemIndex = checkedItems.indexOf(index);
        newCheckedItems.splice(itemIndex, 1);
      } else {
        newCheckedItems.push(index);
      }
      setCheckedItems(newCheckedItems);
    };

    const postCheckedItems = () => {
      const selectedItems = checkedItems.map((index) => listData[index]);
      request()
        .post("/profile/checkPost", { items: selectedItems, model: "NutritionPlan" })
        .then((res) => {
          console.log("디버그", selectedItems);
        })
        .catch((err) => {
          console.error(err);
          alert(err.response.status);
        });
    };

    return (
      <>
        <ul className="divide-y divide-gray-300">
             {listData.map((item, index) => (
              !item.check && (
               <li key={index} className="flex items-center py-2">
                 <input
                   type="checkbox"
                   className="mr-2"
                   checked={checkedItems.includes(index)}
                   onChange={() => handleCheckboxChange(index)}
                 />
                <div className="ml-4">
                  <span className={`font-bold block ${item.name ? 'text-blue-500' : 'text-gray-900'}`}>
                    {item.createdAt}
                  </span>
                  <span className={`font-bold block ${item.type ? 'text-green-500' : 'text-gray-900'}`}>
                    {item.name}
                  </span>
                  <span className="text-gray-500 block">칼로리: {item.calorie}</span>
                  <span className="text-gray-500 block">탄수화물: {item.cho}</span>
                  <span className="text-gray-500 block">단백질: {item.protein}</span>
                  <span className="text-gray-500 block">지방: {item.fat}</span>
                </div>
               </li>
              )
             ))}
           </ul>
           <button className="flex items-center justify-center p-3 my-5 text-sm text-white rounded-lg cursor-pointer lg:w-full lg:h-full lg:p-2 lg:text-lg bg-button dark:bg-darkButton hover:bg-hover dark:hover:bg-hover active:bg-button dark:active:bg-darkButton"
           onClick={postCheckedItems}
           >저장</button>
           </>
    )
}
    
export default aiNutritionPlan;
