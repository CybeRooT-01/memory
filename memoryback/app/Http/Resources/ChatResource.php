<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChatResource extends JsonResource
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
            'id' => $this->id,
            'sender' => new UserRessource(User::find($this->sender_id)),
            'receiver' => new UserRessource(User::find($this->receiver_id)),
            'message' => $this->message,
            'created_at' => $this->created_at,
        ];
    }
}
