import React from "react";
import styled from "styled-components";
import { pageNationType } from "../../types/Types";


interface ContentProps {
  showData: pageNationType[]; 
  goDetailPage: (id: number) => void;
}

const Contents: React.FC<ContentProps> = ({ showData, goDetailPage }) => {
  return (
    <ContentArticle>
      {showData?.map((item, index) => {
        if (
          "imgSrc" in item &&
          "brand" in item &&
          "price" in item &&
          "name" in item &&
          "id" in item
        )
          return (
            <div
              className="itemBox"
              key={index}
              onClick={() => goDetailPage(item.id)}
            >
              <img src={item.imgSrc} />
              <div className="itemInfo">
                <span className="bold">{item.brand}</span>
                <span>{item.name}</span>
                <span className="bold">{item.price}</span>
              </div>
            </div>
          );
      })}
    </ContentArticle>
  );
};

export default Contents;

const ContentArticle = styled.article`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));

  column-gap: 20px;
  row-gap: 100px;
  .itemBox {
    display: flex;
    flex-direction: column;
    gap: 20px;

    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }

    .itemInfo {
      display: flex;
      flex-direction: column;
      gap: 10px;
      font-size: 1rem;
      .bold {
        font-weight: bold;
        font-size: 0.9rem;
      }
    }
  }
`;
