import React, { useState } from "react";
import Header from "../../components/layouts/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../slices/loginSlice";

// api post http://localhost:8083/api/member/login
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
      .post("http://localhost:8083/api/member/login", member)
      .then((res) => {
        // 로그인 성공 시 Redux store에 저장
        dispatch(
          login({
            email: member.email,
            accessToken: res.data.accessToken, // API 응답에서 토큰을 받아온다고 가정
          })
        );
        alert("로그인 성공!");
        navigate("/");
      })
      .catch((error) => {
        // 에러 처리
        console.error("Login failed:", error);
      });
  };

  return (
    <div>
      <Header />
      <h1>로그인 페이지</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="이메일"
          name="email"
          onChange={handleChange}
          autoComplete="username"
        />{" "}
        <br />
        <input
          type="password"
          placeholder="비밀번호"
          name="password"
          onChange={handleChange}
          autoComplete="current-password"
        />{" "}
        <br />
        <br />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;
