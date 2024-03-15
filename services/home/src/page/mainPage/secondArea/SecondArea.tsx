import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getMainAPI } from "../../../api/Main";
import { FetchIntersectionObserver } from "../../../utill/useIntersectionObserver";
import SmallCrousel from "../../../components/carousel/smallCrousel/index";
import CarouselHeader from "../../../components/carousel/elements/header/CarouselHeader";
import SkeletionSecondArea from "./skeleton/SkeletionSecondArea";
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
  elementRatio: string;
}

interface secondDataType {
  Popular: SmallCarouselProps[];
}

const SecondArea: React.FC = () => {
  const secondAreaRef = useRef<HTMLDivElement>(null);
  const [secondAreaData, setSecondAreaData] = useState<secondDataType>();

  const fetch = async () => {
    const res = await getMainAPI("second");
    setSecondAreaData(res.data.data);
  };

  useEffect(() => {
    FetchIntersectionObserver(fetch, secondAreaRef);
  }, []);

  return (
    <ItemBox ref={secondAreaRef}>
      {secondAreaData ? (
        secondAreaData?.Popular.map((item, index) => {
          return (
            <div key={index}>
              <CarouselHeader title={item.name} path={"/"} />
              <SmallCrousel adata={item.array} />
            </div>
          );
        })
      ) : (
        <SkeletionSecondArea />
      )}
    </ItemBox>
  );
};

export default SecondArea;

const ItemBox = styled.div`
  display: flex;
  flex-direction: column;

  gap: 4rem;

  padding-top: 5rem;
`;
