<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'courses';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'courseCode',
        'courseDescription',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];

    /**
     * Define relationships if needed.
     */

    // Example: If a Course belongs to multiple Users
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_course', 'courseId', 'userId');
    }

    // Example: If a Course has multiple Teams
    public function teams()
    {
        return $this->hasMany(Team::class, 'courseId');
    }
}
