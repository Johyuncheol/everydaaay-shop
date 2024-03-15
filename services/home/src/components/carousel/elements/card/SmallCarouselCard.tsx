import React from "react";
import styled from "styled-components";

interface Item {
  id: number;
  imgSrc: string;
  alt: string;
  brand: string;
  name: string;
  price: number;
}

interface SmallCarouselProps<Item> {
  item: Item;
  ratio: string;
  index: number;
}

const SmallCarouselCard: React.FC<SmallCarouselProps<Item>> = ({
  item,
  index,
  ratio,
}) => {
  return (
    <Card className="card" key={index} ratio={ratio}>
      <img src={item.imgSrc} alt={item.alt} />
      <span>{item.brand}</span>
      <span>{item.name}</span>
      <span>{item.price}</span>
    </Card>
  );
};

export default SmallCarouselCard;

const Card = styled.div<{ ratio: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;

  height:100%;
  aspect-ratio: ${(props) => props.ratio};
  flex-shrink: 0;
  box-shadow: 10px 5px 5px #2c2e2d11;
  padding-left:1rem;

  img {
    width: 100%;
    object-fit: cover;
  }
`;
