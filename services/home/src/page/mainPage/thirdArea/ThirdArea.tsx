import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getMainAPI } from "../../../api/Main";
import FigureLinkBox from "../../../components/FigureLinkBox/FigureLinkBox";
import { FetchIntersectionObserver } from "../../../utill/useIntersectionObserver";
import SkeleltionThirdArea from "./skeleton/SkeletonThirdArea";
import SmallCarousel from "../../../components/carousel/smallCrousel/index";
import CarouselHeader from "../../../components/carousel/elements/header/CarouselHeader";

interface Item1 {
  id: number;
  imgSrc: string;
  alt: string;
  brand: string;
  name: string;
  price: number;
}

interface SmallCarouselProps {
  array: Item1[];
  name: string;

  detail: string;
  imgSrc: string;
  alt: string;
  linkSrc: string;
  widthRatio: string;
  elementRatio: string;
  aspectRatio: string;
}

interface thirdDataType {
  Exhibition: SmallCarouselProps[];
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
        thirdAreaData.Exhibition.map((item, index) => {
          return (
            <div key={index}>
              <FigureLinkBox data={item} />
              <CarouselHeader title={"관련 제품"} path={"/"} />
              <SmallCarousel adata={item.array} />
            </div>
          );
        })
      ) : (
        <SkeleltionThirdArea />
      )}
    </ItemBox>
  );
};

export default ThirdArea;

const ItemBox = styled.div`
  display: flex;
  flex-direction: column;

  gap: 4rem;

  padding-top: 5rem;

  min-width: 20rem;
`;
