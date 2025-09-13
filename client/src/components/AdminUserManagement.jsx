import React, { useState, useContext, useEffect } from 'react';
import { Search, UserPlus, Trash2, Edit, X } from 'lucide-react';
import { UserContext } from "./Context";

const ManageUsersPage = () => {
    const { allUsers, setAllUser } = useContext(UserContext);
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState('All');
    const [isAddingUser, setIsAddingUser] = useState(false);
    const [isEditingUser, setIsEditingUser] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        password: '',
        address: '',
        type: 'Normal User',
    });

    // Initialize users from context
    useEffect(() => {
        if (allUsers && allUsers.length > 0) {
            setUsers(allUsers);
        }
    }, [allUsers]);

    // Filter users by search and role
    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.address.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'All' || user.type === filterRole;
        return matchesSearch && matchesRole;
    });

    // Input change handler
    const handleNewUserChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prev => ({ ...prev, [name]: value }));
    };

    // Add User API
    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:5000/api/v1/store_app/sign-up`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });
            const data = await res.json();
            if (data.success && data.user) {
                setUsers(prev => [...prev, data.user]);
                setAllUser(prev => [...prev, data.user]);
                alert('User added successfully!');
                setNewUser({ name: '', email: '', password: '', address: '', type: 'Normal User' });
                setIsAddingUser(false);
            } else {
                if(data.message==="Email already registered."){
                     alert(data.message);
                }
                else{
                     alert('Failed to add user.');
                }
                
            }
        } catch (err) {
            console.error(err);
            alert('Error adding user.');
        }
    };

    // Delete User API
    const handleDeleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            const res = await fetch(`http://localhost:5000/api/v1/store_app/delete-user/${userId}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success) {
                const updatedUsers = users.filter(u => u.id !== userId);
                setUsers(updatedUsers);
                setAllUser(updatedUsers);
                alert('User deleted successfully!');
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error(err);
            alert('Error deleting user.');
        }
    };

    // Open Edit Form
    const handleEditUser = (user) => {
        setCurrentUser(user);
        setNewUser({ ...user });
        setIsEditingUser(true);
    };

    // Edit User API
    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:5000/api/v1/store_app/edit-user/${currentUser.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });
            const data = await res.json();
            if (data.success && data.user) {
                const updatedUsers = users.map(u => (u.id === currentUser.id ? data.user : u));
                setUsers(updatedUsers);
                setAllUser(updatedUsers);
                alert('User updated successfully!');
                setIsEditingUser(false);
                setCurrentUser(null);
                setNewUser({ name: '', email: '', password: '', address: '', type: 'Normal User' });
            } else {
                 alert(data.message)
            }
        } catch (err) {
            console.error(err);
            alert('Error updating user.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900">Manage Users</h1>
                    <p className="mt-2 text-lg text-gray-600">Add, edit, and manage all users on the platform.</p>
                </div>

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
                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${filterRole === role ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
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
                <div className="overflow-x-auto bg-gray-900 text-gray-200 rounded-lg shadow-lg p-6">
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
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.type === 'Normal User' ? 'bg-indigo-600 text-white' :
                                                    user.type === 'Store Owner' ? 'bg-yellow-600 text-white' :
                                                        'bg-red-600 text-white'
                                                }`}>
                                                {user.type}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 flex gap-2">
                                            <button
                                                onClick={() => handleEditUser(user)}
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

                {/* Add User Modal */}
                {(isAddingUser || isEditingUser) && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-traperent ">
                        <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-lg relative">
                            <button
                                onClick={() => {
                                    setIsAddingUser(false);
                                    setIsEditingUser(false);
                                    setCurrentUser(null);
                                    setNewUser({ name: '', email: '', password: '', address: '', type: 'Normal User' });
                                }}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-300 transition-colors"
                            >
                                <X size={24} />
                            </button>
                            <h2 className="text-2xl font-bold text-white mb-6">
                                {isAddingUser ? 'Add New User' : 'Edit User'}
                            </h2>
                            <form onSubmit={isAddingUser ? handleAddUser : handleUpdateUser} className="space-y-4">
                                {['name', 'email', 'password', 'address'].map(field => (
                                    <div key={field}>
                                        <label className="block text-sm font-medium text-gray-400">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                        <input
                                            type={field === 'password' ? 'password' : 'text'}
                                            name={field}
                                            value={newUser[field]}
                                            onChange={handleNewUserChange}
                                            className="mt-1 block w-full rounded-md bg-white text-black border-gray-700 p-2"
                                            required
                                        />
                                    </div>
                                ))}
                                <div>
                                    <label className="block text-sm font-medium text-gray-400">Role</label>
                                    <select
                                        name="type"
                                        value={newUser.type}
                                        onChange={handleNewUserChange}
                                        className="mt-1 block w-full rounded-md bg-white text-black border-gray-700 p-2"
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
                                    {isAddingUser ? 'Add User' : 'Update User'}
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