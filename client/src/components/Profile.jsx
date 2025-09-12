import React, { useState } from "react";
import { User, MapPin, Star, Pencil, MessageSquare, ShieldCheck, Store } from "lucide-react";

// Sample user data
const sampleUser = {
  name: "Pratik Sharma",
  email: "pratik.sharma@example.com",
  address: "22 Residency Road, Bangalore, India",
  role: "Normal User", // "Store Owner" | "Admin"
  ratedStores: [
    {
      id: 1,
      name: "The Bookworm's Nook",
      address: "123 Reading Rd, Booksville",
      overallRating: 4.8,
      userRating: 5,
      review: "Amazing collection and cozy vibe!",
    },
    {
      id: 4,
      name: "Green Leaf Florist",
      address: "101 Blossom Lane, Garden City",
      overallRating: 4.2,
      userRating: 4,
      review: "Fresh flowers and friendly staff.",
    },
  ],
  stores: [
    {
      id: 10,
      name: "Pratik's Store",
      address: "22 Residency Road, Bangalore",
      overallRating: 4.9,
    },
  ],
  adminInfo: {
    accessLevel: "Full System Access",
  },
};

// Star rating component
const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={20}
          className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
        />
      ))}
    </div>
  );
};

// Store Card
const StoreCard = ({ store }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1">
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-xl font-bold text-gray-900">{store.name}</h3>
      <button className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition">
        <Pencil size={16} /> <span className="text-sm">Edit</span>
      </button>
    </div>
    <p className="text-sm text-gray-500 mb-2">{store.address}</p>
    <div className="flex items-center gap-2">
      <span className="text-gray-700 font-semibold">Rating:</span>
      <StarRating rating={store.overallRating} />
      <span className="text-sm text-gray-600">({store.overallRating})</span>
    </div>
  </div>
);

const ProfilePage = () => {
  const [userData, setUserData] = useState(sampleUser);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-indigo-50 py-16 px-4">
      {/* User Info */}
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-4">
        <div className="bg-indigo-600 rounded-full p-4">
          <User className="w-16 h-16 text-white" />
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900">{userData.name}</h1>
        <p className="text-gray-500">{userData.email}</p>
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-5 h-5" />
          <span>{userData.address}</span>
        </div>
      </div>

      {/* Role Based Sections */}
      <div className="max-w-4xl mx-auto mt-10 space-y-10">
        {/* Normal User */}
        {userData.role === "Normal User" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Stores You've Rated</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {userData.ratedStores.map((store) => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          </div>
        )}

        {/* Store Owner */}
        {userData.role === "Store Owner" && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Store className="w-6 h-6" /> Your Store
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {userData.stores.map((store) => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          </div>
        )}

        {/* Admin */}
        {userData.role === "Admin" && (
          <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
            <h2 className="text-xl font-bold text-blue-800 flex items-center gap-2 mb-4">
              <ShieldCheck className="w-6 h-6" /> Admin Dashboard
            </h2>
            <p className="text-blue-700">
              Access Level: {userData.adminInfo.accessLevel}
            </p>
            <a
              href="/admin-dashboard"
              className="mt-4 inline-block text-blue-600 font-semibold hover:text-blue-800"
            >
              Go to Admin Dashboard
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
