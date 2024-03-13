import React from "react";
import styled from "styled-components";
import { scrollToElement } from "../../../../../../shared/shared/utill/scrollToElement";

/* 스크롤 Nav 구현에 필요한 타입 */
interface ScrollNavProps {
  detailRef: React.RefObject<any>;
  reviewRef: React.RefObject<any>;
  askRef: React.RefObject<any>;
}

const ScrollNav: React.FC<ScrollNavProps> = ({
  detailRef,
  reviewRef,
  askRef,
}) => {
  return (
    <ScrollNavSection>
      <span onClick={() => scrollToElement(detailRef)}>상품설명</span>
      <span onClick={() => scrollToElement(reviewRef)}>리뷰</span>
      <span onClick={() => scrollToElement(askRef)}>문의</span>
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
