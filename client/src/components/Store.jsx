import React, { useState } from "react";
import { Search, Star, Pencil, MessageSquare } from "lucide-react";

const storeData = [
  { id: 1, name: "The Bookworm's Nook", address: "123 Reading Rd, Booksville", overallRating: 4.8, userRating: 0, review: "" },
  { id: 2, name: "Café de Paris", address: "456 French St, Paris", overallRating: 4.5, userRating: 0, review: "" },
  { id: 3, name: "Urban Tech Hub", address: "789 Innovation Ave, Technocity", overallRating: 4.9, userRating: 0, review: "" },
  { id: 4, name: "Green Leaf Florist", address: "101 Blossom Lane, Garden City", overallRating: 4.2, userRating: 0, review: "" },
  { id: 5, name: "Vintage Records", address: "202 Vinyl Blvd, Retroville", overallRating: 4.7, userRating: 0, review: "" },
  { id: 6, name: "Gourmet Grocers", address: "303 Market St, Foodtown", overallRating: 4.6, userRating: 0, review: "" },
];

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
            starValue <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          } transition-colors duration-200`}
        />
      );
    })}
  </div>
);

// 🏬 Store Card
const StoreCard = ({ store, onRatingChange, onReviewSubmit }) => {
  const [isRatingMode, setIsRatingMode] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [reviewText, setReviewText] = useState(store.review || "");

  const handleRatingClick = (newRating) => {
    onRatingChange(store.id, newRating);
    setIsRatingMode(false);
  };

  const handleReviewSubmit = () => {
    onReviewSubmit(store.id, reviewText);
    setIsReviewMode(false);
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
        <StarRating rating={store.overallRating} />
        <span className="ml-2 text-sm font-medium text-gray-600">({store.overallRating})</span>
      </div>

      {/* User Rating */}
      <div className="flex items-center mb-4">
        <span className="text-gray-700 font-semibold mr-2">Your Rating:</span>
        {!isRatingMode ? (
          store.userRating > 0 ? (
            <StarRating rating={store.userRating} />
          ) : (
            <span className="text-sm text-gray-500 italic">Not rated</span>
          )
        ) : (
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <Star
                  key={ratingValue}
                  size={24}
                  className={`cursor-pointer transition-colors duration-200 ${
                    ratingValue <= (hoverRating || store.userRating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                  onMouseEnter={() => setHoverRating(ratingValue)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => handleRatingClick(ratingValue)}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Review Section */}
      {!isReviewMode ? (
        <div>
          {store.review ? (
            <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{store.review}</p>
          ) : (
            <button
              onClick={() => setIsReviewMode(true)}
              className="mt-2 flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
            >
              <MessageSquare size={16} />
              Write a Review
            </button>
          )}
        </div>
      ) : (
        <div className="mt-3">
          <textarea
            rows="3"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm"
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <div className="flex justify-end gap-3 mt-2">
            <button
              onClick={() => setIsReviewMode(false)}
              className="text-gray-500 hover:text-gray-700 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleReviewSubmit}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm font-medium transition-colors"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// 📄 Main Store Page
const StorePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [stores, setStores] = useState(storeData);

  const handleRatingChange = (storeId, newRating) => {
    setStores((prevStores) =>
      prevStores.map((store) =>
        store.id === storeId ? { ...store, userRating: newRating } : store
      )
    );
  };

  const handleReviewSubmit = (storeId, reviewText) => {
    setStores((prevStores) =>
      prevStores.map((store) =>
        store.id === storeId ? { ...store, review: reviewText } : store
      )
    );
  };

  const filteredStores = stores.filter(
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
          Explore all registered stores. Search by name or address, rate them, and share your reviews to help the community.
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
                onRatingChange={handleRatingChange}
                onReviewSubmit={handleReviewSubmit}
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
