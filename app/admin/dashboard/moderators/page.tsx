"use client";
import { UserCog, Trash2, PenBox } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { getData } from "@/app/api/strapi";
import { useRouter } from "next/navigation";

const ModeratorsPage = () => {
  const [Moderators, setModerators] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchModerators = async () => {
      try {
        setIsLoading(true);
        const totalModerators = await getData({
          data: "users",
          filters: "?filters[role][name]=Moderator",
        });
        setModerators(totalModerators);
      } catch (err) {
        setError("Failed to fetch Moderators");
        console.error("Error fetching Moderators:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchModerators();
  }, []);

  const filteredModerators = Moderators.filter((moderator) =>
    Object.values(moderator).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  console.log(Moderators);

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-white">Error: {error}</div>;
  if (!Moderators.length)
    return <div className="text-white">No Moderators found.</div>;

  return (
    <>
      <div className="Moderators w-full min-h-fit text-white border-">
        <header className="flex gap-2 mb-2">
          <UserCog width={40} height={40} />
          <h1 className="text-[2rem] ">Moderators</h1>
        </header>
        <input
          type="search"
          className="h-12 bg-[#414339] w-full  indent-3 mb-4 rounded"
          placeholder="Search Moderators"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="overflow-x-auto rounded-lg">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr className="bg-[#414339]">
                <th className="py-3 px-4 text-left text-sm font-medium">ID</th>
                <th className="py-3 px-4 text-left text-sm font-medium">
                  Username
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium">
                  Email
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium">
                  Phone
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium">
                  Status
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium">
                  Cart
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredModerators.map((moderator: any) => (
                <tr
                  key={moderator.id}
                  className=" bg-[#272822]"
                >
                  <td className="py-3 px-4 text-sm">{moderator.id}</td>
                  <td className="py-3 px-4 text-sm">{moderator.username}</td>
                  <td className="py-3 px-4 text-sm">{moderator.email}</td>
                  <td className="py-3 px-4 text-sm">{moderator.phone}</td>
                  <td className="py-3 px-4">
                    {moderator.blocked ? "Blocked" : "Active"}
                  </td>

                  <td className="flex gap-3 items-center justify-items-center ">
                    <button>
                    <Trash2
                      color="red"
                      className=" hover:bg-[#220000]"
                      width={30}
                      height={30}
                    />
                    </button>
                   <button onClick={()=> router.push(`moderators/${moderator.id}`)} >
                   <PenBox
                      color="blue"
                      className=" hover:bg-[#000e22]"
                      width={30}
                      height={30}
                    />
                   </button>
                  
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ModeratorsPage;
