import React from "react";
import styled from "styled-components";
import SkeletonSmallCarousel from "../../../../components/carousel/smallCrousel/skeleton/SkeletonSmallCarousel";
import SkeletonFigureLinkBox from "../../../../components/FigureLinkBox/skeleton/SkeletonFigureLinkBox";

const SkeletonThirdArea: React.FC = () => {
  return (
    <ItemBox>
      <SkeletonFigureLinkBox widthRatio={"100%"} aspectRatio={"3/1"} />
      <SkeletonSmallCarousel />
    </ItemBox>
  );
};

export default SkeletonThirdArea;

const ItemBox = styled.div`
  display: flex;
  flex-direction: column;

  gap: 4rem;

  padding-top: 5rem;

  min-width: 20rem;
`;
