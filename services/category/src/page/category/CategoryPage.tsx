import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import menuData from "../../staticData/json/menuCategory.json";
import SideNav from "./sideNav/SideNav";
import CategoryPageNation from "./pageNation/CategoryPageNation";

const CategoryPage: React.FC = () => {
  const location = useLocation();

  const info = location.pathname.split("/");
  const categoryName = info.slice(-2)[0];
  const detail = decodeURIComponent(info.slice(-1)[0]);
  const [selectedMenu, setSelectedMenu] = useState(detail);


  interface Category {
    mainCategory: string;
    subCategory: string[];
    path: string;
  }

  const [categoryInfo, setCategoryInfo] = useState<Category>();

  // 사이드 네비게이션에 데이터 설정
  useEffect(() => {
    if (categoryName === "women") setCategoryInfo(menuData.Women);
    if (categoryName === "man") setCategoryInfo(menuData.Man);
    if (categoryName === "interior") setCategoryInfo(menuData.Interior);
    setSelectedMenu(detail);
  }, [categoryName, detail]);

  return (
    <PageSection>
      {categoryInfo && (
        <SideNav
          categoryInfo={categoryInfo}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
      )}

      <CategoryPageNation />
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
`;
