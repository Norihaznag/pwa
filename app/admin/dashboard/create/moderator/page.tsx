"use client";
import { getData, PostData, uploadFile } from "@/app/api/strapi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Delete01Icon, Delete02Icon, PencilEdit02Icon } from "hugeicons-react";
import Srch from "@/app/components/search/Srch";
import PostDataLoading from "@/app/components/loaders/PostDataLoading";
import Succes from "@/app/components/messages/Succes";

const CreateModeratorPage = () => {
  const [formData, setFormData]: any = useState({
    title: "",
    description: "",
    category: "",
    tags: [] as { id: number; attributes: { name: string } }[],
    thumbnail: "",
    options: [] as { id: number; price: number; size: string }[],
  });

  const [data, setData] = useState({
    categories: [] as { id: number; attributes: { name: string } }[],
  });

  const [file, setFile] = useState<File | null>(null);
  const [DishThumbnail, SetThumb]: any = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState({
    price: 0,
    size: "small",
  });
  const [succes, setSucces] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      SetThumb(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
    }
  };



  const handleAddOption = () => {
    const isDuplicateSize = formData.options.some(
      (opt: any) => opt.size === selectedOptions.size
    );
    if (isDuplicateSize) {
      alert("Size already exists. Please choose a different size.");
      return;
    }

    if (isNaN(selectedOptions.price) || selectedOptions.price <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    setFormData({
      ...formData,
      options: [...formData.options, selectedOptions],
    });

    setSelectedOptions({ price: 0, size: "small" });
  };

  const handleAddTag = (tag: { id: number; attributes: { name: string } }) => {
    const isDuplicateTag = formData.tags.some((t: any) => t.id === tag.id);

    if (isDuplicateTag) {
      alert("Tag already exists. Please choose a different one.");
      return;
    }

    setFormData({ ...formData, tags: [...formData.tags, tag] });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const categories = await getData({ data: "categories" });
        setData({ categories });
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  async function SubmitFormData(e: any) {
    e.preventDefault();
    if (file) {
      try {
        setIsLoading(true);
        const response = await uploadFile(file);
        setFormData({ ...formData, thumbnail: response });
        console.log(formData);
        PostData({
          data: formData,
        })
          .then((data) => console.log("succes", data))
          .catch((err) => console.log(err));
      } catch (error) {
        setIsLoading(false);
        console.error("Error uploading file:", error);
        setError("Failed to upload file. Please try again later.");
      } finally {
        setIsLoading(false);
        setSucces(true);
        setFile(null);
        SetThumb(false);
        setTimeout(() => {
          setSucces(false);
        }, 5000);
        setFormData({
          title: "",
          description: "",
          category: "",
          tags: [] as { id: number; attributes: { name: string } }[],
          thumbnail: "",
          options: [] as { id: number; price: number; size: string }[],
        });
      }
    }
  }

  console.log(formData);
  console.log(file);

  return (
    <div className="min-h-screen w-full flex flex-col">
      {isLoading ? <PostDataLoading /> : ""}
      <h1 className="text-4xl text-white mb-8">Create a Dish</h1>
      {succes && (
        <Succes>
          <h1>Form Added Successfully</h1>
        </Succes>
      )}
      <form
        method="post"
        className="w-full text-white justify-between flex flex-col md:flex-row gap-10"
        onSubmit={SubmitFormData}
      >
        {/* Thumbnail Upload */}
        <div className="relative w-full h-48 bg-[#414339] rounded-xl flex flex-col md:flex-row items-center justify-center overflow-hidden md:order-2 md:w-[30%]">
          {DishThumbnail ? (
            <>
              <Image
                src={DishThumbnail}
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
                    SetThumb(false);
                    setFile(null);
                  }}
                />
                <div className="z-20 bg-[#414339] text-white overflow-hidden relative rounded-full w-[50px] h-[50px]">
                  <PencilEdit02Icon width={50} height={50} className="p-2" />
                  <input
                    type="file"
                    name="thumbnail"
                    onChange={handleChange}
                    className="inset-0 cursor-pointer  absolute h-full opacity-0"
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
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
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
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
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
                onChange={(e: any) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value={""} className="bg-slate-900 cursor-wait">
                  Choose Category
                </option>
                {data.categories.map((category) => (
                  <option key={category.id} value={category.id}>
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
              <Srch data="tags" onClick={(tag: any) => handleAddTag(tag)} />
            </div>
          </div>
          <div className="tags flex flex-wrap gap-2 w-full mt-2">
            {formData.tags.map((tag:any) => (
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
                    setFormData({
                      ...formData,
                      tags: formData.tags.filter((tg:any) => tg.id !== tag.id),
                    })
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
                value={selectedOptions.price}
                className="p-2 bg-[#414339] rounded-lg"
                onChange={(e) =>
                  setSelectedOptions({
                    ...selectedOptions,
                    price: parseInt(e.target.value),
                  })
                }
              />
              <select
                name="size"
                id="size"
                required
                value={selectedOptions.size}
                className="p-2 bg-[#414339] rounded-lg"
                onChange={(e) =>
                  setSelectedOptions({
                    ...selectedOptions,
                    size: e.target.value,
                  })
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
            {formData.options.map((option:any) => (
              <div
                key={option.size}
                className="opt p-2 bg-white flex w-fit flex-wrap gap-3 rounded-full items-center"
              >
                <span className="text-xs text-blue-900">{option.size}</span>
                <span className="text-xs text-blue-900">{option.price} DH</span>
                <span
                  className="delete text-black cursor-pointer"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      options: formData.options.filter(
                        (opt:any) => opt.size !== option.size
                      ),
                    })
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

export default CreateModeratorPage;
