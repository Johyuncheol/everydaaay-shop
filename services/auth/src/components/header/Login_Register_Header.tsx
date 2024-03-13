import React, { ReactNode } from "react";
import styled from "styled-components";

// 로그인과 회원가입에서 사용되는 헤더 부분 
// 페이지이름과 이전으로 가는 버튼이 쓰임 -> 회원가입시에는 -2
interface HeaderProps {
  children: ReactNode;
  func: () => void;
}
const Login_Register_Header: React.FC<HeaderProps> = ({ children, func }) => {
  return (
    <Header>
      <button onClick={func}>{"<"}</button>
      {children}
    </Header>
  );
};

export default Login_Register_Header;

const Header = styled.header`
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
`;
