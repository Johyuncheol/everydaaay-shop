import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { LoginAPI } from "../../api/Auth";
import LoginForm from "./LoginForm";
import FindInfo from "./FindInfo";
import KakaoBtn from "./KakaoBtn";
import RegisterBtn from "../../components/button/ColorBtn";
import LoginHeader from "../../components/header/Login_Register_Header";
import { Login_Register_Theme as LoginSection } from "../../styles/Login_Register_Theme";
import { addSessionStorage } from "../../../../../shared/shared/utill/session";

const Login = () => {

  const navigate = useNavigate();

  const movePage = (path: string) => {
    if (path === "prev") navigate(-1);
    else {
      navigate(`/auth/${path}`);
    }
  };

  interface LoginRequire {
    id: string;
    password: string;
  }

  const handleSubmit = async (values: LoginRequire) => {

    //로그인 요청 API
    const res = await LoginAPI({
      id: values.id,
      password: values.password,
    });

    if (res) {
      // 로그인시 장바구니정보 세션에 저장
      addSessionStorage("shoppingBag",res.bag)

      // 요청결과로 받은 유저의 정보를 저장
      addSessionStorage("userInfo",{name:res.name})
      navigate(-1);
    }
  };

  return (
    <LoginSection>
      <div className="LoginWrap">
        <LoginHeader func={() => movePage("prev")}>로그인</LoginHeader>

        <LoginForm onSubmit={handleSubmit} />
        <OtherOption>
          <FindInfo />
          <KakaoBtn />
          <RegisterBtn
            background="#ecece9"
            fontColor="black"
            func={() => movePage("register")}
          >
            회원가입
          </RegisterBtn>
        </OtherOption>
      </div>
    </LoginSection>
  );
};

export default Login;

const OtherOption = styled.div`
  display: flex;
  width: 375px;
  padding: 5%;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
