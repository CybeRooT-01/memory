<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EvenementPutRequest extends FormRequest
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
            'nom' => 'string',
            'date' => 'date',
            'heure' => 'date_format:H:m',
            'lieu' => 'string',
            'type_evenement' => 'string|max:50',
            'description' => 'string|max:255',
        ];
    }
    public function messages(): array
    {
        return [
            'nom.string' => 'Le nom doit être une chaîne de caractères',
            'date.date' => 'La date doit être une date',
            'heure.date_format' => 'L\'heure doit être au format HH:MM',
            'lieu.string' => 'Le lieu doit être une chaîne de caractères',
            'type_evenement.string' => 'Le type d\'événement doit être une chaîne de caractères',
            'description.string' => 'La description doit être une chaîne de caractères',
            'type_evenement.max' => 'Le type d\'événement ne doit pas dépasser 50 caractères',
            'description.max' => 'La description ne doit pas dépasser 255 caractères',
        ];
    }
}
