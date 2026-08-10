<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\ReservationController;
use App\Http\Controllers\Api\TicketController;
use Illuminate\Support\Facades\Route;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{event}', [EventController::class, 'show']);



Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);



    Route::post(
        '/events/{event}/book',
        [ReservationController::class, 'store']
    );

    Route::get(
        '/user/reservations',
        [ReservationController::class, 'index']
    );

    Route::delete(
        '/reservations/{reservation}',
        [ReservationController::class, 'destroy']
    );


    Route::middleware('isAdmin')->prefix('admin')->group(function () {

        Route::post(
            '/events',
            [EventController::class, 'store']
        );

        Route::put(
            '/events/{event}',
            [EventController::class, 'update']
        );

        Route::delete(
            '/events/{event}',
            [EventController::class, 'destroy']
        );

        Route::get(
            '/events/stats',
            [EventController::class, 'stats']
        );
    });
});
