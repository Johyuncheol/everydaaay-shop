import React from "react";
import styled from "styled-components";

/* 상품 정보에 필요한 타입 */
interface ProductInfoRequire {
  brand: string;
  name: string;
  price: number;
  deliveryFee: number;
  noDeliveryPrice: number;
}

const ProductInfo: React.FC<{ data: ProductInfoRequire }> = ({ data }) => {
  return (
    <Option>
      <div className="itemInfo">{/* 4.5rem */}
        <span>{data.brand}</span>
        <span className="large wordBreak">{data.name}</span>
        <span className="middle">{data.price}</span>
      </div>

      <div className="otherInfo"> {/* 2rem */}
        <p>배송정보</p>
        <p>
          {data.noDeliveryPrice}원 미만 결제 시 {data.deliveryFee}원 발생
        </p>
      </div>
    </Option>
  );
};

export default ProductInfo;

const Option = styled.div`
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

  .otherInfo {
    font-size: 0.7rem;
    border-bottom: 1px solid #c2c3c4;
  }
`;
