import { BASE_URL } from "./const";
import { CacheAxios } from "./CacheAxios";

export const getCategoryData = async (
  path: string,
  page: number,
  numOfShow: number
) => {
  try {
    const res = await CacheAxios.get(
      `${BASE_URL}/category/${path}?page=${page}&numOfShow=${numOfShow}`,{
        params: { path,page }, 
      }
    );

    return res;
  } catch (error) {
    console.error("Error fetching main data:", error);
    throw error;
  }
};
