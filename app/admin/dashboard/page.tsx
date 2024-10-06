"use client";
import { getOrder, getData, UpdateOrderStatus } from "@/app/api/strapi";
import { useEffect, useState, useCallback } from "react";
import {
  Clock3Icon,
  Notebook,
  User,
  ShoppingCartIcon,
  Pizza as LucidePizza
} from "lucide-react";

// Define TypeScript interfaces
interface Order {
  id: number;
  attributes: {
    name: string;
    address: string;
    phone: string;
    status: string;
  };
}

interface StatItem {
  name: string;
  icon: JSX.Element;
  length: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<StatItem[]>([
    { name: 'Orders', icon: <Notebook />, length: 0 },
    { name: 'Users', icon: <User />, length: 0 },
    { name: 'Dishes', icon: <LucidePizza />, length: 0 },
  ]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [todayOrders, setTodayOrder] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const options = ["pending", "processing", "shipped", "delivered"] as const;
  type OrderStatus = typeof options[number];

  const handleStatusChange = useCallback(async (orderId: number, newStatus: OrderStatus) => {
    if (!orderId || !newStatus) return;

    try {
      await UpdateOrderStatus(orderId, newStatus);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId
            ? { ...order, attributes: { ...order.attributes, status: newStatus } }
            : order
        )
      );
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [ordersData, todayOrdersData, ...statsData] = await Promise.all([
          getData({ data: 'orders' }),
          getData({ data: 'orders', onlyToday: true, meta: true }),
          ...stats.map(stat => getData({ data: stat.name }))
        ]);

        setOrders(ordersData.data || []);
        setTodayOrder(todayOrdersData?.meta?.pagination?.total || 0);
        
        const updatedStats = stats.map((stat, index) => ({
          ...stat,
          length: statsData[index]?.length || 0
        }));
        setStats(updatedStats);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredOrders = orders.filter((order) =>
    Object.values(order.attributes || {}).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      {/* Stats section */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {stats.map((el) => (
          <div key={el.name} className="flex items-center p-4 bg-white rounded-lg shadow-md">
            <div className="mr-4 text-blue-600">{el.icon}</div>
            <div>
              <h4 className="font-semibold text-gray-700">{el.name}</h4>
              <p className="text-gray-500">{el.length}</p>
            </div>
          </div>
        ))}
        <div className="flex items-center p-4 bg-white rounded-lg shadow-md">
          <Clock3Icon className="mr-4 text-blue-600" />
          <div>
            <h4 className="font-semibold text-gray-700">Today's Orders</h4>
            <p className="text-gray-500">{todayOrders}</p>
          </div>
        </div>
      </div>

      {/* Orders section */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Latest Orders</h2>
        <input
          type="search"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Search Orders"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-sm">ID</th>
                <th className="py-3 px-4 text-sm">Name</th>
                <th className="py-3 px-4 text-sm">Address</th>
                <th className="py-3 px-4 text-sm">Phone</th>
                <th className="py-3 px-4 text-sm">Status</th>
                <th className="py-3 px-4 text-sm">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4">No orders found.</td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b">
                    <td className="py-3 px-4 text-sm">{order.id}</td>
                    <td className="py-3 px-4 text-sm">{order.attributes.name || 'N/A'}</td>
                    <td className="py-3 px-4 text-sm">{order.attributes.address || 'N/A'}</td>
                    <td className="py-3 px-4 text-sm">{order.attributes.phone || 'N/A'}</td>
                    <td className="py-3 px-4">
                      <select
                        value={order.attributes.status || ''}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                        className="text-sm p-2 border border-gray-300 rounded"
                      >
                        {options.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="p-2 bg-blue-500 text-white rounded"
                      >
                        <ShoppingCartIcon width={18} height={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
