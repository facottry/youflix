import axios from 'axios';
import type { VideoUploadData } from '../types/video';

const API_BASE_URL = 'http://localhost:3001/api';

export const api = {
  async uploadVideo(
    data: VideoUploadData,
    onProgress?: (progress: number) => void
  ) {
    const formData = new FormData();
    formData.append('title', data.title);
    if (data.description) formData.append('description', data.description);
    if (data.category) formData.append('category', data.category);
    formData.append('video', data.file);

    const response = await axios.post(`${API_BASE_URL}/videos/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / (progressEvent.total || 1)
        );
        onProgress?.(percentCompleted);
      },
    });

    return response.data;
  },

  async getVideos(search?: string) {
    const params = search ? { search } : {};
    const response = await axios.get(`${API_BASE_URL}/videos`, { params });
    return response.data;
  },

  async getVideo(id: string) {
    const response = await axios.get(`${API_BASE_URL}/videos/${id}`);
    return response.data;
  },
};