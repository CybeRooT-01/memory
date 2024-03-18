<?php

namespace App\Filament\Resources\EvenementResource\Pages;

use App\Filament\Resources\EvenementResource;
use App\Filament\Resources\EvenementResource\Widgets\EventsOverview;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListEvenements extends ListRecords
{
    protected static string $resource = EvenementResource::class;
    protected function getHeaderWidgets(): array
    {
        return [
            EventsOverview::class
        ];
    }
    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
