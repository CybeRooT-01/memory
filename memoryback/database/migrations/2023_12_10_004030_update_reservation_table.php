<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * enlever date	service_reserver et user_id de la table reservation
     * creer une colonne participant_id et evenement_id
     */
    public function up(): void
    {
        Schema::table('reservations', function (Blueprint $table) {
            $table->dropForeign('reservations_user_id_foreign');
            $table->dropColumn('user_id');
            $table->dropColumn('date');
            $table->dropColumn('service_reserver');
            $table->unsignedBigInteger('participant_id')->after('id');
            $table->unsignedBigInteger('evenement_id')->after('participant_id');
            $table->foreign('participant_id')->references('id')->on('participants');
            $table->foreign('evenement_id')->references('id')->on('evenements');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reservations', function (Blueprint $table) {

            $table->dropForeign('reservations_participant_id_foreign');
            $table->dropForeign('reservations_evenement_id_foreign');
            $table->dropColumn('participant_id');
            $table->dropColumn('evenement_id');
            $table->unsignedBigInteger('user_id');
            $table->date('date');
            $table->string('service_reserver');
            $table->foreign('user_id')->references('id')->on('users');
        });
    }
};
