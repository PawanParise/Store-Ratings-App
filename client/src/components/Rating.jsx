import React, { useState } from "react";
import { Star, Edit, MapPin } from "lucide-react";

// Mock data to simulate user's ratings from a database
const mockUserRatings = [
    {
        id: 1,
        storeName: "The Book Nook",
        storeAddress: "123 Main Street, Pune",
        userRating: 4,
        overallRating: 4.5,
    },
    {
        id: 2,
        storeName: "Fresh Groceries",
        storeAddress: "456 Market Road, Pune",
        userRating: 5,
        overallRating: 4.8,
    },
    {
        id: 3,
        storeName: "Tech Gadgets",
        storeAddress: "789 Elm Street, Pune",
        userRating: 3,
        overallRating: 3.9,
    },
    {
        id: 4,
        storeName: "Artisan Coffee",
        storeAddress: "101 Cafe Lane, Pune",
        userRating: 5,
        overallRating: 4.7,
    },
    {
        id: 5,
        storeName: "Green Leaf Florist",
        storeAddress: "222 Garden City, Pune",
        userRating: 4,
        overallRating: 4.1,
    },
    {
        id: 6,
        storeName: "Gourmet Grocers",
        storeAddress: "303 Market St, Foodtown, Pune",
        userRating: 5,
        overallRating: 4.9,
    },
];

// ⭐ Reusable Star Rating Component
const StarRating = ({ rating, totalStars = 5 }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, index) => (
                <Star key={`full-${index}`} size={20} className="text-yellow-400 fill-yellow-400" />
            ))}
            {hasHalfStar && (
                <Star key="half" size={20} className="text-yellow-400 fill-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />
            )}
            {[...Array(totalStars - Math.ceil(rating))].map((_, index) => (
                <Star key={`empty-${index}`} size={20} className="text-gray-300" />
            ))}
        </div>
    );
};

// 🏬 My Rating Card
const MyRatingCard = ({ rating, onRatingChange }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);

    const handleRatingClick = (newRating) => {
        onRatingChange(rating.id, newRating);
        setIsEditing(false);
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            {/* Title + Edit Button */}
            <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{rating.storeName}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                        <MapPin size={14} className="text-gray-400" />
                        {rating.storeAddress}
                    </p>
                </div>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                    <Edit size={16} />
                    <span className="text-sm font-medium">Edit</span>
                </button>
            </div>

            {/* Overall Rating */}
            <div className="flex items-center mb-2">
                <span className="text-gray-700 font-semibold mr-2">Overall:</span>
                <StarRating rating={rating.overallRating} />
                <span className="ml-2 text-sm font-medium text-gray-600">({rating.overallRating})</span>
            </div>

            {/* Your Rating */}
            <div className="flex items-center">
                <span className="text-gray-700 font-semibold mr-2">Your Rating:</span>
                {!isEditing ? (
                    <StarRating rating={rating.userRating} />
                ) : (
                    <div className="flex items-center">
                        {[...Array(5)].map((_, index) => {
                            const starValue = index + 1;
                            return (
                                <Star
                                    key={starValue}
                                    size={24}
                                    className={`cursor-pointer transition-colors duration-200 ${
                                        starValue <= (hoverRating || rating.userRating)
                                            ? "text-yellow-400 fill-yellow-400"
                                            : "text-gray-300"
                                    }`}
                                    onMouseEnter={() => setHoverRating(starValue)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    onClick={() => handleRatingClick(starValue)}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
            {!isEditing && (
                <div className="mt-2">
                    <span className="text-sm font-medium text-gray-600">({rating.userRating})</span>
                </div>
            )}
        </div>
    );
};

// 📄 Main My Ratings Page
const MyRatings = () => {
    const [ratings, setRatings] = useState(mockUserRatings);

    const handleRatingChange = (storeId, newRating) => {
        setRatings((prevRatings) =>
            prevRatings.map((rating) =>
                rating.id === storeId ? { ...rating, userRating: newRating } : rating
            )
        );
        alert(`Rating for store ID ${storeId} updated to ${newRating}.`);
    };

    return (
        <div className="py-16 px-4 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Title */}
                <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
                    My Rated Stores
                </h1>
                <p className="text-lg text-gray-600 text-center mb-10 max-w-2xl mx-auto">
                    View and manage all your submitted store ratings in one place.
                </p>

                {/* Ratings Grid */}
                {ratings.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {ratings.map((rating) => (
                            <MyRatingCard
                                key={rating.id}
                                rating={rating}
                                onRatingChange={handleRatingChange}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center text-gray-500 bg-white rounded-2xl shadow-md">
                        <p>You haven't submitted any ratings yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyRatings;
