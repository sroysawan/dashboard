<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Machine extends Model
{
    use HasFactory;
    protected $table = 'machine';
    protected $fillable = [
        'id_mc',
        'id_mc_type',
        'mc_des',
        'mc_img',
        'id_wip',
        'id_workmode',
        'id_wip_next',
        'id_workmode_next',
        'id_box',
        'time_contact',
        'contact_count'
    ];
    public $timestamps = false;
}