import { BASE_URL } from "./const";
import axios from "axios";
import { CacheAxios } from "./CacheAxios";

export const getShoppingBagAPI = async () => {
  const res = await CacheAxios.get(`${BASE_URL}/shoppingBag`, {
    withCredentials: true,
  });

  return res.data.data;
};

export const putInShoppingBagAPI = async (data: string) => {
  try {
    const res = await axios.post(`${BASE_URL}/shoppingBag`, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    return res.data.status;
  } catch (error: any) {
    if (error.response.status === 401) {
      return error.response.data.status;
    }
  }
};
