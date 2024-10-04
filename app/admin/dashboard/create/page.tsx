"use client";
import { ListOrdered, Pizza, User, UserCheck } from "lucide-react";
import { useRouter } from "next/navigation";

const Create = () => {
  const router = useRouter();
  const entries = [
    { name: "order", icon: ListOrdered },
    { name: "dish", icon: Pizza },
    { name: "user", icon: User },
  ];

  return (
    <div className="w-full min-h-[80vh]">
      <div className="title mb-6">
        <h1 className="text-3xl text-green-600">Add an Entry</h1>
      </div>
      <div className="main grid md:grid-cols-3 gap-4 ">
        {entries.map((entry, index) => (
          <button
            key={index}
            onClick={() => router.push(`create/${entry.name}`)}
            className="bg-[#414339] rounded-lg shadow-md flex items-center space-x-4 w-full capitalize p-5 mb-6"
          >
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white rounded-full">
              <entry.icon className="w-6 h-6 text-black" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{entry.name}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Create;
