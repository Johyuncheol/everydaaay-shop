import React from "react";
import styled from "styled-components";

export interface itemsRequire {
  brand: string;
  id: number;
  imgSrc: string;
  name: string;
  price: string;
  alt: string;
}

interface CategoryCardProps {
  item: itemsRequire;
  index: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ index, item }) => {
  const goDetailPage = (id: number) => {
    window.location.href = `https://detail.everydaaay.com/detail/${id}`;
  };

  return (
    <Card className="itemBox" key={index} onClick={() => goDetailPage(item.id)}>
      <img src={item.imgSrc} alt={item.alt} />
      <div className="itemInfo">
        <span className="bold">{item.brand}</span>
        <span>{item.name}</span>
        <span className="bold">{item.price}</span>
      </div>
    </Card>
  );
};

export default CategoryCard;

const Card = styled.article`
  display: flex;
  flex-direction: column;
  gap: 20px;

  cursor: pointer;
  img {
    width: 100%;
    aspect-ratio: 1/1;
  }

  .itemInfo {
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 1rem;
    .bold {
      font-weight: bold;
      font-size: 0.9rem;
    }
  }
`;
