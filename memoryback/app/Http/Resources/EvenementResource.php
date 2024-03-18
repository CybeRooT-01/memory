<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EvenementResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nom' => $this->nom,
            'date' => $this->date,
            'heure' => $this->heure,
            'lieu' => $this->lieu,
            'type_evenement' => $this->type_evenement,
            'description' => $this->description,
            'createur' => $this->user,

        ];
    }
}
