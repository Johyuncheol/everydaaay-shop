import React from "react";
import styled from "styled-components";

const KakaoBtn: React.FC = () => {
  return (
    <Button className="submit" onClick={() => alert("준비중 입니다")}>
      카카오 로그인
    </Button>
  );
};

export default KakaoBtn;

const Button = styled.button`
  width: 100%;
  height: 48px;
  background-color: #fee500;
  color: black;
  border: none;
  cursor: pointer;
`;
