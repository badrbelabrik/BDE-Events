<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('home');
});

Route::get('register', [AuthController::class, 'showRegister'])->name('show.register');
Route::get('login', [AuthController::class, 'showLogin'])->name('show.login');

Route::post('register', [AuthController::class, 'register'])->name('register');
Route::post('login', [AuthController::class, 'login'])->name('login');
