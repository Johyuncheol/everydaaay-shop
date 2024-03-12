import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import menuData from "../staticData/json/menuCategory.json";
import { getCategoryData } from "../api/Category";
import { useNavigate } from "react-router-dom";
import { usePagination } from "../hooks/usePageNation";
import SideBar from "../components/category/Sidebar";
import Contents from "../components/category/Contents";
import PageNums from "../components/category/PageNums";

const CategoryPage: React.FC = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const info = location.pathname.split("/");
  const categoryName = info.slice(-2)[0];
  const detail = info.slice(-1)[0];
  const [selectedMenu, setSelectedMenu] = useState(detail);

  interface Category {
    mainCategory: string;
    subCategory: string[];
    path: string;
  }

  const [categoryInfo, setCategoryInfo] = useState<Category>();

  const {
    showData,
    pageNums,
    currentPage,
    setCurrentPage,
    movePageBtnHandler,
    setKey,
  } = usePagination(
    () =>
      getCategoryData(
        `${categoryName}/${selectedMenu.toLowerCase()}`,
        currentPage
      ),
    20
  );

  const goDetailPage = (id: number) => {
    navigate(`detail/${id}`) 
  };

  useEffect(() => {
    setKey([categoryName, detail, currentPage]);
    if (categoryName === "women") setCategoryInfo(menuData.Women);
    if (categoryName === "man") setCategoryInfo(menuData.Man);
    if (categoryName === "interior") setCategoryInfo(menuData.Interior);
  }, [categoryName, detail]);

  useEffect(() => {
    setCurrentPage(1);
  }, [detail]);

  return (
    <PageSection>
      {categoryInfo && (
        <SideBar
          categoryInfo={categoryInfo}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
          categoryName={categoryName}
        />
      )}
      <article className="pageNation">
        {showData && (
          <Contents showData={showData} goDetailPage={goDetailPage} />
        )}
        <PageNums
          pageNums={pageNums}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          movePageBtnHandler={movePageBtnHandler}
        />
      </article>
    </PageSection>
  );
};

export default CategoryPage;

const PageSection = styled.section`
  display: flex;
  @media (max-width: 430px) {
    flex-direction: column;
  }
  gap: 3rem;
  padding: 2rem 3rem;

  .sideBar {
    width: 10rem;

    .inner {
      width: 10rem;
      .categoryName {
        font-size: 1.5rem;
        font-weight: 500;
        min-height: 5rem;
        display: flex;
        align-items: center;
        border-bottom: 5px solid black;
      }
      .others {
        display: flex;
        flex-direction: column;
        @media (max-width: 430px) {
          flex-direction: row;
          gap: 40%;
        }
      }
    }
  }

  .contents {
    display: grid;
  }

  .pageNation {
    display: flex;
    flex-direction: column;
    gap: 5rem;
    align-items: center;
  }
`;
