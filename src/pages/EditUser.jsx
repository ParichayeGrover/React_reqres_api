import React from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Input from '../components/Input';

function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({ 
        first_name: "", 
        last_name: "", 
        email: "" 
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const localEdits = JSON.parse(localStorage.getItem('userEdits') || '{}');
                if (localEdits[id]) {
                    setUser(localEdits[id]);
                    setLoading(false);
                    return;
                }

                const response = await fetch(`https://reqres.in/api/users/${id}`);
                const data = await response.json();
                if (response.ok) {
                    setUser(data.data);
                } else {
                    throw new Error("Failed to fetch user data");
                }
            } catch (err) {
                setError(err.message || "Failed to load user");
                navigate("/users");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userEdits = JSON.parse(localStorage.getItem('userEdits') || '{}');
        userEdits[id] = user;
        localStorage.setItem('userEdits', JSON.stringify(userEdits));
        navigate("/users");
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
                    <div className="flex items-center">
                        <Link 
                            to="/users" 
                            className="text-white hover:text-blue-200 transition-colors mr-4"
                        >
                            <span className="material-symbols-outlined">arrow_back</span>
                        </Link>
                        <h2 className="text-2xl font-bold text-white">Edit User Profile</h2>
                    </div>
                </div>

                <div className="p-8">
                    {error && (
                        <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="first_name">
                                First Name
                            </label>
                            <Input
                                type="text"
                                id="first_name"
                                name="first_name"
                                value={user.first_name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="last_name">
                                Last Name
                            </label>
                            <Input
                                type="text"
                                id="last_name"
                                name="last_name"
                                value={user.last_name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div className="pt-4">
                            <button 
                                type="submit" 
                                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium py-3 px-4 rounded-lg shadow-md transition duration-300"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditUser;