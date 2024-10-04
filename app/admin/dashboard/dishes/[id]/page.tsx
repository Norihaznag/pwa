"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Delete01Icon, Delete02Icon, PencilEdit02Icon } from "hugeicons-react";
import { deleteData, EditeData, getData, uploadFile } from "@/app/api/strapi";
import Srch from "@/app/components/search/Srch";
import PostDataLoading from "@/app/components/loaders/PostDataLoading";
import Succes from "@/app/components/messages/Succes";

interface Option {
  id?: number;
  price: number;
  size: string;
}

interface Tag {
  id: number;
  attributes: { name: string };
}

interface Category {
  id: number;
  attributes: { name: string };
}

interface FormData {
  id: string | number;
  title: string;
  description: string;
  category: string;
  tags: Tag[];
  options: Option[];
}

const DishPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    id: '',
    title: "",
    description: "",
    category: "",
    tags: [],
    options: [],
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<Option>({
    price: 0,
    size: "small",
  });
  const [success, setSuccess] = useState(false);
  const { id } = useParams();

  const fetchDishAndCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const dish = await getData({ data: `dishes/${id}?populate=*` });
      const categoriesData = await getData({ data: "categories" });

      const { title, description, category, tags, options = [], thumbnail } = dish.data.attributes;
      const thumbnailUrl = thumbnail.data.attributes.url;

      setFormData({
        id: dish.data.id,
        title,
        description,
        category: category.data.attributes.name,
        tags: tags.data || [],
        options,
      });

      setThumbnailPreview(`${process.env.NEXT_PUBLIC_STRAPI_URL}${thumbnailUrl}`);
      setCategories(categoriesData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDishAndCategories();
  }, [fetchDishAndCategories]);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setThumbnailPreview(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
    }
  };

  const handleAddOption = () => {
    const { price, size } = selectedOption;
    if (formData.options.some((opt) => opt.size === size)) {
      alert("Size already exists. Please choose a different size.");
      return;
    }

    if (isNaN(price) || price <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      options: [...prev.options, selectedOption],
    }));

    setSelectedOption({ price: 0, size: "small" });
  };

  const handleAddTag = (tag: Tag) => {
    if (formData.tags.some((t) => t.id === tag.id)) {
      alert("Tag already exists. Please choose a different one.");
      return;
    }
    setFormData((prev) => ({ ...prev, tags: [...prev.tags, tag] }));
  };

  const submitFormData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const categoryId  = categories.find((category)=> category.attributes.name === formData.category );

      setIsLoading(true);
      let updatedFormData :any = { ...formData  , category : categoryId?.id };
  
      if (file) {
        const uploadedFile = await uploadFile(file);
        if (uploadedFile) {
          updatedFormData  = { ...updatedFormData, thumbnail: uploadedFile };
        }
      }
    

      console.log(categoryId);
  
      await EditeData({ data: updatedFormData, entry: "dishes", id: updatedFormData.id });
      
      setFormData(updatedFormData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to submit form. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  console.log(formData)

  return (
    <div className="min-h-screen w-full flex flex-col">
      {isLoading && <PostDataLoading />}
      <h1 className="text-2xl text-white mb-8">Edit Dish</h1>
      {success && (
        <Succes>
          <h1>Dish Updated Successfully</h1>
        </Succes>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}
      <form
        method="post"
        className="w-full text-white justify-between flex flex-col md:flex-row gap-10"
        onSubmit={submitFormData}
      >
        {/* Thumbnail Upload */}
        <div className="relative w-full h-48 bg-[#414339] rounded-xl flex flex-col md:flex-row items-center justify-center overflow-hidden md:order-2 md:w-[30%]">
          {thumbnailPreview ? (
            <>
              <Image
                src={thumbnailPreview}
                alt="Dish Thumbnail"
                layout="fill"
                objectFit="cover"
                className="rounded-xl z-0"
              />
              <div className="flex gap-2">
                <Delete02Icon
                  width={50}
                  height={50}
                  className="z-20 rounded-full p-2 bg-[#414339] text-white cursor-pointer"
                  onClick={() => {
                    setThumbnailPreview(null);
                    setFile(null);
                  }}
                />
                <div className="z-20 bg-[#414339] text-white overflow-hidden relative rounded-full w-[50px] h-[50px]">
                  <PencilEdit02Icon width={50} height={50} className="p-2" />
                  <input
                    type="file"
                    name="thumbnail"
                    onChange={handleThumbnailChange}
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
            onChange={handleThumbnailChange}
            className={`absolute inset-0 cursor-pointer ${
              file ? "hidden" : "opacity-0"
            }`}
          />
        </div>
        <div className="infos flex flex-col gap-4 md:grow">
          {/* Title Input */}
          <div className="flex flex-col">
            <label htmlFor="title" className="text-gray-100">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="p-3 rounded-lg bg-[#414339] shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter dish title"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>

          {/* Description Input */}
          <div className="flex flex-col">
            <label htmlFor="description" className="text-gray-100">
              Description
            </label>
            <textarea
              name="description"
              className="p-3 rounded-lg bg-[#414339] shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter dish description"
              required
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, description: e.target.value }))
              }
            />
          </div>

          <div className="param grid grid-cols-2 md:flex w-full gap-2 text-gray-100">
            {/* Category Selector */}
            <div className="flex flex-col">
              <label htmlFor="category" className="">
                Category
              </label>
              <select
                name="category"
                className="p-3 rounded-lg bg-[#414339] shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
              >
                <option value={formData.category} className="bg-slate-900 cursor-wait">
                 {formData.category}
                </option>
                {categories.filter((category) => category.attributes.name !== formData.category).map((category) => (
                  <option key={category.id} value={category.id.toString()}>
                    {category.attributes.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Tags Selector */}
            <div className="flex flex-col text-gray-100">
              <label htmlFor="tags" className="">
                Tags
              </label>
              <Srch data="tags" onClick={handleAddTag} />
            </div>
          </div>
          <div className="tags flex flex-wrap gap-2 w-full mt-2">
            {formData.tags.map((tag) => (
              <div
                key={tag.id}
                className="opt p-2 bg-white flex w-fit flex-wrap gap-3 rounded-full items-center"
              >
                <span className="text-xs text-blue-900">
                  {tag.attributes.name}
                </span>
                <span
                  className="delete text-black cursor-pointer"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      tags: prev.tags.filter((t) => t.id !== tag.id),
                    }))
                  }
                >
                  <Delete01Icon width={20} height={20} />
                </span>
              </div>
            ))}
          </div>

          {/* Options Selector */}
          <div className="flex flex-col">
            <label htmlFor="options" className="text-gray-100">
              Options
            </label>
            <div className="flex flex-wrap gap-2">
              <input
                type="number"
                placeholder="Price"
                name="price"
                id="price"
                required
                value={selectedOption.price}
                className="p-2 bg-[#414339] rounded-lg"
                onChange={(e) =>
                  setSelectedOption((prev) => ({
                    ...prev,
                    price: parseInt(e.target.value),
                  }))
                }
              />
              <select
                name="size"
                id="size"
                required
                value={selectedOption.size}
                className="p-2 bg-[#414339] rounded-lg"
                onChange={(e) =>
                  setSelectedOption((prev) => ({
                    ...prev,
                    size: e.target.value,
                  }))
                }
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
                <option value="XL">XL</option>
              </select>
              <button
                type="button"
                onClick={handleAddOption}
                className="p-2 bg-indigo-600 text-white rounded-lg"
              >
                Add
              </button>
            </div>
          </div>
          <div className="options flex flex-wrap gap-2">
            {formData.options.map((option, index) => (
              <div
                key={index}
                className="opt p-2 bg-white flex w-fit flex-wrap gap-3 rounded-full items-center"
              >
                <span className="text-xs text-blue-900">{option.size}</span>
                <span className="text-xs text-blue-900">{option.price} DH</span>
                <span
                  className="delete text-black cursor-pointer"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      options: prev.options.filter((_, i) => i !== index),
                    }))
                  }
                >
                  <Delete01Icon width={20} height={20} />
                </span>
              </div>
            ))}
          </div>
          <button type="submit" className="bg-white p-3 w-fit text-black">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default DishPage;