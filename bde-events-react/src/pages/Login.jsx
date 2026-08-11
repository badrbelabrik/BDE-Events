import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false,
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await api.post("/login", {
                email: formData.email,
                password: formData.password,
            });

            console.log(response.data);

            // Store authentication information
            localStorage.setItem("token", response.data.token);
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            // Redirect according to role
            if (response.data.user.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }

        } catch (error) {

            console.error(error);

            if (error.response?.status === 422) {
                setError("Please check your email and password.");
            } else if (error.response?.status === 401) {
                setError("Invalid email or password.");
            } else {
                setError("Something went wrong. Please try again.");
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto my-10">

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8">

                {/* Header */}
                <div className="text-center mb-6">

                    <h1 className="text-2xl font-bold text-gray-900">
                        Welcome Back
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Sign in to manage your campus event passes
                    </p>

                </div>

                {/* Error message */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
                        {error}
                    </div>
                )}

                {/* Login form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Email */}
                    <div>

                        <label
                            htmlFor="email"
                            className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1"
                        >
                            Email Address
                        </label>

                        <div className="relative">

                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <i className="fa-solid fa-envelope text-sm"></i>
                            </span>

                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                autoFocus
                                placeholder="student@campus.edu"
                                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition"
                            />

                        </div>

                    </div>


                    {/* Password */}
                    <div>

                        <div className="flex justify-between items-center mb-1">

                            <label
                                htmlFor="password"
                                className="block text-xs font-semibold text-gray-700 uppercase tracking-wider"
                            >
                                Password
                            </label>

                            <a
                                href="#"
                                className="text-xs text-indigo-600 hover:underline"
                            >
                                Forgot?
                            </a>

                        </div>

                        <div className="relative">

                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <i className="fa-solid fa-lock text-sm"></i>
                            </span>

                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition"
                            />

                        </div>

                    </div>


                    {/* Remember me */}
                    <div className="flex items-center justify-between pt-1">

                        <label className="flex items-center text-xs text-gray-600 cursor-pointer">

                            <input
                                type="checkbox"
                                name="remember"
                                id="remember"
                                checked={formData.remember}
                                onChange={handleChange}
                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                            />

                            <span className="ml-2">
                                Remember me on this device
                            </span>

                        </label>

                    </div>


                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-2.5 px-4 rounded-md shadow-sm transition duration-150 ease-in-out cursor-pointer mt-2 text-sm"
                    >

                        <i className="fa-solid fa-right-to-bracket mr-1.5"></i>

                        {loading ? "Signing In..." : "Sign In"}

                    </button>

                </form>


                {/* Footer */}
                <div className="mt-6 text-center border-t border-gray-100 pt-4">

                    <p className="text-xs text-gray-600">

                        Don't have an account?

                        <Link
                            to="/register"
                            className="font-semibold text-indigo-600 hover:underline ml-1"
                        >
                            Create one now
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}