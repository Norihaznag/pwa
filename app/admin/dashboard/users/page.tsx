"use client";
import React, { useState } from "react";
import { UserCog, Trash2, PenBox, Search } from "lucide-react";

const UsersPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Dummy data
  const dummyUsers = [
    {
      id: 1,
      username: "john_doe",
      email: "john@example.com",
      phone: "123-456-7890",
      blocked: false,
    },
    {
      id: 2,
      username: "jane_smith",
      email: "jane@example.com",
      phone: "234-567-8901",
      blocked: true,
    },
    {
      id: 3,
      username: "bob_wilson",
      email: "bob@example.com",
      phone: "345-678-9012",
      blocked: false,
    },
    {
      id: 4,
      username: "alice_johnson",
      email: "alice@example.com",
      phone: "456-789-0123",
      blocked: false,
    },
    {
      id: 5,
      username: "charlie_brown",
      email: "charlie@example.com",
      phone: "567-890-1234",
      blocked: true,
    },
  ];

  const filteredUsers = dummyUsers.filter((user) =>
    Object.values(user).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-900 p-6">
      {/* Header Section */}
      <header className="flex items-center gap-4 mb-6">
        <div className="p-2 bg-blue-600 rounded-lg text-white">
          <UserCog size={32} />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Users</h1>
      </header>

      {/* Search Section */}
      <div className="relative mb-6">
        <input
          type="search"
          className="h-12 bg-white w-full pl-12 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
      </div>

      {/* Table Section */}
      <div className="overflow-hidden bg-white rounded-lg border border-gray-200 shadow-sm">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">ID</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Username</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Email</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Phone</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6 text-gray-800">{user.id}</td>
                  <td className="py-4 px-6 text-gray-800">{user.username}</td>
                  <td className="py-4 px-6 text-gray-800">{user.email}</td>
                  <td className="py-4 px-6 text-gray-800">{user.phone}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.blocked
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {user.blocked ? "Blocked" : "Active"}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        onClick={() => alert(`Delete user ${user.id}`)}
                      >
                        <Trash2 size={20} className="text-red-600" />
                      </button>
                      <button
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        onClick={() => alert(`Edit user ${user.id}`)}
                      >
                        <PenBox size={20} className="text-blue-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Empty State */}
      {filteredUsers.length === 0 && !isLoading && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200 mt-4">
          <p className="text-gray-500 text-lg">No users found</p>
        </div>
      )}
    </div>
  );
};

export default UsersPage;