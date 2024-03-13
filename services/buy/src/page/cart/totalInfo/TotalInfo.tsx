import React from "react";
import styled from "styled-components";

interface TotalInfoProps {
  payInfo: {
    orderPrice: number;
    deliveryFee: number;
    numOfItems: number;
    totalPrice: number;
  };
}

const TotalInfo: React.FC<TotalInfoProps> = ({ payInfo }) => {
  return (
    <MyBagSection>
      <div className="layoutResult">
        <div className="menuItem">총 주문금액</div>
        <div className="menuItem">총 배송비</div>
        <div className="menuItem">총 결제금액</div>
      </div>

      <div className="layoutResult2">
        <div className="menuItem">
          <div>{payInfo.orderPrice}</div>
          <div>{payInfo.numOfItems}</div>
        </div>
        <div className="menuItem">+</div>
        <div className="menuItem">{payInfo.deliveryFee}</div>
        <div className="menuItem">=</div>
        <div className="menuItem">{payInfo.totalPrice}</div>
      </div>
    </MyBagSection>
  );
};

export default TotalInfo;


const MyBagSection = styled.section`
  border-top: 3px solid black;
  width: 100%;
  display: flex;
  flex-direction: column;

  .layoutResult {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 20px;
    gap: 20px;
    border-bottom: 1px solid #cbcaca;
  }

  .layoutResult2 {
    display: grid;
    grid-template-columns: 2fr 0.1fr 2fr 0.1fr 2fr;
    grid-gap: 20px;
    gap: 20px;
    border-bottom: 1px solid #cbcaca;
  }

  .menuItem {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    height: 5rem;
  }
`;
