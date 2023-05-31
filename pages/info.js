import Info1 from "../components/info/info1";
import Info2 from "../components/info/info2";
import Info3 from "../components/info/info3";
import Background from "../components/info/background";
import CommonLayout from "../components/layout/CommonLayout";

const info = () => {
  return (
    <CommonLayout>
      <Background>
        <Info1 />
        <Info2 />
        <Info3 />
      </Background>
    </CommonLayout>
  );
};

export default info;
