import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ProcessNav from "./processNav/ProcessNav";
import NonInCart from "./nonInCart/NonInCart";
import TotalInfo from "./totalInfo/TotalInfo";
import Items from "./items/Items";

const CartPage = () => {

  interface ItemRequire {
    size?: string;
    color?: string;
    other?: string;
    count: number;
    price: number;
    orderPrice: number;
    id: string;
    imgSrc: string;
    alt:string;
    name: string;
    deliveryFee: number;
    noDeliveryPrice: number;
  }

  const [data, setData] = useState<ItemRequire[]>([]);
  const [checkedItem, setCheckedItem] = useState<boolean[]>([]);

  // 종합정보
  const [payInfo, setPayInfo] = useState({
    orderPrice: 0,
    deliveryFee: 0,
    numOfItems: 0,
    totalPrice: 0,
  });

  //세션스토리지에서 데이터가져오기
  const GetBagData = async () => {
    const shoppingBagData = sessionStorage.getItem("shoppingBag");
    setData(JSON.parse(shoppingBagData ?? "[]"));
  };

  useEffect(() => {
    GetBagData();
  }, []);

  // 장바구니 데이터 변경시 세션의 데이터도 변경
  useEffect(() => {
    sessionStorage.setItem("shoppingBag", JSON.stringify(data));
  
  }, [data]);

  //선택아이탬 변경시 종합정보 변경
  useEffect(() => {
    setPayInfo(() => {
      const selectedItems = data.filter(
        (item, index) => checkedItem[index] === true
      );

      const orderPrice = selectedItems.reduce(
        (acc, item) => acc + item.orderPrice,
        0
      );
      const deliveryFee = selectedItems.reduce(
        (acc, item) => acc + item.deliveryFee,
        0
      );

      const totalPrice = orderPrice + deliveryFee;
      const numOfItems = selectedItems.length;
      const newPayInfo = {
        orderPrice,
        deliveryFee,
        numOfItems,
        totalPrice,
      };
      return newPayInfo;
    });
  }, [checkedItem, data]);

  return (
    <CenterWrap>
      <ProcessNav />
      <div className="itemSection">
        {data !== null && data.length !== 0 ? (
          <>
            <Items
              data={data}
              setCheckedItem={setCheckedItem}
              setData={setData}
              checkedItem={checkedItem}
            />
            <TotalInfo payInfo={payInfo} />

            <div className="FinishBoxWrap">
              <button className="menuItem">쇼핑 계속하기</button>
              <button className="menuItem">결제하기</button>
            </div>
          </>
        ) : (
          <NonInCart />
        )}
      </div>
    </CenterWrap>
  );
};

export default CartPage;

const CenterWrap = styled.section`
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items:center;

  .FinishBoxWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    height: 10rem;

    button {
      width: 200px;
      height: 50px;
      background-color: black;
      color: white;
      border: 1px solid grey;
      font-weight: 800;
      font-size: 1.5rem;
      cursor: pointer;

      &:hover {
        color: #ddbafd;
      }
    }
  }
`;
