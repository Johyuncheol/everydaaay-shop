import React, { useEffect, useRef } from "react";
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
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

interface CarouselFrameProps<T> {
  CarouselCard: React.FC<CarouselCardProps<T>>; // * height는 100%로 설정할 것 아이폰이 aspectRatio 기준이 세로
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
  maxHeight = "", //캐러셸 전체 최대높이
  maxWidth = "", //캐러셸 전체 최대 넓이
}) => {
  const { handlePrevClick, handleNextClick, currentIndex, setCurrentIndex } =
    useCarosel({
      adata,
    });

  const innerRef = useRef<HTMLDivElement>(null); // 카드들이 가로로 나열되는 곳
  const cardRef = useRef<HTMLDivElement>(null); // 카드 한장

  // currentIndex가 변경되면 useRef로 width 가져와 캐러셸을 이동시킴
  //       <- styled에서 이동하는 정도를 %로 두니 아이폰에서 인식못함
  // 이동하는 크기가 %단위가 아닌 고정값이 되면서 화면크기 변경시 리사이징 해줘야함
  useEffect(() => {
    //캐러셸 이동
    if (innerRef.current && cardRef.current) {
      innerRef.current.style.transition = "transform 0.3s ease-in-out";
      innerRef.current.style.transform = `translateX(-${
        currentIndex * cardRef.current.clientWidth
      }px)`;
    }

    // 리사이징
    const handleResize = () => {
      if (innerRef.current && cardRef.current) {
        innerRef.current.style.transition = "";
        innerRef.current.style.transform = `translateX(-${
          currentIndex * cardRef.current.clientWidth
        }px)`;
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [currentIndex]);

  return (
    <CarouselSection>
      <CarouselOutLayer
        width={width}
        ratio={layerRatio}
        maxHeight={maxHeight}
        maxWidth={maxWidth}
      >
        <div className="inner" ref={innerRef}>
          {adata?.map((item, index) => {
            return (
              <div className="cardArticle" ref={cardRef}>
                <CarouselCard item={item} index={index} ratio={cardRatio} />
              </div>
            );
          })}
        </div>

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
    </CarouselSection>
  );
};

const CarouselSection = styled.div`
  .inner {
    display: flex;
    height: 100%;
  }
  .cardArticle {
    display: flex;
    height: 100%;
  }
`;
