import React from "react";
import styled from "styled-components";

import FirstArea from "./firstArea/FirstArea";

const SecondArea = React.lazy(() => import("./secondArea/SecondArea"));
const ThirdArea = React.lazy(() => import("./thirdArea/ThirdArea"));

const MainPage: React.FC = () => {
  // 메인페이지를 영역단위로 쪼갠뒤 데이터 요청을 세부화

  return (
    <ItemSection>
      <FirstArea />
      <Border />
      <SecondArea />
      <Border />
      <ThirdArea />
    </ItemSection>
  );
};

export default MainPage;

const ItemSection = styled.div`
  display: flex;
  flex-direction: column;

  gap: 4rem;
`;

const Border = styled.div`
  width: 30%;
  border: 0.5rem solid black;
`;
