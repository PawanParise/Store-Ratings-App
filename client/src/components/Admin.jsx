import React, { useState, useEffect } from "react";
import {
    Users,
    Store,
    Star,
    Plus,
    LogOut,
    Edit,
    Trash2,
    BarChart,
    PieChart,
} from "lucide-react";
import { UserContext } from "./Context";
import { useContext } from "react";

// 🌐 API Base URL (adjust this to your backend server)
const API_BASE = "http://localhost:5000/api/admin";

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [stores, setStores] = useState([])
    const [owners, setOwners] = useState([]); // only store owners
    const [ratings, setRatings] = useState([])

    const { allUsers, setAllUserData, allStores } = useContext(UserContext)

    // Forms
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        type: "Normal User",
    });
    const [newStore, setNewStore] = useState({
        name: "",
        address: "",
        owner_id: "",
    });

    // Load Users & Stores
    useEffect(() => {
        fetch(`http://localhost:5000/api/v1/store_app/get-users`)
            .then((res) => res.json())
            .then((data) => {
                if (data?.allUsers) {
                    setUsers(data.allUsers); // ✅ set all users
                    setAllUserData(data.allUsers)
                    setOwners(data.allUsers.filter((u) => u.type === "Store Owner")); // ✅ filter store owners
                }
            })
            .catch((err) => console.error("Error fetching users:", err));

        fetch(`http://localhost:5000/api/v1/store_app/get-stores`)
            .then((res) => res.json())
            .then((data) => {
                if (data?.allStores) {
                    setStores(data.allStores); // ✅ set all users

                }
            })
            .catch((err) => console.error("Error fetching stores:", err));

             fetch(`http://localhost:5000/api/v1/store_app/get-ratings`)
            .then((res) => res.json())
            .then((data) => {
                if (data?.ratings) {
                    setRatings(data.ratings); // ✅ set all users

                }
            })
            .catch((err) => console.error("Error fetching stores:", err));

    }, []);

    const validate = () => {
        if (!newUser.name || newUser.name.length < 3) {
            alert("Name must be at least 3 characters.");
            return false;
        }
        if (!/^\S+@\S+\.\S+$/.test(newUser.email)) {
            alert("Invalid email format.");
            return false;
        }
        if (!newUser.address || newUser.address.length > 400) {
            alert("Address max 400 chars.");
            return false;
        }
        if (
            !newUser.password ||
            newUser.password.length < 8 ||
            !/[A-Z]/.test(newUser.password) ||
            !/[!@#$%^&*(),.?":{}|<>]/.test(newUser.password)
        ) {
            alert("Password must be 8+ chars with uppercase and special char.");
            return false;
        }
        return true;
    };


    // Handle Add User
    const handleAddUser = async (e) => {
        e.preventDefault();
        if (!validate()) {
            return
        }
        try {
            const res = await fetch(`http://localhost:5000/api/v1/store_app/sign-up`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newUser),
            });
            const data = await res.json();
            if (res.ok) {
                setUsers((prev) => [...prev, data]);
                setNewUser({
                    name: "",
                    email: "",
                    password: "",
                    address: "",
                    type: "Normal User",
                });
                alert('User added Successfully')
            } else {
                alert(data.message || "Error adding user");
            }
        } catch (err) {
            console.error("Error adding user:", err);
        }
    };

    // Handle Add Store
    const handleAddStore = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:5000/api/v1/store_app/add-store`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newStore),
            });
            const data = await res.json();
            if (res.status === 201) {
                setStores((prev) => [...prev, data]);
                setNewStore({ name: "", address: "", owner_id: "" });
                alert('Store added Successfully');
            } else {
                alert(data.message || "Error adding store");
            }
        } catch (err) {
            console.error("Error adding store:", err);
        }
    };



    return (
        <div className="py-16 px-4 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900">
                        Admin Dashboard
                    </h1>
                     
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                    <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
                        <div className="p-3 bg-indigo-100 rounded-full">
                            <Users className="w-8 h-8 text-indigo-600" />
                        </div>
                        <div>
                            <p className="text-gray-500">Total Users</p>
                            <h2 className="text-3xl font-bold text-gray-900">
                                {users.length}
                            </h2>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
                        <div className="p-3 bg-green-100 rounded-full">
                            <Store className="w-8 h-8 text-green-600" />
                        </div>
                        <div>
                            <p className="text-gray-500">Total Stores</p>
                            <h2 className="text-3xl font-bold text-gray-900">
                                {stores.length}
                            </h2>
                        </div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
                        <div className="p-3 bg-yellow-100 rounded-full">
                            <Star className="w-8 h-8 text-yellow-600" />
                        </div>
                        <div>
                            <p className="text-gray-500">Total Ratings</p>
                            <h2 className="text-3xl font-bold text-gray-900">{ratings.length}</h2>
                        </div>
                    </div>
                </div>

                {/* User & Store Management */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* User Management */}
                    <div className="bg-white p-8 rounded-2xl shadow-md">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Users /> User Management
                        </h2>

                        {/* Add User Form */}
                        <form
                            onSubmit={handleAddUser}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
                        >
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                value={newUser.name}
                                onChange={(e) =>
                                    setNewUser({ ...newUser, name: e.target.value })
                                }
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={newUser.email}
                                onChange={(e) =>
                                    setNewUser({ ...newUser, email: e.target.value })
                                }
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={newUser.password}
                                onChange={(e) =>
                                    setNewUser({ ...newUser, password: e.target.value })
                                }
                                autoComplete="new-password"
                                required
                            />
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={newUser.address}
                                onChange={(e) =>
                                    setNewUser({ ...newUser, address: e.target.value })
                                }
                                required
                            />
                            <select
                                name="type"
                                value={newUser.type}
                                onChange={(e) =>
                                    setNewUser({ ...newUser, type: e.target.value })
                                }
                            >
                                <option value="Normal User">Normal User</option>
                                <option value="Store Owner">Store Owner</option>
                                <option value="System Administrator">System Administrator</option>
                            </select>
                            <button
                                type="submit"
                                className="col-span-2 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
                            >
                                <Plus size={18} /> Add User
                            </button>
                        </form>

                        {/* User Table */}

                    </div>

                    {/* Store Management */}
                    <div className="bg-white p-8 rounded-2xl shadow-md">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <Store /> Store Management
                        </h2>

                        {/* Add Store Form */}
                        <form
                            onSubmit={handleAddStore}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
                        >
                            <input
                                type="text"
                                name="name"
                                placeholder="Store Name"
                                value={newStore.name}
                                onChange={(e) =>
                                    setNewStore({ ...newStore, name: e.target.value })
                                }
                                required
                            />
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                value={newStore.address}
                                onChange={(e) =>
                                    setNewStore({ ...newStore, address: e.target.value })
                                }
                                required
                            />
                            <select
                                name="owner_id"
                                value={newStore.owner_id}
                                onChange={(e) => setNewStore({ ...newStore, owner_id: e.target.value })}
                            >
                                <option value="">Assign Store Owner</option>
                                {
                                    owners.map((u) => (
                                        <option key={u.id} value={u.id}>
                                            {u.name} ({u.email})
                                        </option>
                                    ))}
                            </select>
                            <button
                                type="submit"
                                className="col-span-2 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
                            >
                                <Plus size={18} /> Add Store
                            </button>
                        </form>

                        {/* Store Table */}

                    </div>
                </div>

                {/* Reports Section */}

                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900">Reports & Insights</h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Track system performance and user activity.
                    </p>
                </div>

                {/* Stats Overview Cards */}
                <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg border-l-4 border-red-500">
                    <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <a
                            href="/admin/users"
                            className="bg-gray-800 hover:bg-gray-700 transition-colors p-4 rounded-lg text-center"
                        >
                            <Users size={32} className="text-indigo-400 mx-auto mb-2" />
                            <p className="font-semibold">Manage Users</p>
                        </a>
                        <a
                            href="/admin/stores"
                            className="bg-gray-800 hover:bg-gray-700 transition-colors p-4 rounded-lg text-center"
                        >
                            <Store size={32} className="text-yellow-400 mx-auto mb-2" />
                            <p className="font-semibold">Manage Stores</p>
                        </a>
                        <a
                            href="/admin/reports"
                            className="bg-gray-800 hover:bg-gray-700 transition-colors p-4 rounded-lg text-center"
                        >
                            <Star size={32} className="text-green-400 mx-auto mb-2" />
                            <p className="font-semibold">System Reports</p>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
