<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pet extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'species',
        'date_of_birth',
        'date_of_death',
        'note'
    ];

    protected $casts = [
        'date_of_birth' => 'date',
        'date_of_death' => 'date',
    ];

    /**
     * Check if the pet is still alive
     */
    public function isAlive(): bool
    {
        return $this->date_of_death == null;
    }

    /**
     * Get living pets
     */
    public static function living()
    {
        return static::whereNull('date_of_death');
    }

    /**
     * Get deceased pets
     */
    public static function deceased()
    {
        return static::whereNotNull('date_of_death');
    }

}
