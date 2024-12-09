import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/post/HomePage";
import LoginPage from "./pages/member/LoginPage";
import CreatePage from "./pages/post/CreatePage";
import EditPage from "./pages/post/EditPage";
import ReadPage from "./pages/post/ReadPage";
import JoinPage from "./pages/member/JoinPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<ReadPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* 나머지 404 */}
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </div>
  );
}

export default App;