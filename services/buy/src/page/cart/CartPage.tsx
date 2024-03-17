import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProcessNav from "./processNav/ProcessNav";
import NonInCart from "./nonInCart/NonInCart";
import TotalInfo from "./totalInfo/TotalInfo";
import Items from "./items/Items";
import { getShoppingBagAPI, putInShoppingBagAPI } from "../../api/ShoppingBag";
import {
  addSessionStorage,
  getSessionStorage,
} from "../../../../../shared/shared/utill/session";
import LoadingPage from "../../../../../shared/shared/page/Spinner";

const CartPage = () => {
  interface OptionRequire {
    [key: string]: string;
  }

  interface ItemRequire {
    option: OptionRequire;
    count: number;
    price: number;
    orderPrice: number;
    id: string;
    imgSrc: string;
    alt: string;
    name: string;
    deliveryFee: number;
    noDeliveryPrice: number;
  }

  // 장바구니 데이터
  const [data, setData] = useState<ItemRequire[]>([]);
  // 초기값 , 장바구니 데이터가 변경되었는지 확인용
  const [firstData, setFirstData] = useState<ItemRequire[]>([]);
  //선택아이탬
  const [checkedItem, setCheckedItem] = useState<boolean[]>([]);
  // 장바구니 데이터 변경 여부
  const [isChange, setIsChange] = useState(false);

  // 데이터 로딩 상태를 나타내는 변수
  const [isLoading, setIsLoading] = useState(true);
  // 종합정보
  const [payInfo, setPayInfo] = useState({
    orderPrice: 0,
    deliveryFee: 0,
    numOfItems: 0,
    totalPrice: 0,
  });

  // 장바구니 데이터 가져오기
  const GetBagData = async () => {
    setIsLoading(true); // 로딩 상태를 true로 설정

    const shoppingBagData = await getShoppingBagAPI();

    addSessionStorage("shoppingBag", shoppingBagData);

    const shoppingBag_sesstion = getSessionStorage("shoppingBag");
    setData(shoppingBag_sesstion ?? "[]");
    setFirstData(shoppingBag_sesstion ?? "[]");

    setIsLoading(false); // 로딩 상태를 false로 설정 (로딩 완료)
  };

  useEffect(() => {
    GetBagData();
  }, []);

  // 페이지가언로드, 컴포넌트가 언마운트 될 때 세션의 정보를 서버에 저장요청 보냄
  useEffect(() => {
    const handleBeforeUnload = () => {
      //장바구니 데이터가 변경이 없으면
      if (!isChange) return;

      //변경있으면 서버로 업데이트
      const newData = getSessionStorage("shoppingBag");
      putInShoppingBagAPI(newData);
    };

    if (isChange) {
      console.log("이벤트 등록");
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isChange]);

  useEffect(() => {
    // 변경된 정보가 있는지 확인, 객체라 순서때문에 반복문사용
    for (let i = 0; i < data.length; i++) {
      // 다를 때
      if (JSON.stringify(data[i]) !== JSON.stringify(firstData[i])) {
        setIsChange(true); // 변경이 있으면 isChange 상태를 true로 업데이트
        return;
      }
    }
    setIsChange(false); // 변경이 없으면 isChange 상태를 false로 업데이트
  }, [data]);

  // 장바구니 데이터 변경시 세션의 데이터도 변경
  useEffect(() => {
    addSessionStorage("shoppingBag", data);
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
      const deliveryFee = selectedItems.reduce((acc, item) => {
        // 배송비무료 금액이상이면 배송비무료
        if (item.orderPrice >= item.noDeliveryPrice) return acc;
        return acc + item.deliveryFee;
      }, 0);

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
        {isLoading ? ( // 로딩 중인 경우
          <LoadingPage />
        ) : data.length !== 0 ? ( // 로딩이 완료되고 데이터가 있는 경우
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
          // 로딩이 완료되고 데이터가 없는 경우
          <NonInCart />
        )}
      </div>
    </CenterWrap>
  );
};

export default CartPage;

const CenterWrap = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

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
