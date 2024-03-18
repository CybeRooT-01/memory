<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Prestataire extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        "nom",
        "services",
        "tarif",
        "avis",
        "photo1",
        "photo2",
        "photo3",
        "user_id",
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
