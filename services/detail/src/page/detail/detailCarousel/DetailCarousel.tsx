import React from "react";
import { CarouselFrame } from "../../../../../../shared/shared/lib/MyCarousel";
import CarouselBtn from "../../../../../../shared/shared/components/carousel/elements/button/CarouselBtn";
import CarouselOutLayer from "../../../../../../shared/shared/components/carousel/elements/outLayer/CarouselOutLayer";
import DetailCarouselCard from "../../../components/carousel/card/DetailCarouselCard";
import CarouselIndecator from "../../../../../../shared/shared/components/carousel/elements/locations/CarouselLocation";

interface detailCarouselProps {
  imgSrc: string;
  alt: string;
}

const Carousel: React.FC<{ adata: detailCarouselProps[] }> = ({ adata }) => {
  return (
    <CarouselFrame<detailCarouselProps>
      CarouselCard={DetailCarouselCard}
      CarouselBtn={CarouselBtn}
      CarouselOutLayer={CarouselOutLayer}
      adata={adata}
      width={"100%"}
      layerRatio={"2/2"}
      cardRatio={"2/2"}
      CarouselIndecator={CarouselIndecator}
    />
  );
};

export default Carousel;
