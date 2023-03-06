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

//Dashboard New DB
Route::get('/update/DashboardRefresh/',
    [dashboardRefreshController::class, 'dashboardRefreshV5']
);


//Dashboard old DB
Route::get('/update/DashboardRefreshold/',
    [dashboardRefreshController::class, 'dashboardRefreshV5old']
);

Route::post('/get/indivvidual/dashboard/details',
[dashboardRefreshController::class, 'getDashboardDetails'])->name('dashboard.details');

Route::post('/update/dashboard/data/update',
       [dashboardRefreshController::class, 'updateDashboardData'])->name('dashboard.update'); 

Route::get('/get/indivvidual/dashboard/detailsNew',
[dashboardRefreshController::class, 'getDashboardDetailsNewDB'])->name('dashboard.detailsNew');

//Modal old DB
Route::get('/update/DashboardRefreshQueue2/',
    [dashboardRefreshController::class, 'dashboardRefreshQueue2']
);

//Modal New DB
Route::get('/update/DashboardRefreshQueue2New/',
    [dashboardRefreshController::class, 'dashboardRefreshQueue2New']
);

////////////////////////////////////////////////////////////////////////////////////////////////////////

Route::get('/operation', function () {
    return view('operation');
});

//Operation
Route::get('/update/OperationRefresh/',
    [dashboardRefreshController::class, 'OperationRefreshV5']
);

////////////////////////////////////////////////////////////////////////////////////////////////////////

Route::get('/newtask', function () {
    return view('newtask');
});






