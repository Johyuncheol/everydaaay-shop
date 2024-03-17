import axios from "axios";
import {
  addSessionStorage,
  getSessionStorage,
} from "../../../../shared/shared/utill/session";

// 200~399번 까지를 성공코드로 설정
// 요청 보낼때 세션에 데이터의 타임스탬프가있다면 If-Modified-Since 헤더에 담아서 보냄
// 응답 받을때 last-modified 헤더가 있다면 세션스토리지에 저장
// 응답코드가 201인 경우 데이터를 세션스토리지에 저장

export const CacheAxios = axios.create({
  validateStatus: function (status) {
    return status >= 200 && status < 400;
  },
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 처리
CacheAxios.interceptors.request.use(
  (config) => {
    const url = new URL(config.url!); // config.url에서 URL 객체 생성
    
    const urlSplit = url.pathname.split("/");
    // detail, review, ask 등의 구분자 추출
    const type = urlSplit.length <= 3 ? "detail" : urlSplit[3]; // detail, review, ask 등의 구분자 추출

    // URL에서 쿼리 파라미터로 id 값을 가져옴
    const id = url.searchParams.get("id");
    const page = url.searchParams.get("page") ?? 0;

    // 타임스탬프를 세션에서 가져옴
    const lastModifiedTimestamp = getSessionStorage(
      `${id}_${type}_lastModifiedTimestamp`
    );

    // 타임스템프가 있을때만 데이터가 최신인지 비교하기위한
    // If-Modified-Since 헤더 추가
    if (lastModifiedTimestamp) {
      config.headers["Cache-Control"] = "no-cache";
      config.headers["If-Modified-Since"] = lastModifiedTimestamp;
    } else {
      config.headers["Cache-Control"] = "no-cache";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답처리
CacheAxios.interceptors.response.use(
  (response) => {
    // 응답에서 Last-Modified 헤더 값을 가져옴
    const serverLastModified = response.headers["last-modified"];
    const url = new URL(response.config.url!); 
    
    const urlSplit = url.pathname.split("/");
    // detail, review, ask 등의 구분자 추출
    const type = urlSplit.length <= 3 ? "detail" : urlSplit[3]; 
    
    // URL에서 쿼리 파라미터로 id 값을 가져옴
    const id = url.searchParams.get("id");
    const page = url.searchParams.get("page") ?? 0;

    // Last-Modified 헤더 세션 스토리지 업데이트
    if (serverLastModified) {
      addSessionStorage(
        `${id}_${type}_lastModifiedTimestamp`,
        serverLastModified
      );
    }

    // 상태 코드가 201일때만 응답 데이터 저장
    if (response.status === 201) {
      addSessionStorage(`${id}_${type}_${page}_Data`, response);
      return response;
    }
    
    // 상태코드가 304 일때는 세션데이터 반환 
    if (response.status === 304) {
      return getSessionStorage(`${id}_${type}_${page}_Data`);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);
