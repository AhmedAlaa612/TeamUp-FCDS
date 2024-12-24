<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TeamController;

Route::post('/register', function () {
    return '222welcome';
});
Route::get('/', function () {
    return view('welcome');
});
