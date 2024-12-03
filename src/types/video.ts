export interface Video {
  id: string;
  title: string;
  description?: string;
  category?: string;
  uploader: string;
  views: number;
  createdAt: string;
  thumbnailPath?: string;
  hlsPath?: string;
  duration?: number;
  quality?: string;
  fileSize?: number;
  tags?: string[];
}

export interface VideoUploadData {
  title: string;
  description?: string;
  category?: string;
  file: File;
}