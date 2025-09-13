import React, { useEffect, useState, useContext } from 'react';
import { User, Store, Star, Mail, MapPin, Briefcase, Lock, Key } from 'lucide-react';
import { UserContext } from "./Context.jsx";
import axios from 'axios';

const OwnerProfilePage = () => {
    const [isPasswordChange, setIsPasswordChange] = useState(false);
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const { user, allStores } = useContext(UserContext);

    const [storeData, setStoreData] = useState(null); // Store performance summary
    const [lastRatings, setLastRatings] = useState([]); // Last 5 ratings

    const userStores = allStores.filter(store => store.owner_id === user.id);
    const userStoreIds = userStores.map(store => store.id);

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
        alert('Logging out...');
        window.location.href = '/login';
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const stars = [];
        for (let i = 0; i < fullStars; i++) stars.push(<Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />);
        for (let i = fullStars; i < 5; i++) stars.push(<Star key={i + fullStars} size={16} className="text-gray-600" />);
        return <div className="flex items-center">{stars}</div>;
    };

    useEffect(() => {
        const fetchStoreRatings = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/v1/store_app/get-ratings');
                const allRatings = res.data.ratings || [];

                const storeRatings = allRatings.filter(r => userStoreIds.includes(r.store_id));
                const totalRatings = storeRatings.length;
                const averageRating = totalRatings > 0
                    ? (storeRatings.reduce((sum, r) => sum + r.rating, 0) / totalRatings).toFixed(1)
                    : 0;

                const last5 = [...storeRatings]
                    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                    .slice(0, 5);

                setStoreData({ averageRating, totalRatings });
                setLastRatings(last5);
            } catch (err) {
                console.error("Failed to fetch ratings:", err);
            }
        };

        if (userStoreIds.length > 0) fetchStoreRatings();
    }, [userStoreIds]);

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900">Welcome back, {user.name} 👋</h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Here's your profile and store performance details.
                    </p>
                </div>

                <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                    {/* Left Panel */}
                    <div className="lg:col-span-1 mb-8 lg:mb-0 space-y-6">
                        <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg">
                            <div className="flex items-center mb-4">
                                <User size={40} className="text-indigo-400" />
                                <div className="ml-4">
                                    <h2 className="text-2xl font-bold">{user.name}</h2>
                                    <span className="text-indigo-400 font-semibold text-sm">
                                        <Briefcase size={16} className="inline mr-1" />
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
                            </div>
                            <div className="mt-8 flex flex-col gap-4">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 text-red-400 hover:text-red-500 font-medium transition-colors"
                                >
                                    <Key size={16} />
                                    Logout
                                </button>
                                <button
                                    onClick={() => setIsPasswordChange(!isPasswordChange)}
                                    className="flex items-center gap-2 text-indigo-400 hover:text-indigo-500 font-medium transition-colors"
                                >
                                    <Lock size={16} />
                                    Update Password
                                </button>
                            </div>
                        </div>

                        {/* Password Form */}
                        {isPasswordChange && (
                            <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg">
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

                    {/* Right Panel */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Store Details */}
                        <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg">
                            <div className="flex items-center mb-4">
                                <Store size={32} className="text-yellow-400" />
                                <h2 className="ml-4 text-2xl font-bold">Your Stores ({userStores.length})</h2>
                            </div>
                            <ul className="space-y-2 text-gray-300">
                                {userStores.map((store) => (
                                    <li key={store.id}>
                                        <span className="font-semibold">{store.name}</span> - {store.address}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Store Performance */}
                        {storeData && (
                            <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg">
                                <h2 className="text-2xl font-bold mb-4">Performance Summary</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center sm:text-left">
                                    <div className="bg-gray-800 p-4 rounded-xl flex flex-col items-center sm:items-start">
                                        <span className="text-gray-400 text-sm">Average Rating</span>
                                        <div className="flex items-center mt-1">
                                            <span className="text-3xl font-bold text-yellow-400 mr-2">{storeData.averageRating}</span>
                                            {renderStars(storeData.averageRating)}
                                        </div>
                                    </div>
                                    <div className="bg-gray-800 p-4 rounded-xl flex flex-col items-center sm:items-start">
                                        <span className="text-gray-400 text-sm">Total Ratings</span>
                                        <p className="text-3xl font-bold mt-1">{storeData.totalRatings}</p>
                                    </div>
                                </div>

                                {/* Last Ratings */}
                                <div className="mt-8">
                                    <h3 className="text-lg font-semibold mb-2">Last 5 Ratings</h3>
                                    <ul className="space-y-2">
                                        {lastRatings.map((rating) => {
                                            const store = userStores.find(s => s.id === rating.store_id);
                                            return (
                                                <li key={rating.id} className="bg-gray-800 p-3 rounded-lg flex justify-between items-center">
                                                    <div className="flex items-center">
                                                        <span className="text-sm font-medium">{store?.name || "Store"}</span>
                                                        <div className="ml-3">{renderStars(rating.rating)}</div>
                                                    </div>
                                                    <span className="text-xs text-gray-500">{new Date(rating.created_at).toLocaleDateString()}</span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    <a href="/store-ratings" className="mt-4 inline-block text-indigo-400 hover:text-indigo-500 font-medium transition-colors">
                                        View All Ratings →
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OwnerProfilePage;
