<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CodeDowntime extends Model
{
    use HasFactory;
    protected $table = 'code_downtime';
    protected $fillable = [
        'id_code_downtime',
        'code_downtime',
        'des_downtime',
        'des_downtime_thai',

    ];
    public $timestamps = false;
}
