<?php

namespace App\Http\Controllers;

use App\traits\RadarTrait;
use App\Models\Reservation;
use Illuminate\Http\Request;
use App\Http\Resources\ReservationResource;

class ReservationController extends Controller
{
    use RadarTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Reservation::class);
        $reservation = Reservation::all();
        $this->tracerAction('Liste des réservations');
        return response()->json(ReservationResource::collection($reservation), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
