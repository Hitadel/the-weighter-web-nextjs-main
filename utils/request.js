import axios from "axios";

export const barcodeRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_OPENAPI_URL,
  withCredentials: false,
  header: {
    "Access-Control-Allow-Origin": "*",
  },
});

export const infoRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PRODUCT_URL,
  withCredentials: false,
  header: {
    "Access-Control-Allow-Origin": "*",
  },
});

function getItemWithExpireTime(keyName) {
  // localStorage 값 읽기 (문자열)
  const objString = window.localStorage.getItem(keyName);

  // null 체크
  if (!objString) {
    return null;
  }

  // 문자열을 객체로 변환
  const obj = JSON.parse(objString);

  // 현재 시간과 localStorage의 expire 시간 비교
  if (Date.now() > obj.expire) {
    // 만료시간이 지난 item 삭제
    window.localStorage.removeItem(keyName);

    // null 리턴
    return null;
  }

  // 만료기간이 남아있는 경우, value 값 리턴
  return obj.value;
}

const request = () => {
  let instance;
  const token = getItemWithExpireTime("token");
  instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: `bearer ${token}`,
    },
  });
  return instance;
};

export { request, getItemWithExpireTime };
