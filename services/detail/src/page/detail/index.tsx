import React, { useEffect, useState, useRef } from "react";
import { getDetail } from "../../api/Detail";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import DetailCarousel from "./detailCarousel/DetailCarousel";
import ReviewPageNation from "./reviewPageNation/ReviewPageNation";
import SelectItem from "./selectItem/SelectItem";
import ScrollNav from "./scrollNav/ScrollNav";
import DetailInfo from "./detailInfo/DetailInfo";
import ProductInfo from "./productInfo/ProductInfo";
import AskPageNation from "./askPageNation/AskPageNation";
import Spinner from "../../../../../shared/shared/page/Spinner";

interface Item {
  imgSrc: string;
  alt: string;
}

interface optionItem {
  label: string;
  values: string[];
}

interface dataRequire {
  id: string;
  imgSrc: string;
  alt: string;
  brand: string;
  name: string;
  price: number;
  carouselImg: Item[];
  detailImg: string;
  detailImgAlt: string;
  deliveryFee: number;
  noDeliveryPrice: number;
  options: optionItem[];
}

const DetailPage: React.FC = () => {
  /* 현재 상품의 ID값  */
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  /* scrollNav 클릭시 이동을 위한 useRef */
  const detailRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef<HTMLDivElement>(null);
  const askRef = useRef<HTMLDivElement>(null);

  /* 디테일 페이지 get 요청결과 */
  const [data, setData] = useState<dataRequire>();

  /* 디테일 페이지 데이터 fetch */
  const fetchData = async () => {
    const res = await getDetail(id);
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DetailSection>
      {data ? (
        <>
          {/* 최상단 캐러셸과 상품, 주문정보 그리드 */}
          <GridContainer>
            {/* 좌측 캐러셸 부분 */}
            <div className="colum1">
              <DetailCarousel adata={data?.carouselImg} />
            </div>

            {/* 우측 상품정보 부분 */}
            <div className="colum2">
              <ProductInfo data={data} />
              <SelectItem data={data} />
            </div>
          </GridContainer>

          {/* 클릭시 해당 구역으로 이동하는 NAV */}
          <ScrollNav
            detailRef={detailRef}
            reviewRef={reviewRef}
            askRef={askRef}
          />

          {/* 상세 이미지 구역 */}
          <article ref={detailRef}>
            <DetailInfo data={data} />
          </article>

          {/* 리뷰 페이지네이션 구역 */}
          <article ref={reviewRef}>
            <ReviewPageNation productID={id} />
          </article>

          {/* 문의 페이지네이션 구역 */}
          <article ref={askRef}>
            <AskPageNation productID={id} />
          </article>
        </>
      ) : (
        <Spinner />
      )}
    </DetailSection>
  );
};

export default DetailPage;

const DetailSection = styled.section`
  width: 100%;
  padding: 0 5%;
  gap: 8rem;
  display: flex;
  flex-direction: column;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 45% 50%;
  grid-column-gap: 5%;
  padding: 5%;

  min-width: 600px;
  max-width: 1920px;

  @media (max-width: 600px) {
    gap: 4rem;
    display: flex;
    flex-direction: column;
    min-width: 0;
    padding: 0;
  }
`;
