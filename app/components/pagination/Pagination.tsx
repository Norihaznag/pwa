import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";

const Pagination = ({ meta }: any) => {
  const {
    pagination: { page = 1, pageSize = 25, pageCount = 1, total = 9 },
  } = meta;

  return (
    <div className="pagination flex justify-center items-center space-x-4 h-20 mt-7">
      {pageCount > 1 && (
        <button
          className="p-2 rounded-2xl bg-[#272822] hover:bg-[#272822] transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600"
          aria-label="Previous Page"
        >
          {" "}
          <ArrowLeft className="text-white w-6 h-6" />{" "}
        </button>
      )}

      <span className="text-lg font-semibold text-white px-4 py-2 bg-[#272822]  rounded-md">
        {page}
      </span>

      {pageCount > 1 && (
        <button
          className="p-2 rounded-2xl bg-[#272822] hover:bg-[#272822] transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600"
          aria-label="Next Page"
        >
          {" "}
          <ArrowRight className="text-white w-6 h-6" />{" "}
        </button>
      )}
    </div>
  );
};

export default Pagination;
