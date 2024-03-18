<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class InvitationPrestataire extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'inviteur_id',
        'invite_id',
        'evenement_id',
        'accepte',
        'message'
    ];

    public function inviteur()
    {
        return $this->belongsTo(User::class, 'inviteur_id');
    }

    public function invite()
    {
        return $this->belongsTo(User::class, 'invite_id');
    }

    public function evenement()
    {
        return $this->belongsTo(Evenement::class);
    }

}

