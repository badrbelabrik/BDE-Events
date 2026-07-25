<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Reservation;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Pest\Support\Str;

class StudentController extends Controller
{
    public function index(){
        $events = Event::with('user')->latest()->get();
        $reservations = Reservation::with(['event', 'ticket'])
            ->where('user_id', Auth::id())
            ->get();

        return view('student', compact('events','reservations'));
    }
    public function subscribe(Event $event){

        if ($event->reservations()->count() >= $event->max_capacity) {
            return back()->with('error', 'This event is full.');
        }

        if ($event->reservations()->where('user_id', Auth::id())->exists()) {
            return back()->with('error', 'You are already registered in this event.');
        }

        $reservation = Reservation::create([
            'reservation_code' => 'BDE-2026-' . strtoupper(Str::random(5)),
            'event_id' => $event->id,
            'user_id' => Auth::id(),
        ]);

        Ticket::create([
            'reservation_id' => $reservation->id,
            'ticket_code' => 'TKT-' . strtoupper(Str::random(8)),
        ]);

        return back()->with('success', 'Reservation successful!');
    }

    public function unsubscribe(Reservation $reservation){
        if ($reservation->user_id !== Auth::id()) {
            abort(403);
        }
        $reservation->ticket()->delete();
        $reservation->delete();
        return redirect()
            ->route('student.space')
            ->with('success', 'Reservation cancelled successfully.');
    }


}
