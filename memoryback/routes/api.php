<?php

use Illuminate\Http\Request;
use App\Http\Resources\UserRessource;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\NotationController;
use App\Http\Controllers\EvenementController;
use App\Http\Controllers\PrestataireController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\DemandeParticipationController;
use App\Http\Controllers\InvitationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->get('/verify-token', function () {
  return true; // Si le middleware auth:api passe, le token est valide
});
Route::middleware('auth:api')->group(function () {
  Route::apiResource('/evenements', EvenementController::class);
  Route::post('/register', [UserController::class, 'store']);
  Route::get('/users/{id}', [UserController::class, 'show']);
  Route::apiResource('/prestataires', PrestataireController::class);
  Route::apiResource('/demande-participation', DemandeParticipationController::class );
  Route::get('/reservations', [ReservationController::class, 'index']);
  Route::match(['put', 'patch'], '/users', [UserController::class, 'update']);
  Route::post('/message', [ChatController::class, 'message']);
  Route::get('/message', [ChatController::class, 'getChat']);
  Route::get('/user/{id}/messages', [ChatController::class, 'getUserChat']);
  Route::post('/notation', [NotationController::class, 'store']);
  Route::get('/user/prestataires', [UserController::class, 'getuserPrestataires']);
  Route::get('/evenement/user/{id}', [EvenementController::class, 'getuserEvenements']);
  Route::post('/prestataire/invite', [PrestataireController::class, 'invitePrestataire']);
  Route::get('/prestataire/{id}/invitations', [PrestataireController::class, 'getInvitations']);
  Route::match(['put', 'patch'], '/prestataire/invitation/accepter/{id}', [InvitationController::class, 'accepterInvitation']);
  Route::delete('/prestataire/invitation/refuser/{id}', [InvitationController::class, 'refuserInvitation']);

  Route::get('user', function (Request $request) {
    return new UserRessource($request->user());
  });

  Route::get('users', [UserController::class, 'allUsers']);

  Route::post('logout', function (Request $request) {
    $request->user()->token()->revoke();
    return response()->json(['message' => 'Logged out'], 200);
  });
});
