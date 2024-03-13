import React from "react";

// 전달받은 리액트 엘리먼트가 뷰포트에 보일때 전달받은 callback을 실행하는 함수
export const FetchIntersectionObserver = (
  callback: () => void,
  elementRef: React.RefObject<Element>
) => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      // 전달받은 요소가 지정된 요소에 포함되는지(뷰포트)에 위치하는지
      callback();
      observer.disconnect(); // 한번만 하면됨 
    }
  });

  if (elementRef.current) {
    // 전달받은 요소가 있을때만 실행
    observer.observe(elementRef.current);
  }

  return () => {
    // 언마운트시 감시 삭제
    if (elementRef.current) {
      observer.unobserve(elementRef.current);
    }
  };
};
