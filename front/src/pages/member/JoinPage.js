import React, { useState } from "react";
import Header from "../../components/layouts/Header";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const JoinPage = () => {
  const navigate = useNavigate();
  const [member, setMember] = useState({
    email: "",
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8083/api/member/join", member)
      .then((res) => {
        console.log(res);
        alert("회원가입 완료!");
        // 회원가입 완료 후 로그인 페이지로 이동
        navigate("/member/login");
      })
      .catch((error) => {
        console.log(error);
        alert("회원가입 실패!");
      });
  };

  return (
    <div>
      <Header />
      <h1>회원가입 페이지</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="이메일"
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="name"
          placeholder="이름"
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          onChange={handleChange}
        />
        <br />
        <br />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default JoinPage;
