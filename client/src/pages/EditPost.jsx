import Editor from "../Editor";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState("");
  //const [cover, setCover] = useState('');

  useEffect(() => {
    fetch("http://localhost:5000/post/" + id).then((response) => {
      response.json().then((postinfo) => {
        setTitle(postinfo.title);
        setContent(postinfo.content);
        setSummary(postinfo.summary); // should be setSummary(postinfo.summary)
      });
    });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();

    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (file?.[0]) {
      data.set("file", file?.[0]); // in case if files is not an array
    }

    const response = await fetch("http://localhost:5000/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });

    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

  //   const modules = {
  //     toolbar: [
  //       [{ header: [1, 2, false] }],
  //       ["bold", "italic", "underline", "strike", "blockquote"],
  //       [
  //         { list: "ordered" },
  //         { list: "bullet" },
  //         { indent: "-1" },
  //         { indent: "+1" },
  //       ],
  //       ["link", "image"],
  //       ["clean"],
  //     ],
  //   };

  return (
    <form onSubmit={updatePost}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
        style={{
          width: "90%",
          height: "40px",
          border: "1px solid black",
          borderRadius: "4px",
          marginLeft: "10px",
        }}
      />
      <input
        type="text"
        placeholder="Summary"
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
        style={{
          width: "90%",
          height: "40px",
          border: "1px solid black",
          borderRadius: "4px",
          marginLeft: "10px",
          marginTop: "5px",
        }}
      />
      <input
        type="file"
        name="file"
        id="a"
        onChange={(ev) => setFile(ev.target.files)}
        style={{ marginTop: "10px" }}
      />

      <Editor onChange={setContent} value={content} />

      <button
        type="submit"
        style={{
          marginTop: "5px",
          height: "30px",
          width: "90px",
          border: "2px solid black",
          borderRadius: "4px",
          marginLeft: "10px",
          backgroundColor: "white",
        }}
      >
        Update Post
      </button>
    </form>
  );
}
