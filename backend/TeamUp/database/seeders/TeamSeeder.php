<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\Team;

class TeamSeeder extends Seeder
{
    public function run()
    {
        // Seeding the teams table with 4 rows
        Team::create([
            'name' => 'Team Alpha',
            'size' => 5,
            'teamDescription' => 'This is Team Alpha.',
            'courseId' => 1, // Replace with an existing course ID
        ]);

        Team::create([
            'name' => 'Team Beta',
            'size' => 4,
            'teamDescription' => 'This is Team Beta.',
            'courseId' => 1, // Replace with an existing course ID
        ]);

        Team::create([
            'name' => 'Team Gamma',
            'size' => 6,
            'teamDescription' => 'This is Team Gamma.',
            'courseId' => 2, // Replace with an existing course ID
        ]);

        Team::create([
            'name' => 'Team Delta',
            'size' => 3,
            'teamDescription' => 'This is Team Delta.',
            'courseId' => 2, // Replace with an existing course ID
        ]);
    }
}
