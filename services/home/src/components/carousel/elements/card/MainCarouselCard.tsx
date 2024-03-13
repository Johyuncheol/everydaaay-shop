import React from "react";
import styled from "styled-components";

interface itemRequire {
  imgSrc: string;
  id: string;
  detail: string;
}
interface MainCarouselCardProps<itemRequire> {
  index: number;
  item: itemRequire;
  ratio: string;
}

const MainCarouselCard: React.FC<MainCarouselCardProps<itemRequire>> = ({ item, ratio }) => {
  return (
    <CardArticle ratio={ratio}>
      <img src={item.imgSrc} alt={`id: ${item.id}인 포스트`} />
      <span className="detail">{item.detail}</span>
    </CardArticle>
  );
};

export default MainCarouselCard;

const CardArticle = styled.article<{ ratio: string }>`
  display: flex;
  background-color: #d9d9d9;
  position: relative;
  background-color: red;

  .detail {
    position: absolute;
    bottom: 10%;
    left: 5%;
    color: white;

    font-size: 2rem;
  }

  aspect-ratio: ${(props) => props.ratio}; // 이게 카드 비율 결정
  img {
    width: 100%;
    object-fit: cover;
  }
  background-color: lightgray;
`;
