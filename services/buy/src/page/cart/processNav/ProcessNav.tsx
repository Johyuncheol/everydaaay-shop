import React from "react";
import styled from "styled-components";

const ProcessNav: React.FC = () => {
  return (
    <Nav className="process">
      <span>01 SHOPPING BAG</span>
      <span>{"->"}</span>
      <span>02 ORDER</span>
      <span>{"->"}</span>
      <span>03 ORDER CONFIRMED</span>
    </Nav>
  );
};

export default ProcessNav;

const Nav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  height: 5rem;
`;
