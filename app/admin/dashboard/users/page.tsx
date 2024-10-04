"use client";
import { UserCog, Trash2, PenBox } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { getData } from "@/app/api/strapi";

const UsersPage = () => {

  const [Users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const users = await getData({
          data: "users",
          filters: "?filters[role][name]=Public",
        });
        setUsers(users);
      } catch (err) {
        setError("Failed to fetch Users");
        console.error("Error fetching Users:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = Users.filter((user) =>
    Object.values(user).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  console.log(Users);

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-white">Error: {error}</div>;
  if (!Users.length)
    return <div className="text-white">No Users found.</div>;

  return (
    <>
      <div className="Users w-full min-h-fit text-white border-">
        <header className="flex gap-2 mb-2">
          <UserCog width={40} height={40} />
          <h1 className="text-[2rem] ">Users</h1>
        </header>
        <input
          type="search"
          className="h-12 bg-black w-full  indent-3 mb-4 rounded"
          placeholder="Search Users"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="overflow-x-auto bg-black rounded-lg">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr className="border-b bg-[#181818] border-gray-800">
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
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user: any) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-[#181818] border-gray-800"
                >
                  <td className="py-3 px-4 text-sm">{user.id}</td>
                  <td className="py-3 px-4 text-sm">{user.username}</td>
                  <td className="py-3 px-4 text-sm">{user.email}</td>
                  <td className="py-3 px-4 text-sm">{user.phone}</td>
                  <td className="py-3 px-4">
                    {user.blocked ? "Blocked" : "Active"}
                  </td>

                  <td className="flex gap-3 items-center justify-items-center ">
                    <Trash2
                      color="red"
                      className=" hover:bg-[#220000]"
                      width={30}
                      height={30}
                    />
                    <PenBox
                      color="blue"
                      className=" hover:bg-[#000e22]"
                      width={30}
                      height={30}
                    />
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

export default UsersPage;
