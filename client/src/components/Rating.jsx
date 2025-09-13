import React, { useState, useContext, useEffect } from "react";
import { Star, Edit, MapPin } from "lucide-react";
import { UserContext } from "./Context";
import axios from "axios";

// ⭐ Reusable Star Rating Component
const StarRating = ({ rating, totalStars = 5 }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, index) => (
                <Star
                    key={`full-${index}`}
                    size={20}
                    className="text-yellow-400 fill-yellow-400"
                />
            ))}
            {hasHalfStar && (
                <Star
                    key="half"
                    size={20}
                    className="text-yellow-400 fill-yellow-400"
                    style={{ clipPath: "inset(0 50% 0 0)" }}
                />
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

    const handleRatingClick = async (newRating) => {
        // Call the parent component's function to handle the API update
        await onRatingChange(rating.store_id, newRating);
        setIsEditing(false); // Close edit mode after submission
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

            {/* Overall Rating (assuming the API provides this) */}
            <div className="flex items-center mb-2">
                <span className="text-gray-700 font-semibold mr-2">Overall:</span>
                <StarRating rating={rating.overallRating || 0} />
                <span className="ml-2 text-sm font-medium text-gray-600">
                    ({(rating.overallRating || 0).toFixed(1)})
                </span>
            </div>

            {/* Your Rating */}
            <div className="flex items-center">
                <span className="text-gray-700 font-semibold mr-2">Your Rating:</span>
                {!isEditing ? (
                    <StarRating rating={rating.rating} />
                ) : (
                    <div className="flex items-center">
                        {[...Array(5)].map((_, index) => {
                            const starValue = index + 1;
                            return (
                                <Star
                                    key={starValue}
                                    size={24}
                                    className={`cursor-pointer transition-colors duration-200 ${
                                        starValue <= (hoverRating || rating.rating)
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
                    <span className="text-sm font-medium text-gray-600">
                        ({rating.rating})
                    </span>
                </div>
            )}
        </div>
    );
};

// 📄 Main My Ratings Page
const MyRatings = () => {
    const { user, allStores } = useContext(UserContext);
    const [ratings, setRatings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchMyRatings = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("No authentication token found.");
                setIsLoading(false);
                return;
            }
            // Fetch ratings specifically for the logged-in user
            const response = await axios.get("http://localhost:5000/api/v1/store_app/user-ratings", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Assuming the API returns a list of ratings with store details
            const myRatingsData = response.data;
            
            // Map the fetched ratings to match the component's expected data structure
            const processedRatings = myRatingsData.map(rating => {
                // Find the corresponding store from the allStores context
                const store = allStores.find(s => s.id === rating.store_id);
                // Assuming the backend provides overall average, otherwise calculate it
                const overallRating = store ? store.average : 0;
                
                return {
                    ...rating,
                    storeName: store ? store.name : "Unknown Store",
                    storeAddress: store ? store.address : "N/A",
                    overallRating: overallRating,
                };
            });
            
            setRatings(processedRatings);
        } catch (error) {
            console.error("Error fetching user ratings:", error);
            alert("Error fetching your ratings.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRatingChange = async (storeId, newRating) => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:5000/api/v1/store_app/add-rating/${storeId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ rating: newRating }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                alert("Rating updated successfully!");
                // Re-fetch ratings to update the UI with the latest data
                fetchMyRatings();
            } else {
                alert(data.message || "Failed to update rating.");
            }
        } catch (err) {
            console.error("Error updating rating:", err);
            alert("Error updating rating.");
        }
    };

    // Fetch ratings when the component mounts or when the user changes
    useEffect(() => {
        if (user && allStores && allStores.length > 0) {
            fetchMyRatings();
        }
    }, [user, allStores]);

    if (isLoading) {
        return (
            <div className="py-16 px-4 bg-gray-50 min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading your ratings...</p>
            </div>
        );
    }

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