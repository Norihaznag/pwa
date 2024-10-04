import { getUploads } from '@/app/api/strapi'
import GalleryPage from '@/app/components/admin/uploads/GalleryPage'
import React from 'react'

interface ImageData {
  id: number;
  name: string;
  url: string;
  formats: {
    thumbnail: {
      url: string;
    };
  };
  related: Array<{
    __type: string;
    id: number;
    title: string;
    description: string;
    isAvailable: boolean;
  }>;
}

export default async function UploadsPage() {
  const images: ImageData[] = await getUploads();

  return (
    <div className='min-h-screen '>
      <GalleryPage images={images} />
    </div>
  )
}