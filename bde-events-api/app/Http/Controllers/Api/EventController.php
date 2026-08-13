<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::with('user')
            ->latest()
            ->get();

        return response()->json([
            'events' => $events
        ]);
    }


    public function show(Event $event)
    {
        $event->load('user');

        return response()->json([
            'event' => $event
        ]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date|after_or_equal:today',
            'time' => 'required|date_format:H:i',
            'location' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'max_capacity' => 'required|integer|min:1',
        ]);

        $validated['user_id'] = $request->user()->id;

        $event = Event::create($validated);

        return response()->json([
            'message' => 'Event created successfully.',
            'event' => $event
        ], 201);
    }


    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'date' => 'required|date|after_or_equal:today',
            'time' => 'required|date_format:H:i',
            'location' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'max_capacity' => 'required|integer|min:1',
        ]);

        $event->update($validated);

        return response()->json([
            'message' => 'Event updated successfully.',
            'event' => $event
        ]);
    }


    public function destroy(Event $event)
    {
        $event->delete();

        return response()->json([
            'message' => 'Event deleted successfully.'
        ]);
    }


    public function stats()
    {
        $events = Event::with(['user'])
            ->withCount('reservations')
            ->latest()
            ->get();

        $events->each(function ($event) {
            $event->remaining_places =
                $event->max_capacity - $event->reservations_count;
        });

        return response()->json([
            'total_events' => $events->count(),
            'total_reservations' => $events->sum('reservations_count'),
            'events' => $events
        ]);
    }
}
