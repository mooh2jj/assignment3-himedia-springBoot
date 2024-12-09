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

  return (
    <>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link to={`/post/${post.id}`}>
              {post.title} | {post.author} | {post.createdAt} |{" "}
              {post.modifiedAt}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ListComponent;
