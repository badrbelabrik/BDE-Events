@extends('layouts.app')

@section('content')
    <div class="space-y-6">

        <!-- HERO / BANNER CARD -->
        <div class="bg-white border border-gray-200 rounded-lg shadow-sm p-8 md:p-12 text-center relative overflow-hidden">
            <div class="max-w-3xl mx-auto">
            <span class="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-indigo-100">
                Official BDE Campus Platform
            </span>
                <h1 class="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                    Centralized Campus Event Hub
                </h1>
                <p class="text-gray-600 text-base sm:text-lg mb-8 leading-relaxed">
                    BDE-Events provides the Student Union (BDE) with a complete administration dashboard to publish and manage campus events, while allowing students to reserve tickets instantly with a single click and access unique digital passes directly from their profiles.
                </p>

                @guest
                    <div class="flex flex-col sm:flex-row justify-center gap-3">
                        <a href="{{ route('show.register') }}" class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-md shadow transition">
                            Join Platform & Register
                        </a>
                        <a href="{{ route('show.login') }}" class="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold px-6 py-2.5 rounded-md transition">
                            Sign In to Your Account
                        </a>
                    </div>
                @else
                    <a href="#" class="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-md shadow transition">
                        <i class="fa-solid fa-calendar-days mr-2"></i> Explore Campus Events
                    </a>
                @endguest
            </div>
        </div>

        <!-- PLATFORM FEATURES GRID -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

            <!-- FEATURE 1: 1-CLICK RESERVATION -->
            <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:border-indigo-300 transition">
                <div class="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                    <i class="fa-solid fa-bolt text-lg"></i>
                </div>
                <h3 class="font-bold text-gray-900 text-lg mb-2">1-Click Registration</h3>
                <p class="text-gray-600 text-sm leading-relaxed">
                    Registered students can enroll in free campus events immediately without going through complicated payment tunnels.
                </p>
            </div>

            <!-- FEATURE 2: DIGITAL PASS GENERATOR -->
            <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:border-indigo-300 transition">
                <div class="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center mb-4">
                    <i class="fa-solid fa-ticket text-lg"></i>
                </div>
                <h3 class="font-bold text-gray-900 text-lg mb-2">Digital Ticket Pass</h3>
                <p class="text-gray-600 text-sm leading-relaxed">
                    Generate unique digital booking passes (e.g., <code class="text-xs bg-gray-100 px-1 py-0.5 rounded font-mono">BDE-2026-XXXXX</code>) accessible at any time under your student profile.
                </p>
            </div>

            <!-- FEATURE 3: ADMIN DASHBOARD -->
            <div class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:border-indigo-300 transition">
                <div class="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center mb-4">
                    <i class="fa-solid fa-chart-pie text-lg"></i>
                </div>
                <h3 class="font-bold text-gray-900 text-lg mb-2">BDE Admin Control</h3>
                <p class="text-gray-600 text-sm leading-relaxed">
                    Real-time tracking of event capacity, available seats, and reservations with protected admin-only access routes.
                </p>
            </div>

        </div>

    </div>
@endsection
