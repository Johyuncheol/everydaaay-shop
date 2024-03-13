import React from "react";
import styled from "styled-components";
import SkeletonSmallCarousel from "../../../../components/carousel/smallCrousel/skeleton/SkeletonSmallCarousel";

const SkeletonSecondArea: React.FC = () => {
  return (
    <ItemBox>
      <SkeletonSmallCarousel />
      <SkeletonSmallCarousel />
    </ItemBox>
  );
};

export default SkeletonSecondArea;

const ItemBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;

  padding-top: 5rem;
`;
