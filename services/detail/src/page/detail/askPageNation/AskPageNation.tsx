import React from "react";
import PagenationHeader from "../../../components/pagenation/header/PagenationHeader";
import { getAsk } from "../../../api/Detail";
import AskCard from "../../../components/pagenation/card/AskCard";
import PageNumNav from "../../../components/pagenation/pageNumNav/PageNumNav";
import { ShowDataComponent } from "../../../../../../shared/shared/lib/MyPageNation";
import { PageNumNavComponent } from "../../../../../../shared/shared/lib/MyPageNation";
import { usePagination } from "../../../../../../shared/shared/hooks/usePageNation";

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

  return (
    /* 페이지네이션 Outlayer 레이아웃 */
    <PagenationHeader title={"문의"}>

        {/* 페이지네이션 반복되는 카드 구역 */}
        <ShowDataComponent
          showData={paginationResult.showData}
          renderCard={AskCard}
        />
        
         {/* 페이지네이션 숫자 네비게이터 구역 */}
        <PageNumNavComponent
          pageNums={paginationResult.pageNums}
          currentPage={paginationResult.currentPage}
          setCurrentPage={paginationResult.setCurrentPage}
          movePageBtnHandler={paginationResult.movePageBtnHandler}
          pageNumNav={PageNumNav}
        />

    </PagenationHeader>
  );
};

export default AskPageNation;
