<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index(){
        return view('dashboard');
    }

    public function store(Request $request){
        $validated = $request->validate([
            'title' => 'required|max:255',
            'description' => 'required',
            'date' => 'required|date',
            'time' => 'required|date_format:H:i',
            'location' => 'required|max:255',
            'price' => 'required|numeric|min:0',
            'max_capacity' => 'required|integer|min:1',
        ]);

        $validated['user_id'] = Auth::id();
        $event = Event::create($validated);

        return redirect()
            ->route('show.dashboard')
            ->with('success', 'Event created successfully.');
    }
}
