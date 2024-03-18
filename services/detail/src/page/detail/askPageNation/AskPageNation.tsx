import React, { useEffect, useState } from "react";
import PagenationHeader from "../../../components/pagenation/header/PagenationHeader";
import { getAsk } from "../../../api/Detail";
import AskCard from "../../../components/pagenation/card/AskCard";
import PageNumNav from "../../../components/pagenation/pageNumNav/PageNumNav";
import { ShowDataComponent } from "../../../../../../shared/shared/lib/MyPageNation";
import { PageNumNavComponent } from "../../../../../../shared/shared/lib/MyPageNation";
import { usePagination } from "../../../../../../shared/shared/hooks/usePageNation";
import styled from "styled-components";
import NonItemCard from "../../../components/pagenation/card/NonItemCard";
import { PageNationContextProvider } from "../../../../../../shared/shared/lib/MyPageNation";

/* 문의 요청결과 데이터 타입 */
interface AskRequire {
  owner: string;
  date: string;
  detail: string;
  title: string;
  state: string;
  password: string;
}

const AskPageNation: React.FC<{ productID: string }> = ({ productID }) => {
  /* 한페이지에서 보여줄 데이터의 수 */
  const numOfShow = 6;

  /* 메모리 캐싱을 진행하는 usePagination 훅 */
  /* 여기서는 훅에서 생성되는 현재페이지 번호를 키값으로 사용함 */
  /* 컴포넌트 언마운트시 or 새로고침시 초기화 */
  const paginationResult = usePagination<AskRequire>(
    getAsk,
    productID,
    numOfShow
  );

  /* 비밀글 상태 */
  const [isHide, setIsHide] = useState<Record<number, any>>({});

  /* 비밀글 초기값 설정 */
  useEffect(() => {
    setIsHide(() => {
      const initialState: Record<number, any> = {};
      for (let i = 0; i <= paginationResult.showData.length; i++) {
        initialState[i] = true;
      }
      return initialState;
    });
  }, [paginationResult.showData]);

  /* 비밀번호 입력값을 통해 현재카드의 상태 변경 함수
    현재카드의 비밀번호와 입력값이 같으면 상태를 true로 변경
  */
  const inputPassword = (
    e: React.ChangeEvent<HTMLInputElement>,
    password: string,
    index: number
  ) => {
    if (e.target.value === password) {
      setIsHide((prevIsHide) => ({
        ...prevIsHide,
        [index]: false,
      }));
    }
  };

  return (
    /* 페이지네이션 Outlayer 레이아웃 */
    <PagenationHeader title={"문의"}>
      {paginationResult.showData.length ? (
        <>
          {/* 상태 변경을 처리하기위한 컨텍스트 */}
          <PageNationContextProvider cardState={isHide} func={inputPassword}>
            {/* 페이지네이션 반복되는 카드 구역 */}
            <ShowDataComponent
              showData={paginationResult.showData}
              renderCard={AskCard}
            />
          </PageNationContextProvider>

          {/* 페이지네이션 숫자 네비게이터 구역 */}
          <PageNumNavComponent
            pageNums={paginationResult.pageNums}
            currentPage={paginationResult.currentPage}
            setCurrentPage={paginationResult.setCurrentPage}
            movePageBtnHandler={paginationResult.movePageBtnHandler}
            pageNumNav={PageNumNav}
          />
        </>
      ) : (
        <NonItemCard type={"문의"} />
      )}
    </PagenationHeader>
  );
};

export default AskPageNation;

const NotDataArticle = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
