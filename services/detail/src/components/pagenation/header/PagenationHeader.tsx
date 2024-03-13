import React, { ReactNode, useRef } from "react";
import styled from "styled-components";

/* 페이지네이션 전체의 프레임  */
interface ReviewPageNationProps {
  children: ReactNode;
  title: string;
}
const PagenationFrame: React.FC<ReviewPageNationProps> = ({
  children,
  title,
}) => {
  return (
    <Article>
      <div className="frameHeader">
        <span>{title}</span>
      </div>

      <div>{children}</div>
    </Article>
  );
};

export default PagenationFrame;

const Article = styled.article`
  .frameHeader {
    width: 100%;
    border-bottom: 4px solid black;
    font-size: 1.3rem;
    font-weight: 600;
    line-height: 4rem;
  }
`;
