import React from "react";
import { useNavigate } from "react-router-dom";
import { RegisterAPI } from "../../api/Auth";
import RegisterHeader from "../../components/header/Login_Register_Header";
import RegisterForm from "./RegisterFrom";
import { Login_Register_Theme as RegisterSection } from "../../styles/Login_Register_Theme";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const goPrevPage = () => {
    navigate(-2);
  };

  interface RegisterRequire {
    id: string;
    password: string;
    nickname: string;
  }

  const handleSubmit = async (values: RegisterRequire) => {
    //회원가입 요청 API
    const res = await RegisterAPI({
      id: values.id,
      password: values.password,
      nickName: values.nickname,
    });

    if (res?.status === 201) {
      navigate("/");
    }
  };

  return (
    <RegisterSection>
      <div className="LoginWrap">
        <RegisterHeader func={goPrevPage}>
          <span>회원가입</span>
        </RegisterHeader>

        <div className="Loginbody">
          <RegisterForm onSubmit={handleSubmit} />
        </div>
      </div>
    </RegisterSection>
  );
};

export default RegisterPage;
