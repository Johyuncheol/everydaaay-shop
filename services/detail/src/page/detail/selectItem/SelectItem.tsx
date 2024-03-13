import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/config";
import AlertModalCard from "../../../../../../shared/shared/components/modalCard/AlertModalCard";
import { useModal } from "../../../../../../shared/shared/hooks/useModal";
import { putInShoppingBagAPI } from "../../../api/ShoppingBag";

/* 상품의 옵션 타입 */
interface optionItem {
  label: string;
  values: string[];
}

/* 상품 옵션선택에 필요한 타입 */
interface dataRequire {
  id: string;
  imgSrc: string;
  alt: string;
  brand: string;
  name: string;
  price: number;
  deliveryFee: number;
  noDeliveryPrice: number;
  options: optionItem[];
}

const ItemSelection: React.FC<{ data: dataRequire }> = ({ data }) => {
  /* 현재 선택한 옵션 상태 */
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  /* 모든 옵션이 선택되어 저장된 아이탬 상태 */
  const [selectedItems, setSelectedItems] = useState<Record<string, any>[]>([]);

  /* 저장된 전체 아이탬의 수 */
  const [totalNums, setTotalNums] = useState(0);

  /* 장바구니/구매시 띄울 모달 내용상태 */
  const [modalState, setModalState] = useState<string>("");

  /* 로그인한 유저인지 확인 */
  const userInfo = useSelector((state: RootState) => state.User);

  /* 모달 생성 */
  const AlertModal = useModal({ isOpen: false });

  /* 셀렉트박스 onChagne 함수 */
  const handleOptionChange = (
    optionLabel: string,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [optionLabel]: event.target.value,
    }));
  };

  /* 선택한 옵션들로 선정한 아이탬이 중복인지 확인하는 함수
   중복이라면 index를 반환
   아니라면 undefinded 반환 */
  const isDuplication = (option: Record<string, string>) => {
    /* 순회할 키값 */
    const keys = Object.keys(option);

    /* indexNum를 최초 undefinded로 설정 */
    let indexNum = undefined;

    // some 으로 하나라도 중복이 있는지 검사
    // every로 모든 키값이 같아야 중복
    selectedItems.some((item, index) => {
      if (keys.every((key) => item[key] === option[key])) {
        indexNum = index;
        return true;
      }
      return false;
    });

    return indexNum;
  };

  /* 현재 선택 옵션이 달라지면 동작 */
  useEffect(() => {
    handleAddSelectedItem();
  }, [selectedOptions]);

  /* 저장된 아이탬이 달라지면 아이탬 수 변경 */
  useEffect(() => {
    setTotalNums(selectedItems.reduce((sum, item) => sum + item.count, 0));
  }, [selectedItems]);

  /*  저장 아이탬 배열에 추가하는 함수
   모든 옵션을 선택해야 동작
   중복을 검사하는 isDuplication 함수에서 전달받은 index로 couter 추가 혹인 새 객체 배열에 추가 */
  const handleAddSelectedItem = () => {
    /* 모든 옵션을 골랐는지 확인*/
    if (Object.keys(selectedOptions).length === data.options.length) {
      /* 저장된 아이탬들중 중복인지 */
      const index = isDuplication(selectedOptions);

      /* 중복일때 */
      if (index !== undefined) {
        setSelectedItems((prevSelectedItems) => {
          const updatedItems = [...prevSelectedItems];
          const newCount = updatedItems[index].count + 1;
          updatedItems[index].count = newCount;
          updatedItems[index].orderPrice = newCount * updatedItems[index].price;

          return updatedItems;
        });

        setSelectedOptions({});
      } else {
        /* 중복아닐때 */
        /* 장바구니에 넣을때 필요한 데이터 추가 */
        const option = { ...selectedOptions };
        const newItem = {
          option,
          count: 1,
          id: data.id,
          imgSrc: data.imgSrc,
          name: data.name,
          deliveryFee: data.deliveryFee,
          price: data.price,
          noDeliveryPrice: data.noDeliveryPrice,
          orderPrice: data.price,
        };

        setSelectedItems([...selectedItems, newItem]);
        setSelectedOptions({});
      }
    }
  };

  /* 저장 아이탬 삭제 함수 */
  const handleDeleteItem = (index: number) => {
    setSelectedItems((prev) => prev.filter((_, i) => i !== index));
  };

  /* 저장아이탬 수량 변경 함수 */
  const handleChangeCount = ({
    type,
    index,
  }: {
    type: string;
    index: number;
  }) => {
    /* 변경조건 +, - */
    let num = 0;
    if (type === "plus") num = 1;
    else if (type === "sub") num = -1;

    /* 수량과 전체 주문 금액 수정 */
    setSelectedItems((prev) => {
      const updatedItems = [...prev];
      const newCount = updatedItems[index].count + num;

      if (newCount >= 0) {
        updatedItems[index].count = newCount;
        updatedItems[index].orderPrice = updatedItems[index].price * newCount;
      }
      return updatedItems;
    });
  };

  /* 장바구니에 담기 버튼 클릭시 */
  const AddToShoppingBag = () => {
    /* 로그인 안되어있으먄 로그인 창으로 */
    if (userInfo.name === null) return (window.location.href = "/auth/login");

    /* 고른게 없을 떄 */
    if (selectedItems.length === 0) return;

    /* 세션의 쇼핑백데이터 불러옴 */
    const shoppingBagData = sessionStorage.getItem("shoppingBag");

    /* 세션에 장바구니 정보가 있으면 합쳐서 세션에 저장, 장바구니 저장 api 수행 */
    if (shoppingBagData !== null) {
      const newArray = [...selectedItems, ...JSON.parse(shoppingBagData)];

      sessionStorage.setItem("shoppingBag", JSON.stringify(newArray));
      PostCart(newArray);
    } else {
      /* 세션에 장바구니 정보가 없으면 selectedItems만 세션에 저장, 장바구니 저장 api 수행 */
      sessionStorage.setItem("shoppingBag", JSON.stringify(selectedItems));
      PostCart(selectedItems);
    }

    setSelectedItems([]);
  };

  /* 데이터를 세션에 저장 , 장바구니 저장 api 수행 하는 함수 */
  const PostCart = async (data: Record<string, any>[]) => {
    const message = await putInShoppingBagAPI(JSON.stringify(data));
    setModalState(message);
    AlertModal.openModal();
  };

  return (
    <SelectSection>
      {/* 모달창 */}
      {AlertModal.modalState.isOpen && (
        <AlertModalCard onClose={AlertModal.closeModal} detail={modalState} />
      )}

      {/* 옵션 셀렉트 박스 */}
      {data.options.map((option, index) => (
        <div key={option.label}>
          <select
            value={selectedOptions[option.label] || ""}
            onChange={(e) => handleOptionChange(option.label, e)}
          >
            {index !== 0 &&
            selectedOptions[data.options[index - 1].label] === undefined ? (
              /* 앞선 옵션이 선택되지않았을 때 */
              <option value="">{`${
                data.options[index - 1].label
              }을 선택해주세요`}</option>
            ) : (
              /* 앞선 옵션이 선택되어있을 때 */
              <>
                <option value="">Select {option.label}</option>
                {option.values.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
      ))}

      {/* 저장된 아이탬 출력 */}
      <p>You have selected:</p>
      {
        <div className="items">
          {selectedItems.map((item, index) => {
            /* 저장아이템 옵션출력 */
            const optionKeys = item.option ? Object.keys(item.option) : [];
            console.log(item.option["size"]);
            return (
              <div className="item" key={index}>
                {optionKeys.map((optionkey, index) => {
                  return (
                    <span
                      key={index}
                    >{` ${optionkey}: ${item.option[optionkey]}`}</span>
                  );
                })}

                {/* 수량 변경 버튼 */}
                <div>
                  <button
                    onClick={() =>
                      handleChangeCount({ type: "sub", index: index })
                    }
                  >
                    ▼
                  </button>
                  {item.count}
                  <button
                    onClick={() =>
                      handleChangeCount({ type: "plus", index: index })
                    }
                  >
                    ▲
                  </button>
                </div>

                <button onClick={() => handleDeleteItem(index)}>x</button>
              </div>
            );
          })}
        </div>
      }

      {/* 상품의 수량, 전체 금액 */}
      <div className="result">
        <div>{totalNums}개의</div>
        <div>
          <span>총 상품 금액: </span>
          <span>{data.price * totalNums}</span>
        </div>
      </div>

      {/* 장바구니/구매하기 버튼 */}
      <div className="btnWrap">
        <Button state={false} onClick={AddToShoppingBag}>
          장바구니
        </Button>
        <Button state={true} onClick={() => alert("준비중입니다")}>
          구매하기
        </Button>
      </div>
    </SelectSection>
  );
};

export default ItemSelection;

const SelectSection = styled.section`
  display: flex;
  flex-direction: column;

  .items {
    max-height: 30vh;
    overflow-y: auto;
    border-bottom: 2px solid black;
  }
  .item {
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid grey;
    height: 3rem;
    align-items: center;
    font-size: 1rem;
  }
  select {
    width: 100%;
  }

  .result {
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .btnWrap {
    display: flex;
    justify-content: center;
  }
`;

const Button = styled.button<{ state: boolean }>`
  width: 50%;
  border: 1px solid black;
  text-align: center;
  line-height: 3rem;
  background-color: ${(props) => (props.state ? "black" : "white")};
  color: ${(props) => (props.state ? "white" : "black")};

  cursor: pointer;
`;
