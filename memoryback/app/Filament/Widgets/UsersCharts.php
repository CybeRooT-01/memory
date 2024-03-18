<?php

namespace App\Filament\Widgets;

use App\Models\Role;
use App\Models\User;
use Filament\Widgets\ChartWidget;

class UsersCharts extends ChartWidget
{
    protected static ?string $heading = 'Graphique des utilisateurs en fonction de leur role';

    protected function getData(): array
    {
        $roles = Role::all();
        $users = User::all();
        return [
            'datasets' => [
                [
                    'label' => 'roles',
                    'data' => $roles->map(function ($role) use ($users) {
                        return $users->where('role_id', $role->id)->count();
                    })->toArray(),
                ],
            ],
            'labels' => ["organisateur", "client","prestataire","service client"],
        ];
    }

    protected function getType(): string
    {
        return 'bar';
    }
}
