"use client";
import Display from "@/app/components/admin/order/Display";
import { NotebookTabsIcon, ShoppingCartIcon } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { getOrder, getData, UpdateOrderStatus } from "@/app/api/strapi";

const Orders = () => {
  const [orders, setOrders] = useState({
    today: [],
    total: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [length, setLength] = useState({
    moderators: 0,
    public: 0,
  });

  const handleStatusChange = useCallback(
    async (orderId: any, newStatus: any) => {
      try {
        await UpdateOrderStatus(orderId, newStatus);
        console.log(`Updated order ${orderId} status to ${newStatus}`);

        // Update the local state
        setOrders((prevOrders: any) => ({
          ...prevOrders,
          today: prevOrders.today.map((order: any) =>
            order.id === orderId
              ? {
                  ...order,
                  attributes: { ...order.attributes, status: newStatus },
                }
              : order
          ),
        }));
      } catch (error) {
        console.error("Failed to update order status:", error);
      }
    },
    []
  );

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        const totalOrders = await getOrder();
        setOrders({ today: totalOrders, total: totalOrders });
      } catch (err) {
        setError("Failed to fetch orders");
        console.error("Error fetching orders:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.today.filter((order: any) =>
    Object.values(order.attributes).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  console.log(length);

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-white">Error: {error}</div>;
  if (!orders.today.length)
    return <div className="text-white">No orders found.</div>;

  return (
    <>
      <div className="Orders w-full min-h-fit text-white border-">
        <header className="flex gap-2 mb-2">
          <NotebookTabsIcon width={40} height={40} />
          <h1 className="text-[2rem] ">Latest orders</h1>
        </header>
        <input
          type="search"
          className="h-12 bg-[#414339] w-full  indent-3 mb-4 rounded"
          placeholder="Search Orders"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="overflow-x-auto bg-black rounded-lg">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr className="border-b bg-[#414339] border-gray-800">
                <th className="py-3 px-4 text-left text-sm font-medium">ID</th>
                <th className="py-3 px-4 text-left text-sm font-medium">
                  Name
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium">
                  Address
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
              {filteredOrders.map((order: any) => {
                const { name, address, phone, status } = order.attributes;
                return (
                  <tr
                    key={order.id}
                    className="border-b bg-[#272822] "
                  >
                    <td className="py-3 px-4 text-sm">{order.id}</td>
                    <td className="py-3 px-4 text-sm">{name}</td>
                    <td className="py-3 px-4 text-sm">{address}</td>
                    <td className="py-3 px-4 text-sm">{phone}</td>
                    <td className="py-3 px-4">
                      <select
                        value={status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                        className="bg-[#414339] text-white text-sm rounded-md   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition-colors duration-200 ease-in-out capitalize"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="flex justify-center items-center p-2">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="bg-[#414339] hover:bg-[rgb(56,0,27)] p-2 rounded-lg"
                      >
                        <ShoppingCartIcon
                          width={24}
                          height={24}
                          color="#ffffff"
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {selectedOrder && (
        <Display order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </>
  );
};

export default Orders;
