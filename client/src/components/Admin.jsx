import React, { useState } from "react";
import {
    Users,
    Store,
    Star,
    Plus,
    Key,
    User,
    LogOut,
    Eye,
    Edit,
    Trash2,
    Search,
    ChevronDown,
    PieChart,
    BarChart,
    LineChart,
    UserPlus,
} from "lucide-react";

// Mock data to simulate fetching from a database
const mockUsers = [
    { id: 1, name: "Alice Johnson", email: "alice.j@example.com", address: "456 Oak Ave", role: "Normal User" },
    { id: 2, name: "Bob Smith", email: "bob.s@example.com", address: "789 Pine Ln", role: "Store Owner", rating: 4.5 },
    { id: 3, name: "Charlie Brown", email: "charlie.b@example.com", address: "101 Maple St", role: "Admin" },
    { id: 4, name: "Diana Prince", email: "diana.p@example.com", address: "202 Birch Blvd", role: "Normal User" },
];

const mockStores = [
    { id: 101, name: "The Book Nook", email: "books@example.com", address: "321 Main Rd", rating: 4.8 },
    { id: 102, name: "Fresh Groceries", email: "fresh@example.com", address: "654 Market St", rating: 4.2 },
    { id: 103, name: "Tech Gadgets", email: "tech@example.com", address: "987 Elm Dr", rating: 3.9 },
];

const AdminDashboard = () => {
    const [users, setUsers] = useState(mockUsers);
    const [stores, setStores] = useState(mockStores);

    // Form state for adding a new user
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        role: "Normal User",
    });

    // Form state for adding a new store
    const [newStore, setNewStore] = useState({
        name: "",
        email: "",
        address: "",
    });

    // Handle form input changes
    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleStoreChange = (e) => {
        const { name, value } = e.target;
        setNewStore((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleAddUser = (e) => {
        e.preventDefault();
        // In a real app, this would be an API call
        console.log("Adding new user:", newUser);
        setUsers((prev) => [...prev, { ...newUser, id: prev.length + 1 }]);
        setNewUser({ name: "", email: "", password: "", address: "", role: "Normal User" });
    };

    const handleAddStore = (e) => {
        e.preventDefault();
        // In a real app, this would be an API call
        console.log("Adding new store:", newStore);
        setStores((prev) => [...prev, { ...newStore, id: prev.length + 100, rating: null }]);
        setNewStore({ name: "", email: "", address: "" });
    };

    // Handle actions on tables
    const handleDeleteUser = (id) => {
        console.log("Deleting user with id:", id);
        setUsers(users.filter((user) => user.id !== id));
    };

    const handleDeleteStore = (id) => {
        console.log("Deleting store with id:", id);
        setStores(stores.filter((store) => store.id !== id));
    };

    // Mock data for charts
    const chartData = {
        userRoles: {
            labels: ["Normal Users", "Store Owners", "Admins"],
            values: [2, 1, 1], // Based on mockUsers data
            colors: ["#6366f1", "#f59e0b", "#3b82f6"],
        },
        ratingsOverTime: {
            data: [
                { month: "Jan", ratings: 50 },
                { month: "Feb", ratings: 75 },
                { month: "Mar", ratings: 60 },
                { month: "Apr", ratings: 90 },
                { month: "May", ratings: 80 },
            ],
        },
        topStores: {
            data: [
                { name: "The Book Nook", rating: 4.8 },
                { name: "Fresh Groceries", rating: 4.2 },
                { name: "Tech Gadgets", rating: 3.9 },
            ],
        },
    };

    return (
        <div className="py-16 px-4 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header and Admin Profile */}
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                        Admin Dashboard
                    </h1>
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:block text-right">
                            <p className="font-semibold text-gray-800">Welcome, Admin</p>
                            <p className="text-sm text-gray-500">admin@storerating.com</p>
                        </div>
                        <button
                            onClick={() => console.log("Logging out...")}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-xl shadow-md hover:bg-red-600 transition"
                        >
                            <LogOut size={20} /> <span className="hidden sm:inline">Logout</span>
                        </button>
                    </div>
                </div>

                {/* Dashboard Overview Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
                        <div className="p-3 bg-indigo-100 rounded-full">
                            <Users className="w-8 h-8 text-indigo-600" />
                        </div>
                        <div>
                            <p className="text-gray-500">Total Users</p>
                            <h2 className="text-3xl font-bold text-gray-900">{users.length}</h2>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
                        <div className="p-3 bg-green-100 rounded-full">
                            <Store className="w-8 h-8 text-green-600" />
                        </div>
                        <div>
                            <p className="text-gray-500">Total Stores</p>
                            <h2 className="text-3xl font-bold text-gray-900">{stores.length}</h2>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
                        <div className="p-3 bg-yellow-100 rounded-full">
                            <Star className="w-8 h-8 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-gray-500">Total Ratings</p>
                            <h2 className="text-3xl font-bold text-gray-900">300+</h2>
                        </div>
                    </div>
                </div>

                {/* User & Store Management */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* User Management Section */}
                    <div className="bg-white p-8 rounded-2xl shadow-md">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Users /> User Management
                        </h2>
                        {/* Add New User Form */}
                        <div className="mb-8 p-6 bg-gray-50 rounded-xl">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <UserPlus size={20} /> Add New User
                            </h3>
                            <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" name="name" placeholder="Full Name" value={newUser.name} onChange={handleUserChange} required className="rounded-md border-gray-300 transition" />
                                <input type="email" name="email" placeholder="Email" value={newUser.email} onChange={handleUserChange} required className="rounded-md border-gray-300 transition" />
                                <input type="password" name="password" placeholder="Password" value={newUser.password} onChange={handleUserChange} required className="rounded-md border-gray-300 transition" />
                                <input type="text" name="address" placeholder="Address" value={newUser.address} onChange={handleUserChange} required className="rounded-md border-gray-300 transition" />
                                <select name="role" value={newUser.role} onChange={handleUserChange} className="rounded-md border-gray-300 transition col-span-1 md:col-span-2">
                                    <option>Normal User</option>
                                    <option>Store Owner</option>
                                    <option>Admin</option>
                                </select>
                                <button type="submit" className="flex items-center justify-center gap-2 col-span-1 md:col-span-2 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition">
                                    <Plus size={18} /> Add User
                                </button>
                            </form>
                        </div>
                        {/* User List Table */}
                        <h3 className="text-xl font-bold text-gray-800 mb-4">User List</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white rounded-xl shadow-sm">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Name</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Email</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Role</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.id} className="border-t border-gray-200 hover:bg-gray-50 transition">
                                            <td className="px-4 py-3 text-sm text-gray-800">{user.name}</td>
                                            <td className="px-4 py-3 text-sm text-gray-800">{user.email}</td>
                                            <td className="px-4 py-3 text-sm text-gray-800">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                    user.role === "Admin" ? "bg-blue-100 text-blue-800" :
                                                    user.role === "Store Owner" ? "bg-yellow-100 text-yellow-800" :
                                                    "bg-gray-100 text-gray-800"
                                                }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-800 flex gap-2">
                                                <button className="text-gray-500 hover:text-indigo-600 transition" title="Edit">
                                                    <Edit size={18} />
                                                </button>
                                                <button onClick={() => handleDeleteUser(user.id)} className="text-gray-500 hover:text-red-600 transition" title="Delete">
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Store Management Section */}
                    <div className="bg-white p-8 rounded-2xl shadow-md">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Store /> Store Management
                        </h2>
                        {/* Add New Store Form */}
                        <div className="mb-8 p-6 bg-gray-50 rounded-xl">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <Plus size={20} /> Add New Store
                            </h3>
                            <form onSubmit={handleAddStore} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input type="text" name="name" placeholder="Store Name" value={newStore.name} onChange={handleStoreChange} required className="rounded-md border-gray-300 transition" />
                                <input type="email" name="email" placeholder="Email (Optional)" value={newStore.email} onChange={handleStoreChange} className="rounded-md border-gray-300 transition" />
                                <input type="text" name="address" placeholder="Address" value={newStore.address} onChange={handleStoreChange} required className="rounded-md border-gray-300 transition" />
                                <button type="submit" className="flex items-center justify-center gap-2 col-span-1 md:col-span-2 py-2 px-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition">
                                    <Plus size={18} /> Add Store
                                </button>
                            </form>
                        </div>
                        {/* Store List Table */}
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Store List</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white rounded-xl shadow-sm">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Store Name</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Overall Rating</th>
                                        <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stores.map((store) => (
                                        <tr key={store.id} className="border-t border-gray-200 hover:bg-gray-50 transition">
                                            <td className="px-4 py-3 text-sm text-gray-800">{store.name}</td>
                                            <td className="px-4 py-3 text-sm text-gray-800 flex items-center gap-1">
                                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                                <span>{store.rating || "N/A"}</span>
                                            </td>
                                            <td className="px-4 py-3 text-sm text-gray-800 flex gap-2">
                                                <button className="text-gray-500 hover:text-indigo-600 transition" title="Edit">
                                                    <Edit size={18} />
                                                </button>
                                                <button onClick={() => handleDeleteStore(store.id)} className="text-gray-500 hover:text-red-600 transition" title="Delete">
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Reports Section */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                        <BarChart /> Reports
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* User Distribution Chart */}
                        <div className="bg-white p-8 rounded-2xl shadow-md">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <PieChart size={20} /> Distribution of Users by Role
                            </h3>
                            <div className="flex flex-col items-center">
                                <div className="w-48 h-48 relative">
                                    <div className="absolute inset-0 rounded-full border-[1.5rem] border-indigo-600" style={{ clipPath: "polygon(50% 0%, 50% 50%, 100% 0%, 100% 50%, 100% 100%, 50% 100%)" }}></div>
                                    <div className="absolute inset-0 rounded-full border-[1.5rem] border-yellow-500" style={{ clipPath: "polygon(0% 0%, 50% 0%, 50% 50%, 0% 50%, 0% 100%, 50% 100%, 50% 50%)" }}></div>
                                    <div className="absolute inset-0 rounded-full border-[1.5rem] border-blue-500" style={{ clipPath: "polygon(0% 0%, 50% 0%, 50% 50%)" }}></div>
                                </div>
                                <div className="mt-6 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-indigo-600"></span>
                                        <span className="text-gray-600">Normal Users (50%)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                                        <span className="text-gray-600">Store Owners (25%)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                                        <span className="text-gray-600">Admins (25%)</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Top Rated Stores Chart */}
                        <div className="bg-white p-8 rounded-2xl shadow-md">
                            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                                <Star size={20} /> Top Rated Stores
                            </h3>
                            <div className="h-64 flex flex-col justify-end gap-2 p-4">
                                {chartData.topStores.data.map((store, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <span className="w-32 text-sm font-medium text-gray-800">{store.name}</span>
                                        <div className="bg-green-400 h-8 rounded-full" style={{ width: `${(store.rating / 5) * 100}%` }}></div>
                                        <span className="text-sm font-bold text-gray-800">{store.rating}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
