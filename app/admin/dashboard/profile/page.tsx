"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

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

export default function Profile() {
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  useEffect(() => {
    // Simulated data fetch
    setTimeout(() => {
      setFormData({
        ...formData,
        username: "JohnDoe",
        email: "john@example.com",
        phone: "123-456-7890",
        role: { id: "1", name: "Admin" },
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnailPreview(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulated API call
    setTimeout(() => {
      setSuccess(true);
      setIsLoading(false);
    }, 1000);
  };

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen">
      Loading...
    </div>
  );

  return (
    <div className="mx-auto">
      <div className=" rounded-lg ">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border flex items-center justify-center">
                {thumbnailPreview ? (
                  <Image
                    src={thumbnailPreview}
                    alt="Profile"
                    width={60}
                    height={60}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </div>
              <div className="absolute bottom-0 right-0 flex gap-2">
                <button
                  type="button"
                  className="p-2 border rounded-full hover:bg-[#444] transition-colors"
                  onClick={() => {
                    setThumbnailPreview(null);
                    setFile(null);
                  }}
                >
                  🗑️
                </button>
                <label className="p-2 border rounded-full hover:bg-[#444] transition-colors cursor-pointer">
                  ✏️
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Basic Info */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded border  border-[#444] focus:outline-none focus:border-[#666]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded border  border-[#444] focus:outline-none focus:border-[#666]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded border  border-[#444] focus:outline-none focus:border-[#666]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Role
                </label>
                <input
                  type="text"
                  value={formData.role.name}
                  disabled
                  className="w-full p-2 rounded  border border-[#444] text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Password Fields */}
            <div className="space-y-4">
              {[
                { name: 'oldpassword', label: 'Current Password' },
                { name: 'password', label: 'New Password' },
                { name: 'repassword', label: 'Confirm New Password' }
              ].map(({ name, label }) => (
                <div key={name}>
                  <label className="block text-sm font-medium mb-1">
                    {label}
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords[name as keyof typeof showPasswords] ? 'text' : 'password'}
                      name={name}
                      value={formData[name as keyof FormData]}
                      onChange={handleInputChange}
                      className="w-full p-2 rounded border border border-[#444] focus:outline-none focus:border-[#666] pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                      onClick={() => setShowPasswords(prev => ({
                        ...prev,
                        [name]: !prev[name as keyof typeof showPasswords]
                      }))}
                    >
                      {showPasswords[name as keyof typeof showPasswords] ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {error && <p className="text-red-500 mt-4">{error}</p>}
          {success && <p className="text-green-500 mt-4">Profile updated successfully!</p>}

          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            {isLoading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}