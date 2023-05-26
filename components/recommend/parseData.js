export function parseData(inputString) {
  const lines = inputString.split('\n');
  const jsonData = [];

  let currentDate = '';
  let currentMeal = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith('-')) {
      const mealData = line.substring(2).split(':');
      const mealTime = mealData[0].trim();
      const mealItems = mealData[1].split('+').map(item => item.trim());
      const mealObjects = [];

      for (let j = 0; j < mealItems.length; j++) {
        const mealItem = mealItems[j];
        const mealName = mealItem.split('(')[0].trim();
        const mealInfo = mealItem.split('(')[1].split(')')[0].split(',').map(item => item.trim());

        const mealObject = {
          name: mealName,
          createdAt: currentDate + ' ' + getTimeForMeal(mealTime),
          calorie: parseValue(mealInfo[0]),
          fat: parseValue(mealInfo[1]),
          protein: parseValue(mealInfo[2]),
          carbohydrate: parseValue(mealInfo[3])
        };

        mealObjects.push(mealObject);
      }

      jsonData.push(...mealObjects);
    } else if (line.includes('(') && line.includes(')')) {
      const date = line.substring(0, line.indexOf('(')).trim();
      currentDate = formatDate(date);
      currentMeal = ''; // 식사 종류 초기화
    } else {
      currentMeal = line.substring(0, line.indexOf(':')).trim().toLowerCase();
    }
  }

  return jsonData;
}

function formatDate(dateString) {
  const [year, month, day] = dateString.split('.');
  return `${year}-${padZero(month)}-${padZero(day)}`;
}

function padZero(value) {
  return value.padStart(2, '0');
}

function getTimeForMeal(meal) {
  switch (meal) {
    case '아침':
      return '08:00:00';
    case '점심':
      return '12:00:00';
    case '저녁':
      return '19:00:00';
    default:
      return '00:00:00';
  }
}

function parseValue(valueString) {
  const match = valueString.match(/\d+(\.\d+)?/);
  if (match) {
    return parseFloat(match[0]);
  }
  return 0; // 예외 처리를 추가하여 기본값 설정
}
