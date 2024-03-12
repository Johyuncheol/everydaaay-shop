import React from "react";
import styled from "styled-components";
import { useCarosel } from "../hooks/useCarousel";

interface CarouselCardProps<T> {
  index: number;
  item: T;
  ratio: string;
}
interface CarouselBtnProps {
  handlePrevClick: () => void;
  handleNextClick: () => void;
}

interface CarouselOutLayerProps {
  children: React.ReactNode;
  width: string;
  ratio: string;
  maxHeight?: string;
  maxWidth?: string;
}

interface CarouselLocationProps {
  currentIndex: number;
  totalNums: number;
  setCurrentIndex:React.Dispatch<React.SetStateAction<number>>;
}

interface CarouselFrameProps<T> {
  CarouselCard: React.FC<CarouselCardProps<T>>;
  CarouselBtn?: React.FC<CarouselBtnProps>;
  CarouselOutLayer: React.FC<CarouselOutLayerProps>;
  CarouselIndecator?: React.FC<CarouselLocationProps>;
  adata: T[];
  width: string;
  layerRatio: string;
  cardRatio: string;
  gap?: string;
  maxHeight?: string;
  maxWidth?: string;
}


// 캐러셸 부품만 전달해주면 되도록 생성
export const CarouselFrame: <T extends {}>(
  props: CarouselFrameProps<T>
) => React.ReactNode = ({
  CarouselCard, //캐러셸 내부 카드의 형태
  CarouselBtn, // 캐러셸 이동 버튼 
  CarouselOutLayer, // 캐러셸 전체(전체크기, 테두리등)
  CarouselIndecator, // 몇번째케러셸인지 표시
  adata, // usePageNation훅으로 가져오는 데이터
  width, // 캐러셸 전제 width
  layerRatio, //캐러셸 전체 비율
  cardRatio, // 캐러셸 내부 비율 
  gap = "", // 카드간 간격
  maxHeight = "", //캐러셸 전체 최대높이
  maxWidth = "", //캐러셸 전체 최대 넓이
}) => {
  const { handlePrevClick, handleNextClick, currentIndex, setCurrentIndex } = useCarosel({
    adata,
  });

  return (
    <div>
      <CarouselOutLayer
        width={width}
        ratio={layerRatio}
        maxHeight={maxHeight}
        maxWidth={maxWidth}
      >
        <Inner currentIndex={currentIndex} length={adata.length} gap={gap}>
          {adata?.map((item, index) => {
            return <CarouselCard item={item} index={index} ratio={cardRatio} />;
          })}
        </Inner>

        {CarouselBtn && (
          <CarouselBtn
            handlePrevClick={handlePrevClick}
            handleNextClick={handleNextClick}
          />
        )}
      </CarouselOutLayer>

      {CarouselIndecator && (
        <CarouselIndecator
          currentIndex={currentIndex}
          totalNums={adata.length}
          setCurrentIndex={setCurrentIndex}
        />
      )}
    </div>
  );
};


const Inner = styled.div<{
  currentIndex: number;
  length: number;
  gap: string;
}>`
  display: flex;
  gap: ${(props) => props.gap};
  transition: transform 0.3s ease-in-out;
  transform: translateX(
    -${(props) => (props.currentIndex * 100) / props.length}%
  );
`;
