import React, { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { scrollToElement } from "../utill/scrollToElement";
/*

  ** 목적 : 키값을 통한 메모리 캐싱기능이 추가된 페이지네이션

  ** 함수

  fetchData(): 한번 요청한 응답을 메모리에 저장 
  movePageBtnHandler(): 버튼 클릭으로 현재 current 페이지 변화

  ** 변수
  showData: 현재 페이지의 데이터 
  currentPage:현재 페이지
  pageNums: 전체 페이지배열
  cachedpageNums: 캐싱된 카테고리의 전체 페이지 번호배열이 저장되는 Map, 키('카테고리-세부카테고리')-value([번호배열])
  cachedData: 캐싱된 데이터가 저장되는 Map, 키('페이지번호-카테고리/세부카테고리')-value(응답값)
  pageKey: 배열형식 추후 사용될때는 - 로 join

*/

export const usePagination = <T>(
  api: (
    path: string,
    page: number,
    numOfShow: number
  ) => Promise<AxiosResponse<any, any>>,
  path: string,
  numOfShow: number
) => {
  const [showData, setShowData] = useState<T[]>([]); //보여줄 데이터
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지

  const [pageNums, setPageNums] = useState<number[]>([]); //총 페이지넘버들
  const [cachedpageNums, setCachedPageNums] = useState<Map<string, number[]>>( //캐시데이터 담는 곳
    new Map()
  );
  const [cachedData, setCachedData] = useState<Map<string, T[]>>(new Map()); //캐시데이터 담는 곳
  const [key, setKey] = useState<any>([]); // 캐싱된 데이터들을 구분할 키요소 배열

  const fetchData = async () => {
    const cacheKey = `${currentPage}-${key.join("-")}`; //키생성

    // 이미 요청 보낸 페이지라면
    if (cachedData.has(cacheKey)) {
      const cachedValue = cachedData.get(cacheKey);
      if (cachedValue !== undefined) {
        setShowData(cachedValue);
      }
      const cachedPageNumbers = cachedpageNums.get(`${key[0]}-${key[1]}`);
      if (cachedPageNumbers !== undefined) {
        setPageNums(cachedPageNumbers);
      }
      return;
    }
    // 새로운 요청이라면
    try {
      const res = await api(path, currentPage, numOfShow);
      setShowData(res.data.data);

      const pageLength = Math.ceil(res.data.totalNums / numOfShow); // 전체 페이지 수
      const newArray = Array.from({ length: pageLength }).map(
        (_, index) => index + 1
      );
      setPageNums(newArray);

      // 캐시데이터에 페이지넘버배열 저장
      setCachedPageNums(
        new Map(cachedpageNums).set(`${key[0]}-${key[1]}`, newArray)
      );
      // 캐시데이터에 페이지 데이터 저장
      setCachedData(new Map(cachedData).set(cacheKey, res.data.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //키와 페이지 변화에 따라 변경
  useEffect(() => {
    fetchData();
  }, [currentPage, key]);

  //카테고리나 세부항목이 변경되면 1페이지로 이동
  useEffect(() => {
    setCurrentPage(1);
  }, [key[0], key[1]]);

  // 좌우 이동 버튼
  const movePageBtnHandler = (type: string) => {
    if (type === "left" && currentPage !== 1) setCurrentPage(currentPage - 1);
    else if (type === "right" && currentPage < pageNums[pageNums.length - 1])
      setCurrentPage(currentPage + 1);
  };

  return {
    showData,
    pageNums,
    currentPage,
    setCurrentPage,
    movePageBtnHandler,
    setKey,
  };
};
