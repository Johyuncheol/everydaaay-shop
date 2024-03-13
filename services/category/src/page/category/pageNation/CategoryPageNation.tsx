import React, { useEffect, useRef } from "react";
import {
  ShowDataComponent,
  PageNumNavComponent,
} from "../../../../../../shared/shared/lib/MyPageNation";
import { itemsRequire } from "../../../types/Types";
import { getCategoryData } from "../../../api/Category";
import { useLocation } from "react-router-dom";
import CategoryCard from "../../../components/pagenation/card/CategoryCard";
import PageNumNav from "../../../components/pagenation/numNav/PageNums";
import styled from "styled-components";
import { usePagination } from "../../../../../../shared/shared/hooks/usePageNation";
import Spinner from "../../../../../../shared/shared/page/Spinner";
const CategoryPageNation: React.FC = () => {
  const location = useLocation();

  const info = location.pathname.split("/");
  const categoryName = info.slice(-2)[0];
  const detail = decodeURIComponent(info.slice(-1)[0]);

  const pagenationRef = useRef(null);

  const nunOfShow = 20;
  const path = `${categoryName}/${detail.toLowerCase()}`;

  const paginationResult = usePagination<itemsRequire>(
    getCategoryData,
    path,
    nunOfShow
  );

  useEffect(() => {
    paginationResult.setKey([
      categoryName,
      detail,
      paginationResult.currentPage,
    ]);
  }, [categoryName, detail]);

  return (
    <PageNaionSection>
      {paginationResult.showData.length !== 0 ? (
        <>
          <ContentArticle ref={pagenationRef}>
            <ShowDataComponent
              showData={paginationResult.showData}
              renderCard={CategoryCard}
            />
          </ContentArticle>
          <PageNumNavComponent
            pageNums={paginationResult.pageNums}
            currentPage={paginationResult.currentPage}
            setCurrentPage={paginationResult.setCurrentPage}
            movePageBtnHandler={paginationResult.movePageBtnHandler}
            pageNumNav={PageNumNav}
          ></PageNumNavComponent>
        </>
      ) : (
        <Spinner />
      )}
    </PageNaionSection>
  );
};

export default CategoryPageNation;

const PageNaionSection = styled.article`
  display: flex;
  width:100%;
  flex-direction: column;
  gap: 3rem;
`;

const ContentArticle = styled.article`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  column-gap: 20px;
  row-gap: 100px;
`;
