import React, { useState } from "react";
import Header from "../../components/layouts/Header";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import useCustomLogin from "../../hooks/useCustomLogin";

const initPost = {
  title: "",
  content: "",
};

const CreatePage = () => {
  const navigate = useNavigate();

  const [post, setPost] = useState(initPost);

  const { exceptionHandle } = useCustomLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 비동기 처리
    axiosInstance
      .post("/post", post)
      .then((res) => {
        console.log("create post res.data: ", res.data);
        navigate("/post/list");
      })
      .catch((err) => {
        console.log(err);
        alert("게시글 등록 실패");
        exceptionHandle(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  return (
    <div>
      <Header />
      <h1>게시글 등록 페이지</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="제목"
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="content"
          placeholder="내용"
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <button type="submit">등록</button>
      </form>
    </div>
  );
};

export default CreatePage;
