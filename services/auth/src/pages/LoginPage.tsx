import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { LoginAPI } from "../api/Auth";
import { LOGIN_USER } from "../redux/modules/User";
import { useDispatch } from "react-redux";
import Input from "../components/input/Input";
import { useInavalidate } from "../hooks/useInvalidate";

const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const movePage = (path: string) => {
    if (path === "prev") navigate(-1);
    else {
      navigate(`/${path}`);
    }
  };
  const { checkVaildationState } = useInavalidate();

  // 로그인 API 요청 함수
  const tryLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
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
    const res = await LoginAPI({
      id,
      password,
    });

    //로그인 실패시 상태 알림
    if (res?.status !== 201) {
      alert(res?.data.status);
      return;
    }
    // 로그인시 장바구니정보 세션에 저장
    console.log(res.data.data.bag);
    sessionStorage.setItem("shoppingBag", JSON.stringify(res.data.data.bag));

    // 요청결과로 받은 유저의 정보를 저장
    dispatch(LOGIN_USER(res?.data.data.name));
    console.log(res);
    navigate(-1);
  };

  return (
    <LoginSection>
      <div className="LoginWrap">
        <div className="LoginHeader">
          <button onClick={() => movePage("prev")}>{"<"}</button>
          <span>로그인</span>
        </div>

        <div className="Loginbody">
          <form onSubmit={(e) => tryLogin(e)}>
            <Input type="id" />
            <Input type="password" />

            <button className="submit">로그인</button>
          </form>

          <OtherOption>
            <div className="find">
              <span onClick={() => alert("준비중 입니다")}>아이디 찾기</span>
              <div className="line"></div>
              <span onClick={() => alert("준비중 입니다")}>비밀번호 찾기</span>
            </div>
            <button className="submit" onClick={() => alert("준비중 입니다")}>
              카카오 로그인
            </button>
            <button className="regeister" onClick={() => movePage("auth/register")}>
              회원가입
            </button>
          </OtherOption>
        </div>
      </div>
    </LoginSection>
  );
};

export default Login;

const LoginSection = styled.section`
  display: flex;
  justify-content: center;
  width:100%;
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

const OtherOption = styled.div`
  display: flex;
  padding: 5%;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  span {
    cursor: pointer;
  }
  .find {
    display: flex;
    gap: 20px;
    height: 20px;
    font-size: 14px;
  }

  .line {
    height: 20px;
    width: 1px;
    background-color: #000; /* Set the color of the line */
    margin: 0 10px; /* Adjust margin as needed */
  }

  .submit {
    width: 100%;
    height: 48px;
    background-color: #fee500;
    color: black;
    border: none;
    cursor: pointer;
  }

  .regeister {
    width: 100%;
    height: 48px;
    background-color: #ecece9;
    color: black;
    border: none;
    cursor: pointer;
  }
`;
