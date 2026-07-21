<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Reservation extends Model
{
    protected $fillable = [
        'reservation_code',
        'event_id',
        'student_id',
    ];

    public function user(): BelongsTo{
        return $this->belongsTo(User::class);
    }
    public function event(): BelongsTo{
        return $this->belongsTo(Event::class);
    }

    public function ticket(): HasOne{
        return $this->hasOne(Ticket::class);
    }
}
