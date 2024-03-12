import React from "react";
import styled from "styled-components";

const FindInfo: React.FC = () => {
  return (
    <FindSection>
      <span onClick={() => alert("준비중 입니다")}>아이디 찾기</span>
      <div className="line"></div>
      <span onClick={() => alert("준비중 입니다")}>비밀번호 찾기</span>
    </FindSection>
  );
};

export default FindInfo;

const FindSection = styled.section`
  display: flex;
  gap: 20px;
  height: 20px;
  font-size: 14px;

  span {
    cursor: pointer;
  }

  .line {
    height: 20px;
    width: 1px;
    background-color: #000;
    margin: 0 10px;
  }
`;
