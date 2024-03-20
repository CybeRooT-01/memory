<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Notation;
use Mockery\Matcher\Not;
use App\traits\RadarTrait;
use Illuminate\Http\Request;
use App\traits\NotFoundResponseTrait;

class NotationController extends Controller
{
    use NotFoundResponseTrait, RadarTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $noteur_id = $request->input('noteur_id');
        $notee_id = $request->input('notee_id');
        $organisateur = User::find($noteur_id);
        $prestataire = User::find($notee_id);
        if (!$organisateur || !$prestataire) {
            return $this->notFoundResponse('Utilisateur non trouvé');
        }

        if($noteur_id == $notee_id){
            return response()->json(['message' => 'Vous ne pouvez pas vous noter vous-même']);
        }

        $dejaNote = Notation::where('noteur_id', $noteur_id)->where('notee_id', $notee_id)->first();
        if($dejaNote){
            Notation::where('noteur_id', $noteur_id)->where('notee_id', $notee_id)->update([
                'note' => $request->input('note'),
                'commentaire' => $request->input('commentaire')
            ]);
            $this->tracerAction('Mise à jour de la notation d\'un prestataire');
            return response()->json(['message' => 'Notation mise à jour avec succès', 'status' => 200]);
        }
        $note = $request->input('note');
        $commentaire = $request->input('commentaire');
        Notation::create([
            'noteur_id' => $noteur_id,
            'notee_id' => $notee_id,
            'note' => $note,
            'commentaire' => $commentaire
        ]);
        $this->tracerAction('Notation d\'un prestataire');
        return response()->json(['message' => 'Notation enregistrée avec succès', 'status' => 201]);
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
}
