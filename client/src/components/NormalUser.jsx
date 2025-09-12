import React, { useState } from 'react';
import { User, Star, Mail, MapPin, Lock, Key } from 'lucide-react';

const mockUserData = {
    name: "John Smith",
    email: "john.smith@example.com",
    address: "123 Maple Street, Pune, India",
    role: "Normal User",
    totalRatingsSubmitted: 12,
    recentRatings: [
        { id: 1, storeName: "Gourmet Grocers", rating: 5, date: "2023-10-25" },
        { id: 2, storeName: "Tech Gadgets", rating: 3, date: "2023-10-24" },
        { id: 3, storeName: "Artisan Coffee", rating: 5, date: "2023-10-23" },
    ],
};

// Helper to render star icons
const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
        stars.push(<Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />);
    }
    const remainingStars = 5 - fullStars;
    for (let i = 0; i < remainingStars; i++) {
        stars.push(<Star key={i + fullStars} size={16} className="text-gray-600" />);
    }
    return <div className="flex items-center">{stars}</div>;
};

const NormalUserProfilePage = () => {
    const [isPasswordChange, setIsPasswordChange] = useState(false);
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prevState => ({ ...prevState, [name]: value }));
    };

    const handlePasswordUpdate = (e) => {
        e.preventDefault();
        // In a real app, this would call an API to update the password
        alert('Password update initiated. Check the console for mock data.');
        console.log('Password change request:', passwordData);
        setPasswordData({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
        setIsPasswordChange(false);
    };

    const handleLogout = () => {
        // In a real app, this would handle the user logout process
        alert('Logging out...');
        window.location.href = '/login';
    };

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900">Welcome, {mockUserData.name} 🎉</h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Manage your profile and see your activity on StoreRating.
                    </p>
                </div>

                {/* Main Content: Two-column layout */}
                <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                    {/* Left Panel: User Info */}
                    <div className="lg:col-span-1 mb-8 lg:mb-0">
                        <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg">
                            <div className="flex items-center mb-4">
                                <User size={40} className="text-indigo-400" />
                                <div className="ml-4">
                                    <h2 className="text-2xl font-bold">{mockUserData.name}</h2>
                                    <span className="text-indigo-400 font-semibold text-sm">
                                        {mockUserData.role}
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-3 text-gray-300">
                                <div className="flex items-center gap-2">
                                    <Mail size={20} className="text-gray-500" />
                                    <span>{mockUserData.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={20} className="text-gray-500" />
                                    <span>{mockUserData.address}</span>
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

                    {/* Right Panel: Activity Summary & Stats */}
                    <div className="lg:col-span-2">
                        <div className="space-y-8">
                            {/* User Activity Summary */}
                            <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg">
                                <h2 className="text-2xl font-bold mb-4">Your Activity</h2>
                                <div className="bg-gray-800 p-4 rounded-xl flex flex-col items-center sm:items-start text-center sm:text-left">
                                    <span className="text-gray-400 text-sm">Total Ratings Submitted</span>
                                    <p className="text-3xl font-bold mt-1">{mockUserData.totalRatingsSubmitted}</p>
                                </div>

                                {/* Recent Ratings Snapshot */}
                                <div className="mt-8">
                                    <h3 className="text-lg font-semibold mb-2">Recent Ratings</h3>
                                    <ul className="space-y-2">
                                        {mockUserData.recentRatings.map((rating) => (
                                            <li key={rating.id} className="bg-gray-800 p-3 rounded-lg flex justify-between items-center">
                                                <div className="flex items-center">
                                                    <span className="text-sm font-medium">{rating.storeName}</span>
                                                    <div className="ml-3">
                                                        {renderStars(rating.rating)}
                                                    </div>
                                                </div>
                                                <span className="text-xs text-gray-500">{rating.date}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <a href="/my-ratings" className="mt-4 inline-block text-indigo-400 hover:text-indigo-500 font-medium transition-colors">
                                        View All My Ratings →
                                    </a>
                                </div>
                            </div>

                            {/* Password Change Form */}
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NormalUserProfilePage;
