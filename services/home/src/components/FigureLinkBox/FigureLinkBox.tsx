import React from "react";
import styled from "styled-components";

// 이미지 클릭시 이동하는 링크를 위한 재사용 코드
// 한 행으로 구성되기에 width는 100%며 이를 분할해서 사용

interface dataType {
  imgSrc: string; // 배경이미지주소
  alt: string; // 이미지 alt
  detail: string; // 이미지위에 적힐 글씨
  linkSrc: string; // 클릭시 이동할 주소
  widthRatio: string; // 이미지의 width %
  aspectRatio: string;
}

interface FigureLinkBoxProps {
  data: dataType;
}

const FigureLinkBox: React.FC<FigureLinkBoxProps> = ({ data }) => {
  const movePage = (path: string) => {
    window.location.href = path;
  };

  return (
    <>
      <FigureSection
        onClick={() => movePage(data.linkSrc)}
        widthRatio={data.widthRatio}
        aspectRatio={data.aspectRatio}
      >
        <img src={data.imgSrc} alt={data.alt} />
        <pre className="detail">{data.detail}</pre>
      </FigureSection>
    </>
  );
};

export default FigureLinkBox;

const FigureSection = styled.figure<{
  widthRatio: string;
  aspectRatio: string;
}>`
  width: ${(props) => props.widthRatio};
  aspect-ratio: ${(props) => props.aspectRatio};

  margin: 0;
  position: relative;
  cursor: pointer;

  &:hover {
    img {
      filter: brightness(0.8);
    }
  }

  img {
    width: 100%;
    height: 100%;
    aspect-ratio: 1 / 1;
    object-fit: fill;
  }
  .detail {
    position: absolute;
    bottom: 0;
    left: 5%;
    color: white;
    font-weight: 600;
    font-size: 2rem;
  }
`;
