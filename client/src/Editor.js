import ReactQuill from "react-quill";

export default function Editor({ value, onChange }) {
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
  return (
    <div className="content">
      <ReactQuill
        theme={"snow"}
        value={value}
        modules={modules}
        onChange={onChange}
        style={{ marginTop: "10px", width: "90%", marginLeft: "10px" }}
      />
    </div>
  );
}
