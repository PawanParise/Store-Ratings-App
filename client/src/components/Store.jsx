import React, { useState, useContext, useEffect } from "react";
import { Search, Star, Pencil } from "lucide-react";
import { UserContext } from "./Context";
import axios from "axios";

// ⭐ Reusable Star Rating Component
const StarRating = ({ rating, totalStars = 5 }) => (
  <div className="flex items-center">
    {[...Array(totalStars)].map((_, index) => {
      const starValue = index + 1;
      return (
        <Star
          key={starValue}
          size={20}
          className={`${
            starValue <= rating
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          } transition-colors duration-200`}
        />
      );
    })}
  </div>
);

// 🏬 Store Card
const StoreCard = ({ store, userRating, onRatingSubmit }) => {
  const [isRatingMode, setIsRatingMode] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  // Sync internal state with userRating prop.
  // This ensures the stars in the rating form update when the user's rating changes.
  const [ratingValue, setRatingValue] = useState(userRating?.rating || 0);
  useEffect(() => {
    setRatingValue(userRating?.rating || 0);
  }, [userRating]);

  const handleRatingClick = async (value) => {
    // Call the parent component's function to handle the API call and state update
    await onRatingSubmit(store.id, value);
    setIsRatingMode(false);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Title + Rate Button */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-gray-900">{store.name}</h3>
        <button
          onClick={() => setIsRatingMode(!isRatingMode)}
          className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <Pencil size={16} />
          <span className="text-sm font-medium">Rate</span>
        </button>
      </div>

      {/* Address */}
      <p className="text-sm text-gray-500 mb-4">{store.address}</p>

      {/* Overall Rating */}
      <div className="flex items-center mb-4">
        <span className="text-gray-700 font-semibold mr-2">Overall:</span>
        <StarRating rating={store.average || 0} />
        <span className="ml-2 text-sm font-medium text-gray-600">
          ({(store.average || 0).toFixed(1) || "none"})
        </span>
      </div>

      {/* User Rating */}
      <div className="mb-4">
        <span className="text-gray-700 font-semibold mr-2">Your Rating:</span>
        {userRating ? (
          <StarRating rating={userRating.rating} />
        ) : (
          <span className="text-sm text-gray-500 italic">Not rated</span>
        )}
      </div>

      {/* Rating Form */}
      {isRatingMode && (
        <div className="space-y-3">
          {/* Star Picker */}
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => {
              const value = index + 1;
              return (
                <Star
                  key={value}
                  size={24}
                  className={`cursor-pointer ${
                    value <= (hoverRating || ratingValue)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                  onMouseEnter={() => setHoverRating(value)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => handleRatingClick(value)}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// 📄 Main Store Page
const StorePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { user, allStores, setAllStoresData } = useContext(UserContext);

  // We'll manage a single source of truth for all store data,
  // including average ratings.
  const [storesWithRatings, setStoresWithRatings] = useState([]);

  // This function will fetch all ratings, calculate averages, and update the state.
  const fetchRatingsAndStores = async () => {
    try {
      // Fetch all ratings from the API
      const ratingsResponse = await axios.get("http://localhost:5000/api/v1/store_app/get-ratings");
      const ratings = ratingsResponse.data?.ratings || [];

      // Create a map to easily look up ratings and calculate averages
      const storeRatingsMap = {};
      const userRatingsMap = {};

      ratings.forEach((rating) => {
        if (!storeRatingsMap[rating.store_id]) {
          storeRatingsMap[rating.store_id] = [];
        }
        storeRatingsMap[rating.store_id].push(rating.rating);

        // Map the user's specific ratings for quick lookup
        if (user && rating.user_id === user.id) {
          userRatingsMap[rating.store_id] = { rating: rating.rating };
        }
      });

      // Update the allStores context with average ratings
      const updatedStores = allStores.map((store) => {
        const storeRatings = storeRatingsMap[store.id] || [];
        const average =
          storeRatings.length > 0
            ? storeRatings.reduce((sum, r) => sum + r, 0) / storeRatings.length
            : 0;
        return {
          ...store,
          average,
          // Attach the current user's rating to the store object for easy access
          userRating: userRatingsMap[store.id] || null,
        };
      });

      // Update the local state with the processed data.
      setStoresWithRatings(updatedStores);
      
    } catch (error) {
      console.error("Error fetching ratings:", error);
      alert("Error fetching ratings");
    }
  };

  // Initial data fetch and also whenever allStores data is available
  useEffect(() => {
    // Only fetch if allStores is not empty to prevent multiple calls
    // on initial component load.
    if (allStores && allStores.length > 0) {
      fetchRatingsAndStores();
    }
  }, [allStores, user]);

  const handleRatingSubmit = async (storeId, rating) => {
    const token = localStorage.getItem('token')
    if(!token){
      alert('Login First')
      return
    }
    try {

      const res = await fetch(`http://localhost:5000/api/v1/store_app/add-rating/${storeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ rating }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        alert("Rating submitted successfully!");
        // Re-fetch all data to ensure the average is updated
        fetchRatingsAndStores();
      } else {
        alert(data.message || "Failed to submit rating");
      }
    } catch (err) {
      console.error("Error submitting rating:", err);
      alert("Error submitting rating");
    }
  };

  const filteredStores = storesWithRatings.filter(
    (store) =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-16 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-6">
          All Stores
        </h1>
        <p className="text-lg text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          Explore all registered stores. Search by name or address, rate them,
          and share your reviews to help the community.
        </p>

        {/* Search */}
        <div className="relative max-w-xl mx-auto mb-12">
          <input
            type="text"
            placeholder="Search by store name or address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>

        {/* Store Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStores.length > 0 ? (
            filteredStores.map((store) => (
              <StoreCard
                key={store.id}
                store={store}
                userRating={store.userRating}
                onRatingSubmit={handleRatingSubmit}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No stores found matching your search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StorePage;