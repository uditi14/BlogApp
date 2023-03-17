import { formatISO9075 } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContex";
export default function PostPage() {
  const [postinfo, setpostinfo] = useState(null);
  const { userinfo } = useContext(UserContext);
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:5000/post/${id}`).then((response) => {
      response.json().then((postinfo) => {
        setpostinfo(postinfo);
      });
    });
    console.log(userinfo);
    // console.log(postinfo.author._id);
  }, []);

  if (!postinfo) return "";

  return (
    <div className="post-page">
      <h1>{postinfo.title}</h1>
      <time>{formatISO9075(new Date(postinfo.createdAt))}</time>
      <div className="author">by @{postinfo.author.name}</div>
      {userinfo.id === postinfo.author._id && (
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${postinfo._id}`}>
            Edit this post
          </Link>
        </div>
      )}
      <div className="image">
        <img src={`http://localhost:5000/${postinfo.cover}`} alt="" />
      </div>
      <div dangerouslySetInnerHTML={{ __html: postinfo.content }} />
    </div>
  );
}