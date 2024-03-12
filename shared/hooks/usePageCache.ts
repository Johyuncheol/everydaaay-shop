import React, { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/config";
import { PAGE_CACHE } from "../redux/modules/Cache";

/*

  ** 목적 : 서버로 부터 받아오는 데이터를 캐싱하는 훅

  ** 함수
  fetchData(): 한번 요청한 응답을 리덕스에 저장 

  ** 변수
  showData: 현재 페이지의 데이터 
  cacheData: 캐싱된 데이터가 저장되는 Map, 키('페이지번호-pageKey')-value(응답값)
  pageKey: 배열형식 추후 사용될때는 - 로 join

*/
/* 
export const usePageCache = <T>(
  api: () => Promise<AxiosResponse<any, any>>
) => {
  const dispatch = useDispatch();
  const cacheRedux = useSelector((state: RootState) => state.Cache);

  const [cacheData, setCacheData] = useState<T>(); // 컴포넌트로 전달해줄 데이터

  const [pageKey, setPageKey] = useState<any>([]); // 데이터를 구분할 키값

  //API 수행 및 캐싱 진행
  const fetchData = async () => {
    const cacheKey = `${pageKey.join("-")}`; //키값 설정
    
    // 이미 요청 보낸 페이지라면 메모리에서 추출
    if (cacheRedux.has(cacheKey)) {
      setCacheData(cacheRedux.get(cacheKey));
      return;
    }

    try {
      const res = await api(); // 서버로 요청
      setCacheData(res.data.data);
      // 캐시데이터에 저장
      dispatch(PAGE_CACHE({ key: cacheKey, data: res.data.data }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pageKey]);

  return {
    cacheData,
    pageKey,
    setPageKey,
  };
};
 */