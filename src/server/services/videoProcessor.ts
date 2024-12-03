import ffmpeg from 'fluent-ffmpeg';
import { promises as fs } from 'fs';
import { join } from 'path';

export async function processVideo(inputPath: string, videoId: string) {
  const outputDir = join('uploads', 'hls', videoId);
  const thumbnailDir = join('uploads', 'thumbnails');
  
  await fs.mkdir(outputDir, { recursive: true });
  await fs.mkdir(thumbnailDir, { recursive: true });
  
  const thumbnailPath = join(thumbnailDir, `${videoId}.jpg`);
  const hlsPath = join(outputDir, 'playlist.m3u8');
  
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      // Generate thumbnail
      .screenshots({
        count: 1,
        filename: `${videoId}.jpg`,
        folder: thumbnailDir,
        size: '1280x720'
      })
      // Generate HLS
      .output(hlsPath)
      .outputOptions([
        '-profile:v baseline',
        '-level 3.0',
        '-start_number 0',
        '-hls_time 10',
        '-hls_list_size 0',
        '-f hls'
      ])
      .on('end', async () => {
        const { size } = await fs.stat(inputPath);
        const duration = await getVideoDuration(inputPath);
        
        resolve({
          thumbnailPath,
          hlsPath,
          duration,
          quality: '720p',
          fileSize: size,
          tags: []
        });
      })
      .on('error', reject)
      .run();
  });
}

async function getVideoDuration(filePath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(filePath, (err, metadata) => {
      if (err) reject(err);
      resolve(metadata.format.duration || 0);
    });
  });
}