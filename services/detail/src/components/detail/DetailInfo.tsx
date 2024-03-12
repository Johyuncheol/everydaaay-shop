import React from "react";

interface dataRequire {
  id: string;
  imgSrc: string;
  brand: string;
  name: string;
  price: number;
  carouselImg: string[];
  detailImg: string;
  deliveryFee: number;
  noDeliveryPrice: number;
}

interface DetailInfoProps {
  data: dataRequire;
  setIsShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
  isShowDetail: boolean;
}

const DetailInfo: React.FC<DetailInfoProps> = ({
  data,
  setIsShowDetail,
  isShowDetail,
}) => {
  return (
    <div>
      <div className="detailInfo">
        <img src={data?.detailImg} />
      </div>

      <button onClick={() => setIsShowDetail(!isShowDetail)}>
        {isShowDetail ? "상품정보 접기" : "상품정보 더보기"}
      </button>
    </div>
  );
};

export default DetailInfo;
