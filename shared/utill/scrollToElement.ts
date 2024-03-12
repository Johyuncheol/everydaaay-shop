export const scrollToElement = (targetRef: React.RefObject<any>) => {
    if (targetRef.current) {
      const element = targetRef.current;
      const offsetPosition = element.offsetTop - 100; // -100은 헤더의 높이
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  