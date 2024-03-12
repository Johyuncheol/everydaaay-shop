import React from "react";
import styled, { keyframes } from "styled-components";

const Spinner: React.FC = () => {
  return (
    <SpinnerWrapper>
      <div className="spinner" />
    </SpinnerWrapper>
  );
};

export default Spinner;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100vh;

  .spinner {
    display: inline-block;
    width: 5rem;
    height: 5rem;
    border: 0.5rem solid #f3f3f3;
    border-top: 0.5rem solid #3498db;
    border-radius: 50%;
    animation: ${rotate} 1s linear infinite;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
