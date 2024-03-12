import React from "react";
import LeftArrowSvg from "../../../../assets/carousel/LeftArrow.svg";
import RightArrowSvg from "../../../../assets/carousel/RightArrow.svg";
import styled from "styled-components";

interface CarouselBtnProps {
  handlePrevClick: () => void;
  handleNextClick: () => void;
}
const CarouselBtn: React.FC<CarouselBtnProps> = ({ handlePrevClick, handleNextClick }) => {
  return (
    <>
      <LeftBtn src={LeftArrowSvg} onClick={handlePrevClick} alt="LeftArrow" />
      <RightBtn src={RightArrowSvg} onClick={handleNextClick} alt="RightArrow" />
    </>
  );
};

export default CarouselBtn;

const RightBtn = styled.img`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  font-size: 1.5em;
  cursor: pointer;
`;

const LeftBtn = styled.img`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  font-size: 1.5em;
  cursor: pointer;
`;
