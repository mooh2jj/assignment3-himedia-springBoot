import React, { useEffect, useState } from "react";
import Header from "../../components/layouts/Header";
import { useParams } from "react-router-dom";
import axios from "axios";

const ReadPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8083/api/post/${id}`).then((res) => {
      console.log(res.data);
      setPost(res.data);
    });
  }, [id]);

  return (
    <div>
      <Header />
      <h1>게시글 상세 페이지</h1>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>{post.author}</p>
      <p>{post.createdAt}</p>
      <p>{post.modifiedAt}</p>
    </div>
  );
};

export default ReadPage;
