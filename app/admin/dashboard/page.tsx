"use client";
import { getOrder, getData, UpdateOrderStatus } from "@/app/api/strapi";
import Create from "@/app/components/admin/create/Create";
import Display from "@/app/components/admin/order/Display";
import Stat from "@/app/components/admin/StatisticsCard";
import {
  Clock3Icon,
  Notebook,
  User,
  UserCheck,
  ShoppingCartIcon,
  NotebookTabsIcon,
  Pizza as LucidePizza
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

const Dashboard = () => {
  const [stats, setStats] = useState([
    { name: 'orders', icon: <Notebook />, length: 0 },
    { name: 'users', icon: <User />, length: 0 },
    { name: 'dishes', icon: <LucidePizza />, length: 0 },
  ]);
  const [orders, setOrders] = useState([]);
  const [todayOrders, setTodayOrder] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const router = useRouter();
  const path = usePathname();

  const options = ["pending", "processing", "shipped", "delivered"];

  const handleStatusChange = useCallback(async (orderId:any, newStatus:any) => {
    if (!orderId || !newStatus) {
      console.error("Invalid orderId or newStatus");
      return;
    }

    try {
      await UpdateOrderStatus(orderId, newStatus);
      console.log(`Updated order ${orderId} status to ${newStatus}`);

      setOrders((prevOrders:any) =>
        prevOrders.map((order:any) =>
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
        const ordersData = await getData({ data: 'orders' });
        setOrders(ordersData.data || []);
        const TodayOrder = await getData({ data: 'orders', onlyToday: true, meta: true });
        setTodayOrder(TodayOrder?.meta?.pagination?.total || 0);
        const updatedStats = await Promise.all(
          stats.map(async (stat) => {
            const res = await getData({ data: stat.name });
            return { ...stat, length: res?.length || 0 };
          })
        );
        setStats(updatedStats);
      } catch (err) {
        setError("Failed to fetch data");
        console.error("Error fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredOrders = orders.filter((order:any) =>
    Object.values(order.attributes || {}).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  console.log(orders)

  if (isLoading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-white">Error: {error}</div>;

  return (
    <div className="min-h-screen w-full relative">
      <div className="states w-full min-h-fit flex flex-wrap gap-2 text-white mb-6">
        {stats.map((el) => (
          <Stat length={el.length} icon={el.icon} name={el.name} key={el.name} />
        ))}
        <Stat length={todayOrders} icon={<Clock3Icon />} name="today orders" key="today-orders" />
      </div>
      <div className="LatestOrders w-full min-h-fit text-white">
        <header className="flex gap-2 mb-2">
          <NotebookTabsIcon width={40} height={40} />
          <h1 className="text-[2rem]">Latest orders</h1>
        </header>
        <input
          type="search"
          className="h-12 bg-[#414339] w-full indent-3 mb-4 rounded"
          placeholder="Search Orders"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="overflow-x-auto rounded-lg">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr className="border-b bg-[#181818] border-gray-800">
                <th className="py-3 px-4 text-left text-sm font-medium">ID</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Name</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Address</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Phone</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Status</th>
                <th className="py-3 px-4 text-left text-sm font-medium">Cart</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order:any) => {
                  const {
                    id,
                    attributes: { name, address, phone, status } = {},
                  } = order || {};
                  return (
                    <tr
                      key={id}
                      className="border-b hover:bg-[#181818] border-gray-800"
                    >
                      <td className="py-3 px-4 text-sm">{id}</td>
                      <td className="py-3 px-4 text-sm">{name || 'N/A'}</td>
                      <td className="py-3 px-4 text-sm">{address || 'N/A'}</td>
                      <td className="py-3 px-4 text-sm">{phone || 'N/A'}</td>
                      <td className="py-3 px-4">
                        <select
                          value={status || ''}
                          onChange={(e) => handleStatusChange(id, e.target.value)}
                          className="bg-gray-800 text-white text-sm rounded-md border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 transition-colors duration-200 ease-in-out capitalize"
                        >
                          {options.map((opt) => (
                            <option
                              key={opt}
                              value={opt}
                              className="capitalize p-2"
                            >
                              {opt}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="flex justify-center items-center p-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="bg-[rgb(25,0,12)] hover:bg-[rgb(56,0,27)] p-2 rounded-lg"
                        >
                          <ShoppingCartIcon
                            width={24}
                            height={24}
                            color="#ff00c3"
                          />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          <Create />
        </div>
      </div>
      {selectedOrder && (
        <Display order={selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  );
};

export default Dashboard;