import React from "react";
import styled from "styled-components";

interface ScrollNavProps {
  scrollToElement: (ref: React.RefObject<HTMLSpanElement>) => void;
  detailInfoRef: React.RefObject<HTMLSpanElement>;
  reviewInfoRef: React.RefObject<HTMLSpanElement>;
  inquiredInfoRef: React.RefObject<HTMLSpanElement>;
}

const ScrollNav: React.FC<ScrollNavProps> = ({
  scrollToElement,
  detailInfoRef,
  reviewInfoRef,
  inquiredInfoRef,
}) => {
  return (
    <ScrollNavSection>
      <span onClick={() => scrollToElement(detailInfoRef)}>상품설명</span>
      <span onClick={() => scrollToElement(reviewInfoRef)}>리뷰</span>
      <span onClick={() => scrollToElement(inquiredInfoRef)}>문의</span>
    </ScrollNavSection>
  );
};

export default ScrollNav;

const ScrollNavSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;

  span {
    width: 33%;
    text-align: center;
    height: 2rem;
    cursor: pointer;
  }
`;
