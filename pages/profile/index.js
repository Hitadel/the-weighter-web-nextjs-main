import axios from "axios";
import { useEffect, useState } from "react";
import CommonLayout from "../../components/layout/CommonLayout";
import Background from "../../components/profile/background";
import LeftSide from "../../components/profile/left-side";
import RightSide from "../../components/profile/right-side";
import { request } from "../../utils/request";

const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const [statusData, setStatusData] = useState({});

  useEffect(() => {
    request()
      .post("/profile")
      .then((res) => {
        setProfileData(res.data.profile);
        setStatusData(res.data.status);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <CommonLayout>
      <Background>
        <LeftSide name={profileData.name} gender={profileData.gender ? "남성" : "여성"} email={profileData.email} phone={profileData.phone} />
        <RightSide
          age={statusData && statusData.age ? statusData.age : 0}
          height={statusData && statusData.height ? statusData.height : 0}
          weight={statusData && statusData.weight ? statusData.weight : 0}
          disease={statusData && statusData.disease ? statusData.disease : "정보 없음"}
          allergy={statusData && statusData.allergy ? statusData.allergy : "정보 없음"}
        />
      </Background>
    </CommonLayout>
  );
};

export default Profile;
