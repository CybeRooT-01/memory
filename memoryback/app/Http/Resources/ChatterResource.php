<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChatterResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
//        return parent::toArray($request);
        return  [
            "id" => $this->id,
            "nom" => $this->name,
            "email" => $this->email,
            "photo" => $this->photo,
            "login" => $this->login,
            "description" => $this->description,
            "id_bizzare" => $this->identifiant_bizzare,
            "role" => $this->role->libelle,
            "facebook" => $this->facebook,
            "twitter" => $this->twitter,
            "instagram" => $this->instagram,
        ];
    }
}
