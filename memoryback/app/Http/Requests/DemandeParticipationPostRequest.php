<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DemandeParticipationPostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "evenement_id" => "required|exists:evenements,id",
            "prestataire_id" => "required|exists:prestataires,id",
            "commentaire" => "string",
        ];
    }
    /**
     * Get the error messages for the defined validation rules.
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            "evenement_id.required" => "L'identifiant de l'événement est obligatoire",
            "evenement_id.exists" => "L'identifiant de l'événement n'existe pas",
            "prestataire_id.required" => "L'identifiant du prestataire est obligatoire",
            "prestataire_id.exists" => "L'identifiant du prestataire n'existe pas",
            "commentaire.string" => "Le commentaire doit être une chaîne de caractères",
        ];
    }
}


