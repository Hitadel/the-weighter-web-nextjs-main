// 운동추천 부모 페이지
import { useState, useEffect } from "react";
import RecommendLayout from "../../components/recommend/exercise-recommend"; // 운동추천 레이아웃
import { request } from "../../utils/request";
import CommonLayout from "../../components/layout/CommonLayout";

const Recommend = () => {
  const [profileData, setProfileData] = useState({}); // 해당 유저의 DB 프로필
  const [statusData, setStatusData] = useState({}); // 해당 유저의 DB의 스테이터스

  useEffect(() => {
    request()
      .post("/profile")
      .then((res) => {
        setProfileData(res.data.profile);
        setStatusData(res.data.status);
      })
      .catch((err) => console.error(err));
  }, []); // 처음 페이지 렌더링 될때 한번만 실행

  return (
    <CommonLayout>
      <RecommendLayout
        gender={profileData.gender ? "남성" : "여성"} // 불러온 데이터 값 0이면 여성, 1이면 남성(DB값), 자식 컴포넌트에게 gender 변수 props로 전달
        age={statusData && statusData.age ? statusData.age : 0}
        height={statusData && statusData.height ? statusData.height : 0}
        weight={statusData && statusData.weight ? statusData.weight : 0}
      />
    </CommonLayout>
  );
};

export default Recommend;
