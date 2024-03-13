import { BASE_URL } from "./const";
import axios from "axios";

export const getDetail = async (id: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/detail?id=${id}`);
    return res.data.data;
  } catch (error) {
    console.error("Error fetching main data:", error);
    throw error;
  }
};

export const getAsk = async (id: string, page: number, numOfShow: number) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/detail/ask?id=${id}&page=${page}&numOfShow=${numOfShow}`
    );
    return res;
  } catch (error) {
    console.error("Error fetching main data:", error);
    throw error;
  }
};

export const getReview = async (
  id: string,
  page: number,
  numOfShow: number
) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/detail/review?id=${id}&page=${page}&numOfShow=${numOfShow}`
    );
    return res;
  } catch (error) {
    console.error("Error fetching main data:", error);
    throw error;
  }
};
