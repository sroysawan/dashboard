<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Planning extends Model
{
    use HasFactory;
    protected $table = "planning";
    protected $fillable = [
        'id_task',
        'id_job',
        'work_order',
        'sales_job',
        'prod_line',
        'item_no',
        'item_des',
        'mold',
        'site',
        'type',
        'work_center',
        'machine',
        'operation',
        'first_op',
        'op_color',
        'op_side',
        'op_des',
        'qty_order',
        'qty_comp',
        'qty_open',
        'date_due',
        'wo_status',
        'task_complete',
        'status_backup',
        'datetime_update',
        'run_time_std',
        'run_time_actual',
        'run_open_total',
    ];
    public $timestamps = false;
}