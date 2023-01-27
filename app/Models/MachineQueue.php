<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MachineQueue extends Model
{
    use HasFactory;
    protected $table = "machine_queue";
    // protected $fillable = [
    //     'status_work',
    //     'id-machine_queue',
    //     'id_machine',
    //     'queue_number',
    //     'id_task',
    //     'id_staff',
    //     'comp_date',
    //     'comp_time',
    // ];

    protected $fillable = [
        'id-machine_queue',
        'id_machine',
        'queue_number',
        'id_task',
        'id_staff',
        'comp_date',
        'comp_time',
    ];
    public $timestamps = false;
}