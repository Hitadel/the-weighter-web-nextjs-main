export const calendar = (event, show, selectedItem) => {
    const eventDate = new Date(Date.UTC(event.getFullYear(), event.getMonth(), event.getDate(), 0, 0, 0));
    const userTimezoneOffset = new Date().getTimezoneOffset() * 60000;
    const eventTimezoneOffset = eventDate.getTimezoneOffset() * 60000;
    let result = new Date(eventDate.getTime() - userTimezoneOffset + eventTimezoneOffset);
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