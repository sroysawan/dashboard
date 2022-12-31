<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Log;
use Exception;
use App\Models\Activity;
use App\Models\ActivityDowntime;
use App\Models\ActivityRework;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class dashboardController extends Controller
{
    //
    public function getInfoActivity(){
        try
        {
        $queryActivity = Activity::orderBy('id_activity', 'DESC')->get();
       return response() -> json($queryActivity);
      //       $queryActivity;
        //     return  '{
        //         "data":[
        //           {
        //             "id_machine": "02-29",
        //             "qty_process": "3247",
        //             "qty_repeat": "0",
        //             "task_complete": 0,
        //             "status_backup": 0,
        //             "qty_order": 10820,
        //             "qty_complete": 0,
        //             "qty_open": 10820,
        //             "run_time_std": "6.00",
        //             "divider": 1,
        //             "status_work": 3,
        //             "id_staff": "000009",
        //             "run_time_actual": 7.12,
        //             "rework": "y"
        //           },
        //       {
        //         "id_machine": "02-06",
		// "qty_process": "467",
		// "qty_repeat": "0",
		// "task_complete": 0,
		// "status_backup": 1,
		// "qty_order": 6510,
		// "qty_complete": 0,
		// "qty_open": 6510,
		// "run_time_std": "2.50",
		// "divider": 1,
		// "status_work": 3,
		// "id_staff": "000011",
		// "run_time_actual": 75,
		// "rework": "y"
        //       }
        //         ]
              
              
        //       }';
        
        }
        catch(Exception $error)
        {
            Log::error($error);
        }
    }



}