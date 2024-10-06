"use client";
import React, { useState } from "react";
import { ClipboardList, ShoppingCart, Search, X } from "lucide-react";

const Orders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Dummy data
  const dummyOrders = [
    {
      id: 1,
      attributes: {
        name: "John Doe",
        address: "123 Main St, City, Country",
        phone: "123-456-7890",
        status: "pending",
        items: [
          { name: "Product 1", quantity: 2, price: 29.99 },
          { name: "Product 2", quantity: 1, price: 49.99 },
        ],
      },
    },
    {
      id: 2,
      attributes: {
        name: "Jane Smith",
        address: "456 Oak Ave, Town, Country",
        phone: "234-567-8901",
        status: "processing",
        items: [
          { name: "Product 3", quantity: 1, price: 39.99 },
        ],
      },
    },
    {
      id: 3,
      attributes: {
        name: "Bob Wilson",
        address: "789 Pine Rd, Village, Country",
        phone: "345-678-9012",
        status: "shipped",
        items: [
          { name: "Product 1", quantity: 3, price: 29.99 },
          { name: "Product 4", quantity: 2, price: 19.99 },
        ],
      },
    },
    {
      id: 4,
      attributes: {
        name: "Alice Johnson",
        address: "321 Elm Blvd, City, Country",
        phone: "456-789-0123",
        status: "delivered",
        items: [
          { name: "Product 2", quantity: 1, price: 49.99 },
          { name: "Product 3", quantity: 1, price: 39.99 },
        ],
      },
    },
  ];

  const filteredOrders = dummyOrders.filter((order) =>
    Object.values(order.attributes).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleStatusChange = (orderId, newStatus) => {
    // In a real app, you'd update the backend here
    console.log(`Updated order ${orderId} status to ${newStatus}`);
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <header className="flex items-center gap-4 mb-6">
        <div className="p-2 bg-blue-600 rounded-lg text-white">
          <ClipboardList size={32} />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">Latest Orders</h1>
      </header>

      {/* Search Section */}
      <div className="relative mb-6">
        <input
          type="search"
          className="h-12 bg-white w-full pl-12 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          placeholder="Search orders..."
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
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Name</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Address</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Phone</th>
                <th className="py-4 px-6 text-left text-sm font-semibold text-gray-600">Status</th>
                <th className="py-4 px-6 text-center text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-gray-800">{order.id}</td>
                  <td className="py-4 px-6 text-gray-800">{order.attributes.name}</td>
                  <td className="py-4 px-6 text-gray-800">{order.attributes.address}</td>
                  <td className="py-4 px-6 text-gray-800">{order.attributes.phone}</td>
                  <td className="py-4 px-6">
                    <select
                      value={order.attributes.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`capitalize px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 ${statusColors[order.attributes.status]}`}
                    >
                      <option value="pending" className={statusColors.pending}>Pending</option>
                      <option value="processing" className={statusColors.processing}>Processing</option>
                      <option value="shipped" className={statusColors.shipped}>Shipped</option>
                      <option value="delivered" className={statusColors.delivered}>Delivered</option>
                    </select>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex justify-center">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600"
                      >
                        <ShoppingCart size={20} />
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
      {filteredOrders.length === 0 && !isLoading && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200 mt-4">
          <p className="text-gray-500 text-lg">No orders found</p>
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Order Details</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Customer</p>
                  <p className="font-medium">{selectedOrder.attributes.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{selectedOrder.attributes.address}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{selectedOrder.attributes.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Items</p>
                  <div className="mt-2 space-y-2">
                    {selectedOrder.attributes.items.map((item, index) => (
                      <div key={index} className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-600">
                          {item.quantity} x ${item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">
                      ${selectedOrder.attributes.items.reduce((acc, item) => acc + (item.quantity * item.price), 0).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;