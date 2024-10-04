"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Delete02Icon, PencilEdit02Icon } from "hugeicons-react";
import { EditeData, getData, PostData, uploadFile } from "@/app/api/strapi";
import PostDataLoading from "@/app/components/loaders/PostDataLoading";
import { useParams } from "next/navigation";

interface FormData {
  id :any;
  username: string;
  email: string;
  phone: string;
  thumbnail: string;
  role?: string;
  password: string;
  repassword: string;
}

interface Role {
  id: any;
  name: string;
}

const Moderator: React.FC = () => {
  const [formData, setFormData]:any = useState({
    id : "",
    username: "",
    email: "",
    phone: "",
    thumbnail: "",
    password: "",
    repassword: ""
  });

  const [roles, setRoles] = useState<Role[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchRoles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedRoles = await getData({ data: "users-permissions/roles" });
        const moderator = await getData({ data: `users/${id}?populate=*` });
        const { username, email, phone, thumbnail, role } = moderator;
        const { url } = thumbnail;
        setFormData({
          id: moderator.id,
          username: username,
          email: email,
          phone: phone,
          thumbnail: thumbnail,
          password: "dhdhdhhdh",
          repassword: "dhdhdhhdh",
          role: role,
        });
        setThumbnailPreview(`${process.env.NEXT_PUBLIC_STRAPI_URL}${url}`);
        setRoles(fetchedRoles.roles);
      } catch (error) {
        console.error("Error fetching roles:", error);
        setError("Failed to fetch roles. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRoles();

 
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
    if (formData.password !== formData.repassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      setIsLoading(true);
      let updatedFormData = { ...formData };
  
      if (file) {
        const uploadedFile = await uploadFile(file);
        if (uploadedFile) {
          updatedFormData = { ...updatedFormData, thumbnail: uploadedFile };
        }
      }
  
      // Use updatedFormData for submission
      await EditeData({ data: updatedFormData, entry: "users", id: updatedFormData.id });
      
      // Update the state after successful submission
      setFormData(updatedFormData);
      setSuccess(true);
      
      console.log("Updated form data:", updatedFormData);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to submit form. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading) return <PostDataLoading />;

  return (
    <div className="min-h-screen w-full flex flex-col">
      <h1 className="text-2xl text-white mb-8">Create a User</h1>
      {success && <h1 className="text-green-500 mb-4">User created successfully</h1>}
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form
        onSubmit={handleSubmit}
        className="w-full text-white flex flex-col md:flex-row gap-10"
      >
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
        <div className="flex flex-col gap-4 md:grow">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-gray-100">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="p-3 rounded-lg bg-[#414339] shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter username"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-100">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="p-3 rounded-lg bg-[#414339] shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-gray-100">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="p-3 rounded-lg bg-[#414339] shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-100">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="p-3 rounded-lg bg-[#414339] shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter password"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="repassword" className="text-gray-100">
              Re-enter Password
            </label>
            <input
              type="password"
              name="repassword"
              value={formData.repassword}
              onChange={handleInputChange}
              className="p-3 rounded-lg bg-[#414339] shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Re-enter password"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="role" className="text-gray-100">
              Role
            </label>
            <select
              name="role"
              value={formData.role?.id}
              onChange={handleInputChange}
              className="p-3 rounded-lg bg-[#414339] shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value={formData.role?.id}
              >{formData.role?.name}</option>
              {roles
                .filter((role) => role.id !== formData.role?.id)
                .map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full py-3 px-6 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 focus:outline-none focus:bg-indigo-700 transition-all duration-300"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Moderator;
