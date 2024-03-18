<?php

namespace App\Filament\Resources\EvenementResource\Widgets;

use App\Models\Evenement;
use App\Models\User;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class EventsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        $users = Evenement::all()->sortBy('created_at');
        $userIds = $users->pluck('id')->toArray();
        $usersDeleted = Evenement::onlyTrashed()->get();
        $usersDeletedIds = $usersDeleted->pluck('id')->toArray();
        arsort($usersDeletedIds);

        return [
            Stat::make('Evenements', Evenement::count())
                ->description('Tout les Evenements actifs')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->chart($userIds)
                ->color('success'),
            //un stat pour les user supprimer
            Stat::make('Evenements supprimés', $usersDeleted->count())
                ->description('Tout les utilisateurs supprimer')
                ->descriptionIcon('heroicon-m-arrow-trending-down')
                ->chart($usersDeletedIds)
                ->color('danger'),
            //total des utilisateurs
            Stat::make('Total Evenements', Evenement::count() + $usersDeleted->count())
                ->description('Total des Evenements')
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->chart($userIds)
                ->color('primary'),
        ];
    }
}
