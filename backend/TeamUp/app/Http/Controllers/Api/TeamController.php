<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Team;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use App\Models\Course;

class TeamController extends Controller
{
    public function createTeam(Request $request)
    {
        // Validate incoming request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'size' => 'required|integer|min:1',
            'teamDescription' => 'required|string',
            'courseId' => 'required|exists:courses,id',
        ]);

        // Create a new team
        $team = Team::create([
            'name' => $validated['name'],
            'size' => $validated['size'],
            'teamDescription' => $validated['teamDescription'],
            'courseId' => $validated['courseId'],
        ]);

        // Add authenticated user to the team
        $user = $request->user();
        $team->users()->attach($user->id);

        // Return success response with team data
        return response()->json(['message' => 'Team created successfully', 'team' => $team]);
    }

    public function deleteTeam($id)
    {
        try {
            // Find the team by ID
            $team = Team::findOrFail($id);

            // First detach all users from the team
            $team->users()->detach();

            // Then delete the team
            $team->delete();

            return response()->json(['message' => 'Team deleted successfully']);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete team',
                'error' => $e->getMessage()
            ], 500);
        }
    }



    public function joinTeam(Request $request, $teamId)
    {
        try {
            // Validate incoming request
            $validated = $request->validate([
                'userId' => 'required|exists:users,id',
            ]);

            // Find the team by ID
            $team = Team::findOrFail($teamId);

            // Check if user is already in team
            if ($team->users()->where('userId', $validated['userId'])->exists()) {
                return response()->json([
                    'message' => 'User is already a member of this team'
                ], 400);
            }

            // Check if team is full
            if ($team->users()->count() >= $team->size) {
                return response()->json([
                    'message' => 'Team is full'
                ], 400);
            }

            // Attach the user to the team
            $team->users()->attach($validated['userId']);

            // Return team with updated members
            return response()->json([
                'message' => 'User joined the team successfully',
                'team' => $team->load('users:id,firstName,lastName')
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to join team',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getUserTeams($userId)
    {
        // Find the user by ID
        $user = User::findOrFail($userId);

        // Get all teams the user is part of with minimal fields
        $teams = $user->teams()
            ->select(
                'teams.id',
                'teams.name',
                'teams.size',
                'teams.teamDescription',
                'teams.courseId'
            )
            ->with(['users:id,firstName,lastName'])
            ->with(['course:id,name'])
            ->get();

        return response()->json(['teams' => $teams]);
    }


    public function getOtherTeams($userId)
    {
        // Find the user by ID
        $user = User::findOrFail($userId);

        // Get all teams the user is not part of with minimal fields
        $teams =
            Team::select('teams.id', 'teams.name', 'teams.size', 'teams.teamDescription', 'teams.courseId')
            ->whereDoesntHave('users', function ($query) use ($userId) {
                $query->where('userId', $userId);
            })
            ->with(['users:id,firstName,lastName'])
            ->with(['course:id,name'])
            ->get();

        return response()->json(['teams' => $teams]);
    }
    public function getCourses()
    {
        try {
            // Get all courses
            $courses = Course::all();

            return response()->json([
                'status' => 'success',
                'courses' => $courses
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Failed to fetch courses',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function leaveTeam(Request $request, $teamId)
    {
        try {
            // Validate incoming request
            $validated = $request->validate([
                'userId' => 'required|exists:users,id',
            ]);

            // Find the team
            $team = Team::findOrFail($teamId);

            // Check if user is in team
            if (!$team->users()->where('userId', $validated['userId'])->exists()) {
                return response()->json([
                    'message' => 'User is not a member of this team'
                ], 400);
            }

            // Detach the user from the team
            $team->users()->detach($validated['userId']);

            return response()->json([
                'message' => 'Successfully left the team'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to leave team',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
