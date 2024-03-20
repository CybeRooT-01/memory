<?php
namespace App\traits;

use App\Models\User;
use App\Models\Tracking;
use Illuminate\Support\Facades\Auth;

trait RadarTrait
{
    public function infoConnect()
    {
        $utilisateurConnecte = Auth::user();
        $adresseIP = $this->obtenirAdresseIP();
        
        return [
            'utilisateur' => $utilisateurConnecte,
            'adresse_ip' => $adresseIP
        ];
    }

    private function obtenirAdresseIP()
    {
        $adresseIP = '';

        if (isset($_SERVER['HTTP_CLIENT_IP'])) {
            $adresseIP = $_SERVER['HTTP_CLIENT_IP'];
        } elseif (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
            $adresseIP = $_SERVER['HTTP_X_FORWARDED_FOR'];
        } elseif (isset($_SERVER['HTTP_X_FORWARDED'])) {
            $adresseIP = $_SERVER['HTTP_X_FORWARDED'];
        } elseif (isset($_SERVER['HTTP_FORWARDED_FOR'])) {
            $adresseIP = $_SERVER['HTTP_FORWARDED_FOR'];
        } elseif (isset($_SERVER['HTTP_FORWARDED'])) {
            $adresseIP = $_SERVER['HTTP_FORWARDED'];
        } elseif (isset($_SERVER['REMOTE_ADDR'])) {
            $adresseIP = $_SERVER['REMOTE_ADDR'];
        }

        return $adresseIP;
    }

    public function tracerAction($action)
    {
        $utilisateurConnecte = Auth::user();
        $adresseIP = $this->obtenirAdresseIP();

        Tracking::create([
            'ip' => $adresseIP,
            'user_id' => $utilisateurConnecte->id,
            'action' => $action
        ]);
    }
}
