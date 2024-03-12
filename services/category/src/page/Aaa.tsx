import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// 스타일드 컴포넌트를 사용하여 그리드를 정의합니다.
const ContentArticle = styled.article`
  display: flex;
  flex-wrap: wrap;
`;

// 각 그리드 아이템에 대한 프로퍼티를 정의합니다.
interface AAAProps {
  index: number;
 
}

// 각 그리드 아이템을 렌더링하는 함수형 컴포넌트를 정의합니다.
const AAA: React.FC<AAAProps> = ({ index}) => {
  return (
    <div
      style={{
        width: "10rem",
        height: "10rem",
        backgroundColor: "blue",
        margin: 5,
      }}
    >
      Item {index + 1}
    </div>
  );
};

// 메인 앱 컴포넌트를 정의합니다.
const ExampleApp: React.FC = () => {
  const itemRef = useRef<HTMLDivElement>(null);

  // 1부터 100까지의 아이템을 생성합니다.
  const items = Array.from({ length: 100 }, (_, index) => index);

  // 현재 화면에 보이는 아이템을 관리하기 위한 상태를 설정합니다.
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  // 스크롤 이벤트 핸들러를 사용하여 가상화를 수행합니다.
  useEffect(() => {
    const handleScroll = () => {
      // 현재 스크롤 위치를 가져옵니다.
      const scrollTop = window.scrollY;

      if (itemRef.current !== null) {
        const width = itemRef.current.offsetWidth/3;

        // 각 아이템의 높이와 한 행에 표시되는 아이템 수를 설정합니다.
        const itemHeight = 130; // 필요에 따라 조절
        const itemsPerRow = Math.floor(window.innerWidth / 130); // 필요에 따라 조절

        console.log(itemHeight,itemsPerRow)
        // 현재 화면에 보이는 아이템의 시작과 끝 인덱스를 계산합니다.
        const startIdx = Math.floor(scrollTop / itemHeight) * itemsPerRow;
        const endIdx =
          startIdx + itemsPerRow * Math.ceil(window.innerHeight / itemHeight);

        // 화면에 보이는 아이템을 설정합니다.
        setVisibleItems(items.slice(startIdx, endIdx));
      }
    };

    // 스크롤 이벤트 리스너를 추가하고 초기 렌더링을 수행합니다.
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // 컴포넌트가 언마운트되면 이벤트 리스너를 정리합니다.
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 메인 렌더링을 수행합니다.
  return (
    <div>
      {/* 예시 앱의 헤더 */}
      <h1 style={{ height: "150vh" }}>Example App</h1>

      {/* 화면에 보이는 아이템들을 렌더링하는 그리드 */}
      <ContentArticle ref={itemRef}>
        {visibleItems.map((index) => (
          <div >
            <AAA key={index} index={index} />
          </div>
        ))}
      </ContentArticle>

      {/* 앱의 나머지 콘텐츠 */}
      <p>Other content in the app...</p>
    </div>
  );
};

// 앱 컴포넌트를 내보냅니다.
export default ExampleApp;
