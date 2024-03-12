import React, { useEffect, useState, useRef } from "react";
import { getDetail } from "../api/Detail";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Carousel from "../components/detail/Carousel";

import AskPageNation from "../components/detail/AskPageNation";
import ReviewPageNation from "../components/detail/ReviewPageNation";
import SelectItem from "../components/detail/SelectItem";
import ScrollNav from "../components/detail/ScrollNav";
import DetailInfo from "../components/detail/DetailInfo";

const DetailPage: React.FC = () => {
  const customOptions = [
    {
      label: "color",
      values: ["차콜", "블루", "그레이"],
    },
    {
      label: "size",
      values: ["S", "M", "L"],
    },
  ];
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [isShowDetail, setIsShowDetail] = useState(false);

  const detailInfoRef = useRef<HTMLSpanElement>(null);
  const reviewInfoRef = useRef<HTMLSpanElement>(null);
  const inquiredInfoRef = useRef<HTMLSpanElement>(null);

  const scrollToElement = (targetRef: React.RefObject<HTMLSpanElement>) => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

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
  const [data, setData] = useState<dataRequire>();
  const fetchData = async () => {
    const res = await getDetail(id);
    console.log(res);
    setData(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DetailSection>
      {data && (
        <div className="mainInfo">
          <div className="left">
            <article className="carosel">
              {data?.carouselImg && <Carousel adata={data?.carouselImg} />}
            </article>

            <article className="nav">
              <ScrollNav
                scrollToElement={scrollToElement}
                detailInfoRef={detailInfoRef}
                reviewInfoRef={reviewInfoRef}
                inquiredInfoRef={inquiredInfoRef}
              />
            </article>

            <DetailArticle state={isShowDetail} ref={detailInfoRef}>
              <DetailInfo
                data={data}
                setIsShowDetail={setIsShowDetail}
                isShowDetail={isShowDetail}
              />
            </DetailArticle>

            <DetailArticle state={false} ref={reviewInfoRef}>
              <div className="chapter">
                <span>리뷰</span>
              </div>

              <ReviewPageNation />
            </DetailArticle>

            <DetailArticle state={false} ref={inquiredInfoRef}>
              <div className="chapter">
                <span>문의: 현재 비밀번호 모두 3703</span>
              </div>

              <AskPageNation />
            </DetailArticle>
          </div>
          <div className="right">
            <div className="option">
              <div className="itemInfo">
                <span>{data.brand}</span>
                <span className="large wordBreak">{data.name}</span>
                <span className="middle">{data.price}</span>
              </div>

              <div className="otherInfo">
                <p>배송정보</p>
                <p>
                  {data.noDeliveryPrice}원 미만 결제 시 {data.deliveryFee}원
                  발생
                </p>
              </div>
            </div>

            <div className="option2">
              <SelectItem
                options={customOptions}
                price={data.price}
                id={data.id}
                imgSrc={data.imgSrc}
                name={data.name}
                deliveryFee={data.deliveryFee}
                noDeliveryPrice={data.noDeliveryPrice}
              />
            </div>
          </div>
        </div>
      )}
    </DetailSection>
  );
};

export default DetailPage;

const DetailSection = styled.section`
  .mainInfo {
    display: flex;

    @media (max-width: 550px) {
      flex-direction: column-reverse;
      align-items: center;
    }

    .left {
      padding: 3rem;
      width: 63%;

      @media (max-width: 550px) {
        width: 100%;
      }

      max-width: 1200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 80px;

      .carosel {
        width: 100%;
      }
      .nav {
        width: 100%;
      }
    }

    .right {
      padding: 3rem;

      /*      width: 30%; */
      min-width: 350px;

      @media (max-width: 550px) {
        width: 100%;
      }

      display: flex;
      flex-direction: column;

      gap: 1rem;

      .itemInfo {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        overflow: hidden;
      }

      .wordBreak {
        word-wrap: break-word;
      }
      .large {
        font-size: 2rem;
      }
      .middle {
        font-size: 1.5rem;
      }

      .option {
        top: 5rem;
        display: flex;

        flex-direction: column;
        gap: 1rem;
      }

      .option2 {
        position: sticky;
        top: 8rem;
        display: flex;

        flex-direction: column;
        gap: 1rem;
      }

      select {
        height: 3rem;
        text-align: center;
      }
      option {
        font-size: 1rem;
      }

      .otherInfo {
        font-size: 0.7rem;
        border-bottom: 1px solid #c2c3c4;
      }
    }

    .brandImg {
      img {
        max-width: 7rem;
        height: 7rem;
      }
    }

    .btnWrap {
      display: flex;
      gap: 1rem;
    }
  }
`;

const DetailArticle = styled.article<{ state: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .detailInfo {
    height: ${(props) => (props.state ? "" : "300px")};
    width: 100%;
    overflow: ${(props) => (props.state ? "" : "hidden")};
    img {
      width: 100%;
    }
  }
  button {
    width: 80%;
  }

  .chapter {
    width: 100%;
    border-bottom: 4px solid black;
    font-size: 1.3rem;
    font-weight: 600;
    line-height: 4rem;
  }
`;

const PageNationBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  .review {
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    border-bottom: 1px solid black;
    padding: 10px 0;

    .header {
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: space-between;
    }
  }

  .main {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .mainInfo {
      flex-direction: column;
    }
  }

  img {
    width: 8rem;
  }
`;
