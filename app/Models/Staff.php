<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    use HasFactory;
    protected $table = "staff";
    protected $fillable = [
        'id_staff',
        'id_rfid',
        'prefix',
        'name_first',
        'name_last',
        'status_staff',
        // 'site',
        'id_role',
        'id_shif',
        'staff_img',
    ];
    public $timestamps = false;


}
