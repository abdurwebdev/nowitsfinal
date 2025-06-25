import { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";

const Videos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/videos`).then(res => setVideos(res.data));
  }, []);

  return (
    <div>
      <h2>All Videos</h2>
      {videos.map(video => (
        <div key={video._id}>
          <h3>{video.title}</h3>
          <ReactPlayer url={video.videoUrl} controls width="100%" />
        </div>
      ))}
    </div>
  );
};

export default Videos;
