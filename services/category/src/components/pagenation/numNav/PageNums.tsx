import React from "react";
import styled from "styled-components";

interface PageNumsProps {
  movePageBtnHandler: (type: string) => void;
  pageNums: number[];
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
}

const PageNums: React.FC<PageNumsProps> = ({
  movePageBtnHandler,
  pageNums,
  setCurrentPage,
  currentPage,
}) => {
  return (
    <PageNumsSection>
      <span onClick={() => movePageBtnHandler("left")}>{"<"}</span>
      {pageNums.map((item, index) => {
        return currentPage === item ? (
          <span
            className="bold"
            key={index}
            onClick={() => setCurrentPage(item)}
          >
            {item}
          </span>
        ) : (
          <span
            className="grey"
            key={index}
            onClick={() => setCurrentPage(item)}
          >
            {item}
          </span>
        );
      })}
      <span onClick={() => movePageBtnHandler("right")}>{">"}</span>
    </PageNumsSection>
  );
};

export default PageNums;

const PageNumsSection = styled.div`
  display: flex;
  justify-content: center;
  align-items:center;
  gap: 1rem;

  span {
    cursor: pointer;
  }
  .bold {
    font-weight: 600;
  }
  .grey {
    color: grey;
  }
`;
