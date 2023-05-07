<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Approve extends Model
{
    use HasFactory;
    protected $table = "approve";
    protected $fillable = [
        'id_foreman',
        'id_staff',
        'edit_data',
        'id_approve',
        'id_manager',
        'new_data',
        'update_history',
        'prefix',
        'role',
        'name',
        'status',
    ];
    public $timestamps = false;
}

