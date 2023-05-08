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
use App\Http\Controllers\staffController;
use App\Http\Controllers\ApproveController;
use Illuminate\Support\Facades\Redirect;

//Login
Route::get('/login', function () {
    return view('login');
});

Route::post('/login/validate', [loginController::class, 'authLogin']);

//remember user setting
Route::post('/user/settings', [loginController::class, 'userSetting']);

////////////////////////////////////////////////////////////////////////////////////////////////////////

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

//show data change operation
Route::post('/change/Operation', [operationController::class, 'ChangeOperation']);
//Add New Operation
Route::post('/add/Operation', [operationController::class, 'AddNewOperation']);

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
//show data new task
Route::post('/select/Newtask', [newtaskController::class, 'NewTask']);
//Add New Newtask QUEUE 1
Route::post('/add/Newtask', [newtaskController::class, 'AddNewtask']);

////////////////////////////////////////////////////////////////////////////////////////////////////////

//reset activity
Route::post('/reset/activity', [operationController::class, 'resetActivity']);

///////////////////////////////////////////////////////////////////////////////////////////////////////
// --------------------------------------------- staff ------------------------------------------------

Route::get('/operator', function () {
    return view('operator');
});

Route::get('/technician', function () {
    return view('technician');
});

Route::get('/otherstaff', function () {
    return view('otherstaff');
});

Route::get('/addstaff', function () {
    return view('addstaff');
});   

Route::get('/import', function () {
 return view('import');
});   

Route::get('/approve', function () {
 return view('approve');
});   



Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/update/DashboardStaff/',
 [staffController::class, 'getInfoStaff'])->name('dashboard.details');

Route::get('/update/DashboardStaff/operator',
 [staffController::class, 'getInfoStaffOperator'])->name('dashboard.details');

Route::get('/update/DashboardStaff/technician',
 [staffController::class, 'getInfoStaffTechnician'])->name('dashboard.details');

Route::post('/get/individual/dashboard/details',
    [StaffController::class,'getDashboardDetails'])->name('dashboard.details');

Route::post('/update/dashboard/data/update',
    [StaffController::class, 'updateDashboardData'])->name('dashboard.update');  

Route::get('/update/getApprove',
    [ApproveController::class, 'getApprove'])->name('dashboard.approve');  

Route::post('/update/approve/confirm',
    [ApproveController::class, 'confirmApprove']);  

Route::post('/update/approve/chech_Status_button',
    [StaffController::class, 'checkStatusButton']);  

Route::get('/delete/dashboard/data/{dashboard}',
    [StaffController::class, 'destroy']);  

Route::post('/store/dashboard/data',
    [StaffController::class, 'store']);        
    



Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');








