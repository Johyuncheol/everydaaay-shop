import React from "react";
import {CarouselFrame} from "../../../../../../shared/shared/lib/MyCarousel";
import SmallCarouselCard from "../elements/card/SmallCarouselCard";
import CarouselBtn from "../../../../../../shared/shared/components/carousel/elements/button/CarouselBtn";
import CarouselOutLayer from "../../../../../../shared/shared/components/carousel/elements/outLayer/CarouselOutLayer";
interface Item {
  id: number;
  imgSrc: string;
  alt: string;
  brand: string;
  name: string;
  price: number;
}

const SmallCarousel: React.FC<{ adata: Item[] }> = ({ adata }) => {
  return (
    <CarouselFrame<Item>
      CarouselCard={SmallCarouselCard}
      CarouselBtn={CarouselBtn}
      CarouselOutLayer={CarouselOutLayer}
      adata={adata}
      width={"100%"}
      layerRatio={"2/1"}
      cardRatio={"1/2"}
      gap={"1rem"}
      maxHeight={"400px"}
    />
  );
};

export default SmallCarousel;
