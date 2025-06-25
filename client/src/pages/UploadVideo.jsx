import { useState } from "react";
import axios from "axios";

const UploadVideo = () => {
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("video", video);
    formData.append("title", title);
    formData.append("description", desc);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/videos`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Video uploaded!");
    } catch (err) {
      alert("Upload failed");
    }
  };

  return (
    <div>
      <h2>Upload Video</h2>
      <input type="text" placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Description" onChange={e => setDesc(e.target.value)} />
      <input type="file" accept="video/*" onChange={e => setVideo(e.target.files[0])} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadVideo;
