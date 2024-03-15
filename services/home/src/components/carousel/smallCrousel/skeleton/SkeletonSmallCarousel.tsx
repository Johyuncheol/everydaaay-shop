import React from "react";
import styled from "styled-components";

const SkeletonSmallCarousel: React.FC = () => {
  return <CarouselSection />;
};

export default SkeletonSmallCarousel;
const CarouselSection = styled.section`
  width: 100%;
  aspect-ratio: 2/1;
  background-color: #f0f0f0; /* 스켈레톤 UI 배경색 */
`;
