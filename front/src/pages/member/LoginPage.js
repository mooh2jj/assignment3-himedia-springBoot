import React, { useState } from "react";
import Header from "../../components/layouts/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../slices/loginSlice";

const LoginPage = () => {
  const [member, setMember] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      // 쿠키 허용
      .post("http://localhost:8083/api/member/login", member, {
        withCredentials: true,
      })
      .then((res) => {
        // 로그인 성공 시 Redux store에 저장
        dispatch(
          login({
            email: member.email,
            accessToken: res.data.accessToken, // API 응답에서 토큰을 받아온다고 가정
          })
        );
        alert("로그인 성공!");
        navigate("/post/list");
      })
      .catch((error) => {
        // 에러 처리
        console.error("Login failed:", error);
        alert("로그인 실패");
      });
  };

  return (
    <div>
      <Header />
      <h1>로그인 페이지</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="이메일"
          name="email"
          onChange={handleChange}
          autoComplete="username"
          required
        />{" "}
        <br />
        <input
          type="password"
          placeholder="비밀번호"
          name="password"
          onChange={handleChange}
          autoComplete="current-password"
          required
        />{" "}
        <br />
        <br />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;
