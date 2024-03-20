<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeders extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'libelle' => "Organisateur d'Événements",
                'description' => "Organisateur d'Événements"
            ],
            [
                'libelle' => "Prestataire de Services",
                'description' => "Prestataire de Services"
            ],
        ];
        Role::insert($roles);
    }
}
