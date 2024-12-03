import express from 'express';
import multer from 'multer';
import { join } from 'path';
import { db } from '../config/database';
import { VideoMetadata } from '../models/Video';
import { processVideo } from '../services/videoProcessor';

const router = express.Router();

// Configure multer for video upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/videos');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Not a video file'));
    }
  },
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  }
});

// Get all videos
router.get('/', (req, res) => {
  const query = req.query.search 
    ? 'SELECT * FROM videos WHERE title LIKE ? ORDER BY created_at DESC'
    : 'SELECT * FROM videos ORDER BY created_at DESC';
  
  const params = req.query.search ? [`%${req.query.search}%`] : [];
  
  db.all(query, params, async (err, videos) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    // Fetch metadata from MongoDB
    const videosWithMetadata = await Promise.all(
      videos.map(async (video) => {
        const metadata = await VideoMetadata.findOne({ videoId: video.id });
        return { ...video, ...metadata?.toObject() };
      })
    );
    
    res.json(videosWithMetadata);
  });
});

// Upload video
router.post('/upload', upload.single('video'), async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const videoFile = req.file;
    
    if (!videoFile) {
      return res.status(400).json({ error: 'No video file provided' });
    }

    const videoId = videoFile.filename.split('-')[0];
    
    // Store in SQLite
    db.run(
      'INSERT INTO videos (id, title, description, category, uploader) VALUES (?, ?, ?, ?, ?)',
      [videoId, title, description, category, 'anonymous'],
      async (err) => {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }
        
        // Process video (generate HLS and thumbnail)
        try {
          const metadata = await processVideo(videoFile.path, videoId);
          
          // Store metadata in MongoDB
          await VideoMetadata.create({
            videoId,
            ...metadata
          });
          
          res.json({ 
            message: 'Video uploaded successfully',
            videoId 
          });
        } catch (error) {
          res.status(500).json({ error: 'Video processing failed' });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Get single video
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  db.get('SELECT * FROM videos WHERE id = ?', [id], async (err, video) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    
    const metadata = await VideoMetadata.findOne({ videoId: id });
    res.json({ ...video, ...metadata?.toObject() });
  });
});

export default router;