import React from "react";
import styled from "styled-components";

/* 리뷰 페이지네이션에서 NumNav를 위한 타입 */
interface ReviewPageNationProps {
  pageNums: number[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  movePageBtnHandler: (type: string) => void;
}

const PageNumNav: React.FC<ReviewPageNationProps> = ({
  pageNums,
  currentPage,
  setCurrentPage,
  movePageBtnHandler,
}) => {
  return (
    <PageNumSection>
      <span onClick={() => movePageBtnHandler("left")}>{"<"}</span>
      {pageNums.map((item, index) => {
        /* CurrentPage와 같은 번호는 굵게 */
        return (
          <NumLink
            state={currentPage === item}
            className="bold"
            key={index}
            onClick={() => setCurrentPage(item)}
          >
            {item}
          </NumLink>
        );
      })}
      <span onClick={() => movePageBtnHandler("right")}>{">"}</span>
    </PageNumSection>
  );
};

export default PageNumNav;

const PageNumSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  span {
    cursor: pointer;
  }
`;

const NumLink = styled.span<{ state: boolean }>`
  font-weight: ${(props) => (props.state ? 600 : 500)};
  color: ${(props) => (props.state ? "black" : "grey")};
`;
