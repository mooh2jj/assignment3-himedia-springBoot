import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// api http://localhost:8083/api/post/list

const ListComponent = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8083/api/post/list").then((res) => {
      setPosts(res.data);
    });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8083/api/post/${id}`).then((res) => {
      setPosts(posts.filter((post) => post.id !== id));
    });
  };

  return (
    <>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link> | {post.author} |{" "}
            {post.createdAt} | {post.updatedAt}
            <Link to={`/post/edit/${post.id}`}>
              <button>수정</button>
            </Link>
            &nbsp;
            <button onClick={() => handleDelete(post.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListComponent;
