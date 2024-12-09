import React, { useEffect, useState } from "react";
import Header from "../../components/layouts/Header";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const ReadPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    axiosInstance.get(`/post/${id}`).then((res) => {
      setPost(res.data);
      setEditedPost({
        title: res.data.title,
        content: res.data.content,
      });
    });
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      axiosInstance.delete(`/post/${id}`).then((res) => {
        navigate("/");
      });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPost({
      ...editedPost,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance.put(`/post/${id}`, editedPost).then((res) => {
      axiosInstance.get(`/post/${id}`).then((res) => {
        setPost(res.data);
        setEditedPost({
          title: res.data.title,
          content: res.data.content,
        });
        setIsEditing(false);
        alert("수정 완료!");
      });
    });
  };

  return (
    <div>
      <Header />
      <h1>게시글 상세 페이지</h1>

      {!isEditing ? (
        <>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>작성자: {post.author}</p>
          <p>작성일: {post.createdAt}</p>
          <p>수정일: {post.modifiedAt}</p>
          <div>
            <button onClick={handleEdit}>수정</button>
            <button onClick={handleDelete}>삭제</button>
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={editedPost.title}
            onChange={handleChange}
          />
          <br />
          <textarea
            name="content"
            value={editedPost.content}
            onChange={handleChange}
          />
          <br />
          <button type="submit">저장</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            취소
          </button>
        </form>
      )}
    </div>
  );
};

export default ReadPage;
