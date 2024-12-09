import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
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
        <Link to="/create">등록</Link>
        <Link to="/join">회원가입</Link>
        <Link to="/login">로그인</Link>
      </nav>
    </header>
  );
};

export default Header;
