<?php

namespace App\Policies;

use App\Models\InvitationPrestataire;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class InvitationPrestatairePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, InvitationPrestataire $invitationPrestataire): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user): bool
    {
        return $user->role_id === 2;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user): bool
    {
        return $user->role_id === 2;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, InvitationPrestataire $invitationPrestataire): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, InvitationPrestataire $invitationPrestataire): bool
    {
        return false;
    }
}
