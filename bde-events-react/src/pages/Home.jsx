import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
    const { isAuthenticated } = useAuth();

    return (
        <div className="space-y-6">

            {/* Hero / Banner */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 md:p-12 text-center relative overflow-hidden">

                <div className="max-w-3xl mx-auto">

                    <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-indigo-100">
                        Official BDE Campus Platform
                    </span>

                    <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                        Centralized Campus Event Hub
                    </h1>

                    <p className="text-gray-600 text-base sm:text-lg mb-8 leading-relaxed">
                        BDE-Events provides the Student Union (BDE)
                        with a complete administration dashboard to
                        publish and manage campus events, while allowing
                        students to reserve tickets instantly with a
                        single click and access unique digital passes
                        directly from their profiles.
                    </p>

                    {!isAuthenticated ? (
                        <div className="flex flex-col sm:flex-row justify-center gap-3">

                            <Link
                                to="/register"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-md shadow transition"
                            >
                                Join Platform & Register
                            </Link>

                            <Link
                                to="/login"
                                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-6 py-2.5 rounded-md transition"
                            >
                                Sign In to Your Account
                            </Link>

                        </div>
                    ) : (
                        <Link
                            to="/events"
                            className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-md shadow transition"
                        >
                            <i className="fa-solid fa-calendar-days mr-2"></i>
                            Explore Campus Events
                        </Link>
                    )}

                </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Feature 1 */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:border-indigo-300 transition">

                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                        <i className="fa-solid fa-bolt text-lg"></i>
                    </div>

                    <h3 className="font-bold text-gray-900 text-lg mb-2">
                        1-Click Registration
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed">
                        Registered students can enroll in free campus
                        events immediately without going through
                        complicated payment tunnels.
                    </p>

                </div>

                {/* Feature 2 */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:border-indigo-300 transition">

                    <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center mb-4">
                        <i className="fa-solid fa-ticket text-lg"></i>
                    </div>

                    <h3 className="font-bold text-gray-900 text-lg mb-2">
                        Digital Ticket Pass
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed">
                        Generate unique digital booking passes
                        (
                        <code className="text-xs bg-gray-100 px-1 py-0.5 rounded font-mono">
                            BDE-2026-XXXXX
                        </code>
                        ) accessible at any time under your student profile.
                    </p>

                </div>

                {/* Feature 3 */}
                <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:border-indigo-300 transition">

                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center mb-4">
                        <i className="fa-solid fa-chart-pie text-lg"></i>
                    </div>

                    <h3 className="font-bold text-gray-900 text-lg mb-2">
                        BDE Admin Control
                    </h3>

                    <p className="text-gray-600 text-sm leading-relaxed">
                        Real-time tracking of event capacity,
                        available seats, and reservations with
                        protected admin-only access routes.
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Home;