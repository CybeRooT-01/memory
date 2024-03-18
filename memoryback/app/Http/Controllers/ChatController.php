<?php

namespace App\Http\Controllers;

use App\Events\Message;
use App\Http\Resources\ChatResource;
use App\Http\Resources\ChatterResource;
use App\Http\Resources\UserRessource;
use App\Models\Messages;
use App\Models\User;
use App\traits\NotFoundResponseTrait;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    use NotFoundResponseTrait;
    public function getChat(){
        $messages = Messages::all();
        return response()->json([
            'messages' => ChatResource::collection($messages),
        ], 200);
    }
    public function getUserChat($id){
        $user = Messages::where('sender_id', $id)->orWhere('receiver_id', $id)->get();
        if(!$user){
            return $this->notFoundResponse('Utilisateur introuvable');
        }
        return response()->json([
            'messages' => ChatResource::collection($user),
        ], 200);
    }
    public function message(request $request){
        $sender_id = $request->sender_id;
        $receiver_id = $request->receiver_id;
        $message = $request->message;
        if ($sender_id === $receiver_id) {
            return $this->notFoundResponse('Vous ne pouvez pas vous envoyer de message à vous même');
        }
        $sender = User::find($sender_id);
        $receiver = User::find($receiver_id);
        if(!$sender || !$receiver){
            return $this->notFoundResponse('Utilisateur introuvable');
        }
        $chatter = new UserRessource(User::find($receiver_id));
        $chatter_id = $chatter->id;
        $messages = Messages::where('sender_id', $receiver_id)
            ->orWhere('receiver_id', $receiver_id)
            ->get()
            ->map(function ($msg) use ($chatter_id) {
                return [
                    'type' => $msg->sender_id == $chatter_id ? 'reçu' : 'envoyé',
                    'texte' => $msg->message,
                    'date' => $msg->created_at->format('d/m/Y H:i:s'),
                ];
            });
        $formatted_messages = [];
        foreach ($messages as $msg) {
            $formatted_messages[] = [
                'type' => $msg['type'],
                'texte' => $msg['texte'],
                'date' => $msg['date'],
            ];
        }
        $response = [
            'chatter' => $chatter,
            'messages' => $formatted_messages,
        ];
        try {
            event(new Message($message, $sender_id, $receiver_id, $response));
            Messages::create([
                'sender_id' => $sender_id,
                'receiver_id' => $receiver_id,
                'message' => $message,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Message non envoyé',
                'error' => $th->getMessage(),
            ], 500);
        }



        return response()->json([
            'message' => 'Message envoyé',
            'chat' => $message,
        ], 200);
    }
}
