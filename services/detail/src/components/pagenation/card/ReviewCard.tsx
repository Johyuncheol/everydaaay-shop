import React, { useState } from "react";
import styled from "styled-components";

interface itemRequire {
  user: string;
  date: string;
  option: string;
  detail: string;
  imgUrl: string;
  alt: string;
  star: number;
}
interface ReviewCardProps {
  index: number;
  item: itemRequire;
}


const ReviewCard: React.FC<ReviewCardProps> = ({ index, item }) => {
  const [ isClicked, setIsClicked ] = useState(false);

  /* 클릭시 카드의 전체 내용이 보이게 하는 함수 
      현재 상태의 index가 현재 카드의 index와 같은경우 undefinded로 변경
      다른경우 현재 카드 index로 설정 
  */
  const showAll = () => {
    setIsClicked(!isClicked);
  };

  return (
    <ReviewCardArticle
      key={index}
      onClick={() => showAll()}
      state={isClicked} // 현재 카드가 클릭된 카드인지확인
    >
      <div className="header">
        <div>
          <span>{`${"★".repeat(item.star)}${"☆".repeat(5 - item.star)}`}</span>
          <span>{item.user}</span>
        </div>
        <span>{item.date}</span>
      </div>

      <div className="main">
        <div className="mainInfo">
          <span>{item.option}</span>
          <span className="detail">{item.detail}</span>
        </div>
        <img src={item.imgUrl} alt={item.alt} />
      </div>
    </ReviewCardArticle>
  );
};

export default ReviewCard;

const ReviewCardArticle = styled.div<{ state: boolean }>`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  border-bottom: 1px solid black;
  padding: 10px 0;

  height:${(props) => (props.state ? "" : "10rem")};
  
  cursor: pointer;
  span {
    word-break: break-all;
  }
  .header {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
  }

  .main {
    display: ${(props) => (props.state ? "block" : "flex")};
    justify-content: space-between;
    align-items: center;

    .mainInfo {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3; /* 표시할 최대 라인 수 */
      -webkit-box-orient: vertical;
    }

    .detail {
    }
  }

  img {
    width: ${(props) => (props.state ? "50%" : "8rem")};
    aspect-ratio: ${(props) => (props.state ? "" : "1/1")};
  }
`;
