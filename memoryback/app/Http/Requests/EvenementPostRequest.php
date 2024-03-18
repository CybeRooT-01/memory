<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EvenementPostRequest extends FormRequest
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
            'nom' => 'required|string',
            'date' => 'required|date',
            'heure' => 'required',
            'lieu' => 'required|string',
            'type_evenement' => 'required|string|max:50',
            'description' => 'required|string|max:255',
            'user_id' => 'required|integer|exists:users,id',
        ];
    }
    public function messages(): array
    {
        return [
            'nom.required' => 'Le nom est obligatoire',
            'nom.string' => 'Le nom doit être une chaîne de caractères',
            'date.required' => 'La date est obligatoire',
            'date.date' => 'La date doit être une date',
            'heure.required' => 'L\'heure est obligatoire',
            'lieu.required' => 'Le lieu est obligatoire',
            'lieu.string' => 'Le lieu doit être une chaîne de caractères',
            'type_evenement.required' => 'Le type d\'événement est obligatoire',
            'type_evenement.string' => 'Le type d\'événement doit être une chaîne de caractères',
            'description.required' => 'La description est obligatoire',
            'description.string' => 'La description doit être une chaîne de caractères',
            'user_id.required' => 'L\'id de l\'utilisateur est obligatoire',
            'user_id.integer' => 'L\'id de l\'utilisateur doit être un entier',
            'user_id.exists' => 'L\'id de l\'utilisateur n\'existe pas',
            'heure.date_format' => 'L\'heure doit être au format HH:MM',
            'type_evenement.max' => 'Le type d\'événement ne doit pas dépasser 50 caractères',
            'description.max' => 'La description ne doit pas dépasser 255 caractères',
        ];
    }
}
