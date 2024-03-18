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
        Schema::table('reservations', function (Blueprint $table) {
            $table->dropColumn('montant_paye');
        });

        Schema::table('prestataires', function (Blueprint $table) {
            $table->dropColumn('photo');
            $table->LongText('photo1')->nullable()->after('photo');
            $table->LongText('photo2')->nullable()->after('photo1');
            $table->LongText('photo3')->nullable()->after('photo2');
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
