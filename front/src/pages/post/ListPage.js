import React from "react";
import ListComponent from "../../components/post/ListComponent";
import Header from "../../components/layouts/Header";

const ListPage = () => {
  return (
    <div>
      <Header />
      <h2>게시판 목록입니다.</h2>
      <ListComponent />
    </div>
  );
};

export default ListPage;
