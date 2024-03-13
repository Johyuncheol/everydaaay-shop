import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface CarouselHeaderProps {
  title: string;
  path: string;
}
const CarouselHeader: React.FC<CarouselHeaderProps> = ({ title, path }) => {
  return (
    <CarouselName>
      <span className="category">{title}</span>
      <Link to={path}>{"더보기 > "}</Link>
    </CarouselName>
  );
};

export default CarouselHeader;

const CarouselName = styled.div`
  display: flex;
  justify-content: space-between;
  height: 3rem;

  .category {
    font-weight: 600;
    font-size: 1.3rem;
  }

  .moveBtn {
    padding-right: 1rem;
  }
`;
