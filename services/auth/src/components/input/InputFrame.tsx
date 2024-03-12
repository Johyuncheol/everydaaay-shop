import React, { ReactNode } from "react";
import styled from "styled-components";

// 레이블, children, 경고문으로 이루어진 틀

interface InputFrameProps {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: ReactNode;
  children: ReactNode;
}

const InputFrame: React.FC<InputFrameProps> = ({
  label,
  htmlFor,
  required,
  error,
  children,
}) => (
  <InputContainer>
    <label htmlFor={htmlFor}>
      {label}
      {required && <span className="required">*</span>}
    </label>
    <div className="inputArea">{children}</div>
    {error && <div className="message">{error}</div>}
  </InputContainer>
);

export default InputFrame;

const InputContainer = styled.div`
  width: 100%;

  .inputArea {
    input {
      width: 100%;
      height: 48px;
      padding: 0 50px 0 12px;
    }
  }

  .message {
    height: 20px;
    color: #f05252;
  }

  .required {
    color: red;
  }
`;
