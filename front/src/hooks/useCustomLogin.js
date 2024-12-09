import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, createSearchParams } from "react-router-dom";

const useCustomLogin = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // 예외 처리 함수
  const exceptionHandle = (ex) => {
    console.log("Exception------------------------");

    console.log(ex);

    const errorMsg = ex.response.data.error;

    const errorStr = createSearchParams({ error: errorMsg }).toString();

    if (errorMsg === "REQUIRE_LOGIN") {
      alert("로그인 해야만 합니다.");
      navigate({ pathname: "/post/list", search: errorStr });

      return;
    }

    if (ex.response.data.error === "ERROR_ACCESSDENIED") {
      alert("해당 메뉴를 사용할 수 있는 권한이 없습니다.");
      navigate({ pathname: "/post/list", search: errorStr });
      return;
    }
  };

  const loginState = useSelector((state) => state.loginSlice); // 로그인 상태를 가져옴
  const isLogin = loginState.email ? true : false; // 로그인 상태를 확인

  const moveToLogin = () => {
    // 로그인 페이지로 이동
    navigate({ pathname: "/member/login" }, { replace: true });
  };

  const moveToLoginReturn = () => {
    // 로그인 페이지로 이동 컴포넌트
    return <Navigate replace to="/member/login" />;
  };

  return {
    loginState,
    isLogin,
    moveToLogin,
    moveToLoginReturn,
    exceptionHandle,
  };
};

export default useCustomLogin;
