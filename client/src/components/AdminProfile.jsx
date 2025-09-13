import React, { useContext, useState, useEffect } from 'react';
import { User, Shield, Users, Store, Star, Key, Lock, Mail, MapPin, Briefcase } from 'lucide-react';
import { UserContext } from "./Context.jsx";

const AdminProfilePage = () => {
    const [isPasswordChange, setIsPasswordChange] = useState(false);
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [totalStores, setTotalStores] = useState(0);
    const [loadingStores, setLoadingStores] = useState(true);

    const { user, allUsers, resetUserData,  allStores } = useContext(UserContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prevState => ({ ...prevState, [name]: value }));
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            alert("New password and confirm password do not match.");
            return;
        }

        try {
            const res = await fetch(`http://localhost:5000/api/v1/store_app/change-password/${user.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    oldPassword: passwordData.oldPassword,
                    newPassword: passwordData.newPassword
                })
            });
            const data = await res.json();
            if (data.success) {
                alert("Password updated successfully!");
                setPasswordData({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
                setIsPasswordChange(false);
            } else {
                alert(data.message || "Failed to update password.");
            }
        } catch (err) {
            console.error(err);
            alert("Error updating password.");
        }
    };

    const handleLogout = () => {
        resetUserData();
        window.location.href = '/login';
    };

    // Fetch total stores from API
    useEffect(() => {
        const fetchStores = async () => {
            try {
                setLoadingStores(true);
                const res = await fetch('http://localhost:5000/api/v1/stores');
                const data = await res.json();
                if (data.success && Array.isArray(data.stores)) {
                    setTotalStores(data.stores.length);
                }
            } catch (err) {
                console.error(err);
                setTotalStores(0);
            } finally {
                setLoadingStores(false);
            }
        };
        fetchStores();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900">
                        Hello Admin, {user.name} 👑
                    </h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Manage users, stores, and monitor the system.
                    </p>
                </div>

                {/* Main Content: Two-column layout */}
                <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                    {/* Left Panel: Admin Info */}
                    <div className="lg:col-span-1 mb-8 lg:mb-0">
                        <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg border-l-4 border-red-500">
                            <div className="flex items-center mb-4">
                                <Shield size={40} className="text-red-500" />
                                <div className="ml-4">
                                    <h2 className="text-2xl font-bold">{user.name}</h2>
                                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                                        {user.type}
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-3 text-gray-300">
                                <div className="flex items-center gap-2">
                                    <Mail size={20} className="text-gray-500" />
                                    <span>{user.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={20} className="text-gray-500" />
                                    <span>{user.address}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Briefcase size={20} className="text-gray-500" />
                                    <span>Permissions: Full system access</span>
                                </div>
                            </div>
                            <div className="mt-8">
                                <button
                                    onClick={() => setIsPasswordChange(!isPasswordChange)}
                                    className="flex items-center gap-2 text-indigo-400 hover:text-indigo-500 font-medium transition-colors"
                                >
                                    <Lock size={16} />
                                    Update Password
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 text-red-400 hover:text-red-500 font-medium transition-colors mt-4"
                                >
                                    <Key size={16} />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Admin Dashboard & Security */}
                    <div className="lg:col-span-2">
                        <div className="space-y-8">
                            {/* Admin Dashboard Quick Links */}
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

                            {/* System Overview */}
                            <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg border-l-4 border-red-500">
                                <h2 className="text-2xl font-bold mb-4">System Overview</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                                    <div className="bg-gray-800 p-4 rounded-xl">
                                        <span className="text-gray-400 text-sm">Total Users</span>
                                        <p className="text-3xl font-bold mt-1 text-indigo-400">{allUsers.length}</p>
                                    </div>
                                    <div className="bg-gray-800 p-4 rounded-xl">
                                        <span className="text-gray-400 text-sm">Total Stores</span>
                                        <p className="text-3xl font-bold mt-1 text-yellow-400">
                                            {allStores.length}
                                        </p>
                                    </div>
                                    <div className="bg-gray-800 p-4 rounded-xl">
                                        <span className="text-gray-400 text-sm">Total Ratings</span>
                                        <p className="text-3xl font-bold mt-1 text-green-400">5432</p>
                                    </div>
                                </div>
                            </div>

                            {/* Password Change Form */}
                            {isPasswordChange && (
                                <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg border-l-4 border-red-500">
                                    <h2 className="text-2xl font-bold mb-4">Update Password</h2>
                                    <form onSubmit={handlePasswordUpdate} className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400" htmlFor="oldPassword">Old Password</label>
                                            <input
                                                type="password"
                                                id="oldPassword"
                                                name="oldPassword"
                                                value={passwordData.oldPassword}
                                                onChange={handleChange}
                                                className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white p-2"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400" htmlFor="newPassword">New Password</label>
                                            <input
                                                type="password"
                                                id="newPassword"
                                                name="newPassword"
                                                value={passwordData.newPassword}
                                                onChange={handleChange}
                                                className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white p-2"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-400" htmlFor="confirmNewPassword">Confirm New Password</label>
                                            <input
                                                type="password"
                                                id="confirmNewPassword"
                                                name="confirmNewPassword"
                                                value={passwordData.confirmNewPassword}
                                                onChange={handleChange}
                                                className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white p-2"
                                                required
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white font-medium transition-colors"
                                        >
                                            Update Password
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminProfilePage;
