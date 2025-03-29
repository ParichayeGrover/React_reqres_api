import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [localEdits] = useState(() => {
        const edits = localStorage.getItem('userEdits');
        return edits ? JSON.parse(edits) : {};
    });
    const [deletedUsers, setDeletedUsers] = useState(() => {
        const deleted = localStorage.getItem('deletedUsers');
        return deleted ? JSON.parse(deleted) : [];
    });

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://reqres.in/api/users?page=${page}`);
            const data = await response.json();
            if (!response.ok) throw new Error("Failed to fetch users!");
            
            const filteredUsers = data.data.filter(user => !deletedUsers.includes(user.id));
            setUsers(filteredUsers);
            setTotalPages(data.total_pages);
        } catch (error) {
            console.error("Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [page, deletedUsers]);

    const handleDelete = async (userId) => {
        if (window.confirm("This will delete the user data, are you ready for this?")) {
            try {
                const response = await fetch(`https://reqres.in/api/users/${userId}`, {
                    method: 'DELETE'
                });
                
                if (!response.ok) throw new Error("Delete failed");
                
                const userEdits = JSON.parse(localStorage.getItem('userEdits') || '{}');
                delete userEdits[userId];
                localStorage.setItem('userEdits', JSON.stringify(userEdits));
                
                const newDeletedUsers = [...deletedUsers, userId];
                localStorage.setItem('deletedUsers', JSON.stringify(newDeletedUsers));
                setDeletedUsers(newDeletedUsers);
                setUsers(prev => prev.filter(user => user.id !== userId));
            } catch (error) {
                console.error("Delete Error:", error);
                alert("Failed to delete user");
            }
        }
    };

    const handleReset = () => {
        localStorage.removeItem('userEdits');
        localStorage.removeItem('deletedUsers');
        setDeletedUsers([]);
        fetchUsers();
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4'>
            <div className='max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-hidden'>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <Link to={"/"} className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                            <span className="material-symbols-outlined mr-2">arrow_back</span>
                            <span>Back</span>
                        </Link>
                        <h2 className='text-3xl font-bold text-gray-800'>User Management</h2>
                        <div className="w-8"></div> {/* Spacer for alignment */}
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className='w-full'>
                            <thead className='bg-gradient-to-r from-blue-500 to-blue-600'>
                                <tr>
                                    <th className='px-6 py-3 text-left text-white font-semibold'>Avatar</th>
                                    <th className='px-6 py-3 text-left text-white font-semibold'>First Name</th>
                                    <th className='px-6 py-3 text-left text-white font-semibold'>Last Name</th>
                                    <th className='px-6 py-3 text-left text-white font-semibold'>Email</th>
                                    <th className='px-6 py-3 text-center text-white font-semibold'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr key={user.id} className='hover:bg-gray-50 transition-colors'>
                                        <td className='px-6 py-4'>
                                            <img
                                                src={user.avatar}
                                                alt={`${user.first_name}'s avatar`}
                                                className='w-12 h-12 rounded-full object-cover border-2 border-blue-100'
                                            />
                                        </td>
                                        <td className='px-6 py-4 text-gray-700'>
                                            {localEdits[user.id]?.first_name || user.first_name}
                                        </td>
                                        <td className='px-6 py-4 text-gray-700'>
                                            {localEdits[user.id]?.last_name || user.last_name}
                                        </td>
                                        <td className='px-6 py-4 text-gray-700'>
                                            {localEdits[user.id]?.email || user.email}
                                        </td>
                                        <td className='px-6 py-4 text-center'>
                                            <div className="flex justify-center space-x-2">
                                                <Link to={`/edit/${user.id}`}>
                                                    <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors shadow-sm flex items-center text-black!">
                                                        <span className="material-symbols-outlined mr-1 text-sm bg-green-500">edit</span>
                                                        Edit
                                                    </button>
                                                </Link>
                                                <button 
                                                    className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors shadow-sm flex items-center text-black!"
                                                    onClick={() => handleDelete(user.id)}
                                                >
                                                    <span className="bg-red-500 material-symbols-outlined mr-1 text-sm">delete</span>
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setPage(p => Math.max(p - 1, 1))}
                                disabled={page === 1}
                                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50! text-black! disabled:opacity-50 transition-colors shadow-sm"
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2 text-gray-700">
                                Page {page} of {totalPages}
                            </span>
                            <button
                                onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                                disabled={page === totalPages}
                                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors shadow-sm text-black"
                            >
                                Next
                            </button>
                        </div>
                        <button 
                            onClick={handleReset}
                            className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors shadow-sm flex items-center text-black!"
                        >
                            <span className=" bg-red-400! text-black! material-symbols-outlined mr-1 text-sm">restart_alt</span>
                            Reset All Data
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserList;