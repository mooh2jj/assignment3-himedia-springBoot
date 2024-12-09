import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../slices/loginSlice";
import axiosInstance from "../../api/axiosInstance";

const Header = () => {
  const { email, roles } = useSelector((state) => state.loginSlice);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogout = () => {
    axiosInstance.post("/member/logout").then((res) => {
      dispatch(logout());
      alert("로그아웃 완료!");
      navigate("/member/login"); // 로그아웃 후 로그인 페이지로 이동
    });
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        padding: "20px 0",
      }}
    >
      <nav
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <Link to="/">Home</Link>
        {email ? <Link to="/post/list">목록</Link> : <></>}
        {roles.includes("ADMIN") ? (
          <Link to="/post/create">등록</Link>
        ) : (
          <Link
            to="#"
            onClick={() => alert("관리자가 아니면 등록할 수 없습니다!")}
          >
            등록
          </Link>
        )}
        {!email ? (
          <>
            <Link to="/member/join">회원가입</Link>
            <Link to="/member/login">로그인</Link>
          </>
        ) : (
          <>
            <span style={{ color: "#666" }}>
              환영합니다, {email}({roles.includes("ADMIN") ? "관리자" : "회원"})
              님!
            </span>
            <Link to="#" onClick={handleLogout}>
              로그아웃
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
