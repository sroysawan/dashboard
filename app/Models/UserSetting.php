<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSetting extends Model
{
    use HasFactory;
    protected $table = 'user_settings';
    protected $primaryKey = 'id';
    protected $fillable = [
        'user_id',
        'setting_1',
        'setting_2',
        'setting_3',
    ];
}
