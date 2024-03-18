<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'login' => ['required'],
            'password' => ['required'],
        ]);
        Auth::attempt($credentials);
        if(Auth::user() === null){
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }
        /** @var \App\Models\User $user **/
        $user = Auth::user();
        $token = $user->createToken('auth_token')->accessToken;
        $cookie = cookie('token', $token, 60*24);
        return response()->json([
            'token' => $token,
        ], 200)->withCookie($cookie);
    }
}
