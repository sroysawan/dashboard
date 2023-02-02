<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\PreventRequestsDuringMaintenance as Middleware;

class PreventRequestsDuringMaintenance extends Middleware
{
    /**
     * The URIs that should be reachable while maintenance mode is enabled.
     *
     * @var array<int, string>
     */
    protected $except = [
        '/get/individual/dashboard/details',
        '/get/individual/dashboard/details/',
        'http://127.0.0.1:8000/get/individual/dashboard/details'
        //
    ];
}
