import React, { useState, useContext, useEffect } from 'react';
import { User, Star, Mail, MapPin, Lock, Key } from 'lucide-react';
import axios from 'axios';
import { UserContext } from "./Context.jsx";

const NormalUserProfilePage = () => {
    const [isPasswordChange, setIsPasswordChange] = useState(false);
    const [passwordData, setPasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [userData, setUserData] = useState(null);
    const [recentRatings, setRecentRatings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState(null);

    const { user, resetUserData } = useContext(UserContext);

    // Function to show a temporary message
    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(null), 3000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prevState => ({ ...prevState, [name]: value }));
    };

    const fetchUserProfile = async () => {
        if (!user || !user.id) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                showMessage("Authentication token not found.");
                return;
            }

            const  response = await
                axios.get(`http://localhost:5000/api/v1/store_app/user-ratings`, {
                    headers: { Authorization: `Bearer ${token}` }

                });


            setUserData(user);

            const sortedRatings = response.data
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .slice(0, 3);
            setRecentRatings(sortedRatings);

        } catch (err) {
            console.error(err);
            showMessage("Failed to fetch user data. Please try again.");
            setUserData(null);
            setRecentRatings([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, [user]);

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            showMessage("New password and confirm password do not match.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                showMessage("Authentication token not found.");
                return;
            }

            const res = await axios.put(`http://localhost:5000/api/v1/store_app/change-password/${user.id}`, {
                oldPassword: passwordData.oldPassword,
                newPassword: passwordData.newPassword
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.data.success) {
                showMessage("Password updated successfully!");
                setPasswordData({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
                setIsPasswordChange(false);
            } else {
                showMessage(res.data.message || "Failed to update password.");
            }
        } catch (err) {
            console.error(err);
            showMessage(err.response.data.message);
             
        }
    };

    const handleLogout = () => {
        resetUserData();
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

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

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-lg text-gray-500">Loading user profile...</p>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-lg text-red-500">Failed to load profile data.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {message && (
                    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white p-4 rounded-lg shadow-xl z-50 transition-opacity duration-300">
                        {message}
                    </div>
                )}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900">Welcome, {userData.name || 'User'} 🎉</h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Manage your profile and see your activity on StoreRating.
                    </p>
                </div>

                <div className=" relative lg:grid lg:grid-cols-3 lg:gap-8">
                    <div className="lg:col-span-1 mb-8 lg:mb-0">
                        <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg">
                            <div className="flex items-center mb-4">
                                <User size={40} className="text-indigo-400" />
                                <div className="ml-4">
                                    <h2 className="text-2xl font-bold">{userData.name || 'N/A'}</h2>
                                    <span className="text-indigo-400 font-semibold text-sm">
                                        {userData.type || 'N/A'}
                                    </span>
                                </div>
                            </div>
                            <div className="space-y-3 text-gray-300">
                                <div className="flex items-center gap-2">
                                    <Mail size={20} className="text-gray-500" />
                                    <span>{userData.email || 'N/A'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={20} className="text-gray-500" />
                                    <span>{userData.address || 'N/A'}</span>
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

                    <div className="lg:col-span-2">
                        <div className="space-y-8">
                            <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg">
                                <h2 className="text-2xl font-bold mb-4">Your Activity</h2>
                                <div className="bg-gray-800 p-4 rounded-xl flex flex-col items-center sm:items-start text-center sm:text-left">
                                    <span className="text-gray-400 text-sm">Total Ratings Submitted</span>
                                    <p className="text-3xl font-bold mt-1">{recentRatings.length || 0}</p>
                                </div>

                                <div className="mt-8">
                                    <h3 className="text-lg font-semibold mb-2">Recent Ratings</h3>
                                    {recentRatings.length > 0 ? (
                                        <ul className="space-y-2">
                                            {recentRatings.map((rating) => (
                                                <li key={rating.id} className="bg-gray-800 p-3 rounded-lg flex justify-between items-center">
                                                    <div className="flex items-center">
                                                        <span className="text-sm font-medium">{rating.store_name}</span>
                                                        <div className="ml-3">
                                                            {renderStars(rating.rating)}
                                                        </div>
                                                    </div>
                                                    <span className="text-xs text-gray-500">{new Date(rating.updated_at).toLocaleDateString()}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-400">You have not submitted any recent ratings.</p>
                                    )}
                                    <a href="/my-ratings" className="mt-4 inline-block text-indigo-400 hover:text-indigo-500 font-medium transition-colors">
                                        View All My Ratings →
                                    </a>
                                </div>
                            </div>

                            {isPasswordChange && (
                                <div className="absolute inset-0 bg-gray-900 text-white p-6 rounded-2xl shadow-lg z-20">
                                    <div className="text-2xl font-bold mb-4 flex justify-between">
                                        <h2>Update Password</h2> <h2 onClick={()=>setIsPasswordChange(false)}>X</h2></div>
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
