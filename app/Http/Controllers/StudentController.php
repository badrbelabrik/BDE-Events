<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Ticket;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index(){
        $events = Event::with('user')->latest()->get();

        return view('student', compact('events'));
    }
}
