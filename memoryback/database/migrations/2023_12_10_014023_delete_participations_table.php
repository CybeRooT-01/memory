<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //enlever participant_id	evenement_id de la table reservation
        Schema::table('reservations', function (Blueprint $table) {
            $table->dropForeign('reservations_participant_id_foreign');
            $table->dropColumn('participant_id');
        });
        // enlever participant_id de la table demande_participations
        Schema::table('demande_participations', function (Blueprint $table) {
            $table->dropForeign('demande_participations_participant_id_foreign');
            $table->dropColumn('participant_id');
        });
        Schema::dropIfExists('participants');

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

    }
};
