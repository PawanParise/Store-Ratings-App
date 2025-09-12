import React from "react";
import {
    Search,
    Star,
    User,
    Store,
    ShieldCheck,
    LogIn,
    UserPlus,
    ThumbsUp,
    BarChart3,
    HeartHandshake,
    Quote,
} from "lucide-react";
import { useContext } from "react";
import { UserContext } from "./Context.jsx";
import { Link } from "react-router";


// Testimonial Card
const TestimonialCard = ({ quote, author }) => (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
        <Quote className="w-10 h-10 text-indigo-500 mb-4" />
        <p className="text-gray-600 italic mb-4">“{quote}”</p>
        <p className="text-sm font-semibold text-gray-800">- {author}</p>
    </div>
);

const MostRatedStores = () => {
    const stores = [
        { name: "Tech Gadgets Emporium", rating: 4.9, image: "https://placehold.co/300x200/4F46E5/ffffff?text=Tech" },
        { name: "Urban Outfitters Co.", rating: 4.8, image: "https://placehold.co/300x200/1D4ED8/ffffff?text=Fashion" },
        { name: "Coffee N' Books", rating: 4.7, image: "https://placehold.co/300x200/3B82F6/ffffff?text=Cafe" },
        { name: "The Green Grocer", rating: 4.6, image: "https://placehold.co/300x200/22C55E/ffffff?text=Grocer" },
        { name: "Artisan Bakeshop", rating: 4.5, image: "https://placehold.co/300x200/EAB308/ffffff?text=Bakery" },
        { name: "Vintage Vinyl Records", rating: 4.4, image: "https://placehold.co/300x200/EF4444/ffffff?text=Music" },
    ];

    return (
        <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Most Rated Stores</h2>
            <div className="flex overflow-x-scroll hide-scrollbar space-x-6 pb-4 md:pb-6">
                {stores.map((store, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-64 md:w-80 bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                    >
                        <img src={store.image} alt={store.name} className="w-full h-40 object-cover" />
                        <div className="p-4">
                            <h4 className="text-lg font-bold text-gray-800">{store.name}</h4>
                            <div className="flex items-center mt-2">
                                <Star className="h-5 w-5 text-yellow-400 mr-1 fill-yellow-400" />
                                <span className="text-gray-700 font-semibold">{store.rating}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

const HomePage = ({ onSignupClick,
    onLoginClick, }) => {
    const { user, resetUserData } = useContext(UserContext);
    console.log('userdata', user)
    return (
        <div className="py-16 px-4 bg-gradient-to-br from-indigo-50 via-white to-indigo-100 min-h-screen">
            {/* Hero Section */}
            <div className="text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                    Discover & Rate Your Favorite Stores
                </h1>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                    StoreRatings helps you discover, rate, and share experiences at local businesses. Find the best places in town with trusted reviews.
                </p>
                <div className="flex justify-center space-x-4">
                    {
                        !user ?
                            <>
                                <button
                                    onClick={onLoginClick}
                                    className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition"
                                >
                                    <LogIn size={18} /> Login
                                </button>
                                <button
                                    onClick={onSignupClick}
                                    className="flex items-center gap-2 border-2 border-indigo-600 text-indigo-700 font-semibold py-3 px-6 rounded-xl hover:bg-indigo-600 hover:text-white transition"
                                >
                                    <UserPlus size={18} /> Sign Up
                                </button>
                            </>
                            : <button
                                
                                className="flex items-center gap-2 border-2 border-indigo-600 text-indigo-700 font-semibold py-3 px-6 rounded-xl hover:bg-indigo-600 hover:text-white transition"
                            >
                                {user.type == 'Normal User' ? <Link to='/stores'>Explore Stores</Link> : <Link to='/admin/dashboard'> Go to Dashabord</Link>}
                            </button>
                    }
                </div>

            </div>

            {/* Mission */}
            <div className="mt-20 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    We’re building a trusted community where feedback empowers customers and store owners. Transparent ratings drive growth, trust, and better shopping for everyone.
                </p>
            </div>

            {/* How It Works */}
            <div className="mt-20">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center">
                        <UserPlus className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2 text-gray-800">1. Sign Up</h3>
                        <p className="text-gray-600">Create your account as a User, Store Owner, or Admin.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center">
                        <ThumbsUp className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2 text-gray-800">2. Rate Stores</h3>
                        <p className="text-gray-600">Share your experience and rate stores from 1-5 stars.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center">
                        <BarChart3 className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2 text-gray-800">3. Gain Insights</h3>
                        <p className="text-gray-600">Store owners improve services, and users find the best places.</p>
                    </div>
                </div>
            </div>

            {/* Features by Role */}
            <div className="mt-20">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Features by Role</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center">
                        <User className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2 text-gray-800">Normal User</h3>
                        <ul className="text-gray-600 text-left list-disc list-inside space-y-2">
                            <li>Search & rate stores</li>
                            <li>Update your profile</li>
                            <li>Manage your ratings</li>
                        </ul>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center">
                        <Store className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2 text-gray-800">Store Owner</h3>
                        <ul className="text-gray-600 text-left list-disc list-inside space-y-2">
                            <li>View customer feedback</li>
                            <li>Track average rating</li>
                            <li>Manage store profile</li>
                        </ul>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center">
                        <ShieldCheck className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold mb-2 text-gray-800">Admin</h3>
                        <ul className="text-gray-600 text-left list-disc list-inside space-y-2">
                            <li>Manage users & stores</li>
                            <li>View reports & dashboard</li>
                            <li>Oversee platform activity</li>
                        </ul>
                    </div>
                </div>
            </div>

            <MostRatedStores />

            {/* Why Use */}
            <div className="mt-20 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-10">Why Use StoreRating?</h2>

                <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
                    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
                        <span className="text-green-500 text-xl">✅</span>
                        <p className="text-gray-700 font-medium">
                            <strong>Genuine Reviews Only</strong> – Every rating is verified, so you can trust the feedback.
                        </p>
                    </div>

                    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
                        <span className="text-green-500 text-xl">⏱️</span>
                        <p className="text-gray-700 font-medium">
                            <strong>Save Time & Money</strong> – Quickly find the best store without trial and error.
                        </p>
                    </div>

                    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
                        <span className="text-green-500 text-xl">📍</span>
                        <p className="text-gray-700 font-medium">
                            <strong>Location-Based Insights</strong> – Discover top-rated stores near you.
                        </p>
                    </div>

                    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
                        <span className="text-green-500 text-xl">⚖️</span>
                        <p className="text-gray-700 font-medium">
                            <strong>Compare Easily</strong> – Check ratings across multiple stores before shopping.
                        </p>
                    </div>

                    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
                        <span className="text-green-500 text-xl">👥</span>
                        <p className="text-gray-700 font-medium">
                            <strong>Community-Driven</strong> – Built by real shoppers for real shoppers.
                        </p>
                    </div>

                    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition">
                        <span className="text-green-500 text-xl">🤖</span>
                        <p className="text-gray-700 font-medium">
                            <strong>Smart Recommendations</strong> – Personalized store suggestions based on your needs.
                        </p>
                    </div>
                </div>
            </div>


            {/* Testimonials */}
            <div className="mt-20">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">What Our Users Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <TestimonialCard
                        quote="I found the best bakery in my town thanks to StoreRating! The reviews were spot on and it's now my favorite place."
                        author="Jane Doe, Customer"
                    />
                    <TestimonialCard
                        quote="StoreRating has given me invaluable feedback to improve my business. I can see what my customers love and where I can get better."
                        author="John Smith, Store Owner"
                    />
                    <TestimonialCard
                        quote="Managing users and stores is so easy with the admin dashboard. The platform is intuitive and helps me keep things running smoothly."
                        author="Emily Chen, Administrator"
                    />
                </div>
            </div>
        </div>
    )
};

export default HomePage;
