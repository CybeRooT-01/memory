<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DemandeParticipation extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        "reservation_id",
        "etat",
        "commentaire",
    ];

    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }
}
