import React from "react";
import styled from "styled-components";

const NonItemCard = ({ type }: { type: string }) => {
  return <NotDataArticle>{type}가 존재하지 않습니다</NotDataArticle>;
};

export default NonItemCard;

const NotDataArticle = styled.article`
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
