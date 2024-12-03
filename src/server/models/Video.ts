import mongoose from 'mongoose';

const videoMetadataSchema = new mongoose.Schema({
  videoId: { type: String, required: true, unique: true },
  thumbnailPath: { type: String, required: true },
  hlsPath: { type: String, required: true },
  duration: { type: Number, required: true },
  quality: { type: String, required: true },
  fileSize: { type: Number, required: true },
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

export const VideoMetadata = mongoose.model('VideoMetadata', videoMetadataSchema);