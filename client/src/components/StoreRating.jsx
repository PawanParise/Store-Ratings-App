import React, { useEffect, useState, useContext, useMemo } from 'react';
import { Star } from 'lucide-react';
import axios from 'axios';
import { UserContext } from './Context';

const StoreRatingsPage = () => {
    const { user, allStores, allUsers } = useContext(UserContext);
    const [ratingsData, setRatingsData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Memoize userStores so the array doesn't change on each render
    const userStores = useMemo(
        () => allStores.filter(store => store.owner_id === user.id),
        [allStores, user.id]
    );

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const stars = [];
        for (let i = 0; i < fullStars; i++)
            stars.push(<Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />);
        for (let i = fullStars; i < 5; i++)
            stars.push(<Star key={i + fullStars} size={16} className="text-gray-600" />);
        return <div className="flex items-center">{stars}</div>;
    };

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5000/api/v1/store_app/get-ratings');
                const allRatings = response.data.ratings || [];
                const filteredRatings = allRatings.filter(r => userStores.some(s => s.id === r.store_id));
                setRatingsData(filteredRatings);
            } catch (err) {
                console.error("Failed to fetch ratings:", err);
            } finally {
                setLoading(false);
            }
        };

        if (userStores.length > 0) fetchRatings();
    }, [userStores]);

    if (loading) return <p className="text-center text-gray-500 mt-8">Loading ratings...</p>;

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900">Users' Ratings</h1>
                    <p className="mt-2 text-lg text-gray-600">
                        See what customers think about each of your stores.
                    </p>
                </div>

                {userStores.length === 0 ? (
                    <p className="text-center text-gray-500">You don’t own any stores yet.</p>
                ) : (
                    userStores.map(store => {
                        const storeRatings = ratingsData.filter(r => r.store_id === store.id);
                        const total = storeRatings.length;
                        const average = total > 0
                            ? (storeRatings.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1)
                            : 0;

                        return (
                            <div key={store.id} className="mb-12">
                                <div className="bg-gray-900 text-white rounded-2xl shadow-lg p-6 mb-4 flex flex-col sm:flex-row justify-between items-center">
                                    <div>
                                        <h2 className="text-2xl font-bold">{store.name}</h2>
                                        <p className="text-gray-400 flex items-center gap-2">
                                            Average Rating: {average} {renderStars(average)}
                                        </p>
                                        <p className="text-gray-400">Total Ratings: {total}</p>
                                    </div>
                                </div>

                                {storeRatings.length > 0 ? (
                                    <div className="bg-gray-900 text-gray-200 rounded-xl overflow-hidden shadow-lg">
                                        {/* Desktop Table */}
                                        <div className="hidden md:table w-full">
                                            <div className="md:table-header-group">
                                                <div className="md:table-row bg-gray-800 text-sm font-semibold text-white">
                                                    <div className="md:table-cell p-4">User Name</div>
                                                    <div className="md:table-cell p-4">Rating</div>
                                                    <div className="md:table-cell p-4">Date</div>
                                                </div>
                                            </div>
                                            <div className="md:table-row-group">
                                                {storeRatings.map(rating => (
                                                    <div key={rating.id} className="md:table-row border-b border-gray-800 hover:bg-gray-800 transition-colors">
                                                        <div className="md:table-cell p-4">
                                                            {allUsers.find(u => u.id === rating.user_id)?.name || "Unknown User"}
                                                        </div>
                                                        <div className="md:table-cell p-4">{renderStars(rating.rating)}</div>
                                                        <div className="md:table-cell p-4">{new Date(rating.created_at).toLocaleDateString()}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Mobile Cards */}
                                        <div className="md:hidden p-4">
                                            {storeRatings.map(rating => (
                                                <div key={rating.id} className="bg-gray-800 rounded-lg p-4 mb-4">
                                                    <h3 className="text-lg font-bold text-white">
                                                        {allUsers.find(u => u.id === rating.user_id)?.name || "Unknown User"}
                                                    </h3>
                                                    <div className="mt-2 flex items-center">
                                                        <span className="text-sm font-semibold text-gray-300">Rating:</span>
                                                        <div className="ml-2">{renderStars(rating.rating)}</div>
                                                    </div>
                                                    <p className="text-xs text-gray-400 mt-2">
                                                        Submitted on: {new Date(rating.created_at).toLocaleDateString()}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-gray-500 mt-2">No ratings yet for this store.</p>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default StoreRatingsPage;
