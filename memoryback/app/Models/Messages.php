<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Messages extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'sender_id',
        'receiver_id',
        'message',
    ];

}
