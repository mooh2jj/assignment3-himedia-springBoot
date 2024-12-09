import React from "react";
import Header from "../../components/layouts/Header";
import ListComponent from "../../components/post/ListComponent";

const HomePage = () => {
  return (
    <div>
      <Header />
      <main>
        <h1>게시판</h1>
        <ListComponent />
      </main>
    </div>
  );
};

export default HomePage;
