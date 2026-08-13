import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [errors, setErrors] = useState({});
    const [generalError, setGeneralError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({});
        setGeneralError("");
        setLoading(true);

        try {

            const response = await api.post("/register", formData);

            console.log(response.data);

            /*
             * If your API returns a token after registration,
             * store it here.
             */
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
            }

            if (response.data.user) {
                localStorage.setItem(
                    "user",
                    JSON.stringify(response.data.user)
                );
            }

            // Redirect to home after successful registration
            navigate("/");

        } catch (error) {

            console.error(error);

            if (error.response?.status === 422) {

                // Laravel validation errors
                setErrors(error.response.data.errors || {});

            } else {

                setGeneralError(
                    error.response?.data?.message ||
                    "Something went wrong. Please try again."
                );
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
                        Create an Account
                    </h1>

                    <p className="text-sm text-gray-500 mt-1">
                        Join BDE-Events to reserve your campus passes
                    </p>

                </div>


                {/* General Error */}
                {generalError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
                        {generalError}
                    </div>
                )}


                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Name */}
                    <div>

                        <label
                            htmlFor="name"
                            className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1"
                        >
                            Full Name
                        </label>

                        <div className="relative">

                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <i className="fa-solid fa-user text-sm"></i>
                            </span>

                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                autoFocus
                                placeholder="John Doe"
                                className={`w-full pl-9 pr-3 py-2 border ${
                                    errors.name
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition`}
                            />

                        </div>

                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.name[0]}
                            </p>
                        )}

                    </div>


                    {/* Email */}
                    <div>

                        <label
                            htmlFor="email"
                            className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1"
                        >
                            Student Email
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
                                placeholder="student@campus.edu"
                                className={`w-full pl-9 pr-3 py-2 border ${
                                    errors.email
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition`}
                            />

                        </div>

                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.email[0]}
                            </p>
                        )}

                    </div>


                    {/* Password */}
                    <div>

                        <label
                            htmlFor="password"
                            className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1"
                        >
                            Password
                        </label>

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
                                className={`w-full pl-9 pr-3 py-2 border ${
                                    errors.password
                                        ? "border-red-500"
                                        : "border-gray-300"
                                } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition`}
                            />

                        </div>

                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.password[0]}
                            </p>
                        )}

                    </div>


                    {/* Confirm Password */}
                    <div>

                        <label
                            htmlFor="password_confirmation"
                            className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1"
                        >
                            Confirm Password
                        </label>

                        <div className="relative">

                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <i className="fa-solid fa-shield-halved text-sm"></i>
                            </span>

                            <input
                                type="password"
                                name="password_confirmation"
                                id="password_confirmation"
                                value={formData.password_confirmation}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition"
                            />

                        </div>

                        {errors.password_confirmation && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.password_confirmation[0]}
                            </p>
                        )}

                    </div>


                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-2.5 px-4 rounded-md shadow-sm transition duration-150 ease-in-out cursor-pointer mt-2 text-sm"
                    >

                        <i className="fa-solid fa-user-plus mr-1.5"></i>

                        {loading
                            ? "Creating Account..."
                            : "Register Account"
                        }

                    </button>

                </form>


                {/* Footer */}
                <div className="mt-6 text-center border-t border-gray-100 pt-4">

                    <p className="text-xs text-gray-600">

                        Already have an account?

                        <Link
                            to="/login"
                            className="font-semibold text-indigo-600 hover:underline ml-1"
                        >
                            Sign in here
                        </Link>

                    </p>

                </div>

            </div>

        </div>
    );
}