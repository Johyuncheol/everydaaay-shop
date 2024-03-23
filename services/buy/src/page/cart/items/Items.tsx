import React, { useEffect, useState } from "react";
import styled from "styled-components";

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

interface ItemsProps {
  data: ItemRequire[];
  setCheckedItem: React.Dispatch<React.SetStateAction<boolean[]>>;
  setData: React.Dispatch<React.SetStateAction<ItemRequire[]>>;
  checkedItem: boolean[];
}

const Items: React.FC<ItemsProps> = ({
  data,
  setCheckedItem,
  setData,
  checkedItem,
}) => {
  const [AllCheckState, setAllCheckState] = useState(false);

  useEffect(() => {
    setCheckedItem(Array(data.length).fill(false));
  }, [data.length]);

  //체크박스 변경
  const handleCheckboxChange = (index: number) => {
    setCheckedItem((prev) => {
      const newItem = [...prev];
      newItem[index] = !newItem[index];
      return newItem;
    });
  };

  //체크박스 전체변경
  const handleAllCheckboxChange = (state: boolean) => {
    setCheckedItem(Array(data.length).fill(!state));
    setAllCheckState(!state);
  };

  // 아이템 삭제
  const handleDeleteItems = () => {
    setData((prevMyBagData) => {
      const newMyBagData = [...prevMyBagData].filter(
        (item, index) => checkedItem[index] === false
      );
      sessionStorage.setItem("shoppingBag", JSON.stringify(newMyBagData));

      return newMyBagData;
    });
  };

  // 아이템 수량 변경 함수
  const ChangeNumOfItem = ({
    index,
    type,
  }: {
    index: number;
    type: string;
  }) => {
    let num = 0;
    if (type === "up") num = 1;
    else if (type === "down") num = -1;

    setData((prev) =>
      prev.map((item, prevIndex) => {
        //동작했을때 0개면 동작안하게
        if (item.count + num === 0) return item;

        //현재인덱스값의 데이터를 찾아서 변경
        if (prevIndex === index) {
          const newOrderPrice = item.orderPrice + item.price * num;
          return {
            ...item,
            count: item.count + num,
            orderPrice: newOrderPrice,
          };
        }
        return item;
      })
    );
  };
  return (
    <MyBagSection>
      <div className="layout">
        <div className="menuItem">
          <input
            type="checkbox"
            className="checkbox"
            checked={AllCheckState}
            onChange={() => handleAllCheckboxChange(AllCheckState)}
          ></input>
        </div>
        <div className="menuItem">상품 정보</div>
        <div className="menuItem">수량</div>
        <div className="menuItem">주문금액</div>
        <div className="menuItem">배송비</div>
      </div>

      {data?.map((item, index) => {
        const optionKeys = Object.keys(item.option);
        return (
          <div className="layout" key={index}>
            <div className="item">
              <input
                data-testid={`checkbox-${index}`}
                type="checkbox"
                className="checkbox"
                checked={checkedItem[index]}
                onChange={() => handleCheckboxChange(index)}
              ></input>
            </div>

            <div className="Imgitem">
              <img src={item.imgSrc} alt={item.alt} />
              <div>
                <p>{item.name}</p>
                <p>
                  {optionKeys.map((optionKey, index) => {
                    return (
                      <div
                        key={index}
                      >{`${optionKey}: ${item.option[optionKey]}`}</div>
                    );
                  })}
                </p>
              </div>
            </div>
            <div className="item" data-testid={`itemNums-${index}`}>
              {item.count}
            </div>
            <div className="item">
              <button
                data-testid={`decreaseBtn-${index}`}
                onClick={() => ChangeNumOfItem({ index: index, type: "down" })}
              >
                ▼
              </button>
              <span data-testid={`orderPrice-${index}`}>{item.orderPrice}</span>
              <button
                data-testid={`increaseBtn-${index}`}
                onClick={() => ChangeNumOfItem({ index: index, type: "up" })}
              >
                ▲
              </button>
            </div>

            <div className="item">{item.deliveryFee}</div>
          </div>
        );
      })}

      <button
        className="del"
        data-testid={`deleteButton`}
        onClick={handleDeleteItems}
      >
        선택상품삭제
      </button>
    </MyBagSection>
  );
};

export default Items;

const MyBagSection = styled.section`
  border-top: 3px solid black;
  width: 100%;
  max-width: 64rem;
  display: flex;
  flex-direction: column;
  min-height: 20rem;

  .empty {
    font-size: 1.8rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    .goBest {
      min-height: 3rem;
      font-size: 1.3rem;
      font-weight: 600;

      &:hover {
        color: white;
        background-color: black;
      }
    }
  }

  .layout {
    display: grid;
    grid-template-columns: 0.5fr 2fr 1fr 1fr 1fr;
    grid-gap: 20px;
    gap: 20px;
    border-bottom: 1px solid #cbcaca;
  }

  .item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-weight: 500;
  }

  .Imgitem {
    display: flex;
    gap: 10px;
    align-items: center;
    font-weight: 500;
    img {
      width: 50%;
      aspect-ratio: 2/2;
    }
  }

  .menuItem {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    height: 5rem;
  }

  .checkbox {
    width: 1.5rem;
    height: 1.5rem;
  }

  .del {
    margin: 2rem 0;
    width: 10rem;
    height: 50px;
    background-color: #e0e0e2;
    border: 1px solid grey;
    cursor: pointer;

    &:hover {
      background-color: black;
      color: white;
    }
  }

  .FinishBoxWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    height: 200px;

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
