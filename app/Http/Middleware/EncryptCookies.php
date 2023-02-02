<?php

namespace App\Http\Middleware;

use Illuminate\Cookie\Middleware\EncryptCookies as Middleware;

class EncryptCookies extends Middleware
{
    /**
     * The names of the cookies that should not be encrypted.
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
