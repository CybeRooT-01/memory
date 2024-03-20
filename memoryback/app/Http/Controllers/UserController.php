<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\traits\RadarTrait;
use App\Models\Prestataire;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\UserPutRequest;
use App\Http\Resources\UserRessource;
use App\Http\Resources\PrestataireResource;

class UserController extends Controller
{
    use RadarTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        $this->tracerAction('Liste des utilisateurs');
        return UserRessource::collection($users);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = new User();
        $allUsers = User::all();
        foreach ($allUsers as $u) {
            if ($u->email == $request->email) {
                return response()->json([
                    'message' => 'cet email existe deja'
                ], 401);
            }
        }
        DB::transaction(function () use ($request, &$user) {
            $length = 10;
            $randomString = bin2hex(random_bytes($length));
            $hashedString = hash('sha256', $randomString);
            $user = User::create([
                'name' => $request->nom,
                'email' => $request->email,
                'password' => $request->password,
                'login' => $request->login,
                'role_id'=>$request->role_id,
                'identifiant_bizzare' => $hashedString,
            ]);
        });
        $this->tracerAction('Création d\'un utilisateur');

        $token = $user->createToken('auth_token')->accessToken;
        $user->token = $token;
        return $user;
//        return new UserRessource($user);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
        {
            $user = User::where('identifiant_bizzare', $id)->first();
            if (!$user) {
                return response()->json(['message' => 'User not found'], 404);
            }
            $this->tracerAction('Affichage d\'un utilisateur');
            return  new UserRessource($user);
        }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserPutRequest $request)
    {
        DB::transaction(function () use ($request) {
            $user = User::find($request->id);
            $user->name = $request->nom;
            $user->email = $request->email;
            $user->photo = $request->photo;
            $user->login = $request->login;
            $user->description = $request->description;
            $user->twitter = $request->twitter;
            $user->facebook = $request->facebook;
            $user->instagram = $request->instagram;
            $user->telephone = $request->telephone;
            $user->save();
        });
        $this->tracerAction('Mise à jour d\'un utilisateur');

        return response()->json([
            'message' => 'User updated successfully'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $this->tracerAction('Suppression d\'un utilisateur');
        $user->delete();
    }
    public function allusers()
    {
        $users = User::all();
        $this->tracerAction('Liste des utilisateurs');
        return $users;
    }

    public function getuserPrestataires(){
        $prestataires = Prestataire::all();
        $this->tracerAction('Liste des prestataires');
        return PrestataireResource::collection($prestataires);
    }
}
