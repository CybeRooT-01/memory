<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * enlevet prestataire_id	evenement_id
     * creer reservation_id, participant_id
     */
    public function up(): void
    {
        Schema::table('demande_participations', function (Blueprint $table) {
            $table->dropForeign('demande_participations_prestataire_id_foreign');
            $table->dropForeign('demande_participations_evenement_id_foreign');
            $table->dropColumn('prestataire_id');
            $table->dropColumn('evenement_id');
            $table->unsignedBigInteger('reservation_id')->after('id');
            $table->unsignedBigInteger('participant_id')->after('reservation_id');
            $table->foreign('reservation_id')->references('id')->on('reservations');
            $table->foreign('participant_id')->references('id')->on('participants');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('demande_participations', function (Blueprint $table) {
            $table->dropForeign('demande_participations_reservation_id_foreign');
            $table->dropForeign('demande_participations_participant_id_foreign');
            $table->dropColumn('reservation_id');
            $table->dropColumn('participant_id');
            $table->unsignedBigInteger('prestataire_id');
            $table->unsignedBigInteger('evenement_id');
            $table->foreign('prestataire_id')->references('id')->on('prestataires');
            $table->foreign('evenement_id')->references('id')->on('evenements');
        });
    }
};
