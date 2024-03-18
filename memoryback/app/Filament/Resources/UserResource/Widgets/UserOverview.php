<?php

namespace App\Filament\Resources\UserResource\Widgets;

use App\Models\User;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class UserOverview extends BaseWidget
{
    protected function getStats(): array
    {
        $users = User::all()->sortBy('created_at');
        $userIds = $users->pluck('id')->toArray();
        $usersDeleted = User::onlyTrashed()->get();
        $usersDeletedIds = $usersDeleted->pluck('id')->toArray();
        arsort($usersDeletedIds);

        return [
            Stat::make('utilisateurs', User::count())
                ->description('Tout les utilisateurs actifs')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->chart($userIds)
                ->color('success'),
            //un stat pour les user supprimer
            Stat::make('utilisateurs supprimer', $usersDeleted->count())
                ->description('Tout les utilisateurs supprimer')
                ->descriptionIcon('heroicon-m-arrow-trending-down')
                ->chart($usersDeletedIds)
                ->color('danger'),
            //total des utilisateurs
            Stat::make('Total utilisateurs', User::count() + $usersDeleted->count())
                ->description('Total des utilisateurs')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->chart($userIds)
                ->color('primary'),
        ];
    }
}
