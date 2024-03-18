import React, { useEffect, useState } from "react";
import PagenationHeader from "../../../components/pagenation/header/PagenationHeader";
import { getReview } from "../../../api/Detail";
import ReviewCard from "../../../components/pagenation/card/ReviewCard";
import PageNumNav from "../../../components/pagenation/pageNumNav/PageNumNav";
import { usePagination } from "../../../../../../shared/shared/hooks/usePageNation";
import { ShowDataComponent } from "../../../../../../shared/shared/lib/MyPageNation";
import { PageNumNavComponent } from "../../../../../../shared/shared/lib/MyPageNation";
import NonItemCard from "../../../components/pagenation/card/NonItemCard";
import { PageNationContextProvider } from "../../../../../../shared/shared/lib/MyPageNation";

/* 리뷰 요청결과 데이터 타입 */
interface reviewRequire {
  user: string;
  date: string;
  option: string;
  detail: string;
  imgUrl: string;
  alt: string;
  star: number;
}

const ReviewPageNation: React.FC<{ productID: string }> = ({ productID }) => {
  /* 한페이지에서 보여줄 데이터의 수 */
  const numOfShow = 6;

  /* 메모리 캐싱을 진행하는 usePagination 훅 */
  /* 여기서는 훅에서 생성되는 현재페이지 번호를 키값으로 사용함 */
  /* 컴포넌트 언마운트시 or 새로고침시 초기화 */
  const paginationResult = usePagination<reviewRequire>(
    getReview,
    productID,
    numOfShow
  );

  const [isClicked, setIsClicked] = useState<Record<number, any>>({});

  /* 클릭아이템 초기값 설정 */
  useEffect(() => {
    setIsClicked(() => {
      const initialState: Record<number, any> = {};
      for (let i = 0; i <= paginationResult.showData.length; i++) {
        initialState[i] = false;
      }
      return initialState;
    });
  }, [paginationResult.showData]);

  /* 클릭시 카드의 전체 내용이 보이게 하는 함수*/
  const showDetail = (index: number) => {
    setIsClicked((prevIsHide) => ({
      ...prevIsHide,
      [index]: !prevIsHide[index],
    }));
  };

  return (
    /* 페이지네이션 Outlayer 레이아웃 */
    <PagenationHeader title={"리뷰"}>
      {paginationResult.showData.length ? (
        <>
          {/* 상태 변경을 처리하기위한 컨텍스트 */}
          <PageNationContextProvider cardState={isClicked} func={showDetail}>
            {/* 페이지네이션 반복되는 카드 구역 */}
            <ShowDataComponent
              showData={paginationResult.showData}
              renderCard={ReviewCard}
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
        <NonItemCard type="리뷰" />
      )}
    </PagenationHeader>
  );
};

export default ReviewPageNation;
