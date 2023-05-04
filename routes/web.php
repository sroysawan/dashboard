<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\activityController;
use App\Http\Controllers\countController;
use App\Http\Controllers\repeatController;
use App\Http\Controllers\dashboardController;
use App\Http\Controllers\dashboardRefreshController;
use App\Http\Controllers\operationController;
use App\Http\Controllers\newtaskController;
use App\Http\Controllers\loginController;
use Illuminate\Support\Facades\Redirect;

Route::get('/', function () {
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

////////////////////////////////////////////////////////////////////////////////////////////////////////

Route::get('/get/indivvidual/dashboard/details',
[dashboardRefreshController::class, 'getDashboardDetails'])->name('dashboard.details');

//edit modal
Route::post('/update/dashboard/modal',
       [dashboardRefreshController::class, 'updateModalDashboard'])->name('dashboard.update'); 

Route::get('/get/indivvidual/dashboard/detailsNew',
[dashboardRefreshController::class, 'getDashboardDetailsNewDB'])->name('dashboard.detailsNew');

////////////////////////////////////////////////////////////////////////////////////////////////////////

//Modal old DB
Route::get('/update/DashboardRefreshQueue2/',
    [dashboardRefreshController::class, 'dashboardRefreshQueue2']
);

//Next Modal New DB 
Route::get('/update/DashboardRefreshQueue2New/',
    [dashboardRefreshController::class, 'dashboardRefreshQueue2New']
);

////////////////////////////////////////////////////////////////////////////////////////////////////////

Route::get('/operation', function () {
    return view('operation'); //ชื่อไฟล์ blade
});

//Operation
// Route::get('/update/OperationRefresh/',
//     [dashboardRefreshController::class, 'OperationRefreshV5']
// );

//change operation
Route::post('/change/Operation', [operationController::class, 'ChangeOperation']);
//Add New Operation
Route::post('/add/Operation', [operationController::class, 'AddNewOperation']);

////////////////////////////////////////////////////////////////////////////////////////////////////////

//reset activity
Route::post('/reset/activity', [operationController::class, 'resetActivity']);

// Route::post('/update-operation/{id_mc}', [operationController::class, 'updateOperation']);

////////////////////////////////////////////////////////////////////////////////////////////////////////
//remove task
Route::post('/remove/Machine', [operationController::class, 'RemoveMachine']);

////////////////////////////////////////////////////////////////////////////////////////////////////////

//feed next q
Route::post('/feed/Machine', [operationController::class, 'FeedMachine']);

////////////////////////////////////////////////////////////////////////////////////////////////////////

Route::get('/newtask', function () {
    return view('newtask');
});

Route::get('/login', function () {
    return view('login');
});

Route::post('/login/validate', [loginController::class, 'authLogin']);

Route::post('/select/Newtask', [newtaskController::class, 'NewTask']);







