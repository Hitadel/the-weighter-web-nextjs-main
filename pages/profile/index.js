import { useEffect, useState } from "react";
import CommonLayout from "../../components/layout/CommonLayout";
import Background from "../../components/profile/background";
import { request } from "../../utils/request";
import ProfileMain from "../../components/profile/profile-main";

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
        <ProfileMain
        profileData={profileData}
        statusData={statusData}
        ></ProfileMain>
      </Background>
    </CommonLayout>
  );
};

export default Profile;
