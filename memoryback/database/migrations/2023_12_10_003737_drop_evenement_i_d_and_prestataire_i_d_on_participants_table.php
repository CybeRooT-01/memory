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
        Schema::table('participants', function (Blueprint $table) {
            $table->dropForeign('participants_evenement_id_foreign');
            $table->dropColumn('evenement_id');
            $table->dropForeign('participants_prestataire_id_foreign');
            $table->dropColumn('prestataire_id');
            $table->string('nom_complet');
            $table->string('adresse');
            $table->string('email');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
