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
        Schema::create('invitation_prestataires', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('inviteur_id');
            $table->foreign('inviteur_id')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('invite_id');
            $table->foreign('invite_id')->references('id')->on('users')->onDelete('cascade');
            $table->unsignedBigInteger('evenement_id');
            $table->foreign('evenement_id')->references('id')->on('evenements')->onDelete('cascade');
            $table->boolean('accepte')->default(false);
            $table->longText('message')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invitation_prestataires');
    }
};
