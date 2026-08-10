<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Reservation;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ReservationController extends Controller
{

    public function store(Request $request, Event $event)
    {
        $user = $request->user();

        // Check if event is full
        if ($event->reservations()->count() >= $event->max_capacity) {
            return response()->json([
                'message' => 'This event is full.'
            ], 400);
        }

        if ($event->reservations()
            ->where('user_id', $user->id)
            ->exists()) {

            return response()->json([
                'message' => 'You are already registered for this event.'
            ], 400);
        }

        $reservation = Reservation::create([
            'reservation_code' => 'BDE-2026-' . strtoupper(Str::random(5)),
            'user_id' => $user->id,
            'event_id' => $event->id,
        ]);

        $ticket = Ticket::create([
            'reservation_id' => $reservation->id,
            'ticket_code' => 'BDE-' . date('Y') . '-' . strtoupper(
                    Str::random(5)
                ),
        ]);

        return response()->json([
            'message' => 'Reservation successful.',
            'reservation' => $reservation
        ], 201);
    }

    public function index(Request $request)
    {
        $reservations = Reservation::with('event')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();

        return response()->json([
            'reservations' => $reservations
        ]);
    }

    public function destroy(Request $request, Reservation $reservation)
    {
        if ($reservation->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Unauthorized.'
            ], 403);
        }

        $reservation->delete();

        return response()->json([
            'message' => 'Reservation cancelled successfully.'
        ]);
    }
}
