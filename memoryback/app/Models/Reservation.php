<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Reservation extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        "prestataire_id",
        "evenement_id",
    ];

    public function prestataire():BelongsTo
    {
        return $this->belongsTo(Prestataire::class);
    }

    public function evenement():BelongsTo
    {
        return $this->belongsTo(Evenement::class);
    }
}
