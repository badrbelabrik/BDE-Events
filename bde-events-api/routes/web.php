<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('home');
});


Route::get('register', [AuthController::class, 'showRegister'])->name('show.register');
Route::get('login', [AuthController::class, 'showLogin'])->name('show.login');

Route::get('/', [HomeController::class, 'home'])->name('home');
Route::post('register', [AuthController::class, 'register'])->name('register');
Route::post('login', [AuthController::class, 'login'])->name('login');
Route::post('logout', [AuthController::class, 'logout'])->name('logout');

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware('auth','isAdmin')->name('show.dashboard');
Route::post('storeEvent', [DashboardController::class, 'store'])->middleware('auth','isAdmin')->name('store.event');
Route::delete('delete/event/{event}', [DashboardController::class, 'destroy'])->middleware('auth','isAdmin')->name('delete.event');
Route::put('update/event/{event}', [DashboardController::class, 'update'])->middleware('auth','isAdmin')->name('update.event');

Route::get('student', [StudentController::class, 'index'])->middleware('auth')->name('student.space');
Route::post('reserve/{event}', [StudentController::class, 'subscribe'])->middleware('auth')->name('reserve');
Route::delete('cancel/reservation/{reservation}', [StudentController::class, 'unsubscribe'])->middleware('auth')->name('cancel.reservation');
