"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Delete02Icon, PencilEdit02Icon, EyeIcon , ViewOffIcon } from "hugeicons-react";
import {
  EditeData,
  getUserData,
  uploadFile,
  VerifyUserPassword,
} from "@/app/api/strapi";
import PostDataLoading from "@/app/components/loaders/PostDataLoading";
import { useParams } from "next/navigation";

interface FormData {
  id: string;
  username: string;
  email: string;
  phone: string;
  role: { id: string; name: string };
  thumbnail: string;
  password: string;
  repassword: string;
  oldpassword: string;
}

const Profile: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    id: "",
    username: "",
    email: "",
    phone: "",
    role: { id: "", name: "" },
    thumbnail: "",
    oldpassword: "",
    password: "",
    repassword: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepassword, setShowRepassword] = useState<boolean>(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const user = await getUserData();

        if (user.role.name == 'admin') {
          const { username, email, phone, id, thumbnail, role } = user;
          setFormData({
            id,
            username,
            email,
            phone,
            role,
            thumbnail: thumbnail.url,
            oldpassword: "",
            password: "",
            repassword: "",
          });
          setThumbnailPreview(`${process.env.NEXT_PUBLIC_STRAPI_URL}${thumbnail.url}`);
        }
      } catch (error) {
        setError("Failed to fetch user data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnailPreview(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (formData.password !== formData.repassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);

      // Step 1: Verify old password
      const isVerifiedPassword = await VerifyUserPassword({
        identifier: formData.username,
        password: formData.oldpassword,
      });

      if (!isVerifiedPassword) {
        setError("Old password is incorrect.");
        return;
      }

      let updatedFormData :any = { ...formData, role: formData.role.id };

      // Step 2: Upload the file if available
      if (file) {
        const uploadedFile = await uploadFile(file);
        if (uploadedFile) {
          updatedFormData = { ...updatedFormData, thumbnail: uploadedFile };
        }
      }

      // Step 3: Update the user data
      await EditeData({
        data: updatedFormData,
        entry: "users",
        id: updatedFormData.id,
      });

      setSuccess(true);
      setFormData(updatedFormData);
    } catch (error) {
      setError("Failed to update profile. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <PostDataLoading />;

  return (
    <div className="min-h-screen w-full flex flex-col">
      <h1 className="text-2xl text-white mb-8">Edit Profile</h1>
      {success && <h1 className="text-green-500 mb-4">Profile updated successfully</h1>}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form
        onSubmit={handleSubmit}
        className="w-full text-white flex flex-col md:flex-row gap-10"
      >
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
                    <Delete02Icon width={24} height={24} />
                  </button>
                  <label className="z-20 bg-[#414339] text-white overflow-hidden relative rounded-full w-[40px] h-[40px] flex items-center justify-center cursor-pointer">
                    <PencilEdit02Icon width={24} height={24} />
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
        <div className="flex flex-col gap-4 md:grow">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-gray-100">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="p-3 rounded-lg bg-[#414339] shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-100">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="p-3 rounded-lg bg-[#414339] shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" className="text-gray-100">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="p-3 rounded-lg bg-[#414339] shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="role" className="text-gray-100">Role</label>
            <input
              type="text"
              name="role"
              value={formData.role.name}
              className="p-3 rounded-lg bg-[#414339] shadow-sm"
              disabled
            />
          </div>

          <div className="flex flex-col relative">
            <label htmlFor="oldpassword" className="text-gray-100">Old Password</label>
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                name="oldpassword"
                value={formData.oldpassword}
                onChange={handleInputChange}
                className="p-3 rounded-lg bg-[#414339] shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? <ViewOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <div className="flex flex-col relative">
            <label htmlFor="password" className="text-gray-100">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="p-3 rounded-lg bg-[#414339] shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <ViewOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <div className="flex flex-col relative">
            <label htmlFor="repassword" className="text-gray-100">Confirm New Password</label>
            <div className="relative">
              <input
                type={showRepassword ? "text" : "password"}
                name="repassword"
                value={formData.repassword}
                onChange={handleInputChange}
                className="p-3 rounded-lg bg-[#414339] shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowRepassword(!showRepassword)}
              >
                {showRepassword ? <ViewOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="p-3 rounded-lg bg-indigo-600 text-white mt-4 shadow-md hover:bg-indigo-700 transition-colors"
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
