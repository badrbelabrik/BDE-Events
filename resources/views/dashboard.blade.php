@extends('layouts.app')

@section('content')
    <div class="space-y-6">

        <!-- Page Header & Actions -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 border border-gray-200 rounded-xl shadow-sm">
            <div>
                <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-xs font-bold rounded-full uppercase tracking-wider">
                    Admin Portal
                </span>
                    <span class="text-xs text-gray-500">Overview & Management</span>
                </div>
                <h1 class="text-2xl font-bold text-gray-900 mt-1">BDE Event Control Center</h1>
            </div>

            <!-- Action Trigger: Open HTML Native Modal -->
            <div>
                <button onclick="document.getElementById('createEventModal').showModal()" class="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition shadow-sm cursor-pointer w-full sm:w-auto">
                    <i class="fa-solid fa-plus mr-2 text-xs"></i> Create New Event
                </button>
            </div>
        </div>

        <!-- Analytics & Stats Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="bg-white p-5 border border-gray-200 rounded-xl shadow-sm flex items-center justify-between">
                <div>
                    <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Events</p>
                    <p class="text-2xl font-black text-gray-900 mt-1">12</p>
                </div>
                <div class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center text-xl">
                    <i class="fa-solid fa-calendar-days"></i>
                </div>
            </div>

            <div class="bg-white p-5 border border-gray-200 rounded-xl shadow-sm flex items-center justify-between">
                <div>
                    <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Reservations</p>
                    <p class="text-2xl font-black text-gray-900 mt-1">458</p>
                </div>
                <div class="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center text-xl">
                    <i class="fa-solid fa-ticket"></i>
                </div>
            </div>

            <div class="bg-white p-5 border border-gray-200 rounded-xl shadow-sm flex items-center justify-between">
                <div>
                    <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Capacity</p>
                    <p class="text-2xl font-black text-gray-900 mt-1">600</p>
                </div>
                <div class="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center text-xl">
                    <i class="fa-solid fa-users"></i>
                </div>
            </div>

            <div class="bg-white p-5 border border-gray-200 rounded-xl shadow-sm flex items-center justify-between">
                <div>
                    <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Avg Occupancy</p>
                    <p class="text-2xl font-black text-gray-900 mt-1">76%</p>
                </div>
                <div class="w-12 h-12 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center text-xl">
                    <i class="fa-solid fa-chart-pie"></i>
                </div>
            </div>
        </div>

        <!-- Active Events Management Table -->
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <div class="p-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                    <h2 class="text-lg font-bold text-gray-900">Manage Campus Events</h2>
                    <p class="text-xs text-gray-500">Monitor active reservations and update event availability</p>
                </div>
                <div class="relative w-full sm:w-64">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                    <i class="fa-solid fa-magnifying-glass text-xs"></i>
                </span>
                    <input type="text" placeholder="Search events..." class="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                </div>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse">
                    <thead>
                    <tr class="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        <th class="py-3 px-4">Event Details</th>
                        <th class="py-3 px-4">Date</th>
                        <th class="py-3 px-4">Location</th>
                        <th class="py-3 px-4">Capacity / Booked</th>
                        <th class="py-3 px-4">Creator</th>
                        <th class="py-3 px-4 text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 text-sm">
                    @forelse($events as $event)
                    <tr class="hover:bg-gray-50/80 transition">
                        <td class="py-3 px-4">
                            <div class="font-bold text-gray-900">{{$event->title}}</div>
                        </td>
                        <td class="py-3 px-4 text-xs">
                            <div class="font-semibold text-gray-800"><i class="fa-regular fa-calendar mr-1 text-gray-400"></i>
                                {{ \Carbon\Carbon::parse($event->date)->format('d M Y') }}</div>
                            <div class="text-gray-500"><i class="fa-solid fa-location-dot mr-1 text-gray-400"></i>{{ \Carbon\Carbon::parse($event->time)->format('H:i') }}</div>
                        </td>
                        <td>
                            <div class="text-gray-500">{{$event->location}}</div>
                        </td>

                        <td class="py-3 px-4">
                            <div class="flex items-center justify-between text-xs mb-1">
                                <span class="font-semibold text-gray-700">{{ $event->reservations->count() }} / {{ $event->max_capacity }}</span>
                            </div>
                        </td>
                        <td class="py-3 px-4">
                            <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                {{ $event->user->name }}
                            </span>
                        </td>
                        <td class="py-3 px-4 text-right space-x-2">
                            <button onclick="document.getElementById('createEventModal').showModal()" class="text-gray-400 hover:text-indigo-600 transition" title="Edit Event">
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>

                            <form action="{{route('delete.event', $event)}}" method="POST">
                                @method('DELETE')
                                <button class="text-gray-400 hover:text-red-600 transition" title="Delete Event">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </form>

                        </td>
                    </tr>
                        @empty
                            <tr>
                                <td colspan="6" class="py-8 text-center text-gray-500">
                                    No events available.
                                </td>
                            </tr>

                        @endforelse
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Native HTML5 Dialog Modal (No JavaScript libraries needed) -->
        <dialog id="createEventModal" class="rounded-xl border border-gray-200 shadow-xl p-0 w-full max-w-lg backdrop:bg-gray-900/50">
            <div class="p-6 bg-white space-y-4">
                <div class="flex justify-between items-center border-b border-gray-100 pb-3">
                    <h3 class="text-lg font-bold text-gray-900">Create Campus Event</h3>
                    <button onclick="document.getElementById('createEventModal').close()" class="text-gray-400 hover:text-gray-600 transition cursor-pointer">
                        <i class="fa-solid fa-xmark text-lg"></i>
                    </button>
                </div>

                <form action="{{route('store.event')}}" method="POST" class="space-y-4">
                    @csrf

                    <div>
                        <label class="block text-xs font-semibold text-gray-700 uppercase mb-1">Event Title</label>
                        <input type="text" name="title" required placeholder="e.g., Spring Welcome Party" class="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block text-xs font-semibold text-gray-700 uppercase mb-1">Date</label>
                            <input type="date" name="date" required class="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-700 uppercase mb-1">Total Seats (Capacity)</label>
                            <input type="number" name="max_capacity" min="1" required placeholder="100" class="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-gray-700 uppercase mb-1">TIME</label>
                        <input type="time" name="time" required class="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-gray-700 uppercase mb-1">
                            Price
                        </label>

                        <input
                            type="number"
                            name="price"
                            step="0.01"
                            min="0"
                            required
                            placeholder="0.00"
                            class="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-gray-700 uppercase mb-1">Location</label>
                        <input type="text" name="location" required placeholder="e.g., Student Center Room B" class="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-gray-700 uppercase mb-1">Description</label>
                        <textarea name="description" rows="3" placeholder="Brief event description..." class="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"></textarea>
                    </div>

                    <div class="flex justify-end gap-2 pt-2 border-t border-gray-100">
                        <button type="button" onclick="document.getElementById('createEventModal').close()" class="px-4 py-2 border border-gray-300 rounded-md text-xs font-semibold text-gray-700 hover:bg-gray-50 transition">
                            Cancel
                        </button>
                        <button type="submit" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-xs font-semibold transition shadow-sm">
                            Publish Event
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
        <dialog id="editEventModal" class="rounded-xl border border-gray-200 shadow-xl p-0 w-full max-w-lg backdrop:bg-gray-900/50">
            <div class="p-6 bg-white space-y-4">
                <div class="flex justify-between items-center border-b border-gray-100 pb-3">
                    <h3 class="text-lg font-bold text-gray-900">Edit Event</h3>
                    <button onclick="document.getElementById('editEventModal').close()" class="text-gray-400 hover:text-gray-600 transition cursor-pointer">
                        <i class="fa-solid fa-xmark text-lg"></i>
                    </button>
                </div>

                <form action="{{route('update.event')}}" method="POST" class="space-y-4">
                    @csrf

                    <div>
                        <label class="block text-xs font-semibold text-gray-700 uppercase mb-1">Event Title</label>
                        <input type="text" name="title" required placeholder="e.g., Spring Welcome Party" class="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block text-xs font-semibold text-gray-700 uppercase mb-1">Date</label>
                            <input type="date" name="date" required class="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold text-gray-700 uppercase mb-1">Total Seats (Capacity)</label>
                            <input type="number" name="max_capacity" min="1" required placeholder="100" class="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                        </div>
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-gray-700 uppercase mb-1">TIME</label>
                        <input type="time" name="time" required class="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-gray-700 uppercase mb-1">
                            Price
                        </label>

                        <input
                            type="number"
                            name="price"
                            step="0.01"
                            min="0"
                            required
                            placeholder="0.00"
                            class="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-gray-700 uppercase mb-1">Location</label>
                        <input type="text" name="location" required placeholder="e.g., Student Center Room B" class="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                    </div>

                    <div>
                        <label class="block text-xs font-semibold text-gray-700 uppercase mb-1">Description</label>
                        <textarea name="description" rows="3" placeholder="Brief event description..." class="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"></textarea>
                    </div>

                    <div class="flex justify-end gap-2 pt-2 border-t border-gray-100">
                        <button type="button" onclick="document.getElementById('createEventModal').close()" class="px-4 py-2 border border-gray-300 rounded-md text-xs font-semibold text-gray-700 hover:bg-gray-50 transition">
                            Cancel
                        </button>
                        <button type="submit" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-xs font-semibold transition shadow-sm">
                            Publish Event
                        </button>
                    </div>
                </form>
            </div>
        </dialog>

    </div>
@endsection
