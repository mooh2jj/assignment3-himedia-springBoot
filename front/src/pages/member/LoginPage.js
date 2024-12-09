import React, { useState } from "react";
import Header from "../../components/layouts/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// api post http://localhost:8083/api/member/login
const LoginPage = () => {
  const [member, setMember] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8083/api/member/login", member).then((res) => {
      console.log(res.data);
      navigate("/");
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
        />{" "}
        <br />
        <input
          type="password"
          placeholder="비밀번호"
          name="password"
          onChange={handleChange}
        />{" "}
        <br />
        <br />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;
