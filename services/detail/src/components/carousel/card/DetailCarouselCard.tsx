import React from "react";
import styled from "styled-components";

interface mainBannerItem {
  imgSrc: string;
  alt: string;
}

interface CarouselCardProps {
  item: mainBannerItem;
  ratio: string;
}

/* 캐러셸안의 요소 형태 */
const MainCarouselCard: React.FC<CarouselCardProps> = ({ item, ratio }) => {
  return (
    <CardArticle ratio={ratio}>
      <img src={item.imgSrc} alt={item.alt} />
    </CardArticle>
  );
};

export default MainCarouselCard;

const CardArticle = styled.article<{ ratio: string }>`
  display: flex;
  background-color: #d9d9d9;
  position: relative;
  background-color: red;
  height:100%;
  aspect-ratio: ${(props) => props.ratio}; // 이게 카드 비율 결정

  .detail {
    position: absolute;
    bottom: 10%;
    left: 5%;
    color: white;

    font-size: 2rem;
  }

  img {
    width: 100%;
    object-fit: cover;
  }
  background-color: lightgray;
`;
