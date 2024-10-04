"use client" ;
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Delete02Icon, PencilEdit02Icon } from "hugeicons-react";
import { getData, PostData, uploadFile } from "@/app/api/strapi";
import PostDataLoading from "@/app/components/loaders/PostDataLoading";
// import Success from "@/app/components/messages/Success";

interface FormData {
  username: string;
  email: string;
  phone: string;
  thumbnail: string;
  role?: string;
  password : string
}

interface Role {
  id: number;
  name: string;
}

const CreateUserPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    phone: "",
    thumbnail: "",
    password : '',
  });

  const [roles, setRoles] = useState<Role[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchRoles = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedRoles = await getData({ data: "users-permissions/roles" });
        setRoles(fetchedRoles.roles);
      } catch (error) {
        console.error("Error fetching roles:", error);
        setError("Failed to fetch roles. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRoles();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    if (file) {
      try {
        setIsLoading(true);
        const uploadedFile = await uploadFile(file);
        const updatedFormData = { ...formData, thumbnail: uploadedFile };
        await PostData({ data: updatedFormData , entry: "users" });
        setSuccess(true);
        resetForm();
      } catch (error) {
        console.error("Error submitting form:", error);
        setError("Failed to submit form. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const resetForm = () => {
    setFormData({ username: "", email: "", phone: "", thumbnail: "" , password : '' });
    setFile(null);
    setThumbnailPreview(null);
    setTimeout(() => setSuccess(false), 5000);
  };

  if (isLoading) return <PostDataLoading />;

  console.log(formData)

  return (
    <div className="min-h-screen w-full flex flex-col">
      <h1 className="text-2xl text-white mb-8">Create a User</h1>
      {success && <h1 >User created successfully</h1> }
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="w-full text-white flex flex-col md:flex-row gap-10">
        <div className="md:w-[30%] md:order-2">
          <div className="relative w-full h-48 bg-[#414339] rounded-xl flex items-center justify-center overflow-hidden">
            {thumbnailPreview ? (
              <>
                <Image src={thumbnailPreview} alt="User Thumbnail" layout="fill" objectFit="cover" className="rounded-xl" />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button type="button" onClick={() => { setThumbnailPreview(null); setFile(null); }} className="z-20 rounded-full p-2 bg-[#414339] text-white">
                    <Delete02Icon width={24} height={24} />
                  </button>
                  <label className="z-20 bg-[#414339] text-white overflow-hidden relative rounded-full w-[40px] h-[40px] flex items-center justify-center cursor-pointer">
                    <PencilEdit02Icon width={24} height={24} />
                    <input type="file" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                  </label>
                </div>
              </>
            ) : (
              <label className="cursor-pointer flex items-center justify-center w-full h-full">
                <span className="text-gray-500">Upload an Image</span>
                <input type="file" onChange={handleFileChange} className="hidden" />
              </label>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 md:grow">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-gray-100">Username</label>
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
            <label htmlFor="email" className="text-gray-100">Email</label>
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
            <label htmlFor="phone" className="text-gray-100">Phone</label>
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
            <label htmlFor="password" className="text-gray-100">password</label>
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
            <label htmlFor="role" className="text-gray-100">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="p-3 rounded-lg bg-[#414339] shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            >
              <option value="">Choose Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id.toString()}>{role.name}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="bg-white p-3 w-fit text-black mt-4">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserPage;