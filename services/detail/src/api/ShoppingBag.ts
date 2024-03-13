import { BASE_URL } from "./const";
import axios from "axios";

export const getShoppingBagAPI = async () => {
  const res = await axios.get(`${BASE_URL}/shoppingBag`);

  return res.data.data;
};


export const putInShoppingBagAPI = async (data: string) => {
  try {
    //data 형태 JSON.parse 로 변형한 타입으로 해야함 string 아님
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
