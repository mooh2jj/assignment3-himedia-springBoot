import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const ListComponent = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axiosInstance.get("/post/list").then((res) => {
      setPosts(res.data);
    });
  }, []);

  return (
    <>
      <ul style={{ listStyle: "none", padding: "0" }}>
        {posts.map((post) => (
          <li key={post.id} style={{ padding: "10px 0" }}>
            <Link to={`/post/${post.id}`}>
              {post.id} | {post.title} | {post.author} | {post.createdAt} |{" "}
              {post.modifiedAt}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListComponent;
