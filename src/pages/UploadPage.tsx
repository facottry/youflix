import React from 'react';
import { UploadForm } from '../components/UploadForm';

export function UploadPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 px-6">Upload Video</h1>
      <UploadForm />
    </div>
  );
}