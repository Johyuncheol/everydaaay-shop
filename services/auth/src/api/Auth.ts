import { BASE_URL } from "./const";
import axios from "axios";

interface LoginRequest {
  id: string;
  password: string;
}

export const LoginAPI = async (user: LoginRequest) => {
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, user, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    // 로그인 실패시 상태 알림
    if (res?.status !== 201) {
      alert(res?.data.status);
      return null;
    }

    return res.data.data;
  } catch (error) {
    console.error(error);
    return null; // 실패했을 경우 null 또는 다른 값을 반환
  }
};


interface RegisterRequest {
  id: string;
  password: string;
  nickName: string;
}
