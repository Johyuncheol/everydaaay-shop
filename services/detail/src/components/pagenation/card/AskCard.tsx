import React, { useState } from "react";
import styled from "styled-components";

interface itemRequire {
  owner: string;
  date: string;
  detail: string;
  title: string;
  state: string;
  password: string;
}
interface AskCardProps {
  index: number;
  item: itemRequire;
}

const AskCard: React.FC<AskCardProps> = ({ index, item }) => {
  const [isHide, setIsHide] = useState(true);

  /* 비밀번호 입력값을 통해 현재카드의 상태 변경 함수
    현재카드의 비밀번호와 입력값이 같으면 상태를 true로 변경
  */
  const inputPassword = (
    e: React.ChangeEvent<HTMLInputElement>,
    password: string
  ) => {
    if (e.target.value === password) {
      setIsHide(false);
    }
  };

  return (
    <AskCardArticle className="review">
      <div className="header">
        <span>{item.owner}</span>
        <span>{item.date}</span>
      </div>

      <div className="main">
        <div className="mainInfo">
          <span>{item.title}</span>
        </div>
      </div>

      <div>
        {isHide ? (
          <div className="Password">
            비밀번호 :
            <input
              type="text"
              onChange={(e) => inputPassword(e, item.password)}
            />
          </div>
        ) : (
          <span>{item.detail}</span>
        )}
      </div>
    </AskCardArticle>
  );
};

export default AskCard;

const AskCardArticle = styled.div`
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

  .main {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .mainInfo {
      flex-direction: column;
    }
  }
  .Password {
    float: right;
  }

  img {
    width: 8rem;
  }
`;
