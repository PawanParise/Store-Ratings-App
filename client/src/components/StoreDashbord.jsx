import React from 'react';
import { Store, Star, Users, Briefcase, Mail, MapPin } from 'lucide-react';

const mockStoreData = {
    name: "The Book Nook",
    address: "123 Reading Rd, Booksville",
    email: "contact@booknook.com",
    ownerName: "Jane Doe",
    averageRating: 4.3,
    totalRatings: 154,
    ratingDistribution: [
        { stars: 5, count: 80 },
        { stars: 4, count: 45 },
        { stars: 3, count: 19 },
        { stars: 2, count: 7 },
        { stars: 1, count: 3 },
    ],
};

const MyStorePage = () => {
    const { name, address, email, ownerName, averageRating, totalRatings, ratingDistribution } = mockStoreData;

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900">My Store Dashboard</h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Manage your store profile and track performance.
                    </p>
                </div>

                {/* Main Content: Two-column layout */}
                <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                    {/* Left Column: Store Information Card */}
                    <div className="lg:col-span-2 mb-8 lg:mb-0">
                        <div className="bg-gray-900 text-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center mb-4">
                                <Store size={32} className="text-yellow-400" />
                                <h2 className="ml-4 text-2xl font-bold">{name}</h2>
                            </div>
                            <div className="space-y-4 text-gray-300">
                                <div className="flex items-center gap-2">
                                    <MapPin size={20} className="text-gray-500" />
                                    <span>{address}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail size={20} className="text-gray-500" />
                                    <span>{email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Briefcase size={20} className="text-gray-500" />
                                    <span>Store Owner: {ownerName}</span>
                                </div>
                            </div>
                            <div className="mt-8">
                                <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white font-medium transition-colors">
                                    Edit Store Info
                                </button>
                                <a
                                    href="/store-ratings"
                                    className="ml-4 text-indigo-400 hover:text-indigo-500 font-medium transition-colors"
                                >
                                    View User Ratings →
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Store Performance Stats */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-900 text-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-2xl font-bold mb-4">Performance</h2>
                            <div className="flex items-center mb-4">
                                <Star size={24} className="text-yellow-400 fill-yellow-400" />
                                <span className="ml-2 text-3xl font-bold text-yellow-400">{averageRating}/5</span>
                            </div>
                            <div className="flex items-center text-gray-300">
                                <Users size={24} className="text-gray-500" />
                                <span className="ml-2 text-xl font-semibold">
                                    {totalRatings} <span className="text-gray-500">Total Ratings</span>
                                </span>
                            </div>

                            {/* Rating Distribution Chart */}
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-2">Rating Distribution</h3>
                                {ratingDistribution.map((dist) => (
                                    <div key={dist.stars} className="flex items-center mb-2">
                                        <div className="w-10 flex-shrink-0 text-right pr-2 text-gray-400">
                                            {dist.stars} <Star size={16} className="inline text-yellow-400 fill-yellow-400" />
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                                            <div
                                                className="bg-indigo-600 h-2.5 rounded-full"
                                                style={{ width: `${(dist.count / totalRatings) * 100}%` }}
                                            ></div>
                                        </div>
                                        <span className="ml-2 text-sm text-gray-400">{dist.count}</span>
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

export default MyStorePage;
