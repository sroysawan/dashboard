<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Staff extends Model
{
    use HasFactory;
    protected $table = "staff" ;
    protected $fillable = [
        'id_staff',
        'id_rfid',
        'prefix',
        'name_first',
        'name_last',
        // 'site',
        'id_role',
        'id_shif',
        'staff_img',
    ];
    public $timestamps = false;
}

 //$sql = "SELECT * FROM `staff` INNER JOIN `role` ON staff.id_role=role.id_role";
