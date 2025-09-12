import React, { useState } from "react";
import { Link } from "react-router";

// Inline SVG Logo
const StoreRatingLogo = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8 text-indigo-600"
    >
        <path
            fillRule="evenodd"
            d="M19.954 3.94a2.25 2.25 0 0 0-1.898-1.044l-7.712.784a2.25 2.25 0 0 0-1.748 2.106V4.25A2.25 2.25 0 0 0 6.25 2a.75.75 0 0 0-.75.75v16.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V16.5a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 0 .75.75h1.5a.75.75 0 0 0 .75-.75V16.5a.75.75 0 0 1 .75-.75h2.25c.348 0 .67.155.887.413l2.25 2.812a.75.75 0 0 0 1.12-.904l-2.25-2.812A2.25 2.25 0 0 0 19.954 3.94ZM4.5 9.75a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM12 7.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
            clipRule="evenodd"
        />
    </svg>
);

const Header = ({
    isLoggedIn,
    userRole,
    handleLogout,
    onSearch,
    onSignupClick,
    onLoginClick,
}) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    // Navigation link with path
    const navLink = (text, path) => (
        <Link
            to={path}
            className="relative text-gray-700 font-medium transition hover:text-indigo-600 after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-[2px] after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full"
        >
            {text}

        </Link>
    );

    const renderNavLinks = () => {
        if (!isLoggedIn) {
            return (
                <nav className="flex items-center space-x-6">
                    {navLink("Home", "/")}
                    {navLink("Stores", "/stores")}
                    {navLink("About Us", "/about")}
                    {navLink("Contact", "/contact")}
                </nav>
            );
        }
        if (userRole === "Normal User") {
            return (
                <nav className="flex items-center space-x-6">
                    {navLink("Stores", "/stores")}
                    {navLink("My Ratings", "/my-ratings")}
                    {navLink("Profile", "/user-profile")}
                </nav>
            );
        }
        if (userRole === "Store Owner") {
            return (
                <nav className="flex items-center space-x-6">
                    {navLink("My Store", "/my-store")}
                    {navLink("Users’ Ratings", "/store-ratings")}
                    {navLink("Profile", "/owner-profile")}
                </nav>
            );
        }
        if (userRole === "System Administrator") {
            return (
                <nav className="flex items-center space-x-6">
                    {navLink("Dashboard", "/admin/dashboard")}
                    {navLink("Manage Users", "/admin/users")}
                    {navLink("Manage Stores", "/admin/stores")}
                    {navLink("Reports", "/admin/reports")}
                    {navLink("Profile", "/admin/profile")}
                </nav>
            );
        }
        return null;
    };

    const renderUserActions = () => {
        if (!isLoggedIn) {
            return (
                <div className="flex space-x-3">
                    <button
                        onClick={onLoginClick}
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium shadow-md hover:opacity-90 transition"
                    >
                        Login
                    </button>
                    <button
                        onClick={onSignupClick}
                        className="px-4 py-2 rounded-full border-2 border-indigo-500 text-indigo-600 font-medium hover:bg-indigo-50 transition"
                    >
                        Signup
                    </button>
                </div>
            );
        }
        return (
            <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium shadow-md hover:opacity-90 transition"
            >
                Logout
            </button>
        );
    };

    return (
        <header className="backdrop-blur-md bg-white/80 shadow-lg rounded-2xl m-2 p-4 flex flex-col md:flex-row items-center justify-between transition-all duration-300 ease-in-out">
            {/* Left: Logo + Brand + Nav */}
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <Link to='/'
                    className="flex items-center space-x-2 text-xl font-bold text-gray-800 hover:text-indigo-600 transition"
                >
                    <StoreRatingLogo />
                    <span>StoreRatings</span>
                </Link>
                <div className="hidden md:flex">{renderNavLinks()}</div>
            </div>

            {/* Middle: Search */}
            {(isLoggedIn &&
                (userRole === "Normal User" || userRole === "Store Owner")) ||
                !isLoggedIn ? (
                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                    <form
                        onSubmit={handleSearchSubmit}
                        className="relative flex items-center"
                    >
                        <input
                            type="text"
                            placeholder="Search stores..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 absolute left-3 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </form>
                </div>
            ) : null}

            {/* Right: User Actions */}
            <div className="flex items-center space-x-4">
                <div className="md:hidden">{renderNavLinks()}</div>
                {renderUserActions()}
            </div>
        </header>
    );
};

export { Header };
