import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { RegisterAPI } from "../api/Auth";
import Input from "../components/input/Input";
import { useInavalidate } from "../hooks/useInvalidate";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const goPrevPage = () => {
    navigate(-2);
  };
  const { checkVaildationState } = useInavalidate();

  // 로그인 API 요청 함수
  const tryRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const nickName = String(formData.get("nickName"));
    const id = String(formData.get("id"));
    const password = String(formData.get("password"));

    // 유효성검사
    if (checkVaildationState({ type: "id", data: id })) {
      alert("아이디형식을 확인해주세요");
      return;
    } else if (checkVaildationState({ type: "password", data: password })) {
      alert("비밀번호형식을 확인해주세요");
      return;
    }
    //로그인 요청 API
    const res = await RegisterAPI({
      id,
      password,
      nickName,
    });
    console.log(res);
    alert(res?.data.status);
    if (res?.status === 201) {
      navigate("/");
    }
  };

  return (
    <LoginSection>
      <div className="LoginWrap">
        <div className="LoginHeader">
          <button onClick={goPrevPage}>{"<"}</button>
          <span>회원가입</span>
        </div>

        <div className="Loginbody">
          <form onSubmit={(e) => tryRegister(e)}>
            <span> nick name</span>
            <Input type="nickName" />
            <span> id: 이메일 형식으로 입력해주세요</span>
            <Input type="id" />
            <span> password: 5자리 이상 입력해주세요</span>
            <Input type="password" />

            <button className="submit">회원가입</button>
          </form>
        </div>
      </div>
    </LoginSection>
  );
};

export default RegisterPage;

const LoginSection = styled.section`
  display: flex;
  justify-content: center;

  .LoginWrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 400px;
    min-height: 655px;
    background-color: whitesmoke;
  }

  .LoginHeader {
    height: 50px;
    width: 100%;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    button {
      position: absolute;
      left: 0;
    }
  }


  .Loginbody{
    width:100%;  
  }

  .validationInfo {
    display: flex;
    flex-direction: column;
    height: 20px;
    color: #f05252;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 5%;

    span {
      width: 100%;
    }
    .input {
      width: 100%;
      height: 48px;
      padding: 0 50px 0 12px;
    }

    .passwordWrap {
      display: flex;
      align-items: center;
      width: 100%;
      position: relative;

      img {
        position: absolute;
        right: 10px;
        height: 18px;
        width: 30px;
        cursor: pointer;
        border-radius: 5px;
      }
    }
    .submit {
      width: 100%;
      height: 48px;
      background-color: black;
      color: white;
      cursor: pointer;
    }
  }
`;
