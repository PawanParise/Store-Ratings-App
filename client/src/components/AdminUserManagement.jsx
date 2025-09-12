import React, { useState } from 'react';
import { Search, UserPlus, Trash2, Edit, X } from 'lucide-react';

const mockUsers = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", address: "123 Main St", role: "Normal User" },
    { id: 2, name: "Jane Smith", email: "jane.s@example.com", address: "456 Oak Ave", role: "Store Owner" },
    { id: 3, name: "Admin User", email: "admin@example.com", address: "789 Pine Ln", role: "System Administrator" },
    { id: 4, name: "Alex Jones", email: "alex.j@example.com", address: "101 Maple Rd", role: "Normal User" },
    { id: 5, name: "Sarah Lee", email: "sarah.l@example.com", address: "202 Birch Blvd", role: "Store Owner" },
];

const ManageUsersPage = () => {
    const [users, setUsers] = useState(mockUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('All');
    const [isAddingUser, setIsAddingUser] = useState(false);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        role: 'Normal User',
    });

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              user.address.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'All' || user.role === filterRole;
        return matchesSearch && matchesRole;
    });

    const handleNewUserChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prevState => ({ ...prevState, [name]: value }));
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        // In a real app, this would be an API call
        const newUserId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
        setUsers([...users, { ...newUser, id: newUserId }]);
        alert('User added successfully!');
        setNewUser({ name: '', email: '', password: '', address: '', role: 'Normal User' });
        setIsAddingUser(false);
    };

    const handleDeleteUser = (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            setUsers(users.filter(user => user.id !== userId));
            alert('User deleted.');
        }
    };

    const handleEditUser = (userId) => {
        alert(`Editing user with ID: ${userId}. In a real app, this would open an edit form.`);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900">Manage Users</h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Add, edit, and manage all users on the platform.
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
                        <div className="flex gap-2">
                            {['All', 'Normal User', 'Store Owner', 'System Administrator'].map(role => (
                                <button
                                    key={role}
                                    onClick={() => setFilterRole(role)}
                                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                                        filterRole === role
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                    }`}
                                >
                                    {role}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setIsAddingUser(true)}
                            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white font-medium flex items-center gap-2 transition-colors"
                        >
                            <UserPlus size={20} />
                            Add New User
                        </button>
                    </div>

                    {/* Users Table */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="py-3 px-4 text-left font-semibold">Name</th>
                                    <th className="py-3 px-4 text-left font-semibold">Email</th>
                                    <th className="py-3 px-4 text-left font-semibold hidden md:table-cell">Address</th>
                                    <th className="py-3 px-4 text-left font-semibold">Role</th>
                                    <th className="py-3 px-4 text-left font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map(user => (
                                        <tr key={user.id} className="border-b border-gray-800 last:border-b-0 hover:bg-gray-800 transition-colors">
                                            <td className="py-3 px-4">{user.name}</td>
                                            <td className="py-3 px-4">{user.email}</td>
                                            <td className="py-3 px-4 hidden md:table-cell">{user.address}</td>
                                            <td className="py-3 px-4">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                    user.role === 'Normal User' ? 'bg-indigo-600 text-white' :
                                                    user.role === 'Store Owner' ? 'bg-yellow-600 text-white' :
                                                    'bg-red-600 text-white'
                                                }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 flex gap-2">
                                                <button
                                                    onClick={() => handleEditUser(user.id)}
                                                    className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded text-white transition-colors"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="py-6 text-center text-gray-400">No users found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add New User Form Modal */}
                {isAddingUser && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
                        <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-lg relative">
                            <button
                                onClick={() => setIsAddingUser(false)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 transition-colors"
                            >
                                <X size={24} />
                            </button>
                            <h2 className="text-2xl font-bold text-white mb-6">Add New User</h2>
                            <form onSubmit={handleAddUser} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={newUser.name}
                                        onChange={handleNewUserChange}
                                        className="mt-1 block w-full rounded-md bg-gray-800 text-white border-gray-700 p-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={newUser.email}
                                        onChange={handleNewUserChange}
                                        className="mt-1 block w-full rounded-md bg-gray-800 text-white border-gray-700 p-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={newUser.password}
                                        onChange={handleNewUserChange}
                                        className="mt-1 block w-full rounded-md bg-gray-800 text-white border-gray-700 p-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={newUser.address}
                                        onChange={handleNewUserChange}
                                        className="mt-1 block w-full rounded-md bg-gray-800 text-white border-gray-700 p-2"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Role</label>
                                    <select
                                        name="role"
                                        value={newUser.role}
                                        onChange={handleNewUserChange}
                                        className="mt-1 block w-full rounded-md bg-gray-800 text-white border-gray-700 p-2"
                                    >
                                        <option value="Normal User">Normal User</option>
                                        <option value="Store Owner">Store Owner</option>
                                        <option value="System Administrator">System Administrator</option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white font-medium transition-colors mt-6"
                                >
                                    Add User
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageUsersPage;
