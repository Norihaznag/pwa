"use client";

import React from "react";
import { deleteUpload } from "@/app/api/strapi";
import Card from "./Card";
import { useRouter } from "next/navigation";

interface ImageData {
  id: number;
  name: string;
  url: string;
  formats: {
    thumbnail: {
      url: string;
      width: number;
      height: number;
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

interface GalleryPageProps {
  images: ImageData[];
}

const GalleryPage: React.FC<GalleryPageProps> = ({ images }) => {
  const router = useRouter();

  async function onDelete(id: number) {
    const confirmDeletion = window.confirm("Are you sure you want to delete this image?");

    if (confirmDeletion) {
      try {
        const isDeleted = await deleteUpload(id);
        console.log(isDeleted ? "Image deleted successfully" : "Failed to delete image");
        router.refresh();
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
  }

  return (
    <div className="container mx-auto md:px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-white">Image Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((image) => (
          <Card
            key={image.id}
            image={{
              id: image.id.toString(),
              name: image.name,
              url: image.url,
              formats: {
                thumbnail: {
                  url: image.formats.thumbnail.url,
                  width: image.formats.thumbnail.width,
                  height: image.formats.thumbnail.height,
                },
              },
            }}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;