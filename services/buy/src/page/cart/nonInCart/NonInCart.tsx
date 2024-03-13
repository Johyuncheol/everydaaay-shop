import React from "react";
import styled from "styled-components";

const NonInCart: React.FC = () => {
  // 담은 상품없을때
  const handleNavigate = () => {
    alert("준비중입니다");
    /* navigate("/best"); */
  };
  return (
    <NonItemCard className="nonItems">
      <span>장바구니에 담은 상품이 없습니다</span>
      <button className="goBest" onClick={handleNavigate}>
        추천상품 보러가기
      </button>
    </NonItemCard>
  );
};

export default NonInCart;

const NonItemCard = styled.article`
  border-top: 3px solid black;
  font-size: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 20rem;

  gap: 5rem;

  button {
    width: 80%;
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
`;
