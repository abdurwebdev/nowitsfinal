import Video from '../models/Video.js';
import cloudinary from '../utils/cloudinary.js';

export const uploadVideo = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
    });

    const video = new Video({
      title: req.body.title,
      description: req.body.description,
      videoUrl: result.secure_url,
      uploadedBy: req.userId,
    });

    await video.save();
    res.status(201).json(video);
  } catch (err) {
    res.status(500).json({ message: "Video upload failed", error: err.message });
  }
};
