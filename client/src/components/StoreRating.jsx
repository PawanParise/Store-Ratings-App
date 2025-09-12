import React from 'react';
import { Star } from 'lucide-react';

const mockStoreRatings = {
    averageRating: 4.3,
    totalRatings: 154,
    ratings: [
        {
            id: 1,
            userName: "Alice Smith",
            userEmail: "alice.s@example.com",
            rating: 5,
            comment: "Fantastic service and a great selection of books!",
            date: "2023-10-25",
        },
        {
            id: 2,
            userName: "Bob Johnson",
            userEmail: "bob.j@example.com",
            rating: 4,
            comment: "A cozy place, but could use more seating.",
            date: "2023-10-24",
        },
        {
            id: 3,
            userName: "Charlie Brown",
            userEmail: "charlie.b@example.com",
            rating: 5,
            comment: "Friendly staff and a wonderful atmosphere. Highly recommend!",
            date: "2023-10-23",
        },
        {
            id: 4,
            userName: "Diana Prince",
            userEmail: "diana.p@example.com",
            rating: 3,
            comment: "It was okay. Nothing special.",
            date: "2023-10-22",
        },
        {
            id: 5,
            userName: "Bruce Wayne",
            userEmail: "bruce.w@example.com",
            rating: 4,
            comment: "Good place to find rare editions. Solid.",
            date: "2023-10-21",
        },
    ],
};

const StoreRatingsPage = () => {
    const { averageRating, totalRatings, ratings } = mockStoreRatings;

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

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900">Users' Ratings</h1>
                    <p className="mt-2 text-lg text-gray-600">
                        See what customers think about your store.
                    </p>
                </div>

                {/* Stats Card */}
                <div className="bg-gray-900 text-white rounded-2xl shadow-lg p-6 mb-8 flex flex-col sm:flex-row justify-around items-center text-center sm:text-left">
                    <div className="mb-4 sm:mb-0">
                        <span className="text-gray-400 text-sm">Average Rating</span>
                        <div className="flex items-center justify-center sm:justify-start mt-1">
                            <span className="text-3xl font-bold text-yellow-400 mr-2">{averageRating}</span>
                            {renderStars(averageRating)}
                        </div>
                    </div>
                    <div>
                        <span className="text-gray-400 text-sm">Total Reviews</span>
                        <p className="text-3xl font-bold mt-1">{totalRatings}</p>
                    </div>
                </div>

                {/* Ratings Table / List */}
                {ratings.length > 0 ? (
                    <div className="bg-gray-900 text-gray-200 rounded-xl overflow-hidden shadow-lg">
                        <div className="hidden md:table w-full">
                            <div className="md:table-header-group">
                                <div className="md:table-row bg-gray-800 text-sm font-semibold text-white">
                                    <div className="md:table-cell p-4">User Name</div>
                                    <div className="md:table-cell p-4">Email</div>
                                    <div className="md:table-cell p-4">Rating</div>
                                    <div className="md:table-cell p-4">Comment</div>
                                    <div className="md:table-cell p-4">Date</div>
                                </div>
                            </div>
                            <div className="md:table-row-group">
                                {ratings.map((rating) => (
                                    <div key={rating.id} className="md:table-row border-b border-gray-800 hover:bg-gray-800 transition-colors">
                                        <div className="md:table-cell p-4">{rating.userName}</div>
                                        <div className="md:table-cell p-4">{rating.userEmail}</div>
                                        <div className="md:table-cell p-4">{renderStars(rating.rating)}</div>
                                        <div className="md:table-cell p-4">{rating.comment || "No comment"}</div>
                                        <div className="md:table-cell p-4">{rating.date}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Mobile view as cards */}
                        <div className="md:hidden p-4">
                            {ratings.map((rating) => (
                                <div key={rating.id} className="bg-gray-800 rounded-lg p-4 mb-4">
                                    <h3 className="text-lg font-bold text-white">{rating.userName}</h3>
                                    <p className="text-sm text-gray-400">{rating.userEmail}</p>
                                    <div className="mt-2">
                                        <span className="text-sm font-semibold text-gray-300">Rating:</span>
                                        <div className="flex items-center mt-1">{renderStars(rating.rating)}</div>
                                    </div>
                                    <div className="mt-2">
                                        <span className="text-sm font-semibold text-gray-300">Comment:</span>
                                        <p className="text-gray-300 mt-1">{rating.comment || "No comment"}</p>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Submitted on: {rating.date}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="p-8 text-center text-gray-500 bg-white rounded-2xl shadow-md">
                        <p>No ratings yet. Encourage your customers to leave feedback!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StoreRatingsPage;
