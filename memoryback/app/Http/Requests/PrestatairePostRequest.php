<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PrestatairePostRequest extends FormRequest
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
            "nom" => "required|string",
            "services" => "required|string",
            "tarif" => "required|numeric",
            "avis" => "string",
            "user_id" => "required|exists:users,id",
        ];
    }
    /**
     * Get the error messages for the defined validation rules.
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            "nom.required" => "Le nom est obligatoire",
            "service.required" => "Le service est obligatoire",
            "tarif.required" => "Le tarif est obligatoire",
            "avis.string" => "L'avis doit être une chaîne de caractères",
//            "photo1.string" => "La photo doit être une chaîne de caractères",
//            "photo2.string" => "La photo doit être une chaîne de caractères",
//            "photo3.string" => "La photo doit être une chaîne de caractères",
            "user_id.required" => "L'identifiant de l'utilisateur est obligatoire",
            "user_id.exists" => "L'identifiant de l'utilisateur n'existe pas",
        ];
    }
}
