"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { EditeData, uploadFile, VerifyUserPassword } from "@/app/api/strapi";
import PostDataLoading from "@/app/components/loaders/PostDataLoading";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

interface FormData {
  id: string;
  username: string;
  email: string;
  phone: string;
  thumbnail: string;
  oldpassword: string;
  password: string;
  repassword: string;
}

const ProfilePage: React.FC = () => {
  const { user } = useSelector((state: any) => state.user);
  const [formData, setFormData] = useState<FormData>({
    id: "",
    username: "",
    email: "",
    phone: "",
    thumbnail: "",
    oldpassword: "",
    password: "",
    repassword: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      const { id, username, email, phone, thumbnail } = user;
      setFormData({
        id,
        username,
        email,
        phone,
        thumbnail: thumbnail?.url || "",
        oldpassword: "",
        password: "",
        repassword: "",
      });
      setThumbnailPreview(thumbnail?.url ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${thumbnail.url}` : null);
      setIsLoading(false);
    } else {
      console.error("User data not available");
      router.push('login')
      setIsLoading(false);
    }
  }, [router, user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnailPreview(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      if (formData.password && formData.password !== formData.repassword) {
        throw new Error("Passwords do not match.");
      }

      if (formData.oldpassword) {
        const isVerifiedPassword = await VerifyUserPassword({
          identifier: formData.username,
          password: formData.oldpassword,
        });

        if (!isVerifiedPassword) {
          throw new Error("Old password is incorrect.");
        }
      }

      let updatedData: any = { ...formData };

      if (file) {
        const uploadedFile = await uploadFile(file);
        if (uploadedFile) {
          updatedData = { ...updatedData, thumbnail: uploadedFile };
        }
      }

      await EditeData({
        data: updatedData,
        entry: "users",
        id: updatedData.id,
      });

      setSuccessMessage("Profile updated successfully");
    } catch (error) {
      console.error("Profile update error:", error);
      setError(error instanceof Error ? error.message : "Failed to update profile. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <PostDataLoading />;
  if (!user) return <div className="min-h-screen w-full flex flex-col">
    
  </div> 

  return (
    <div className="min-h-screen w-full flex flex-col">
      <h1 className="text-2xl text-white mb-8">Profile</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
      <form onSubmit={handleSubmit} className="w-full text-white flex flex-col md:flex-row gap-10">
        {/* Profile Picture */}
        <div className="md:w-[30%] md:order-2">
          <div className="relative w-48 rounded-full h-48 bg-[#414339] flex items-center justify-center overflow-hidden">
            {thumbnailPreview ? (
              <>
                <Image
                  src={thumbnailPreview}
                  alt="User Thumbnail"
                  className="rounded-xl object-fill"
                  width={192}
                  height={192}
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setThumbnailPreview(null);
                      setFile(null);
                    }}
                    className="z-20 rounded-full p-2 bg-[#414339] text-white"
                  >
                    Delete
                  </button>
                  <label className="z-20 bg-[#414339] text-white overflow-hidden relative rounded-full w-[40px] h-[40px] flex items-center justify-center cursor-pointer">
                    Edit
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </label>
                </div>
              </>
            ) : (
              <label className="cursor-pointer flex items-center justify-center w-full h-full">
                <span className="text-gray-500">Upload an Image</span>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col md:flex-wrap gap-4 md:grow">
          {["username", "email", "phone", "oldpassword", "password", "repassword"].map((field) => (
            <div key={field} className="flex flex-col">
              <label htmlFor={field} className="text-gray-100 capitalize">{field.replace('password', ' Password')}</label>
              <input
                type={field.includes('password') ? 'password' : 'text'}
                name={field}
                value={formData[field as keyof FormData]}
                onChange={handleInputChange}
                className="p-3 rounded-lg bg-[#414339] shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required={field !== 'password' && field !== 'repassword'}
              />
            </div>
          ))}
          <div className="flex flex-col md:flex-row">
          <button
            type="submit"
            className="p-3 rounded-lg bg-indigo-600 text-white mt-4 shadow-md hover:bg-indigo-700 transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Profile"}
          </button>

          <button
            type="submit"
            className="p-3 rounded-lg bg-red-600 text-white mt-4 shadow-md hover:bg-red-700 transition-colors"
            disabled={isSubmitting}
          >
            Log Out
          </button>

          </div>
          
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;