import React from "react";
import styled from "styled-components";
import SkeletonLargeCarousel from "../../../../components/carousel/largeCarosel/skeleton/SkeletonLargeCarousel";
import SkeletonFigureLinkBox from "../../../../components/FigureLinkBox/skeleton/SkeletonFigureLinkBox";

const SkeletonHalfCarousel: React.FC = () => {
  return (
    <ItemSection>
      <SkeletonLargeCarousel />
      <ItemBox1>
        <SkeletonFigureLinkBox widthRatio={"25%"} aspectRatio={"1/1.6"} />
        <SkeletonFigureLinkBox widthRatio={"25%"} aspectRatio={"1/1/6"} />
        <SkeletonFigureLinkBox widthRatio={"50%"} aspectRatio={"1/0.8"} />
      </ItemBox1>
    </ItemSection>
  );
};

const ItemSection = styled.div`
  display: flex;
  flex-direction: column;

  gap: 4rem;
`;

const ItemBox1 = styled.div`
  display: flex;
  gap: 1rem;
`;

export default SkeletonHalfCarousel;
