<?php

namespace App\Http\Controllers;

use App\Http\Requests\EvenementPostRequest;
use App\Http\Resources\EvenementResource;
use App\Models\Evenement;
use App\traits\NotFoundResponseTrait;
use Illuminate\Http\Request;

class EvenementController extends Controller
{
    use NotFoundResponseTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $allEvents = EvenementResource::collection(Evenement::all());
        return response()->json($allEvents, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EvenementPostRequest $request)
    {
        Evenement::create([
            'nom' => $request->nom,
            'date' => $request->date,
            'heure' => $request->heure,
            'lieu' => $request->lieu,
            'type_evenement' => $request->type_evenement,
            'description' => $request->description,
            'user_id' => $request->user_id,
        ]);
        return response()->json(['message' => 'Evenement créé','status' => 201], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $event = Evenement::find($id);
        if (!$event) {
            return response()->json(['message' => 'Evenement non trouvé'], 404);
        }
        return response()->json($event, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EvenementPostRequest $request, string $id)
    {
        $event = Evenement::find($id);
        if (!$event) {
            return response()->json(['message' => 'Evenement non trouvé'], 404);
        }
        $event->update([
            'nom' => $request->nom,
            'date' => $request->date,
            'heure' => $request->heure,
            'lieu' => $request->lieu,
            'type_evenement' => $request->type_evenement,
            'description' => $request->description,
            'user_id' => $request->user_id,
        ]);
        return response()->json(['message' => 'Evenement modifié', 'status'=>200], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $event = Evenement::find($id);
        if (!$event) {
            return response()->json(['message' => 'Evenement non trouvé'], 404);
        }
        $event->delete();
        return response()->json(['message' => 'Evenement supprimé', 'status'=>200], 200);
    }

    public function getuserEvenements(string $id)
    {
        $userEvents = EvenementResource::collection(Evenement::where('user_id', $id)->get());

        if ($userEvents->isEmpty()) {
            return $this->notFoundResponse('Evenements non trouvés');
        }
        return response()->json($userEvents, 200);
    }
}
