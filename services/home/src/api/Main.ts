import { BASE_URL } from "./const";
import { CacheAxios } from "./CacheAxios";
import { getSessionStorage } from "../../../../shared/shared/utill/session";

export const getMainAPI = async (area: string) => {
  try {
    const res = await CacheAxios.get(`${BASE_URL}/main`, {
      params: { area }, // main 은 현재 3구역으로 나누어져있음 
    });

    if (res.status === 201) {
      return res;
    } else if (res.status === 304) {
      console.log("Resource not modified");
      return getSessionStorage(`${area}Data`);
    }
  } catch (error) {
    console.error("메인 데이터를 가져오는 중 오류 발생:", error);
    throw error;
  }
};
