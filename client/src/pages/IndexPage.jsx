import Post from "../Post.jsx";
import { useEffect, useState } from "react";
export default function IndexPage() {
  const [posts, setposts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/post").then((response) => {
      response.json().then((posts) => {
        setposts(posts);
        console.log(posts);
      });
    });
  }, []);

  return <>{posts.length > 0 && posts.map((post) => <Post {...post} />)}</>;
}