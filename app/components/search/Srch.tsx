"use client";
import React, { useEffect, useState } from "react";
import { getData, SearchInput } from "@/app/api/strapi"; // Adjust the import path as needed
import { SearchIcon } from "lucide-react";

const Srch = ({ data, onClick , className }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtereddatas, setFiltereddatas] = useState([]);
  const [isHiddenList, SetHidden] = useState(true);

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      const fetchdatas = async () => {
        try {
          const fetcheddatas = await getData({
            data: data,
            filters: `?filters[name][$contains]=${searchTerm.toLowerCase()}`,
          });
          //
          setFiltereddatas(fetcheddatas);
          console.log(searchTerm);
          console.log(fetcheddatas);

          //   cb(fetcheddatas);
        } catch (err) {
          console.error("Error fetching datas:", err);
        }
      };
      fetchdatas();
    } else {
      setFiltereddatas([]); // Clear results if search term is empty
    }
  }, [data, searchTerm]);

  return (
    <div className={`relative w-full max-w-md ${className}`}>
      <div className="input flex bg-[#22231e] justify-between items-center rounded-lg overflow-hidden shadow-md">
        <input
          name="search"
          className="px-4 py-2 w-full text-white  bg-[#414339]"
          placeholder={`Search ${data}`}
          value={searchTerm}
          onChange={(e) => {
            e.preventDefault();
            setSearchTerm(e.target.value);
          }}
        />
      </div>
      {filtereddatas.length > 0 && (
        <ul className="absolute w-full bg-blue-900  shadow-lg rounded-md mt-2 py-2 max-h-60 overflow-y-auto z-50">
          {filtereddatas.map((data: any) => (
            <li
              className="px-4 py-2 text-white hover:bg-blue-700 cursor-pointer"
              key={data.id}
              onClick={() => {
                onClick(data);
              }}
            >
              {data.attributes.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Srch;
