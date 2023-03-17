import "./App.css";
import IndexPage from "./pages/IndexPage.jsx";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout.jsx";
import RegLogin from "./pages/RegLogin";
import { UserContextProvider } from "./UserContex";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path={"/login"} element={<RegLogin />} />
          <Route path={"/register"} element={<RegLogin />} />
          <Route path={"/create"} element={<CreatePost />} />
          <Route path={"/post/:id"} element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;