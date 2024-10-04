import { uploadFile } from '@/app/api/strapi';
import { Delete02Icon, PencilEdit02Icon } from 'hugeicons-react';
import Image from 'next/image';
import React, { useState } from 'react'
const UploadCard = () => {
    
      const [file, setFile] = useState<File | null>(null);
      const [dishThumbnail, setDishThumbnail] = useState<string | null>(null);
      const [isLoading, setIsLoading] = useState<boolean>(true);
      const [error, setError] = useState<string | null>(null);
      const [success, setSuccess] = useState(false);
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
          setDishThumbnail(URL.createObjectURL(e.target.files[0]));
          setFile(e.target.files[0]);
        }
      };
    
    
     
 
    
      async function submitFormData(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (file) {
          try {
            setIsLoading(true);
            const response = await uploadFile(file);
            console.log(response);
           
            setSuccess(true);
            setFile(null);
            setDishThumbnail(null);
            setTimeout(() => {
              setSuccess(false);
            }, 5000);
          } catch (error) {
            console.error("Error uploading file:", error);
            setError("Failed to upload file. Please try again later.");
          } finally {
            setIsLoading(false);
          }
        }
      }

  return (
    <div className="relative w-full h-48 bg-[#414339] rounded-xl flex flex-col md:flex-row items-center justify-center overflow-hidden md:order-2 md:w-[30%]">
    {dishThumbnail ? (
      <>
        <Image
          src={dishThumbnail}
          alt="Dish Thumbnail"
          layout="fill"
          objectFit="cover"
          className="rounded-xl z-0"
        />
        <div className="flex gap-2">
          <Delete02Icon
            width={50}
            height={50}
            className="z-20 rounded-full p-2 bg-[#414339] text-white"
            onClick={() => {
              setDishThumbnail(null);
              setFile(null);
            }}
          />
          <div className="z-20 bg-[#414339] text-white overflow-hidden relative rounded-full w-[50px] h-[50px]">
            <PencilEdit02Icon width={50} height={50} className="p-2" />
            <input
              type="file"
              name="thumbnail"
              onChange={handleChange}
              className="inset-0 cursor-pointer absolute h-full opacity-0"
            />
          </div>
        </div>
      </>
    ) : (
      <span className="text-gray-500">Upload an Image</span>
    )}
    <input
      type="file"
      name="thumbnail"
      onChange={handleChange}
      className={`absolute inset-0 cursor-pointer ${
        file ? "hidden" : "opacity-0"
      }`}
    />
  </div>
  )
}

export default UploadCard