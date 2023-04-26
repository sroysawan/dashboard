<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Divider extends Model
{
    use HasFactory;
    protected $table = 'divider';
    protected $fillable = [
        'id_divider',
        'op_color',
        'op_side',
        'divider'
    ];
    public $timestamps = false;
}
