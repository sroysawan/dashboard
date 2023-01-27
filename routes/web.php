<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\activityController;
use App\Http\Controllers\countController;
use App\Http\Controllers\repeatController;
use App\Http\Controllers\dashboardController;
use App\Http\Controllers\dashboardRefreshController;
use Illuminate\Support\Facades\Redirect;


Route::get('/dashboard', function () {
    return view('dashboard');
});

Route::get('/operation', function () {
    return view('operation');
});

// Route::get('/update/activity/',
//     [activityController::class, 'getInfoActivity']
// );

// Route::get('/update/count/',
//     [countController::class, 'getInfoCount']
// );

// Route::get('/update/repeat/',
//     [repeatController::class, 'getInfoRepeat']
// );

// Route::get('/update/count_v2/',
//     [countController::class, 'getInfoCountV2']
// );

// Route::get('/update/repeat_v2/',
//     [repeatController::class, 'getInfoRepeatV2']
// );

// Route::get('/update/DashboardRefresh/',
//     [dashboardRefreshController::class, 'dashboardRefreshV2']
// );


//Dashboard
Route::get('/update/DashboardRefresh/',
    [dashboardRefreshController::class, 'dashboardRefreshV5']
);

Route::post('/get/indivvidual/dashboard/details',
[dashboardRefreshController::class, 'getDashboardDetails'])->name('dashboard.details');

//Modal
Route::get('/update/DashboardRefreshQueue2/',
    [dashboardRefreshController::class, 'dashboardRefreshQueue2']
);



