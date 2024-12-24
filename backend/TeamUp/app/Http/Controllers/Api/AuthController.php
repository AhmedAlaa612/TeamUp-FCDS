<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

class AuthController extends Controller
{
    public function createUser(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'firstName' => $request->firstName,
            'lastName' => $request->lastName,
            'phoneNumber' => $request->phoneNumber,
            'linkedinUrl' => $request->linkedinUrl,
            'gitHubUrl' => $request->gitHubUrl,
            'bio' => $request->bio,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json(['access_token' => $token, 'user' => $user]);
    }

    public function signInUser(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $validated['email'])->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'user' => $user,
        ]);
    }

    public function logoutUser(Request $request)
    {
        // Revoke the user's current token
        $request->user()->tokens->each(function ($token) {
            $token->delete();
        });

        // Return a success response
        return response()->json(['message' => 'Logged out successfully']);
    }


    public function editUser(Request $request, $id)
    {
        // Validate incoming request
        $validated = $request->validate([
            'firstName' => 'sometimes|string|max:255',
            'lastName' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $id,
            'phoneNumber' => 'sometimes|string|max:15',
        ]);

        // Find the user by ID
        $user = User::findOrFail($id);

        // Update user details
        $user->update($validated);

        // Return success response
        return response()->json(['message' => 'User updated successfully', 'user' => $user]);
    }


    public function editUserPhoto(Request $request, $id)
    {
        // Validate incoming request


        // Find the user by ID
        $user = User::findOrFail($id);

        // Check if the request has a file
        if ($request->hasFile('image')) {
            // Store the image in the 'public' disk and get the relative path
            $imagePath = $request->file('image')->store('user_photos', 'public');

            // Update the user's image path in the database
            $user->imagePath = $imagePath;
            $user->save();

            // Return success response with the stored image path
            return response()->json(['message' => 'User photo updated successfully', 'imagePath' => $imagePath]);
        }

        // Return error response if no image file was uploaded
        return response()->json(['message' => 'No image file found'], 400);
    }

    public function getUser(Request $request)
    {
        return response()->json($request->user());
    }
}
