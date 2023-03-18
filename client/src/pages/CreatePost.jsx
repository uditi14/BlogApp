import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

function CreatePost() {
  const [redirect, setRedirect] = useState(false);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  async function createNewPost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("summary", summary);
    data.append("content", content);
    if (file) {
      data.append("file", file);
    }

    try {
      const response = await axios.post("http://localhost:5000/post", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      //   console.log(response.data);
      if (response.status === 200) {
        setRedirect(true);
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <form onSubmit={createNewPost}>
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
        onChange={(ev) => setFile(ev.target.files[0])}
        style={{ marginTop: "10px" }}
      />
      <ReactQuill
        value={content}
        modules={modules}
        onChange={(newValue) => setContent(newValue)}
        formats={formats}
        style={{ marginTop: "10px", width: "90%", marginLeft: "10px" }}
      />

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
        Create Post
      </button>
    </form>
  );
}

export default CreatePost;
