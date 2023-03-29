import CommonLayout from "../../components/layout/CommonLayout";
import Background from "../../components/login/background";
import InnerBox from "../../components/login/inner_box";

const Login = () => {
  return (
    <CommonLayout>
      <Background>
        <InnerBox />
      </Background>
    </CommonLayout>
  );
};

export default Login;
