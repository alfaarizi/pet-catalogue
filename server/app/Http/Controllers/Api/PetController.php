<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pet;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $pets = Pet::orderBy('created_at', 'desc')->get();
        return response()->json([
            'success' => true,
            'message' => 'Pets retrieved successfully',
            'data' => $pets
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'species' => 'required|string|max:255',
            'date_of_birth' => 'required|date',
            'note' => 'nullable|string',
        ]);
        $pet = Pet::create($validated);
        return response()->json([
            'success' => true,
            'message' => 'Pet created successfully',
            'data' => $pet
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Pet $pet): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'Pet retrieved successfully',
            'data' => $pet
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pet $pet): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'species' => 'required|string|max:255',
            'date_of_birth' => 'required|date',
            'date_of_death' => 'nullable|date|after_or_equal:date_of_birth',
            'note' => 'nullable|string',
        ]);
        $pet->update($validated);
        return response()->json([
            'success' => true,
            'message' => 'Pet updated successfully',
            'data' => $pet
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pet $pet): JsonResponse
    {
        $pet->delete();
        return response()->json([
            'success' => true,
            'message' => 'Pet deleted successfully'
        ], 204);
    }

    public function stats(): JsonResponse
    {
        $living = Pet::living()->count();
        $deceased = Pet::deceased()->count();
        $total = $living + $deceased;
        return response()->json([
            'success' => true,
            'message' => 'Pet statistics retrieved successfully',
            'data' => [
                'total' => $total,
                'living' => $living,
                'deceased' => $deceased,
            ]
        ]);
    }
}
