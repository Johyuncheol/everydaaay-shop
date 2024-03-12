import React from "react";
import styled from "styled-components";

interface CarouselOutLayerProps {
  children: React.ReactNode;
  width: string;
  ratio: string;
  maxHeight?: string;
  maxWidth?: string;
}
const CarouselOutLayer: React.FC<CarouselOutLayerProps> = ({
  children,
  width,
  ratio,
  maxHeight = "",
  maxWidth = ""
}) => {
  return (
    <OutLayerSection width={width} ratio={ratio} maxHeight={maxHeight} maxWidth={maxWidth}>
      {children}
    </OutLayerSection>
  );
};

export default CarouselOutLayer;

const OutLayerSection = styled.section<{
  width: string;
  ratio: string;
  maxHeight: string;
  maxWidth:string;
}>`
  display: flex;
  width: ${(props) => props.width}; // 이게 이미지 비율 결정
  aspect-ratio: ${(props) => props.ratio};

  max-width:${(props) => props.maxWidth};
  background-color: none;
  overflow: hidden;
  position: relative;
  box-shadow: 10px 10px 20px 5px rgba(0, 0, 0, 0.1);
  max-height: ${(props) => props.maxHeight};
`;
