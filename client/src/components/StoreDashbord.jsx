import React, { useContext, useEffect, useState } from 'react';
import { Store, Star, Users, Briefcase, Mail, MapPin } from 'lucide-react';
import { UserContext } from './Context';
import axios from 'axios';

const MyStorePage = () => {
    const { user, allStores } = useContext(UserContext);
    const [storeRatings, setStoreRatings] = useState({}); // { storeId: { average, total, distribution } }

    const userStores = allStores.filter(store => store.owner_id === user.id);

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                // ✅ Correct URL
                const response = await axios.get('http://localhost:5000/api/v1/store_app/get-ratings');
                
                // Depending on your API response, adjust this
                // If your API returns array directly:
                const ratings = response.data.ratings; // ratings = [{id, rating, store_id, ...}, ...]

                // If API wraps it: const ratings = response.data.ratings;

                const ratingsMap = {};
                console.log(ratings,userStores)

                userStores.forEach(store => {
                    const storeRatingsList = ratings.filter(r => r.store_id === store.id);
                    const total = storeRatingsList.length;
                    const average = total > 0 
                        ? (storeRatingsList.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1)
                        : 0;

                    // Rating distribution
                    const distribution = [1, 2, 3, 4, 5].map(star => ({
                        stars: star,
                        count: storeRatingsList.filter(r => r.rating === star).length
                    }));

                    ratingsMap[store.id] = { average, total, distribution };
                });

                setStoreRatings(ratingsMap);

            } catch (err) {
                console.error("Failed to fetch ratings:", err);
            }
        };

        fetchRatings();
    }, [ ]);

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900">My Store Dashboard</h1>
                    <p className="mt-2 text-lg text-gray-600">Manage your store profile and track performance.</p>
                </div>

                {/* Main Content */}
                <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                    {userStores.length === 0 && (
                        <p className="col-span-3 text-center text-gray-500">You don’t own any stores yet.</p>
                    )}

                    {userStores.map(store => {
                        const ratingData = storeRatings[store.id] || { average: 0, total: 0, distribution: [] };

                        return (
                            <React.Fragment key={store.id}>
                                {/* Left Column: Store Info */}
                                <div className="lg:col-span-2 mb-8 lg:mb-0">
                                    <div className="bg-gray-900 text-white rounded-2xl shadow-lg p-6">
                                        <div className="flex items-center mb-4">
                                            <Store size={32} className="text-yellow-400" />
                                            <h2 className="ml-4 text-2xl font-bold">{store.name}</h2>
                                        </div>
                                        <div className="space-y-4 text-gray-300">
                                            <div className="flex items-center gap-2">
                                                <MapPin size={20} className="text-gray-500" />
                                                <span>{store.address}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Mail size={20} className="text-gray-500" />
                                                <span>{user.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Briefcase size={20} className="text-gray-500" />
                                                <span>Store Owner: {user.name}</span>
                                            </div>
                                        </div>
                                        <div className="mt-8">
                                             
                                            <a
                                                href="/store-ratings"
                                                className="ml-4 text-indigo-400 hover:text-indigo-500 font-medium transition-colors"
                                            >
                                                View User Ratings →
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Performance */}
                                <div className="lg:col-span-1">
                                    <div className="bg-gray-900 text-white rounded-2xl shadow-lg p-6">
                                        <h2 className="text-2xl font-bold mb-4">Performance</h2>
                                        <div className="flex items-center mb-4">
                                            <Star size={24} className="text-yellow-400 fill-yellow-400" />
                                            <span className="ml-2 text-3xl font-bold text-yellow-400">
                                                {ratingData.average}/5
                                            </span>
                                        </div>
                                        <div className="flex items-center text-gray-300">
                                            <Users size={24} className="text-gray-500" />
                                            <span className="ml-2 text-xl font-semibold">
                                                {ratingData.total} <span className="text-gray-500">Total Ratings</span>
                                            </span>
                                        </div>

                                        {/* Rating distribution chart */}
                                        {ratingData.total > 0 && (
                                            <div className="mt-6">
                                                <h3 className="text-lg font-semibold mb-2">Rating Distribution</h3>
                                                {ratingData.distribution.map(dist => (
                                                    <div key={dist.stars} className="flex items-center mb-2">
                                                        <div className="w-10 flex-shrink-0 text-right pr-2 text-gray-400">
                                                            {dist.stars} <Star size={16} className="inline text-yellow-400 fill-yellow-400" />
                                                        </div>
                                                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                                                            <div
                                                                className="bg-indigo-600 h-2.5 rounded-full"
                                                                style={{ width: `${(dist.count / ratingData.total) * 100}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="ml-2 text-sm text-gray-400">{dist.count}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default MyStorePage;
