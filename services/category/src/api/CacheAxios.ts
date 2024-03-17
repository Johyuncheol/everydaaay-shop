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
    const path = config.params.path; // config.params에서 직접 path 가져오기
    const page = config.params.page; // config.params에서 직접 page 가져오기
    console.log(config.params);
    // 타임스탬프를 세션에서 가져옴
    const lastModifiedTimestamp = getSessionStorage(
      `${path}${page}_lastModifiedTimestamp`
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
    const path = response.config.params.path; // 요청 파라미터에서 path 가져오기
    const page = response.config.params.page; // 요청 파라미터에서 page 가져오기

    // Last-Modified 헤더 세션 스토리지 업데이트
    if (serverLastModified) {
      addSessionStorage(`${path}${page}_lastModifiedTimestamp`, serverLastModified);
    }

    // 상태 코드가 201일때만 응답 데이터 저장
    if (response.status === 201) {
      addSessionStorage(`${path}${page}Data`, response);

      return response;
    }

    // 상태 코드가 304일때 세션에서 꺼내줌
    if(response.status === 304){
      const data = getSessionStorage(`${path}${page}Data`)
      return data;
    }
    
  },
  (error) => {
    return Promise.reject(error);
  }
);
