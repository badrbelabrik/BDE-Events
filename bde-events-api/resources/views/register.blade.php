@extends('layouts.app')

@section('content')
    <div class="max-w-md mx-auto my-10">
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-8">

            <!-- Header -->
            <div class="text-center mb-6">
                <h1 class="text-2xl font-bold text-gray-900">Create an Account</h1>
                <p class="text-sm text-gray-500 mt-1">Join BDE-Events to reserve your campus passes</p>
            </div>

            <!-- Session Status / Flash Messages -->
            @if (session('status'))
                <div class="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 text-sm rounded-md">
                    {{ session('status') }}
                </div>
            @endif

            <form action="{{route('register')}}" method="POST" class="space-y-4">
                @csrf

                <!-- Name Field -->
                <div>
                    <label for="name" class="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        Full Name
                    </label>
                    <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <i class="fa-solid fa-user text-sm"></i>
                    </span>
                        <input type="text"
                               name="name"
                               id="name"
                               value="{{ old('name') }}"
                               required
                               autofocus
                               placeholder="John Doe"
                               class="w-full pl-9 pr-3 py-2 border @error('name') border-red-500 @else border-gray-300 @enderror rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition">
                    </div>
                    @error('name')
                    <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Email Field -->
                <div>
                    <label for="email" class="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        Student Email
                    </label>
                    <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <i class="fa-solid fa-envelope text-sm"></i>
                    </span>
                        <input type="email"
                               name="email"
                               id="email"
                               value="{{ old('email') }}"
                               required
                               placeholder="student@campus.edu"
                               class="w-full pl-9 pr-3 py-2 border @error('email') border-red-500 @else border-gray-300 @enderror rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition">
                    </div>
                    @error('email')
                    <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Password Field -->
                <div>
                    <label for="password" class="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        Password
                    </label>
                    <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <i class="fa-solid fa-lock text-sm"></i>
                    </span>
                        <input type="password"
                               name="password"
                               id="password"
                               required
                               placeholder="••••••••"
                               class="w-full pl-9 pr-3 py-2 border @error('password') border-red-500 @else border-gray-300 @enderror rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition">
                    </div>
                    @error('password')
                    <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
                    @enderror
                </div>

                <!-- Confirm Password Field -->
                <div>
                    <label for="password_confirmation" class="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                        Confirm Password
                    </label>
                    <div class="relative">
                    <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <i class="fa-solid fa-shield-halved text-sm"></i>
                    </span>
                        <input type="password"
                               name="password_confirmation"
                               id="password_confirmation"
                               required
                               placeholder="••••••••"
                               class="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition">
                    </div>
                </div>

                <!-- Submit Button -->
                <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-md shadow-sm transition duration-150 ease-in-out cursor-pointer mt-2 text-sm">
                    <i class="fa-solid fa-user-plus mr-1.5"></i> Register Account
                </button>
            </form>

            <!-- Footer Link -->
            <div class="mt-6 text-center border-t border-gray-100 pt-4">
                <p class="text-xs text-gray-600">
                    Already have an account?
                    <a href="{{ route('show.login') }}" class="font-semibold text-indigo-600 hover:underline">
                        Sign in here
                    </a>
                </p>
            </div>

        </div>
    </div>
@endsection
