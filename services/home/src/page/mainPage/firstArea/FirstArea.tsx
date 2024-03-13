import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MainCarousel from "../../../components/carousel/largeCarosel/index";

import FigureLinkBox from "../../../components/FigureLinkBox/FigureLinkBox";
import { getMainAPI } from "../../../api/Main";
import SkeletonHalfCarousel from "./skeleton/SkeletonFirstArea";


interface mainBannerItem {
  id: string;
  imgSrc: string;
  detail: string;
}

interface mainNavItem {
  imgSrc: string;
  alt: string;
  detail: string;
  linkSrc: string;
  widthRatio: string;
  aspectRatio: string;
}

interface FirstDataType {
  MainBanner: mainBannerItem[];
  mainNav: mainNavItem[];
}

const FirstArea: React.FC = () => {
  const [firstAreaData, setFirstAreaData] = useState<FirstDataType>();

  const fetch = async () => {
    const res = await getMainAPI("first");
    setFirstAreaData(res.data.data);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      {firstAreaData ? (
        <ItemSection>
          <MainCarousel adata={firstAreaData.MainBanner} />
          <ItemBox1>
            {firstAreaData.mainNav.map((item, index) => {
              return <FigureLinkBox data={item} key={index} />;
            })}
          </ItemBox1>
        </ItemSection>
      ) : (
        <SkeletonHalfCarousel />
      )}
    </>
  );
};

export default FirstArea;

const ItemSection = styled.div`
  display: flex;
  flex-direction: column;

  gap: 4rem;
`;
const ItemBox1 = styled.div`
  display: flex;
  gap: 1rem;
`;
