import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/layouts/Header";

const EditPage = () => {
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8083/api/post/${id}`).then((res) => {
      console.log(res.data);
    });
  }, [id]);

  return (
    <div>
      <Header />
    </div>
  );
};

export default EditPage;
