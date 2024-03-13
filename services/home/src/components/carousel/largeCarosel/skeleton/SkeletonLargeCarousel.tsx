import React from "react";
import styled from "styled-components";

const SkeletonMainCarousel: React.FC = () => {
  return <SkeletonCard />;
};

const SkeletonCard = styled.div`
  background-color: #f0f0f0; /* 스켈레톤 UI 배경색 */
  display: flex;
  width: 100%;
  aspect-ratio:2/1;
  box-shadow: 10px 10px 20px 5px rgba(0, 0, 0, 0.1);

`;

export default SkeletonMainCarousel;
