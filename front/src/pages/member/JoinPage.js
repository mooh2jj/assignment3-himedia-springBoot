import React, { useState } from "react";
import Header from "../../components/layouts/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JoinPage = () => {
  const navigate = useNavigate();
  const [member, setMember] = useState({
    email: "",
    name: "",
    password: "",
    passwordCheck: "",
  });
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEmailValid) {
      alert("이메일 중복 체크를 해주세요!");
      return;
    }
    if (member.password !== member.passwordCheck) {
      alert("비밀번호가 일치하지 않습니다!");
      return;
    }
    axios
      .post("http://localhost:8083/api/member/join", member)
      .then((res) => {
        console.log(res);
        alert("회원가입 완료!");
        navigate("/member/login");
      })
      .catch((error) => {
        console.log(error);
        alert("회원가입 실패!");
      });
  };

  const handleEmailCheck = (email) => {
    axios
      .get(`http://localhost:8083/api/member/check-email?email=${email}`)
      .then((res) => {
        console.log(res);
        if (res.data.result === true) {
          alert("중복된 이메일입니다!");
          setIsEmailValid(false);
        } else {
          alert("사용 가능한 이메일입니다!");
          setIsEmailValid(true);
        }
      });
  };

  return (
    <div>
      <Header />
      <h1>회원가입 페이지</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="이메일"
          onChange={handleChange}
          required
        />
        &nbsp;
        <button type="button" onClick={() => handleEmailCheck(member.email)}>
          중복체크
        </button>
        <br />
        <input
          type="text"
          name="name"
          placeholder="이름"
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="password"
          name="passwordCheck"
          placeholder="비밀번호 확인"
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default JoinPage;
