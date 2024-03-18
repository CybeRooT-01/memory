<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Notation extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'notee_id',
        'noteur_id',
        'note',
        'commentaire'
    ];

    public function notee()
    {
        return $this->belongsTo(User::class, 'notee_id');
    }

    public function noteur()
    {
        return $this->belongsTo(User::class, 'noteur_id');
    }
}
