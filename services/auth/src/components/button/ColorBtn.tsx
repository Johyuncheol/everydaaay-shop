import React, { ReactNode } from "react";
import styled from "styled-components";

// 배경색과 글씨 색상, 클릭함수를 지정할수있는 버튼
interface InputFrameProps {
    children: ReactNode;
    func?:()=>void;
    background:string;
    fontColor:string;
  }

const ColorBtn: React.FC<InputFrameProps> = ({children,func,background,fontColor}) => {
  return (
    <Button onClick={func} background={background} fontColor={fontColor}>
        {children}
    </Button>
  );
};

export default ColorBtn;

const Button = styled.button<{background:string,fontColor:string}>`
  width: 100%;
  height: 48px;
  background-color: ${(props)=>props.background};
  color: ${(props)=>props.fontColor};
  border:none;
  cursor: pointer;
`;
