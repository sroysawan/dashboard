<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\staffController;
use Illuminate\Support\Facades\Redirect;


Route::get('/', function () {
    return view('welcome');
});

Route::get('/operator', function () {
       return view('operator');
   });

Route::get('/technician', function () {
       return view('technician');
   });

Route::get('/addstaff', function () {
       return view('addstaff');
   });   

Route::get('/import', function () {
    return view('import');
});   

Auth::routes();

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

Route::get('/delete/dashboard/data/{dashboard}',
       [StaffController::class, 'destroy']);  

Route::post('/store/dashboard/data',
       [StaffController::class, 'store']);        
       

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

