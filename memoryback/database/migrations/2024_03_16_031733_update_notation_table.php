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
        Schema::table('notations', function (Blueprint $table) {
            $table->dropForeign('notations_prestataire_id_foreign');
            $table->dropColumn('prestataire_id');

            $table->renameColumn('organisateur_id', 'noteur_id');

            $table->unsignedBigInteger('notee_id')->after('id');
            $table->foreign('notee_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('notations', function (Blueprint $table) {
            $table->dropForeign('notations_notee_id_foreign');
            $table->dropColumn('notee_id');

            $table->renameColumn('noteur_id', 'organisateur_id');

            $table->unsignedBigInteger('prestataire_id')->after('organisateur_id');
            $table->foreign('prestataire_id')->references('id')->on('users')->onDelete('cascade');
        });
    }
};
