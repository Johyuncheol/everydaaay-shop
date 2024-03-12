import React, { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/config";
import Loading from "../page/Loading";

const PrivateRouter: React.FC = () => {
  const user = useSelector((state: RootState) => state.User);

  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  // 로그인 확인 함수
  const authenticated = () => {
    if (user.name === null) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      authenticated();
    }, 500);

    // 컴포넌트가 언마운트될 때 타이머를 클리어하여 메모리 누수 방지
    return () => clearTimeout(timer);
  }, []); // 최초 렌더링 시에만 실행

  if (isLoading)
    return <Loading size="50px" color="#3498db" duration="1.5s" delay="0s" />;
  else return <Outlet />;
};

export default PrivateRouter;
