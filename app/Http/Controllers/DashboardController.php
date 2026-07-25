<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index(){
        $events = Event::with('user')->latest()->get();

        return view('dashboard', compact('events'));
    }

    public function store(Request $request){
        $validated = $request->validate([
            'title' => 'required|max:255',
            'description' => 'required',
            'date' => 'required|date|after_or_equal:today',
            'time' => 'required|date_format:H:i',
            'location' => 'required|max:255',
            'price' => 'required|numeric|min:0',
            'max_capacity' => 'required|integer|min:1',
        ],[
            'date.after_or_equal' => 'The event date cannot be in the past.',
        ]);

        $validated['user_id'] = Auth::id();
        $event = Event::create($validated);

        return redirect()
            ->route('show.dashboard')
            ->with('success', 'Event created successfully.');
    }

    public function update(Request $request, Event $event){
        $validated = $request->validate([
            'title' => 'required|max:255',
            'description' => 'required',
            'date' => 'required|date|after_or_equal:today',
            'time' => 'required|date_format:H:i',
            'location' => 'required|max:255',
            'price' => 'required|numeric|min:0',
            'max_capacity' => 'required|integer|min:1',
        ],[
            'date.after_or_equal' => 'The event date cannot be in the past.',
        ]);

        $event->update($validated);

        return redirect()
            ->route('show.dashboard')
            ->with('success', 'Event updated successfully.');
    }

    public function destroy(Event $event){
        $event->delete();

        return redirect()->route('show.dashboard');
    }
}
