import React, { useEffect, useState, useContext, useMemo } from "react";
import { Users, Store, Star, Clock } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { UserContext } from "./Context.jsx";
import axios from "axios";

const ReportsDashboardPage = () => {
  const { allUsers, allStores } = useContext(UserContext);

  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch ratings from API
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/v1/store_app/get-ratings"
        );
        setRatings(res.data.ratings || []);
      } catch (err) {
        console.error("Failed to fetch ratings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRatings();
  }, []);

  // Compute stats
  const stats = useMemo(() => {
    return {
      totalUsers: allUsers.length,
      totalStores: allStores.length,
      totalRatings: ratings.length,
    };
  }, [allUsers, allStores, ratings]);

  // Ratings per store (bar chart)
  const ratingsPerStore = useMemo(() => {
    return allStores.map((store) => {
      const storeRatings = ratings.filter((r) => r.store_id === store.id);
      return { name: store.name, ratings: storeRatings.length };
    });
  }, [allStores, ratings]);

  // User roles (pie chart)
  const userRoles = useMemo(() => {
    return [
      { name: "Normal Users", value: allUsers.filter((u) => u.type === "Normal User").length },
      { name: "Store Owners", value: allUsers.filter((u) => u.type === "Store Owner").length },
      { name: "Admins", value: allUsers.filter((u) => u.type === "System Administrator").length },
    ];
  }, [allUsers]);

  // Recent activity = latest 5 ratings
  const recentActivity = useMemo(() => {
    return ratings
      .slice()
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5)
      .map((r, idx) => {
        const user = allUsers.find((u) => u.id === r.user_id);
        const store = allStores.find((s) => s.id === r.store_id);
        return {
          id: idx,
          user: user?.name || "Unknown User",
          store: store?.name || "Unknown Store",
          rating: r.rating,
          date: new Date(r.created_at).toLocaleDateString(),
        };
      });
  }, [ratings, allUsers, allStores]);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading reports...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">Reports & Insights</h1>
          <p className="mt-2 text-lg text-gray-600">
            Track system performance and user activity.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-900 text-white p-6 rounded-xl shadow-md flex flex-col items-center">
            <Users size={48} className="text-indigo-400 mb-2" />
            <span className="text-gray-400 text-sm">Total Users</span>
            <p className="text-3xl font-bold text-indigo-400 mt-1">{stats.totalUsers}</p>
          </div>

          <div className="bg-gray-900 text-white p-6 rounded-xl shadow-md flex flex-col items-center">
            <Store size={48} className="text-yellow-400 mb-2" />
            <span className="text-gray-400 text-sm">Total Stores</span>
            <p className="text-3xl font-bold text-yellow-400 mt-1">{stats.totalStores}</p>
          </div>

          <div className="bg-gray-900 text-white p-6 rounded-xl shadow-md flex flex-col items-center">
            <Star size={48} className="text-green-400 mb-2" />
            <span className="text-gray-400 text-sm">Total Ratings Submitted</span>
            <p className="text-3xl font-bold text-green-400 mt-1">{stats.totalRatings}</p>
          </div>
        </div>

        {/* Charts + Recent Activity */}
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Charts */}
          <div className="lg:col-span-2 space-y-8 mb-8 lg:mb-0">
            {/* Bar Chart */}
            <div className="bg-gray-900 text-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Ratings per Store</h2>
              <ResponsiveContainer width="100%" height={256}>
                <BarChart data={ratingsPerStore}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                  <XAxis dataKey="name" stroke="#cbd5e1" />
                  <YAxis stroke="#cbd5e1" />
                  <Tooltip
                    contentStyle={{ backgroundColor: "#2d3748", border: "none", color: "#fff" }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Bar dataKey="ratings" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="bg-gray-900 text-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">User Roles Distribution</h2>
              <ResponsiveContainer width="100%" height={256}>
                <PieChart>
                  <Pie
                    data={userRoles}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {userRoles.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#2d3748", border: "none", color: "#fff" }}
                    labelStyle={{ color: "#fff" }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 text-gray-200 rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={24} className="text-indigo-400" />
                <h2 className="text-xl font-bold text-white">Recent Activity</h2>
              </div>
              <ul className="divide-y divide-gray-700">
                {recentActivity.map((activity) => (
                  <li key={activity.id} className="py-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">{activity.user}</p>
                        <p className="text-sm text-gray-400">{activity.store}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end">
                          <Star size={16} className="text-yellow-400 fill-yellow-400" />
                          <span className="ml-1 text-yellow-400 font-semibold">
                            {activity.rating}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">{activity.date}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsDashboardPage;
