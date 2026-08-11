import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-14">

                {/* Brand / Logo */}
                <div className="flex items-center space-x-2 flex-1">
                    <Link
                        to="/"
                        className="text-indigo-600 font-black text-2xl tracking-wider"
                    >
                        BDE
                        <span className="bg-indigo-600 text-white px-1.5 py-0.5 rounded ml-0.5 text-xl font-bold">
                            Events
                        </span>
                    </Link>
                </div>

                {/* Navigation */}
                <div className="flex items-center space-x-6 text-gray-500 text-xs">

                    {!isAuthenticated ? (
                        <>
                            <div className="border-l border-gray-200 h-8 mx-2 hidden sm:block"></div>

                            <Link
                                to="/login"
                                className="text-indigo-600 font-semibold px-3 py-1.5 rounded hover:bg-indigo-50 transition"
                            >
                                Sign In
                            </Link>

                            <Link
                                to="/register"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-1.5 rounded transition shadow-sm"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <>
                            {/* Admin */}
                            {user?.role === "admin" ? (
                                <Link
                                    to="/admin"
                                    className="flex flex-col items-center text-amber-600 hover:text-amber-700 px-1 py-1 transition font-bold"
                                >
                                    <i className="fa-solid fa-chart-line text-xl mb-0.5"></i>
                                    <span className="hidden sm:block">
                                        Admin
                                    </span>
                                </Link>
                            ) : (
                                /* Student */
                                <Link
                                    to="/profile/tickets"
                                    className="flex flex-col items-center hover:text-indigo-600 px-1 py-1 transition"
                                >
                                    <i className="fa-solid fa-ticket text-xl mb-0.5"></i>
                                    <span className="hidden sm:block">
                                        My Tickets
                                    </span>
                                </Link>
                            )}

                            <div className="border-l border-gray-200 h-8 mx-2 hidden sm:block"></div>

                            {/* User Dropdown */}
                            <div className="relative group">

                                <button
                                    type="button"
                                    className="flex flex-col items-center hover:text-gray-900 px-1 py-1 transition focus:outline-none cursor-pointer"
                                >
                                    <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 font-bold text-xs flex items-center justify-center mb-0.5 border border-indigo-200">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </div>

                                    <span className="hidden sm:block">
                                        Me{" "}
                                        <i className="fa-solid fa-caret-down text-[10px] group-hover:rotate-180 transition-transform"></i>
                                    </span>
                                </button>

                                {/* Dropdown */}
                                <div className="absolute right-0 mt-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50 text-sm font-normal text-gray-700 hidden group-hover:block group-focus-within:block">

                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <p className="font-semibold text-gray-900 text-sm leading-tight">
                                            {user?.name}
                                        </p>

                                        <p className="text-xs text-gray-500 capitalize">
                                            {user?.role} Account
                                        </p>
                                    </div>

                                    <div className="border-t border-gray-100 my-1"></div>

                                    <button
                                        onClick={logout}
                                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition cursor-pointer font-medium"
                                    >
                                        <i className="fa-solid fa-arrow-right-from-bracket mr-2 text-xs"></i>
                                        Sign Out
                                    </button>

                                </div>
                            </div>
                        </>
                    )}

                </div>
            </div>
        </nav>
    );
}

export default Header;