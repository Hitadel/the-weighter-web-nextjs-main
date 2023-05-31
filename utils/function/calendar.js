export const calendar = (event, show, selectedItem) => {
  let result = event
    if (show == "year"){
      const year = result.getFullYear() + 1;
      const month = result.getMonth();
      const lastDay = new Date(year, month, 0).getDate();
      result = new Date(year, month - 1, lastDay) 
    } else if (show == "month"){
      const year = result.getFullYear();
      const month = result.getMonth() + 1;
      const lastDay = new Date(year, month, 0).getDate();
      result = new Date(year, month - 1, lastDay) 
    }
    return [show, result]
  }
