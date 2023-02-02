<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Repeat extends Model
{
    use HasFactory;
    protected $table = 'repeat_activity';
    protected $fillable = [
        'id_activity',
        'time_repeat',
        'count_repeat'
    ];
    public $timestamps = false;
}
