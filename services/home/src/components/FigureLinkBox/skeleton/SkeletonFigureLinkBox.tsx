import React from "react";
import styled from "styled-components";

// 이미지 클릭시 이동하는 링크를 위한 재사용 코드
// 한 행으로 구성되기에 width는 100%며 이를 분할해서 사용

interface dataType {
  widthRatio: string; 
  aspectRatio: string;
}

const SkeletonFigureLinkBox: React.FC<dataType> = ({
  widthRatio,
  aspectRatio,
}) => {
  return (
    <FigureSection
      widthRatio={widthRatio}
      aspectRatio={aspectRatio}
    ></FigureSection>
  );
};

export default SkeletonFigureLinkBox;

const FigureSection = styled.figure<{
  widthRatio: string;
  aspectRatio: string;
}>`
  width: ${(props) => props.widthRatio};
  aspect-ratio: ${(props) => props.aspectRatio};

  margin: 0;
  position: relative;
  cursor: pointer;
  background-color: #f0f0f0; /* 스켈레톤 UI 배경색 */
`;
