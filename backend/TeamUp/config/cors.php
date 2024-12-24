<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

     'paths' => ['api/*', 'sanctum/csrf-cookie', '*'],

'allowed_methods' => ['*'],

'allowed_origins' => [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:3000',
    'http://localhost:8000',
    '*'  // Allow all origins in development
],

'allowed_origins_patterns' => [],

'allowed_headers' => [
    'Content-Type',
    'X-Requested-With',
    'Authorization',
    'X-XSRF-TOKEN',
    'Accept',
    'Origin',
    'Access-Control-Allow-Origin',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers'
],

'exposed_headers' => [
    'Authorization',
    'Access-Control-Allow-Origin'
],

'max_age' => 0,

'supports_credentials' => true,

'access_control_allow_credentials' => true,

];
