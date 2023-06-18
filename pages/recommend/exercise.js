import { useState, useEffect } from "react";
import RecommendLayout from "../../components/recommend/exercise-recommend"; // 運動のおすすめレイアウト
import { request } from "../../utils/request";
import CommonLayout from "../../components/layout/CommonLayout";

const Recommend = () => {
  const [profileData, setProfileData] = useState({}); // 該当ユーザーのDBプロフィール
  const [statusData, setStatusData] = useState({}); // 該当ユーザーのDBのステータス

  useEffect(() => {
    request()
      .post("/profile")
      .then((res) => {
        setProfileData(res.data.profile);
        setStatusData(res.data.status);
      })
      .catch((err) => console.error(err));
  }, []); // 初めてページがレンダリングされる時に一度だけ実行

  return (
    <CommonLayout>
      <RecommendLayout
        gender={profileData.gender ? "남성" : "여성"} // 読み込んだデータ値が0なら女性、1なら男性(DB値)、子コンポーネントにgender変数propsで渡す。
        age={statusData && statusData.age ? statusData.age : 0}
        height={statusData && statusData.height ? statusData.height : 0}
        weight={statusData && statusData.weight ? statusData.weight : 0}
      />
    </CommonLayout>
  );
};

export default Recommend;
