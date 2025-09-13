import React from 'react';
import { Users, Store, Star, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { UserContext } from "./Context.jsx";
import { useContext } from 'react';
// Mock data for the dashboard


const ReportsDashboardPage = () => {
    const { user, allUsers, resetUserData, allStores } = useContext(UserContext);
    const mockStats = {
        totalUsers: allUsers.length,
        totalStores: allStores.length,
        totalRatings: 5432,
    };

    const mockRecentActivity = [
        { id: 1, user: "Alice C.", store: "Artisan Coffee", rating: 5, date: "2 hours ago" },
        { id: 2, user: "Bob F.", store: "Gourmet Grocers", rating: 4, date: "1 day ago" },
        { id: 3, user: "Charlie D.", store: "Tech Gadgets", rating: 3, date: "2 days ago" },
        { id: 4, user: "David E.", store: "Artisan Coffee", rating: 5, date: "3 days ago" },
        { id: 5, user: "Eve A.", store: "Gourmet Grocers", rating: 5, date: "4 days ago" },
    ];

    const mockChartData = {
        ratingsPerStore: [
            { name: 'Gourmet Grocers', ratings: 250 },
            { name: 'Tech Gadgets', ratings: 180 },
            { name: 'Artisan Coffee', ratings: 320 },
            { name: 'Fashion Hub', ratings: 150 },
            { name: 'Book Nook', ratings: 210 },
        ],
        userRoles: [
            { name: 'Normal Users', value:  allUsers.filter(data=>data.type=='Normal User').length },
            { name: 'Store Owners', value: allUsers.filter(data=>data.type=='Store Owner').length},
            { name: 'Admins', value: allUsers.filter(data=>data.type=='System Administrator').length },
        ],
    };

    const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];
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

                {/* Stats Overview Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {/* Total Users Card */}
                    <div className="bg-gray-900 text-white p-6 rounded-xl shadow-md flex flex-col items-center">
                        <Users size={48} className="text-indigo-400 mb-2" />
                        <span className="text-gray-400 text-sm">Total Users</span>
                        <p className="text-3xl font-bold text-indigo-400 mt-1">{mockStats.totalUsers}</p>
                    </div>

                    {/* Total Stores Card */}
                    <div className="bg-gray-900 text-white p-6 rounded-xl shadow-md flex flex-col items-center">
                        <Store size={48} className="text-yellow-400 mb-2" />
                        <span className="text-gray-400 text-sm">Total Stores</span>
                        <p className="text-3xl font-bold text-yellow-400 mt-1">{mockStats.totalStores}</p>
                    </div>

                    {/* Total Ratings Card */}
                    <div className="bg-gray-900 text-white p-6 rounded-xl shadow-md flex flex-col items-center">
                        <Star size={48} className="text-green-400 mb-2" />
                        <span className="text-gray-400 text-sm">Total Ratings Submitted</span>
                        <p className="text-3xl font-bold text-green-400 mt-1">{mockStats.totalRatings}</p>
                    </div>
                </div>

                {/* Charts and Recent Activity */}
                <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                    {/* Charts Section */}
                    <div className="lg:col-span-2 space-y-8 mb-8 lg:mb-0">
                        {/* Bar Chart - Ratings per Store */}
                        <div className="bg-gray-900 text-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-bold mb-4">Ratings per Store</h2>
                            <ResponsiveContainer width="100%" height={256}>
                                <BarChart
                                    data={mockChartData.ratingsPerStore}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                                    <XAxis dataKey="name" stroke="#cbd5e1" />
                                    <YAxis stroke="#cbd5e1" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#2d3748', border: 'none', color: '#fff' }}
                                        labelStyle={{ color: '#fff' }}
                                    />
                                    <Bar dataKey="ratings" fill="#82ca9d" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Pie Chart - User Roles Distribution */}
                        <div className="bg-gray-900 text-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-bold mb-4">User Roles Distribution</h2>
                            <ResponsiveContainer width="100%" height={256}>
                                <PieChart>
                                    <Pie
                                        data={mockChartData.userRoles}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        label
                                    >
                                        {mockChartData.userRoles.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#2d3748', border: 'none', color: '#fff' }}
                                        labelStyle={{ color: '#fff' }}
                                    />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Recent Activity Section */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-900 text-gray-200 rounded-xl shadow-lg p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Clock size={24} className="text-indigo-400" />
                                <h2 className="text-xl font-bold text-white">Recent Activity</h2>
                            </div>
                            <ul className="divide-y divide-gray-700">
                                {mockRecentActivity.map(activity => (
                                    <li key={activity.id} className="py-3">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-semibold text-white">{activity.user}</p>
                                                <p className="text-sm text-gray-400">{activity.store}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="flex items-center justify-end">
                                                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                                    <span className="ml-1 text-yellow-400 font-semibold">{activity.rating}</span>
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
