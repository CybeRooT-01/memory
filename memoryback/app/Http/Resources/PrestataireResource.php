<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PrestataireResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
//        return parent::toArray($request);
        return [
            "id" => $this->id,
            "nom" => $this->nom,
            "services" => $this->services,
            "tarif" => $this->tarif,
            "avis" => $this->avis,
            "photo1" => $this->photo1,
            "photo2" => $this->photo2,
            "photo3" => $this->photo3,
            "user" => $this->user

        ];
    }
}
