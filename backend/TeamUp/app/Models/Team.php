<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'teams';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'size',
        'teamDescription',
        'courseId',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'size' => 'integer',
    ];

    /**
     * Relationships
     */

    // A team belongs to a course
    public function course()
    {
        return $this->belongsTo(Course::class, 'courseId');
    }

    // A team has many users
    public function users()
    {
        return $this->belongsToMany(User::class, 'userteam', 'teamId', 'userId');
    }
}
