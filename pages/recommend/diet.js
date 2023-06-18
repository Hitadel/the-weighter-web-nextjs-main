import { useState, useEffect } from "react";
import RecommendLayout from "../../components/recommend/diet-recommend"; // 食事のおすすめレイアウト
import { request } from "../../utils/request";
import CommonLayout from "../../components/layout/CommonLayout";

const Recommend = () => {
  const [profileData, setProfileData] = useState({});
  const [statusData, setStatusData] = useState({});

  useEffect(() => {
    request()
      .post("/profile")
      .then((res) => {
        setProfileData(res.data.profile);
        setStatusData(res.data.status);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <CommonLayout>
      <RecommendLayout
        gender={profileData.gender ? "남성" : "여성"}
        age={statusData && statusData.age ? statusData.age : 0}
        height={statusData && statusData.height ? statusData.height : 0}
        weight={statusData && statusData.weight ? statusData.weight : 0}
        disease={statusData && statusData.disease ? statusData.disease : "정보 없음"}
        allergy={statusData && statusData.allergy ? statusData.allergy : "정보 없음"}
      />
    </CommonLayout>
  );
};

export default Recommend;
