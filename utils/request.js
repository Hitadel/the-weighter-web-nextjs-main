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
  // localStorage値の読み取り(文字列)
  const objString = window.localStorage.getItem(keyName);

  // nullチェック
  if (!objString) {
    return null;
  }

  // 文字列をオブジェクトに変換
  const obj = JSON.parse(objString);

  // 現在時刻とlocalStorageのexpire時間比較
  if (Date.now() > obj.expire) {
    // 有効期限が過ぎたitemを削除
    window.localStorage.removeItem(keyName);

    // nullリターン
    return null;
  }

  // 有効期限が残っている場合、value値をリターン
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
