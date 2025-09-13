import React, { useState, useEffect } from 'react';
import { Search, Plus, Trash2, Edit, X } from 'lucide-react';
import { UserContext } from "./Context";
import { useContext } from "react";

const ManageStoresPage = () => {
    const [stores, setStores] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddingStore, setIsAddingStore] = useState(false);
    const [isEditingStore, setIsEditingStore] = useState(false);
    const [selectedStore, setSelectedStore] = useState(null);
    const [newStore, setNewStore] = useState({
        name: '',
        address: '',
        owner_id: '',
    });
    const [showModal, setShowModal] = useState(null);
    const { allUsers, setAllUserData } = useContext(UserContext)
    // Fetch all stores
    useEffect(() => {
        const fetchStores = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/v1/store_app/get-stores');
                const data = await res.json();
                if (data.allStores) {
                    setStores(data.allStores);
                } else {
                    console.error('Failed to fetch stores');
                }
            } catch (err) {
                console.error('Error fetching stores:', err);
            }
        };
        fetchStores();
    }, []);

    const filteredStores = stores.filter(store =>
        store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        store.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(store.owner_id).includes(searchTerm)
    );

    const handleNewStoreChange = (e) => {
        const { name, value } = e.target;
        setNewStore(prev => ({ ...prev, [name]: value }));
    };

    // Add store
    const handleAddStore = async (e) => {
        e.preventDefault();
        if (!newStore.name || !newStore.address || !newStore.owner_id) {
            alert('All fields are required.');
            return;
        }
        try {
            const res = await fetch('http://localhost:5000/api/v1/store_app/add-store', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newStore),
            });
            const data = await res.json();
            if (data.id) {
                setStores(prev => [...prev, data]);
                setShowModal({ type: 'success', message: 'Store added successfully!' });
                setIsAddingStore(false);
                setNewStore({ name: '', address: '', owner_id: '' });
            } else {
                alert(data.message || 'Failed to add store.');
            }
        } catch (err) {
            console.error(err);
            alert('Error adding store.');
        }
    };

    // Delete store
    const handleDeleteStore = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/v1/store_app/delete-store/${selectedStore.id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success) {
                setStores(prev => prev.filter(s => s.id !== selectedStore.id));
                setShowModal({ type: 'success', message: 'Store deleted successfully!' });
                setSelectedStore(null);
            } else {
                alert(data.message || 'Failed to delete store.');
            }
        } catch (err) {
            console.error(err);
            alert('Error deleting store.');
        }
    };

    // Edit store
    const handleUpdateStore = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:5000/api/v1/store_app/edit-store/${selectedStore.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newStore),
            });
            const data = await res.json();
            if (data.success && data.store) {
                setStores(prev => prev.map(s => (s.id === selectedStore.id ? data.store : s)));
                setShowModal({ type: 'success', message: 'Store updated successfully!' });
                setIsEditingStore(false);
                setSelectedStore(null);
                setNewStore({ name: '', address: '', owner_id: '' });
            } else {
                alert(data.message || 'Failed to update store.');
            }
        } catch (err) {
            console.error(err);
            alert('Error updating store.');
        }
    };

    const openEditModal = (store) => {
        setSelectedStore(store);
        setNewStore({
            name: store.name,
            address: store.address,
            owner_id: store.owner_id,
        });
        setIsEditingStore(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900">Manage Stores</h1>
                    <p className="mt-2 text-lg text-gray-600">Add, edit, and monitor all registered stores.</p>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
                    <div className="relative w-full md:w-1/2">
                        <input
                            type="text"
                            placeholder="Search by name, address or owner ID..."
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

                <div className="bg-gray-900 text-gray-200 rounded-lg shadow-lg overflow-hidden p-6">
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="py-3 px-4 text-left font-semibold">Store Name</th>
                                    <th className="py-3 px-4 text-left font-semibold">Address</th>
                                    <th className="py-3 px-4 text-left font-semibold">Owner Name</th>
                                    <th className="py-3 px-4 text-left font-semibold">Owner Email</th>
                                    <th className="py-3 px-4 text-left font-semibold">Average Rating</th>
                                    <th className="py-3 px-4 text-left font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stores.length > 0 ? (
                                    stores.map(store => (
                                        <tr key={store.id} className="border-b border-gray-800 last:border-b-0 hover:bg-gray-800 transition-colors">
                                            <td className="py-3 px-4 font-medium">{store.name}</td>
                                            <td className="py-3 px-4">{store.address}</td>
                                            <td className="py-3 px-4"> {allUsers.filter(u => u.id === store.owner_id)[0]?.name}</td>
                                            <td className="py-3 px-4"> {allUsers.filter(u => u.id === store.owner_id)[0]?.email}</td>
                                            <td className="py-3 px-4">  none</td>
                                            <td className="py-3 px-4 flex gap-2">

                                                <button
                                                    onClick={() => { setSelectedStore(store); setShowModal({ type: 'delete', message: `Are you sure you want to delete ${store.name}?` }); }}
                                                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="py-6 text-center text-gray-400">No stores found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {(isAddingStore || isEditingStore) && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-70">
                        <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-lg relative">
                            <button
                                onClick={() => { setIsAddingStore(false); setIsEditingStore(false); setSelectedStore(null); }}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 transition-colors"
                            >
                                <X size={24} />
                            </button>
                            <h2 className="text-2xl font-bold text-white mb-6">{isAddingStore ? 'Add New Store' : 'Edit Store'}</h2>
                            <form onSubmit={isAddingStore ? handleAddStore : handleUpdateStore} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Store Name</label>
                                    <input type="text" name="name" value={newStore.name} onChange={handleNewStoreChange} className="mt-1 block w-full rounded-md bg-gray-800 text-white border-gray-700 p-2" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Address</label>
                                    <input type="text" name="address" value={newStore.address} onChange={handleNewStoreChange} className="mt-1 block w-full rounded-md bg-gray-800 text-white border-gray-700 p-2" required />
                                </div>
                                <div>
                                    <select
                                        name="owner_id"
                                        value={newStore.owner_id}
                                        onChange={(e) => setNewStore({ ...newStore, owner_id: e.target.value })}
                                        className="mt-1 block w-full rounded-md bg-gray-800 text-white border-gray-700 p-2"
                                        required
                                    >
                                        <option value="">Assign Store Owner</option>
                                        {allUsers
                                            .filter(u => u.type === "Store Owner") // ✅ filter only store owners
                                            .map((owner) => (
                                                <option key={owner.id} value={owner.id}>
                                                    {owner.name} ({owner.email})
                                                </option>
                                            ))}
                                    </select>
                                </div>

                                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white font-medium transition-colors mt-6">{isAddingStore ? 'Add Store' : 'Update Store'}</button>
                            </form>
                        </div>
                    </div>
                )}

                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-70">
                        <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center">
                            <p className="text-white text-lg mb-6">{showModal.message}</p>
                            {showModal.type === 'delete' ? (
                                <div className="flex justify-center gap-4">
                                    <button onClick={handleDeleteStore} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white font-medium transition-colors">Delete</button>
                                    <button onClick={() => { setShowModal(null); setSelectedStore(null); }} className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg text-white font-medium transition-colors">Cancel</button>
                                </div>
                            ) : (
                                <button onClick={() => setShowModal(null)} className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white font-medium transition-colors">OK</button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageStoresPage;
