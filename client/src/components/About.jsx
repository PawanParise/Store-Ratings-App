import React from "react";
import {
    Star,
    ThumbsUp,
    ShieldCheck,
    User,
    Store,
    BarChart3,
    HeartHandshake,
    UserPlus,
    Sparkles,
    Globe,
} from "lucide-react";

const AboutPage = ({ onSignupClick }) => (
    <div className="py-16 px-4 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">
            {/* Intro */}
            <div className="text-center mb-20">
                <h1 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
                    About StoreRating
                </h1>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    StoreRating is a community-driven platform that connects
                    shoppers with the best local stores through genuine reviews
                    and ratings. We aim to build a transparent marketplace where
                    users trust feedback, businesses grow, and everyone benefits.
                </p>
            </div>

            {/* What We Do */}
            <div className="mt-12 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                    What We Do
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                        <Star className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
                        <h3 className="font-semibold text-gray-800 text-xl mb-2">
                            Ratings & Reviews
                        </h3>
                        <p className="text-gray-600">
                            Users can rate stores and share their honest
                            experiences.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                        <ThumbsUp className="w-10 h-10 text-green-500 mx-auto mb-4" />
                        <h3 className="font-semibold text-gray-800 text-xl mb-2">
                            Feedback for Stores
                        </h3>
                        <p className="text-gray-600">
                            Store owners receive valuable feedback to improve
                            products and services.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
                        <ShieldCheck className="w-10 h-10 text-indigo-500 mx-auto mb-4" />
                        <h3 className="font-semibold text-gray-800 text-xl mb-2">
                            Safe & Fair Platform
                        </h3>
                        <p className="text-gray-600">
                            Admins monitor content to ensure fair, transparent,
                            and safe usage.
                        </p>
                    </div>
                </div>
            </div>

            {/* How It Works */}
            <div className="mt-20">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
                    How It Works
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl shadow hover:shadow-xl transition text-center">
                        <UserPlus className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            1. Sign Up
                        </h3>
                        <p className="text-gray-600">
                            Create your account as a User, Store Owner, or
                            Admin.
                        </p>
                    </div>
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl shadow hover:shadow-xl transition text-center">
                        <ThumbsUp className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            2. Rate & Review
                        </h3>
                        <p className="text-gray-600">
                            Share your shopping experiences and rate stores from
                            1–5 stars.
                        </p>
                    </div>
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl shadow hover:shadow-xl transition text-center">
                        <BarChart3 className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            3. Gain Insights
                        </h3>
                        <p className="text-gray-600">
                            Stores improve services, and users find the best
                            places to shop.
                        </p>
                    </div>
                </div>
            </div>

            {/* Who Is It For */}
            <div className="mt-20">
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">
                    Who Is StoreRating For?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center">
                        <User className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            Normal Users
                        </h3>
                        <p className="text-gray-600">
                            Discover trusted stores and help others by sharing
                            your experiences.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center">
                        <Store className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            Store Owners
                        </h3>
                        <p className="text-gray-600">
                            Grow your business with authentic customer feedback
                            and insights.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center">
                        <ShieldCheck className="w-12 h-12 text-pink-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            Admins
                        </h3>
                        <p className="text-gray-600">
                            Keep the platform safe, fair, and community-driven
                            with your oversight.
                        </p>
                    </div>
                </div>
            </div>

            {/* Vision & Values */}
            <div className="mt-20 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-10">
                    Our Vision & Values
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col items-center">
                        <ShieldCheck className="w-12 h-12 text-purple-600 mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            Transparency
                        </h3>
                        <p className="text-gray-600">
                            Every review is honest, verified, and visible to all.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col items-center">
                        <HeartHandshake className="w-12 h-12 text-pink-600 mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            Community
                        </h3>
                        <p className="text-gray-600">
                            Empowering users & businesses through collaboration.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col items-center">
                        <BarChart3 className="w-12 h-12 text-teal-600 mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            Growth
                        </h3>
                        <p className="text-gray-600">
                            Helping local businesses reach their potential.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition flex flex-col items-center">
                        <Sparkles className="w-12 h-12 text-yellow-500 mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                            Trust
                        </h3>
                        <p className="text-gray-600">
                            Building a safe, trusted ecosystem for shoppers and
                            store owners.
                        </p>
                    </div>
                </div>
            </div>

            {/* Closing CTA */}
            <div className="mt-20 text-center">
                <p className="text-lg text-gray-600 mb-6">
                    Join StoreRating today and become part of a transparent,
                    trusted shopping community.
                </p>
                <button
                    onClick={onSignupClick}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:scale-105 transition-all transform"
                >
                    <UserPlus size={20} /> Get Started
                </button>
            </div>
        </div>
    </div>
);

export default AboutPage;
