<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PetController;

Route::get('/status', fn() =>
    response()->json(['message' => 'Pet Catalogue is running'])
);

Route::middleware('auth:sanctum')->get('/user', fn(Request $request) =>
    $request->user()
);

Route::get('/pets/stats', [PetController::class, 'stats']);
Route::apiResource('pets', PetController::class);
