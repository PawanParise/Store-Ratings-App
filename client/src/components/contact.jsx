import React, { useState } from "react";
import {
    Mail,
    Phone,
    MapPin,
    Clock,
    Facebook,
    Linkedin,
    Instagram,
    Twitter,
    Send,
    CheckCircle,
    Map,
    HelpCircle,
    ChevronDown,
    ChevronUp,
} from "lucide-react";

const ContactPage = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        subject: "General Inquiry",
        message: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // FAQ Toggle State
    const [activeFAQ, setActiveFAQ] = useState(null);

    const faqs = [
        {
            q: "How do I submit a store review?",
            a: "Simply create an account, search for the store, and click on 'Write a Review'.",
        },
        {
            q: "Can I edit or delete my review later?",
            a: "Yes, you can edit or delete reviews from your profile dashboard anytime.",
        },
        {
            q: "How do you verify reviews?",
            a: "We use AI checks and community reports to ensure only genuine reviews remain visible.",
        },
        {
            q: "Is StoreRating free to use?",
            a: "Absolutely! StoreRating is free for all users. We may introduce premium features in the future.",
        },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // API call placeholder
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
            console.log("Form submitted:", formData);
        }, 1500);
    };

    return (
        <div className="py-16 px-4 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {/* Intro Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6">
                        Get In Touch
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Have questions, feedback, or suggestions? We’d love to hear from you.
                        Our team is here to help you with anything related to <span className="font-semibold text-indigo-600">StoreRating</span>.
                    </p>
                </div>

                {/* Contact Info + Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Contact Information */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
                        <div className="space-y-6 text-gray-600">
                            <div className="flex items-center gap-4">
                                <Mail className="w-6 h-6 text-indigo-600" />
                                <div>
                                    <h4 className="font-semibold text-gray-800">Email Support</h4>
                                    <p>support@storerating.com</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Phone className="w-6 h-6 text-indigo-600" />
                                <div>
                                    <h4 className="font-semibold text-gray-800">Phone</h4>
                                    <p>+91-9876543210</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <MapPin className="w-6 h-6 text-indigo-600" />
                                <div>
                                    <h4 className="font-semibold text-gray-800">Address</h4>
                                    <p>123 Store Street, Pune, India</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Clock className="w-6 h-6 text-indigo-600" />
                                <div>
                                    <h4 className="font-semibold text-gray-800">Working Hours</h4>
                                    <p>Mon–Fri, 9:00 AM – 6:00 PM</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="mt-10">
                            <h4 className="font-semibold text-gray-800 mb-4">Connect with us:</h4>
                            <div className="flex items-center gap-6 text-gray-600">
                                <a href="#" className="hover:text-indigo-600 transition">
                                    <Facebook className="w-7 h-7" />
                                </a>
                                <a href="#" className="hover:text-indigo-600 transition">
                                    <Linkedin className="w-7 h-7" />
                                </a>
                                <a href="#" className="hover:text-indigo-600 transition">
                                    <Instagram className="w-7 h-7" />
                                </a>
                                <a href="#" className="hover:text-indigo-600 transition">
                                    <Twitter className="w-7 h-7" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
                        {isSubmitted ? (
                            <div className="text-center p-8 bg-green-50 rounded-xl">
                                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-green-700">Thank you!</h3>
                                <p className="text-gray-600">We've received your message and will get back to you soon.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                                    <select
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    >
                                        <option>General Inquiry</option>
                                        <option>Feedback</option>
                                        <option>Store Issues</option>
                                        <option>Technical Support</option>
                                        <option>Partnership</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                    <textarea
                                        name="message"
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleChange}
                                        maxLength="400"
                                        required
                                        className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex justify-center items-center gap-2 py-3 px-6 rounded-xl text-white font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition"
                                >
                                    {isLoading ? "Sending..." : <><Send size={20} /> Submit</>}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
                {/* FAQ */}
                  {/* Map + FAQ */}
                <div className="mt-20  flex flex-col gap-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <HelpCircle className="w-6 h-6 text-indigo-600" /> Frequently Asked Questions
                    </h3>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-b pb-3">
                                <button
                                    onClick={() =>
                                        setActiveFAQ(activeFAQ === index ? null : index)
                                    }
                                    className="flex items-center justify-between w-full text-left text-gray-800 font-medium hover:text-indigo-600"
                                >
                                    {faq.q}
                                    {activeFAQ === index ? (
                                        <ChevronUp className="w-5 h-5" />
                                    ) : (
                                        <ChevronDown className="w-5 h-5" />
                                    )}
                                </button>
                                {activeFAQ === index && (
                                    <p className="mt-2 text-gray-600 text-sm">{faq.a}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

               
                    {/* Map */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Our Location</h3>
                        <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                            <Map className="w-12 h-12" />
                            <span className="ml-3">Google Map Placeholder</span>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default ContactPage;
