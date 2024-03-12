import React from "react";

//페이지네이션 numNav를 위한 타입
interface numNavProps {
  pageNums: number[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  movePageBtnHandler: (type: string) => void;
}


/* 페이지네이션 훅데이터의 결과 중 현재 보여줄 데이터(showData) 배열 타입 
제네릭을 사용해서 타입의 입력을 받음 
*/
interface ShowDataComponentProps<T> {
  showData: T[];
  renderCard: ({ index, item }: { index: number; item: T }) => React.ReactNode;
}


/* 페이지네이션의 카드들을 출력해주는 컴포넌트를 받는 구조 */
export const ShowDataComponent = <T extends {}>({
  showData,
  renderCard,
}: ShowDataComponentProps<T>) => (
  <>
    {showData?.map((item, index) => (
      <div key={index}>
        {renderCard({
          index,
          item,
        })}
      </div>
    ))}
  </>
);


/* 페이지네이션 PageNumNav를 위한 타입 */
interface PageNumNavComponentProps {
  pageNums: number[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  movePageBtnHandler: (type: string) => void;
  pageNumNav: ({
    pageNums,
    currentPage,
    setCurrentPage,
    movePageBtnHandler,
  }: numNavProps) => React.ReactNode;
}


/* 페이지네이션의 PageNumNav를 출력해주는 컴포넌트를 받는 구조 */
export const PageNumNavComponent = ({
  pageNums,
  currentPage,
  setCurrentPage,
  movePageBtnHandler,
  pageNumNav,
}: PageNumNavComponentProps) => (
  <>
    {pageNumNav({
      pageNums,
      currentPage,
      setCurrentPage,
      movePageBtnHandler,
    })}
  </>
);

