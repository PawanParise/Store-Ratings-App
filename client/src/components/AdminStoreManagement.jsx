import React, { useState } from 'react';
import { Search, Plus, Trash2, Edit, Star, X } from 'lucide-react';

const mockStores = [
    { id: 1, name: "Gourmet Grocers", address: "123 Market Street, City", storeOwnerEmail: "jane.s@example.com", averageRating: 4.8 },
    { id: 2, name: "Tech Gadgets", address: "456 Innovation Ave, Town", storeOwnerEmail: "sarah.l@example.com", averageRating: 3.5 },
    { id: 3, name: "Artisan Coffee", address: "789 Brew Lane, Village", storeOwnerEmail: "john.doe@example.com", averageRating: 5.0 },
];

const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
        stars.push(<Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />);
    }
    if (hasHalfStar) {
        // In a real scenario, you'd use a half-star icon. For simplicity, we'll just show the number.
    }
    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
        stars.push(<Star key={i + fullStars + (hasHalfStar ? 1 : 0)} size={16} className="text-gray-600" />);
    }
    return <div className="flex items-center gap-1">({rating.toFixed(1)}){stars}</div>;
};

const ManageStoresPage = () => {
    const [stores, setStores] = useState(mockStores);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddingStore, setIsAddingStore] = useState(false);
    const [newStore, setNewStore] = useState({
        name: '',
        address: '',
        storeOwnerEmail: '',
        category: '',
    });
    const [showModal, setShowModal] = useState(null); // 'delete', 'edit', or null
    const [selectedStoreId, setSelectedStoreId] = useState(null);

    const filteredStores = stores.filter(store => {
        const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              store.storeOwnerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              store.address.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    const handleNewStoreChange = (e) => {
        const { name, value } = e.target;
        setNewStore(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAddStore = (e) => {
        e.preventDefault();
        const newStoreId = stores.length > 0 ? Math.max(...stores.map(s => s.id)) + 1 : 1;
        setStores([...stores, { ...newStore, id: newStoreId, averageRating: 0 }]);
        setIsAddingStore(false);
        setNewStore({ name: '', address: '', storeOwnerEmail: '', category: '' });
        setShowModal({ type: 'success', message: 'Store added successfully!' });
    };

    const handleDeleteStore = () => {
        setStores(stores.filter(store => store.id !== selectedStoreId));
        setShowModal({ type: 'success', message: 'Store deleted successfully!' });
        setSelectedStoreId(null);
    };

    const handleEditStore = () => {
        // In a real app, this would open an edit form
        setShowModal({ type: 'info', message: `Editing store with ID: ${selectedStoreId}.` });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900">Manage Stores</h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Add, edit, and monitor all registered stores.
                    </p>
                </div>

                {/* Main Content */}
                <div className="bg-gray-900 text-gray-200 rounded-lg shadow-lg overflow-hidden p-6">
                    {/* Controls */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
                        <div className="relative w-full md:w-1/2">
                            <input
                                type="text"
                                placeholder="Search by name, email, or address..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        </div>
                        <button
                            onClick={() => setIsAddingStore(true)}
                            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white font-medium flex items-center gap-2 transition-colors"
                        >
                            <Plus size={20} />
                            Add New Store
                        </button>
                    </div>

                    {/* Stores Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="py-3 px-4 text-left font-semibold">Store Name</th>
                                    <th className="py-3 px-4 text-left font-semibold hidden md:table-cell">Address</th>
                                    <th className="py-3 px-4 text-left font-semibold">Owner Email</th>
                                    <th className="py-3 px-4 text-left font-semibold">Avg. Rating</th>
                                    <th className="py-3 px-4 text-left font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStores.length > 0 ? (
                                    filteredStores.map(store => (
                                        <tr key={store.id} className="border-b border-gray-800 last:border-b-0 hover:bg-gray-800 transition-colors">
                                            <td className="py-3 px-4 font-medium">{store.name}</td>
                                            <td className="py-3 px-4 hidden md:table-cell">{store.address}</td>
                                            <td className="py-3 px-4">{store.storeOwnerEmail}</td>
                                            <td className="py-3 px-4">
                                                {renderStars(store.averageRating)}
                                            </td>
                                            <td className="py-3 px-4 flex gap-2">
                                                <button
                                                    onClick={() => { setSelectedStoreId(store.id); handleEditStore(); }}
                                                    className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded text-white transition-colors"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => { setSelectedStoreId(store.id); setShowModal({ type: 'delete', message: `Are you sure you want to delete ${store.name}?` }); }}
                                                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="py-6 text-center text-gray-400">No stores found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add New Store Form Modal */}
                {isAddingStore && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                        <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-lg relative">
                            <button
                                onClick={() => setIsAddingStore(false)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 transition-colors"
                            >
                                <X size={24} />
                            </button>
                            <h2 className="text-2xl font-bold text-white mb-6">Add New Store</h2>
                            <form onSubmit={handleAddStore} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Store Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={newStore.name}
                                        onChange={handleNewStoreChange}
                                        className="mt-1 block w-full rounded-md bg-gray-800 text-white border-gray-700 p-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={newStore.address}
                                        onChange={handleNewStoreChange}
                                        className="mt-1 block w-full rounded-md bg-gray-800 text-white border-gray-700 p-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Owner Email</label>
                                    <input
                                        type="email"
                                        name="storeOwnerEmail"
                                        value={newStore.storeOwnerEmail}
                                        onChange={handleNewStoreChange}
                                        className="mt-1 block w-full rounded-md bg-gray-800 text-white border-gray-700 p-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Category</label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={newStore.category}
                                        onChange={handleNewStoreChange}
                                        className="mt-1 block w-full rounded-md bg-gray-800 text-white border-gray-700 p-2"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white font-medium transition-colors mt-6"
                                >
                                    Add Store
                                </button>
                            </form>
                        </div>
                    </div>
                )}
                
                {/* Custom Confirmation/Alert Modal */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                        <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center">
                            <p className="text-white text-lg mb-6">{showModal.message}</p>
                            {showModal.type === 'delete' ? (
                                <div className="flex justify-center gap-4">
                                    <button
                                        onClick={handleDeleteStore}
                                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white font-medium transition-colors"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => setShowModal(null)}
                                        className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg text-white font-medium transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => setShowModal(null)}
                                    className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white font-medium transition-colors"
                                >
                                    OK
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageStoresPage;
