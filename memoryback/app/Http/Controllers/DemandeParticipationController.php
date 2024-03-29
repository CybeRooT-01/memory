<?php

namespace App\Http\Controllers;

use Dompdf\Dompdf;
use App\Models\User;
use App\Models\Prestataire;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Mail\RefusParticipationMail;
use App\Models\DemandeParticipation;
use Illuminate\Support\Facades\Mail;
use App\traits\NotFoundResponseTrait;
use App\Mail\AcceptationParticipationMail;
use App\Http\Resources\ReservationResource;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use App\Http\Resources\DemandeParticipationResource;
use App\Http\Requests\DemandeParticipationPostRequest;
use App\traits\RadarTrait;

class DemandeParticipationController extends Controller
{
    use RadarTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewany', DemandeParticipation::class);
        $demandes = DemandeParticipation::where("etat", "en attente")->get();
        $this->tracerAction('Liste des demandes de participation');
        return response()->json(DemandeParticipationResource::collection($demandes), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DemandeParticipationPostRequest $request)
    {
        $this->authorize('create',DemandeParticipation::class);
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
        $this->tracerAction('Demande de participation');
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
        $this->authorize('update',DemandeParticipation::class);
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
        $this->tracerAction('Acceptation de la demande de participation');
        return response()->json(['message' => 'Demande de participation acceptée'], 200);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->authorize('delete',DemandeParticipation::class);
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
        $this->tracerAction('Refus de la demande de participation');
        return response()->json(['message' => 'Demande de participation refusée'], 200);
    }
}
