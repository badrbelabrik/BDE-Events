@extends('layouts.app')

@section('content')
    @if(session('success'))
        <div id="flash-message" class="mb-4 rounded-lg bg-green-100 border border-green-300 text-green-800 px-4 py-3">
            {{ session('success') }}
        </div>
    @endif

    @if(session('error'))
        <div id="flash-message" class="mb-4 rounded-lg bg-red-100 border border-red-300 text-red-800 px-4 py-3">
            {{ session('error') }}
        </div>
    @endif
    @if(session('success') || session('error'))
        <script>
            setTimeout(() => {
                const alert = document.getElementById('flash-message');

                if (alert) {
                    alert.remove();
                }
            }, 3000);
        </script>
    @endif
    <div class="space-y-8">
        <!-- Page Title & Header -->
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider">
                    Student Portal
                </span>
                    <span class="text-xs text-gray-500">Member Space</span>
                </div>
                <h1 class="text-2xl font-bold text-gray-900 mt-1">My Passes & Available Events</h1>
            </div>

            <a href="{{ url('/') }}" class="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3 py-2 rounded-lg transition">
                <i class="fa-solid fa-arrow-left mr-1.5"></i> Back to Homepage
            </a>
        </div>

        <!-- Student Digital Membership Card -->
        <div class="bg-gradient-to-r from-indigo-700 to-indigo-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
            <div class="absolute -right-10 -bottom-10 opacity-10 text-9xl pointer-events-none">
                <i class="fa-solid fa-id-card"></i>
            </div>

            <div class="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div class="flex items-center gap-4">
                    <div class="w-16 h-16 rounded-full bg-white/10 border-2 border-white/20 text-white font-black text-2xl flex items-center justify-center shrink-0">
                        {{ strtoupper(substr(auth()->user()->name ?? 'S', 0, 1)) }}
                    </div>
                    <div>
                        <span class="text-indigo-200 text-xs uppercase tracking-wider font-semibold">Active Student Member</span>
                        <h2 class="text-xl font-bold text-white">{{ auth()->user()->name ?? 'Student Name' }}</h2>
                        <p class="text-xs text-indigo-200 mt-0.5"><i class="fa-solid fa-envelope mr-1 opacity-70"></i> {{ auth()->user()->email ?? 'student@campus.edu' }}</p>
                    </div>
                </div>

                <div class="bg-white/10 border border-white/15 rounded-xl p-3 backdrop-blur-xs flex items-center gap-4 w-full md:w-auto justify-between">
                    <div>
                        <p class="text-[10px] text-indigo-200 uppercase tracking-widest font-semibold">Student ID Code</p>
                        <p class="text-sm font-mono font-bold tracking-wider text-white">BDE-{{ auth()->user()->id ?? 'PASS' }}-2026</p>
                    </div>
                    <div class="bg-white p-1 rounded">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=BDE-STUDENT-{{ auth()->user()->id ?? 'PASS' }}" alt="Student QR Code" class="w-10 h-10">
                    </div>
                </div>
            </div>
        </div>

        <!-- SECTION 1: Active Subscriptions / Reserved Passes -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div class="p-5 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
                <div>
                    <h2 class="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <i class="fa-solid fa-ticket text-indigo-600"></i> My Subscribed Events
                    </h2>
                    <p class="text-xs text-gray-500">Your reserved tickets for upcoming activities</p>
                </div>
            </div>

            <div class="p-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                @forelse($subscribedEvents ?? [] as $subscribedEvent)
                    <div class="border border-gray-200 rounded-xl p-5 hover:border-indigo-300 transition bg-white flex flex-col justify-between space-y-4">
                        <div class="flex justify-between items-start gap-2">
                            <div>
                                <h3 class="font-bold text-gray-900 text-base">{{ $subscribedEvent->title }}</h3>
                                <p class="text-xs text-gray-500 mt-0.5"><i class="fa-solid fa-location-dot mr-1 text-gray-400"></i> {{ $subscribedEvent->location }}</p>
                            </div>
                            <span class="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                            Subscribed
                        </span>
                        </div>

                        <p class="text-xs text-gray-600 line-clamp-2">{{ $subscribedEvent->description }}</p>

                        <div class="bg-gray-50 p-3 rounded-lg text-xs space-y-1 text-gray-600">
                            <div class="flex justify-between">
                                <span class="text-gray-400">Date & Time:</span>
                                <span class="font-semibold text-gray-800">{{ $subscribedEvent->date }} • {{ $subscribedEvent->time }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-400">Price:</span>
                                <span class="font-semibold text-indigo-600">
                                {{ $subscribedEvent->price > 0 ? '$' . number_format($subscribedEvent->price, 2) : 'Free' }}
                            </span>
                            </div>
                        </div>

                        <div class="flex items-center justify-between pt-2 border-t border-gray-100">
                            <button onclick="document.getElementById('passModal-{{ $subscribedEvent->id }}').showModal()" class="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition cursor-pointer">
                                <i class="fa-solid fa-qrcode mr-1.5"></i> View Pass
                            </button>

                            <form action="{{ route('events.unsubscribe', $subscribedEvent->id) }}" method="POST" onsubmit="return confirm('Cancel subscription?');">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="text-xs text-red-500 hover:text-red-700 font-medium transition cursor-pointer">
                                    Cancel Subscription
                                </button>
                            </form>
                        </div>
                    </div>

                    <!-- QR Modal per Subscribed Event -->
                    <dialog id="passModal-{{ $subscribedEvent->id }}" class="rounded-xl border border-gray-200 shadow-xl p-0 w-full max-w-sm backdrop:bg-gray-900/50">
                        <div class="p-6 bg-white text-center space-y-4">
                            <div class="flex justify-between items-center border-b border-gray-100 pb-3">
                                <h3 class="text-sm font-bold text-gray-900">Event Pass</h3>
                                <button onclick="document.getElementById('passModal-{{ $subscribedEvent->id }}').close()" class="text-gray-400 hover:text-gray-600 cursor-pointer">
                                    <i class="fa-solid fa-xmark text-lg"></i>
                                </button>
                            </div>

                            <div class="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-300 space-y-3">
                                <p class="text-xs font-bold text-indigo-600 uppercase tracking-widest">{{ $subscribedEvent->title }}</p>
                                <div class="flex justify-center">
                                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=EVENT-{{ $subscribedEvent->id }}-USER-{{ auth()->id() }}" alt="QR Code" class="w-36 h-36 border p-1 bg-white rounded">
                                </div>
                                <div>
                                    <p class="text-xs text-gray-400 font-mono">TKT-{{ $subscribedEvent->id }}-{{ auth()->id() }}</p>
                                    <p class="text-xs font-semibold text-gray-800 mt-1">{{ auth()->user()->name }}</p>
                                </div>
                            </div>

                            <button onclick="window.print()" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2 px-4 rounded-lg transition shadow-sm cursor-pointer">
                                <i class="fa-solid fa-print mr-1"></i> Print / Save Pass
                            </button>
                        </div>
                    </dialog>
                @empty
                    <div class="col-span-2 text-center py-8 text-gray-500 text-sm">
                        You have not subscribed to any events yet.
                    </div>
                @endforelse
            </div>
        </div>

        <!-- SECTION 2: Available Events to Subscribe (No Images) -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div class="p-5 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-gray-50/50">
                <div>
                    <h2 class="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <i class="fa-solid fa-calendar-plus text-indigo-600"></i> Available Events to Subscribe
                    </h2>
                    <p class="text-xs text-gray-500">Discover upcoming campus activities and subscribe</p>
                </div>
            </div>

            <div class="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                @forelse($events ?? [] as $event)
                    <div class="border border-gray-200 rounded-xl p-5 hover:border-indigo-300 transition bg-white flex flex-col justify-between space-y-4">
                        <!-- Title & Price -->
                        <div class="space-y-2">
                            <div class="flex justify-between items-start gap-2">
                                <h3 class="font-bold text-gray-900 text-base leading-snug">{{ $event->title }}</h3>
                                <span class="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-1 rounded shrink-0">
                                {{ $event->price > 0 ? '$' . number_format($event->price, 2) : 'Free' }}
                            </span>
                            </div>

                            <!-- Description -->
                            <p class="text-xs text-gray-600 line-clamp-3 leading-relaxed">
                                {{ $event->description }}
                            </p>
                        </div>

                        <!-- Date, Time & Location -->
                        <div class="space-y-1.5 pt-2 border-t border-gray-100 text-xs text-gray-500">
                            <p class="flex items-center gap-2">
                                <i class="fa-solid fa-calendar text-indigo-500 w-4"></i>
                                <span><strong class="text-gray-700">Date:</strong> {{ $event->date }}</span>
                            </p>
                            <p class="flex items-center gap-2">
                                <i class="fa-solid fa-clock text-indigo-500 w-4"></i>
                                <span><strong class="text-gray-700">Time:</strong> {{ $event->time }}</span>
                            </p>
                            <p class="flex items-center gap-2">
                                <i class="fa-solid fa-location-dot text-indigo-500 w-4"></i>
                                <span><strong class="text-gray-700">Location:</strong> {{ $event->location }}</span>
                            </p>
                            <p class="flex items-center gap-2">
                                <i class="fa-solid fa-location-dot text-indigo-500 w-4"></i>
                                <span><strong class="text-gray-700">Available spots:</strong> {{ $event->reservations->count() }} / {{ $event->max_capacity }}</span>
                            </p>
                        </div>

                        <!-- Subscribe Button Form -->
                        <div class="pt-2">
                            <form action="{{route('reserve', $event)}}" method="POST">
                                @csrf
                                <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs py-2.5 px-3 rounded-lg transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer">
                                    <i class="fa-solid fa-plus"></i> Subscribe to Event
                                </button>
                            </form>
                        </div>

                    </div>
                @empty
                    <div class="col-span-full text-center py-8 text-gray-500 text-sm">
                        No available events to join right now. Check back later!
                    </div>
                @endforelse
            </div>
        </div>
    </div>
@endsection
