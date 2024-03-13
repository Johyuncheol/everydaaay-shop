import React from "react";
import {CarouselFrame} from "../../../../../../shared/shared/lib/MyCarousel";
import MainCarouselCard from "../elements/card/MainCarouselCard";
import CarouselBtn from "../../../../../../shared/shared/components/carousel/elements/button/CarouselBtn";
import CarouselOutLayer from "../../../../../../shared/shared/components/carousel/elements/outLayer/CarouselOutLayer";
import CarouselIndecator from "../../../../../../shared/shared/components/carousel/elements/locations/CarouselLocation";


interface mainBannerItem {
  id: string;
  imgSrc: string;
  detail: string;
}

const LargeCarousel: React.FC<{ adata: mainBannerItem[] }> = ({ adata }) => {
  return (
    <CarouselFrame<mainBannerItem>
      CarouselCard={MainCarouselCard}
      CarouselBtn={CarouselBtn}
      CarouselOutLayer={CarouselOutLayer}
      CarouselIndecator={CarouselIndecator}
      adata={adata}
      width={"100%"}
      layerRatio={"2/1"}
      cardRatio={"2/1"}
    />
  );
};

export default LargeCarousel;
