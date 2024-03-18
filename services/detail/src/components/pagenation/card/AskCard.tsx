import React from "react";
import styled from "styled-components";
import { useContext } from "react";
import { PageNationContext } from "../../../../../../shared/shared/lib/MyPageNation";

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
  /* 반복문안에서 상태를 관리하기위한 컨텍스트 */
  const context = useContext(PageNationContext); 

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
        {context?.cardState[index] ? (
          <div className="Password">
            비밀번호 :
            <input
              type="text"
              onChange={(e) => context.func(e, item.password, index)}
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
