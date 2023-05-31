<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Logs extends Model
{
    use HasFactory;
    protected $table = 'log';
    protected $fillable = [
        'id_log',
        'log_datetime',
        'log_description'
    ];
    public $timestamps = false;
}
