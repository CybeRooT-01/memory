<?php

namespace App\Http\Controllers;

use App\Http\Requests\DemandeParticipationPostRequest;
use App\Http\Resources\DemandeParticipationResource;
use App\Http\Resources\ReservationResource;
use App\Mail\AcceptationParticipationMail;
use App\Mail\RefusParticipationMail;
use App\Models\DemandeParticipation;
use App\Models\Prestataire;
use App\Models\Reservation;
use App\Models\User;
use Dompdf\Dompdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class DemandeParticipationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $demandes = DemandeParticipation::where("etat", "en attente")->get();
        return response()->json(DemandeParticipationResource::collection($demandes), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DemandeParticipationPostRequest $request)
    {
        $allDemandes = DemandeParticipation::all();

        $prestataireID = $request->prestataire_id;
        $evenementID = $request->evenement_id;

        foreach ($allDemandes as $demande) {
            if ($demande->reservation->prestataire_id == $prestataireID && $demande->reservation->evenement_id == $evenementID) {
                return response()->json(["message" => "Vous avez déjà fait une demande de participation pour cet événement"], 400);
            }
        }

        try {
            DB::beginTransaction();
            $reservation = Reservation::create([
                "evenement_id" => $request->evenement_id,
                "prestataire_id" => $request->prestataire_id,
            ]);
            DemandeParticipation::create([
                "reservation_id" => $reservation->id,
                "commentaire" => $request->commentaire,
            ]);
            DB::commit();
        }catch (\Exception $e) {
            DB::rollBack();
            return response()->json(["message" => "Une erreur est survenue lors de la création de la demande de participation"], 500);
        }
        return response()->json(["message" => "Demande de participation créée avec succès"], 201);
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
    public function update(string $id)
    {
        $demande = DemandeParticipation::find($id);
        $reservation = new ReservationResource($demande->reservation);
        $user = User::where("id", $reservation->prestataire->user_id)->first();
        $prestatairEmail = $user->email;
        $code = QrCode::size(400)->generate('Ceci est un contenu de test');
        $pdf = new Dompdf();
        $pdf->loadHtml('<h1 style="text-align: center">Vous devez presenter le code pour acceder a l\'evenement</h1><br> <div style="width: 100%; text-align: center"><img src="data:image/png;base64,' . base64_encode($code) . '" /></div>');
        $pdf->setPaper('A4', 'landscape');
        $pdf->render();
        $output = $pdf->output();
        file_put_contents('codeQR.pdf', $output);
        $mail = new AcceptationParticipationMail();
        $mail->to($prestatairEmail);
        $mail->attachData($output, 'codeQR.pdf');
        Mail::send($mail);
        if (!$demande) {
            return response()->json(['message' => 'Demande de participation non trouvée'], 404);
        }
        $demande->update([
            "etat" => "acceptée",
        ]);
        return response()->json(['message' => 'Demande de participation acceptée'], 200);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $demande = DemandeParticipation::where("id", $id)->where("etat", "en attente")->first();
        if (!$demande) {
            return response()->json(['message' => 'Demande de participation non trouvée'], 404);
        }
//        $reservation = Reservation::find($demande->reservation_id);
        $reservation = new ReservationResource($demande->reservation);
        $user = User::where("id", $reservation->prestataire->user_id)->first();
        $prestatairEmail = $user->email;
        $mail = new RefusParticipationMail();
        $mail->to($prestatairEmail);
        Mail::send($mail);
        $demande->update([
            "etat" => "refusée",
        ]);
        $reservation->delete();
        $demande->delete();
        return response()->json(['message' => 'Demande de participation refusée'], 200);
    }
}
