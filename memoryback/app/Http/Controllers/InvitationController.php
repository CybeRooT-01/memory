<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Evenement;
use Illuminate\Http\Request;
use App\Mail\RefusInvitationMail;
use App\Mail\AccepterInvitationMail;
use Illuminate\Support\Facades\Mail;
use App\Models\InvitationPrestataire;
use App\traits\NotFoundResponseTrait;

class InvitationController extends Controller
{
    use NotFoundResponseTrait;


    public function accepterInvitation(String $id)
    {
        $invitation = InvitationPrestataire::find($id);
        if (!$invitation) {
            return response()->json(['message' => 'Invitation non trouvée'], 404);
        }
        $evenement = Evenement::find($invitation->evenement_id);
        $nomOrganisateur = User::find($invitation->inviteur_id)->name;
        $nomprestataire = User::find($invitation->invite_id)->name;
        $emailOrganisateur = User::find($invitation->inviteur_id)->email;
        $mail = new AccepterInvitationMail($evenement, $nomOrganisateur, $nomprestataire);
        $mail->to($emailOrganisateur);
        Mail::send($mail);
        // $invitation->update([
        //     'accepte' => true
        // ]);
        return response()->json(['message' => 'Invitation acceptée','statut'=>200]);
    }

    public function refuserInvitation(String $id)
    {
        $invitation = InvitationPrestataire::find($id);
        if (!$invitation) {
            return response()->json(['message' => 'Invitation non trouvée'], 404);
        }
        
        $nomPrestataire = User::find($invitation->invite_id)->name;
        $nomOrganisateur = User::find($invitation->inviteur_id)->name;
        $emailOrganisateur = User::find($invitation->inviteur_id)->email;
        $mail = new RefusInvitationMail($nomOrganisateur, $nomPrestataire);
        $mail->to($emailOrganisateur);
        Mail::send($mail);
        // $invitation->delete();
        return response()->json(['message' => 'Invitation refusée','statut'=>200]);
    }


    
}
