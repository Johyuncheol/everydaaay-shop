import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getMainAPI } from "../../../api/Main";
import FigureLinkBox from "../../../components/FigureLinkBox/FigureLinkBox";
import { FetchIntersectionObserver } from "../../../utill/useIntersectionObserver";
import SkeleltionThirdArea from "./skeleton/SkeletonThirdArea";
import SmallCarousel from "../../../components/carousel/smallCrousel/index";
import CarouselHeader from "../../../components/carousel/elements/header/CarouselHeader";

interface BannerItemsType {
  id: number;
  imgSrc: string;
  alt: string;
  brand: string;
  name: string;
  price: number;
}

interface BannerType {
  detail: string;
  imgSrc: string;
  alt: string;
  linkSrc: string;
  widthRatio: string;
  elementRatio: string;
  aspectRatio: string;
}

interface SmallCarouselProps {
  BannerItems: BannerItemsType[];
  Banner: BannerType[];
}

interface thirdDataType {
  Exhibition: SmallCarouselProps;
}

const ThirdArea: React.FC = () => {
  const thirdAreaRef = useRef<HTMLDivElement>(null);
  const [thirdAreaData, setThirdAreaData] = useState<thirdDataType>();

  const fetch = async () => {
    const res = await getMainAPI("third");
    setThirdAreaData(res.data.data);
  };

  useEffect(() => {
    FetchIntersectionObserver(fetch, thirdAreaRef);
  }, []);

  return (
    <ItemBox ref={thirdAreaRef}>
      {thirdAreaData ? (
        <section>
          <FigureLinkBox data={thirdAreaData?.Exhibition.Banner[0]} />
          <CarouselHeader title={"관련 제품"} path={"/"} />
          <SmallCarousel adata={thirdAreaData.Exhibition.BannerItems} />
        </section>
      ) : (
        <SkeleltionThirdArea />
      )}
    </ItemBox>
  );
};

export default ThirdArea;

const ItemBox = styled.article`
  display: flex;
  flex-direction: column;

  gap: 4rem;

  padding-top: 5rem;

  min-width: 20rem;
`;
