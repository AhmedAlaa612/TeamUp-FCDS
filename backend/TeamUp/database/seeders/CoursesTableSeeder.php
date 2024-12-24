<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Course;
class CoursesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Course::insert([
            [
                'name' => 'Web Development Basics',
                'courseCode' => 'WD101',
                'courseDescription' => 'An introductory course to web development covering HTML, CSS, and JavaScript.',
            ],
            [
                'name' => 'Advanced PHP',
                'courseCode' => 'PHP201',
                'courseDescription' => 'A deep dive into PHP with a focus on OOP, frameworks, and best practices.',
            ],
            [
                'name' => 'Database Design',
                'courseCode' => 'DB301',
                'courseDescription' => 'Learn the principles of relational database design and management.',
            ],
        ]);    }
}
