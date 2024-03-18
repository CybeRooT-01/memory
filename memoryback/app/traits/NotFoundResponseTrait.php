<?php

namespace App\traits;

use Illuminate\Http\Response;

trait NotFoundResponseTrait
{
    public function notFoundResponse($message)
    {
        return response()->json([
            "message" => $message
        ], Response::HTTP_NOT_FOUND);
    }
}
