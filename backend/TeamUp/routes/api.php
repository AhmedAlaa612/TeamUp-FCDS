<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TeamController;
use App\Http\Controllers\Api\ContactController;
use Illuminate\Support\Facades\Route;


Route::post('/register', [AuthController::class, 'createUser']);
Route::post('/login', [AuthController::class, 'signInUser'])->name('login');
Route::post('/contact', [ContactController::class, 'store']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logoutUser']);
    Route::put('/user/{id}', [AuthController::class, 'editUser']);
    Route::put('/user/{id}/photo', [AuthController::class, 'editUserPhoto']);
    Route::post('/teams', [TeamController::class, 'createTeam']);
    Route::delete('/teams/{team}', [TeamController::class, 'deleteTeam']);
    Route::post('/teams/{team}/join', [TeamController::class, 'joinTeam']);
    Route::get('/teams/user/{userId}', [TeamController::class, 'getUserTeams']);
    Route::get('/teams/other/{userId}', [TeamController::class, 'getOtherTeams']);
    Route::get('/courses', [TeamController::class, 'getCourses']);
    Route::post('/teams/{teamId}/leave', [TeamController::class, 'leaveTeam']);
    Route::get('/user', [AuthController::class, 'getUser']);
});
