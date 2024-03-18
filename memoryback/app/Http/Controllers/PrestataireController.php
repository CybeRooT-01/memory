<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Evenement;
use App\Models\Prestataire;
use Illuminate\Http\Request;
use App\Mail\InvitationEventMail;
use Illuminate\Support\Facades\Mail;
use App\Models\InvitationPrestataire;
use App\traits\NotFoundResponseTrait;
use App\Http\Resources\PrestataireResource;
use App\Http\Requests\PrestatairePostRequest;

class PrestataireController extends Controller
{
    use NotFoundResponseTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return PrestataireResource::collection(Prestataire::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PrestatairePostRequest $request)
    {
      $allPrestataires = Prestataire::all();
      $userId = $request->user_id;
        foreach ($allPrestataires as $prestataire) {
            if ($prestataire->user_id == $userId) {
                $prestataire->update([
                    "nom" => $request->nom,
                    "services" => $request->services,
                    "tarif" => $request->tarif,
                    "avis" => $request->avis,
                    "photo1" => $request->photo1,
                    "photo2" => $request->photo2,
                    "photo3" => $request->photo3,
                    "user_id" => $request->user_id,
                ]);
            return response()->json(["message" => "Votre profil a été mis à jour"], 200);
            }
        }
      Prestataire::create([
            "nom" => $request->nom,
            "services" => $request->services,
            "tarif" => $request->tarif,
            "avis" => $request->avis,
            "photo1" => $request->photo1,
            "photo2" => $request->photo2,
            "photo3" => $request->photo3,
            "user_id" => $request->user_id,
        ]);

      return response()->json( ["message" => "Prestataire créé avec succès"], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function invitePrestataire(Request $request)
    {
        $evenement = Evenement::find($request->evenement_id);
        $emailReceveur = User::find($request->invite_id)->email;
        $prestaName = User::find($request->invite_id)->name;
        $invitationMail = new InvitationEventMail($evenement, $prestaName);
        $invitationMail->to($emailReceveur);

        $dejaInvite = InvitationPrestataire::where('inviteur_id', $request->inviteur_id)->where('invite_id', $request->invite_id)->where('evenement_id', $request->evenement_id)->first();
        if($dejaInvite){
            return response()->json(['message' => 'vous avez déjà envoyé une invitation à ce prestataire pour cet événement', 'status' => 200],400);
        }
        Mail::send($invitationMail);
        InvitationPrestataire::create([
            'inviteur_id' => $request->inviteur_id,
            'invite_id' => $request->invite_id,
            'evenement_id' => $request->evenement_id,
            'message' => $request->message,
        ]);
        return response()->json(['message' => 'Invitation envoyée', 'status' => 201], 201);  
    }
}
