<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\MachineQueue;
use App\Models\Activity;
use App\Models\ActivityRework;
use App\Models\ActivityDowntime;
use App\Models\Machine;
use App\Models\Planning;    
use App\Models\CodeDowntime;
use App\Models\Divider;
use App\Models\Staff;
use App\Models\Role;
use App\Models\Prefix;
use Illuminate\Support\Facades\Log;
use Exception;
class dashboardRefreshController extends Controller
{
  
    // //v4 N/A
    // public function dashboardRefreshV4(){
    //     try{
    //         $machineId = MachineQueue::where('queue_number' ,'1')->get();
    //         $machineId_queue_2 = MachineQueue::where('queue_number' ,'2')->get();
    //         $id_mc = array();
    //         $id_mc_queue_2 =array();
    //         $sumResult = array();
    //         $count = $machineId->count();
    //         $count2 = $machineId_queue_2->count();
    //         for ($i=0;$i<$count;$i++){
    //             array_push($id_mc,$machineId[$i]->id_machine);
    //             }
    //         for ($i=0;$i<$count2;$i++){
    //             array_push($id_mc_queue_2,$machineId[$i]->id_machine);
    //             }
    //         // $data_activity = DB::select('SELECT * FROM (select max(id_activity) as id_activity_max FROM activity GROUP by id_machine) as max_activity , activity as a where a.id_activity = max_activity.id_activity_max');
    //         // print_r($count);
    //         for($i = 0 ; $i<$count ; $i++){
    //             $data_machine_queue = MachineQueue::where('id_machine',$id_mc[$i])->where('queue_number','1')->get();
    //             $data_activity_sum = DB::select('SELECT SUM(no_pulse1) AS qty_process, SUM(num_repeat) AS qty_repeat FROM activity WHERE status_work<6 AND id_task='.$data_machine_queue[0]->id_task);
    //             if($data_activity_sum[0]->qty_process == null){
    //                 $data_activity_sum[0]->qty_process = 0;
    //                 //echo $data_activity_sum[0]->qty_process;
    //             }
    //             if($data_activity_sum[0]->qty_repeat == null){
    //                 $data_activity_sum[0]->qty_repeat = 0;
    //                 //echo $data_activity_sum[0]->qty_repeat;
    //             }
    //             $data_planning = DB::select('SELECT task_complete, status_backup, qty_order, p.datetime_update, p.operation, p.run_time_actual,
    //             qty_comp AS qty_complete, qty_open, run_time_std, divider.divider as divider,
    //             p.op_color, p.op_side, p.op_des, p.item_no, p.operation, p.date_due
    //             FROM planning as p, divider
    //             where p.op_color=divider.op_color
    //             AND p.op_side=divider.op_side
    //             and id_task=' . $data_machine_queue[0]->id_task);
    //             $data_planning[0]->run_time_std = number_format((floatval($data_planning[0]->run_time_std)*3600)-2, 2);
    //             $number_count = 0;
    //             $id_code_downtime = '-';
    //             $code_downtime = '-';
    //             $des_downtime = '-';
    //             $des_downtime_thai = '-';
    //             $item_no_2 = '-';
    //             $operation_2 = '-';
    //             if($data_machine_queue[0]->id_activity != 0){
    //                 $number_count++;
    //                 $data_activity = Activity::where('id_activity',$data_machine_queue[0]->id_activity)->get();
    //             }
    //             if($data_machine_queue[0]->id_activity_downtime != 0){
    //                 $number_count++;
    //                 $data_activity = ActivityDowntime::where('id_activity_downtime',$data_machine_queue[0]->id_activity_downtime)->get();
    //                 $data_activity[0]->status_work=$data_activity[0]->status_downtime;
    //                 if ($data_activity[0]->run_time_actual == null) {
    //                     $data_activity[0]->run_time_actual = 0;
    //                 }
    //                 $data_code_downtime = CodeDowntime::where('id_code_downtime',$data_activity[0]->id_code_downtime)->get();
    //                 // return response() -> json($data_activity);
    //                 $id_code_downtime = $data_code_downtime[0]->id_code_downtime;
    //                 $code_downtime = $data_code_downtime[0]->code_downtime;
    //                 $des_downtime = $data_code_downtime[0]->des_downtime;
    //                 $des_downtime_thai = $data_code_downtime[0]->des_downtime_thai;
    //                 $data_activity[0]->status_work = $data_activity[0]->status_downtime;
    //             }
    //             if($data_machine_queue[0]->id_activity_rework != 0){
    //                 $number_count++;
    //                 $data_activity = ActivityRework::where('id_activity',$data_machine_queue[0]->id_activity_rework)->get();
    //             }
    //             ////////////////////////////////////////////
    //             foreach($id_mc_queue_2 as $values){
    //                 if($values == $id_mc[$i]){
    //                     $data_machine_queue_2 = MachineQueue::where('id_machine',$id_mc[$i])->where('queue_number','2')->get();
    //                     $data_planning_queue_2 = DB::select('SELECT operation, item_no FROM planning where id_task=' . $data_machine_queue_2[0]->id_task);
    //                     $item_no_2 = $data_planning_queue_2[0]->item_no;
    //                     $operation_2 = $data_planning_queue_2[0]->operation;
    //                 }
    //             }
    //             ////////////////////////////////////////////
    //             if ($number_count>=2 || $number_count<=0){
    //                 $sumResult[$i] = array(
    //                     "id_machine" => $id_mc[$i],
    //                     "code" => "020",
    //                     "message" => "The activity exists in both activity and activity_downtime tables or not found in both"
    //                 );
    //                 continue;
    //             }
    //             else{
    //                 // return response() -> json($data_planning[0]->operation);
    //                 if($data_activity[0]->status_work == 0 || $data_activity[0]->status_work==3 || $data_activity[0]->status_work==5 || $data_activity[0]->status_work==6){
    //                     $sumResult[$i] = array(
    //                         "id_machine"=>$id_mc[$i],
    //                         "id_task"=>$data_machine_queue[0]->id_task,
    //                         "id_staff"=> $data_activity[0]->id_staff,
    //                         "status_work"=> $data_activity[0]->status_work,
    //                         "qty_process"=> $data_activity_sum[0]->qty_process,
    //                         "qty_repeat"=> $data_activity_sum[0]->qty_repeat,
    //                         "task_complete"=> $data_planning[0]->task_complete,
    //                         "status_backup"=> $data_planning[0]->status_backup,
    //                         "qty_order"=> $data_planning[0]->qty_order,
    //                         "qty_complete"=> $data_planning[0]->qty_complete,
    //                         "qty_open"=> $data_planning[0]->qty_open,
    //                         "divider"=> $data_planning[0]->divider,
    //                         "item_no" => $data_planning[0]->item_no,
    //                         "operation" => $data_planning[0]->operation,
    //                         "op_color" => $data_planning[0]->op_color,
    //                         "op_side" => $data_planning[0]->op_side,
    //                         "op_des" => $data_planning[0]->op_des,
    //                         "date_due" =>$data_planning[0]->date_due,
    //                         //"date_due" =>'N/A',
    //                         "run_time_actual"=> 'N/A',
    //                         "run_time_std"=> 'N/A',
    //                         "datetime_update" => 'N/A',
    //                         "id_code_downtime"=> $id_code_downtime,
    //                         "code_downtime"=> $code_downtime,
    //                         "des_downtime"=> $des_downtime,
    //                         "des_downtime_thai"=> $des_downtime_thai,
    //                         "item_no_2" => $item_no_2,
    //                         "operation_2" => $operation_2
    //                      );
    //                 }
    //                 else{
    //                     $sumResult[$i] = array(
    //                         "id_machine"=>$id_mc[$i],
    //                         "id_task"=>$data_machine_queue[0]->id_task,
    //                         "id_staff"=> $data_activity[0]->id_staff,
    //                         "status_work"=> $data_activity[0]->status_work,
    //                         "qty_process"=> $data_activity_sum[0]->qty_process,
    //                         "qty_repeat"=> $data_activity_sum[0]->qty_repeat,
    //                         "task_complete"=> $data_planning[0]->task_complete,
    //                         "status_backup"=> $data_planning[0]->status_backup,
    //                         "qty_order"=> $data_planning[0]->qty_order,
    //                         "qty_complete"=> $data_planning[0]->qty_complete,
    //                         "qty_open"=> $data_planning[0]->qty_open,
    //                         "divider"=> $data_planning[0]->divider,
    //                         "item_no" => $data_planning[0]->item_no,
    //                         "operation" => $data_planning[0]->operation,
    //                         "op_color" => $data_planning[0]->op_color,
    //                         "op_side" => $data_planning[0]->op_side,
    //                         "op_des" => $data_planning[0]->op_des,
    //                         "date_due" =>$data_planning[0]->date_due,
    //                         "run_time_actual"=> $data_activity[0]->run_time_actual,
    //                         "run_time_std"=> $data_planning[0]->run_time_std,
    //                         "datetime_update" => $data_planning[0]->datetime_update,
    //                         "id_code_downtime"=> $id_code_downtime,
    //                         "code_downtime"=> $code_downtime,
    //                         "des_downtime"=> $des_downtime,
    //                         "des_downtime_thai"=> $des_downtime_thai,
    //                         "item_no_2" => $item_no_2,
    //                         "operation_2" => $operation_2
    //                      );
    //                 }
                    
    //             }
    //         }
    //         return response() -> json($sumResult);
    //     }
    //     catch(Exception $error){
    //         Log::error($error);
    //     }
    // }

    //v4 runtime_actual = 0
    //use it
    public function dashboardRefreshV5(){
        try{
            $machineId = Machine::all();
            $machineId_queue_1 = MachineQueue::where('queue_number' ,'1')->get();
            $machineId_queue_2 = MachineQueue::where('queue_number' ,'2')->get();
            $id_mc = array();
            $id_mc_queue_1 =array();
            $id_mc_queue_2 =array();
            $sumResult = array();
            $count = $machineId->count();
            $count2 = $machineId_queue_2->count();
            for ($i=0;$i<$count;$i++){
                array_push($id_mc,$machineId[$i]->id_mc);
                }
            for ($i=0;$i< $machineId_queue_1->count();$i++){
                array_push($id_mc_queue_1,$machineId_queue_1[$i]->id_machine);
                }
            for ($i=0;$i<$count2;$i++){
                array_push($id_mc_queue_2,$machineId_queue_2[$i]->id_machine);
                }
            sort($id_mc);
            sort($id_mc_queue_1);
            sort($id_mc_queue_2);
            // print_r($id_mc);
            
            // $data_activity = DB::select('SELECT * FROM (select max(id_activity) as id_activity_max FROM activity GROUP by id_machine) as max_activity , activity as a where a.id_activity = max_activity.id_activity_max');
            
            for($i = 0 ; $i<$machineId->count() ; $i++){
                $item_no_2 = '-';
                $operation_2 = '-';
                foreach($id_mc_queue_2 as $values){
                    if($values == $id_mc[$i]){
                        // print_r($id_mc_queue_2);
                        $data_machine_queue_2 = MachineQueue::where('id_machine',$id_mc[$i])->where('queue_number','2')->get();
                        // print_r($data_machine_queue_2);
                        $data_planning_queue_2 = DB::select('SELECT operation, item_no FROM planning where id_task=' . $data_machine_queue_2[0]->id_task);
                        // print_r($data_planning_queue_2);
                        $item_no_2 = $data_planning_queue_2[0]->item_no;
                        $operation_2 = $data_planning_queue_2[0]->operation;
                    }
                }
                $data_machine_queue = MachineQueue::where('id_machine',$id_mc[$i])->where('queue_number','1')->get();
                // print_r($data_machine_queue . "00000000000000000000000000000000000");
                
                if($data_machine_queue->isEmpty()){
                    // return response()->json([$id_mc[$i],$data_machine_queue]);
                    // print_r($data_machine_queue . "00000000000000000000000000000000000");
                    // print_r("1");
                    // return response() -> json($data_machine_queue);
                    $sumResult[$i] = array(
                        "id_machine"=>$id_mc[$i],
                        "id_task"=>'',
                        "id_staff"=> '',
                        "status_work"=> '',
                        "qty_process"=> '',
                        //"qty_repeat"=> $data_activity_sum[0]->qty_repeat,
                        "task_complete"=> '',
                        "status_backup"=> '',
                        "qty_order"=> '',
                        "qty_complete"=> '',
                        "qty_open"=> '',
                        "qty_per_pulse2"=> '',
                        "divider"=> '',
                        "item_no" => '',
                        "operation" => '',
                        "op_color" => '',
                        "op_side" => '',
                        "op_des" => '',
                        "date_due" =>'',
                        "run_time_actual"=> '',
                        "run_time_std"=> '',
                        "datetime_update" => '',
                        "id_code_downtime"=> '',
                        "code_downtime"=> '',
                        "des_downtime"=> '',
                        "des_downtime_thai"=> '',
                        "item_no_2" => $item_no_2,
                        "operation_2" => $operation_2
                     );
                     
                    continue;
                }
                $data_activity_sum = DB::select('SELECT SUM(no_pulse1) AS qty_process FROM activity WHERE status_work<6 AND id_task='.$data_machine_queue[0]->id_task);
                
                
                if($data_activity_sum[0]->qty_process == null){
                    $data_activity_sum[0]->qty_process = 0;
                    //echo $data_activity_sum[0]->qty_process;
                }
                //if($data_activity_sum[0]->qty_repeat == null){
                //    $data_activity_sum[0]->qty_repeat = 0;
                    //echo $data_activity_sum[0]->qty_repeat;
                //}
                $data_planning = DB::select('SELECT task_complete, status_backup, qty_order, p.datetime_update, p.operation, p.run_time_actual,
                qty_comp AS qty_complete, qty_open, run_time_std, divider.divider as divider,
                p.op_color, p.op_side, p.op_des, p.item_no, p.operation, p.date_due, p.qty_per_pulse2
                FROM planning as p, divider
                where p.op_color=divider.op_color
                AND p.op_side=divider.op_side
                and id_task=' . $data_machine_queue[0]->id_task);

                $due_date = date('d-m-Y', strtotime($data_planning[0]->date_due));

                $data_planning[0]->run_time_std = number_format((floatval($data_planning[0]->run_time_std)*3600)-2, 2);
                $number_count = 0;
                $id_code_downtime = '-';
                $code_downtime = '-';
                $des_downtime = '-';
                $des_downtime_thai = '-';
                $type_activity = '-';
               
                
                $data_activity_backflush = Activity::where('id_task',$data_machine_queue[0]->id_task)->orderBy('time_start','desc')->first();
                $data_activity_downtime = ActivityDowntime::where('id_task',$data_machine_queue[0]->id_task)->orderBy('time_start','desc')->first();
                $data_activity_rework = ActivityRework::where('id_task',$data_machine_queue[0]->id_task)->orderBy('time_start','desc')->first();
                
                if($data_activity_backflush != null){
                    $date_backflush = strtotime($data_activity_backflush['time_start']);
                    $data_activity = $data_activity_backflush;
                    if($data_activity['status_work'] > 3){
                        $data_activity['status_work'] = 3;
                    }
                    $type_activity = 'bf';
                    // print_r($data_activity);
                }
                else{
                    $date_backflush = 0;
                    $number_count++;
                }

                if($data_activity_rework != null){
                    $date_rework = strtotime($data_activity_rework['time_start']);
                    if($date_backflush < $date_rework){
                        $data_activity = $data_activity_rework;
                        if($data_activity['status_work'] > 3){
                            $data_activity['status_work'] = 3;
                        }
                        $type_activity = 'rw';
                    }
                    
                }
                else{
                    $date_rework = 0;
                    $number_count++;
                }
                
                if($data_activity_downtime != null){
                    $date_downtime = strtotime($data_activity_downtime['time_start']);
                    if(($date_backflush < $date_downtime) && ($date_rework < $date_downtime)){
                        $data_activity = $data_activity_downtime;
                        $data_activity['id_activity'] = $data_activity_downtime['id_activity_downtime'];
                        if($data_activity['status_downtime'] == 1){
                            $data_activity['status_work'] = 4;
                        }
                        else{
                            $data_activity['status_work'] = $data_activity['status_downtime'];
                        }
                        
                    if ($data_activity['run_time_actual'] == null) {
                        $data_activity['run_time_actual'] = 0;
                    }
                    
                    $data_code_downtime = CodeDowntime::where('id_code_downtime',$data_activity['id_code_downtime'])->get();
                    // return response() -> json($data_code_downtime);
                    $id_code_downtime = $data_code_downtime[0]->id_code_downtime;
                    $code_downtime = $data_code_downtime[0]->code_downtime;
                    $des_downtime = $data_code_downtime[0]->des_downtime;
                    $des_downtime_thai = $data_code_downtime[0]->des_downtime_thai;
                    $type_activity = 'dt';
                    }
                }
                else{
                    $number_count++;
                }
                
                // print_r($data_activity);

                // return response() -> json($data_activity);
                //print_r($data_activity_rework);
                //if($data_activity != null){
                //    $number_count++;
                //}
                
                // print_r($data_activity);
                // if($data_machine_queue[0]->id_activity != 0){
                //     $number_count++;
                //     $data_activity = Activity::where('id_activity',$data_machine_queue[0]->id_activity)->get();
                // }
                // if($data_machine_queue[0]->id_activity_downtime != 0){
                //     $number_count++;
                //     $data_activity = ActivityDowntime::where('id_activity_downtime',$data_machine_queue[0]->id_activity_downtime)->get();
                //     $data_activity[0]->status_work=$data_activity[0]->status_downtime;
                //     if ($data_activity[0]->run_time_actual == null) {
                //         $data_activity[0]->run_time_actual = 0;
                //     }
                //     $data_code_downtime = CodeDowntime::where('id_code_downtime',$data_activity[0]->id_code_downtime)->get();
                //     // return response() -> json($data_activity);
                //     $id_code_downtime = $data_code_downtime[0]->id_code_downtime;
                //     $code_downtime = $data_code_downtime[0]->code_downtime;
                //     $des_downtime = $data_code_downtime[0]->des_downtime;
                //     $des_downtime_thai = $data_code_downtime[0]->des_downtime_thai;
                //     $data_activity[0]->status_work = $data_activity[0]->status_downtime;
                // }
                // if($data_machine_queue[0]->id_activity_rework != 0){
                //     $number_count++;
                //     $data_activity = ActivityRework::where('id_activity',$data_machine_queue[0]->id_activity_rework)->get();
                // }
                /////////////////////////////////////////
                
                if($number_count>=3){
                    // if($id_mc[$i]=='02-01'){
                    //     return response()->json([$id_mc[$i],$data_machine_queue,$data_activity_sum,$data_planning,'wrong']);
                    // }
                    // print_r($id_mc[$i]);
                    $sumResult[$i] = array(
                        "id_machine"=>$id_mc[$i],
                        "id_task"=>$data_machine_queue[0]->id_task,
                        "id_staff"=> '',
                        "status_work"=> $data_activity['status_work'],
                        "qty_process"=> '0',
                        //"qty_repeat"=> $data_activity_sum[0]->qty_repeat,
                        "task_complete"=> $data_planning[0]->task_complete,
                            "status_backup"=> $data_planning[0]->status_backup,
                            "qty_order"=> $data_planning[0]->qty_order,
                            "qty_complete"=> $data_planning[0]->qty_complete,
                            "qty_open"=> $data_planning[0]->qty_open,
                            "qty_per_pulse2"=> $data_planning[0]->qty_per_pulse2,
                            "divider"=> $data_planning[0]->divider,
                            "item_no" => $data_planning[0]->item_no,
                            "operation" => $data_planning[0]->operation,
                            "op_color" => $data_planning[0]->op_color,
                            "op_side" => $data_planning[0]->op_side,
                            "op_des" => $data_planning[0]->op_des,
                            "date_due" => $due_date,
                        "run_time_actual"=> '0',
                        "run_time_std"=> $data_planning[0]->run_time_std,
                        "datetime_update" => $data_planning[0]->datetime_update,
                        "id_code_downtime"=> $id_code_downtime,
                        "code_downtime"=> $code_downtime,
                        "des_downtime"=> $des_downtime,
                        "des_downtime_thai"=> $des_downtime_thai,
                        "item_no_2" => $item_no_2,
                        "operation_2" => $operation_2,
                        "type" => $type_activity,
                     );
                     
                    continue;
                }
                
                
                ////////////////////////////////////////////
                // if ($number_count>=2 || $number_count<=0){
                //     $sumResult[$i] = array(
                //         "id_machine" => $id_mc[$i],
                //         "code" => "020",
                //         "message" => "The activity exists in both activity and activity_downtime tables or not found in both"
                //     );
                //     continue;
                // }
                
                    // return response() -> json($data_planning[0]->operation);
                    if($data_activity['status_work'] == 0 || $data_activity['status_work']==3 || $data_activity['status_work']==4 || $data_activity['status_work']==5 || $data_activity['status_work']==6){
                        $sumResult[$i] = array(
                            "id_machine"=>$id_mc[$i],
                            "id_task"=>$data_machine_queue[0]->id_task,
                            "id_staff"=> $data_activity['id_staff'],
                            "status_work"=> $data_activity['status_work'],
                            "id_activity"=> $data_activity['id_activity'],
                            "qty_process"=> $data_activity_sum[0]->qty_process,
                            //"qty_repeat"=> $data_activity_sum[0]->qty_repeat,
                            "task_complete"=> $data_planning[0]->task_complete,
                            "status_backup"=> $data_planning[0]->status_backup,
                            "qty_order"=> $data_planning[0]->qty_order,
                            "qty_complete"=> $data_planning[0]->qty_complete,
                            "qty_open"=> $data_planning[0]->qty_open,
                            "qty_per_pulse2"=> $data_planning[0]->qty_per_pulse2,
                            "divider"=> $data_planning[0]->divider,
                            "item_no" => $data_planning[0]->item_no,
                            "operation" => $data_planning[0]->operation,
                            "op_color" => $data_planning[0]->op_color,
                            "op_side" => $data_planning[0]->op_side,
                            "op_des" => $data_planning[0]->op_des,
                            // "date_due" =>$data_planning[0]->date_due,
                            "date_due" => $due_date,
                            //"date_due" =>'0',
                            "run_time_actual"=> '0',
                            "run_time_std"=> '0',
                            "datetime_update" => '0',
                            "id_code_downtime"=> $id_code_downtime,
                            "code_downtime"=> $code_downtime,
                            "des_downtime"=> $des_downtime,
                            "des_downtime_thai"=> $des_downtime_thai,
                            "item_no_2" => $item_no_2,
                            "operation_2" => $operation_2,
                            "type" => $type_activity,
                         );
                         
                    }
                    else{
                        $sumResult[$i] = array(
                            "id_machine"=>$id_mc[$i],
                            "id_task"=>$data_machine_queue[0]->id_task,
                            "id_staff"=> $data_activity['id_staff'],
                            "status_work"=> $data_activity['status_work'],
                            "id_activity"=> $data_activity['id_activity'],
                            "qty_process"=> $data_activity_sum[0]->qty_process,
                            "qty_accum"=> $data_planning[0]->qty_complete + $data_activity_sum[0]->qty_process,
                            //"qty_repeat"=> $data_activity_sum[0]->qty_repeat,
                            "task_complete"=> $data_planning[0]->task_complete,
                            "status_backup"=> $data_planning[0]->status_backup,
                            "qty_order"=> $data_planning[0]->qty_order,
                            "qty_complete"=> $data_planning[0]->qty_complete,
                            "qty_open"=> $data_planning[0]->qty_open,
                            "qty_per_pulse2"=> $data_planning[0]->qty_per_pulse2,
                            "divider"=> $data_planning[0]->divider,
                            "item_no" => $data_planning[0]->item_no,
                            "operation" => $data_planning[0]->operation,
                            "op_color" => $data_planning[0]->op_color,
                            "op_side" => $data_planning[0]->op_side,
                            "op_des" => $data_planning[0]->op_des,
                            "date_due" => $due_date,
                            "run_time_actual"=> $data_activity['run_time_actual'],
                            "run_time_std"=> $data_planning[0]->run_time_std,
                            "datetime_update" => $data_planning[0]->datetime_update,
                            "id_code_downtime"=> $id_code_downtime,
                            "code_downtime"=> $code_downtime,
                            "des_downtime"=> $des_downtime,
                            "des_downtime_thai"=> $des_downtime_thai,
                            "item_no_2" => $item_no_2,
                            "operation_2" => $operation_2,
                            "type" => $type_activity,
                         );
                         
                    }
                    // if($i==7){
                        
                    //     return response() -> json($sumResult[$i]);
                    // }
                    
                
            }
           //return response() -> json([$sumResult]);
            return response() -> json($sumResult);
        }
        catch(Exception $error){
            Log::error($error);
        }
    }

    public function dashboardRefreshV6(){
        try{
            $machine = Machine::all();
            $i = 0;
            $sumResult[] = array();

            foreach($machine as $data_machine){
                $item_no_2 = '-';
                $operation_2 = '-';
                $data_machine_queue = MachineQueue::where('queue_number' ,'1')->where('id_machine' ,$data_machine->id_mc)->first();
                $check_queue_2 = MachineQueue::where('id_machine',$data_machine->id_mc)->where('queue_number','2')->first();
                if($check_queue_2 != null){
                    $data_planning_queue_2 = DB::select('SELECT operation, item_no FROM planning where id_task=' . $check_queue_2->id_task);
                    $item_no_2 = $data_planning_queue_2[0]->item_no;
                    $operation_2 = $data_planning_queue_2[0]->operation;
                }
                if($data_machine_queue==null){
                    $sumResult[$i] = array(
                        "id_machine"=>$data_machine->id_mc,
                        "id_task"=>'',
                        "id_staff"=> '',
                        "status_work"=> '',
                        "qty_process"=> '',
                        "qty_accum"=> '',
                        "task_complete"=> '',
                        "status_backup"=> '',
                        "qty_order"=> '',
                        "qty_complete"=> '',
                        "qty_open"=> '',
                        "qty_per_pulse2"=> '',
                        "divider"=> '',
                        "item_no" => '',
                        "operation" => '',
                        "op_color" => '',
                        "op_side" => '',
                        "op_des" => '',
                        "date_due" =>'',
                        "run_time_actual"=> '',
                        "run_time_std"=> '',
                        "datetime_update" => '',
                        "id_code_downtime"=> '',
                        "code_downtime"=> '',
                        "des_downtime"=> '',
                        "des_downtime_thai"=> '',
                        "item_no_2" => $item_no_2,
                        "operation_2" => $operation_2,
                     );
                     $i++;
                     continue;
                }
                $data_activity_sum = DB::select('SELECT SUM(no_pulse2)+SUM(no_pulse3) AS qty_process FROM activity WHERE status_work<6 AND id_task='.$data_machine_queue->id_task);
                
                if($data_activity_sum[0]->qty_process == null){
                    $data_activity_sum[0]->qty_process = 0;
                }
                $data_planning = DB::select('SELECT task_complete, status_backup, qty_order, p.datetime_update, p.operation, p.run_time_actual,
                qty_comp AS qty_complete, qty_open, run_time_std, divider.divider as divider,
                p.op_color, p.op_side, p.op_des, p.item_no, p.operation, p.date_due, p.qty_per_pulse2
                FROM planning as p, divider
                where p.op_color=divider.op_color
                AND p.op_side=divider.op_side
                and id_task=' . $data_machine_queue->id_task);

                $due_date = date('d-m-Y', strtotime($data_planning[0]->date_due));

                $data_planning[0]->run_time_std = number_format((floatval($data_planning[0]->run_time_std)*3600)-2, 2);
                $number_count = 0;
                $item_no_2 = '-';
                $operation_2 = '-';
                $id_code_downtime = '-';
                $code_downtime = '-';
                $des_downtime = '-';
                $des_downtime_thai = '-';
                $type_activity = '-';
                

                $check_queue_2 = MachineQueue::where('id_machine',$data_machine_queue->id_machine)->where('queue_number','2')->first();
                if($check_queue_2 != null){
                    $data_planning_queue_2 = DB::select('SELECT operation, item_no FROM planning where id_task=' . $check_queue_2->id_task);
                    $item_no_2 = $data_planning_queue_2[0]->item_no;
                    $operation_2 = $data_planning_queue_2[0]->operation;
                }

                if($data_machine_queue->id_staff == null || $data_machine_queue->id_staff == ""){
                    // if($i==18){
                    //     return response() -> json([$data_planning,$i]);
                    // }
                    $sumResult[$i] = array(
                        "id_machine"=>$data_machine_queue->id_machine,
                        "id_task"=>$data_machine_queue->id_task,
                        "id_staff"=> '',
                        "status_work"=> 3,
                        // "qty_process"=> '0',
                        "qty_process"=> $data_activity_sum[0]->qty_process,
                        "qty_accum"=> $data_planning[0]->qty_complete + $data_activity_sum[0]->qty_process,
                        "task_complete"=> $data_planning[0]->task_complete,
                        "status_backup"=> $data_planning[0]->status_backup,
                        "qty_order"=> $data_planning[0]->qty_order,
                        "qty_complete"=> $data_planning[0]->qty_complete,
                        "qty_open"=> $data_planning[0]->qty_open,
                        "qty_per_pulse2"=> $data_planning[0]->qty_per_pulse2,
                        "divider"=> $data_planning[0]->divider,
                        "item_no" => $data_planning[0]->item_no,
                        "operation" => $data_planning[0]->operation,
                        "op_color" => $data_planning[0]->op_color,
                        "op_side" => $data_planning[0]->op_side,
                        "op_des" => $data_planning[0]->op_des,
                        "date_due" => $due_date,
                        "run_time_actual"=> '0',
                        "run_time_std"=> $data_planning[0]->run_time_std,
                        "run_time_open" => (($data_planning[0]->qty_order-($data_planning[0]->qty_complete + $data_activity_sum[0]->qty_process))*$data_planning[0]->run_time_std),
                        "datetime_update" => $data_planning[0]->datetime_update,
                        "id_code_downtime"=> $id_code_downtime,
                        "code_downtime"=> $code_downtime,
                        "des_downtime"=> $des_downtime,
                        "des_downtime_thai"=> $des_downtime_thai,
                        "item_no_2" => $item_no_2,
                        "operation_2" => $operation_2,
                        "type" => $type_activity,
                        "qty_percent" => round((($data_planning[0]->qty_complete + $data_activity_sum[0]->qty_process) / $data_planning[0]->qty_order) * 100,0),

                        
                     );
                    //  return response()->json($sumResult);
                }
                else{
                    $data_activity;
                    $data_activity_backflush = Activity::where('id_staff',$data_machine_queue->id_staff)->where('id_task',$data_machine_queue->id_task)->orderBy('time_start','desc')->first();
                    $data_activity_downtime = ActivityDowntime::where('id_staff',$data_machine_queue->id_staff)->where('id_task',$data_machine_queue->id_task)->orderBy('time_start','desc')->first();
                    $data_activity_rework = ActivityRework::where('id_staff',$data_machine_queue->id_staff)->where('id_task',$data_machine_queue->id_task)->orderBy('time_start','desc')->first();
                    
                        
                    
                    if($data_activity_backflush != null){
                        $date_backflush = strtotime($data_activity_backflush['time_start']);
                        $data_activity = $data_activity_backflush;
                        if($data_activity['status_work'] > 3){
                            $data_activity['status_work'] = 3;
                        }
                        $type_activity = 'bf';
                        // print_r($data_activity);
                    }
                    else{
                        $date_backflush = 0;
                        $number_count++;
                    }

                    

                    if($data_activity_rework != null){
                        $date_rework = strtotime($data_activity_rework['time_start']);
                        $data_activity = $data_activity_rework;
                        if($date_backflush < $date_rework){
                            // $data_activity = $data_activity_rework;
                            if($data_activity['status_work'] > 3){
                                $data_activity['status_work'] = 3;
                            }
                            $type_activity = 'rw';
                        }
                        
                        
                    }
                    else{
                        $date_rework = 0;
                        $number_count++;
                    }
                    
                    if($data_activity_downtime != null){
                        $date_downtime = strtotime($data_activity_downtime['time_start']);
                        if(($date_backflush < $date_downtime) && ($date_rework < $date_downtime)){
                            $data_activity = $data_activity_downtime;
                            $data_activity['id_activity'] = $data_activity_downtime['id_activity_downtime'];
                            if($data_activity['status_downtime'] == 1){
                                $data_activity['status_work'] = 4;
                            }
                            else{
                                $data_activity['status_work'] = $data_activity['status_downtime'];
                            }
                            
                        if ($data_activity['run_time_actual'] == null) {
                            $data_activity['run_time_actual'] = 0;
                        }
                        
                        $data_code_downtime = CodeDowntime::where('id_code_downtime',$data_activity['id_code_downtime'])->get();
                        // return response() -> json($data_code_downtime);
                        $id_code_downtime = $data_code_downtime[0]->id_code_downtime;
                        $code_downtime = $data_code_downtime[0]->code_downtime;
                        $des_downtime = $data_code_downtime[0]->des_downtime;
                        $des_downtime_thai = $data_code_downtime[0]->des_downtime_thai;
                        $type_activity = 'dt';
                        }
                        
                    }
                    else{
                        $number_count++;
                    }
                    
                    if($type_activity == 'rw'){
                        $data_activity_sum = DB::select('SELECT SUM(no_pulse2)+SUM(no_pulse3) AS qty_process FROM activity_rework WHERE status_work<6 AND id_task='.$data_machine_queue->id_task);
                        if($data_activity_sum[0]->qty_process == null){
                            $data_activity_sum[0]->qty_process = 0;
                        }
                    }
                    
                    $sumResult[$i] = array(
                        "id_machine"=>$data_machine_queue->id_machine,
                        "id_task"=>$data_machine_queue->id_task,
                        "id_staff"=> $data_activity['id_staff'],
                        "status_work"=> $data_activity['status_work'],
                        "id_activity"=> $data_activity['id_activity'],
                        "qty_process"=> $data_activity_sum[0]->qty_process,
                        "qty_accum"=> $data_planning[0]->qty_complete + $data_activity_sum[0]->qty_process,
                        "task_complete"=> $data_planning[0]->task_complete,
                        "status_backup"=> $data_planning[0]->status_backup,
                        "qty_order"=> $data_planning[0]->qty_order,
                        "qty_complete"=> $data_planning[0]->qty_complete,
                        "qty_open"=> $data_planning[0]->qty_open,
                        "qty_per_pulse2"=> $data_planning[0]->qty_per_pulse2,
                        "divider"=> $data_planning[0]->divider,
                        "item_no" => $data_planning[0]->item_no,
                        "operation" => $data_planning[0]->operation,
                        "op_color" => $data_planning[0]->op_color,
                        "op_side" => $data_planning[0]->op_side,
                        "op_des" => $data_planning[0]->op_des,
                        "date_due" => $due_date,
                        "run_time_actual"=> $data_activity['run_time_actual'],
                        "run_time_std"=> $data_planning[0]->run_time_std,
                        "run_time_open" => (($data_planning[0]->qty_order-($data_planning[0]->qty_complete + $data_activity_sum[0]->qty_process))*$data_planning[0]->run_time_std),
                        "datetime_update" => $data_planning[0]->datetime_update,
                        "id_code_downtime"=> $id_code_downtime,
                        "code_downtime"=> $code_downtime,
                        "des_downtime"=> $des_downtime,
                        "des_downtime_thai"=> $des_downtime_thai,
                        "item_no_2" => $item_no_2,
                        "operation_2" => $operation_2,
                        "type" => $type_activity,
                        "qty_percent" => round((($data_planning[0]->qty_complete + $data_activity_sum[0]->qty_process) / $data_planning[0]->qty_order) * 100,0),
                        "no_pulse2" => $data_activity['no_pulse2'],
                        "no_pulse3" => $data_activity['no_pulse3'],


                     );
                    //  return response() -> json([$sumResult[$i],$i]);

                }
                $i++;
            }
                
            
            return response() -> json($sumResult);
        }
        catch(Exception $error){
            Log::error($error);
        }
    }

    public function getDashboardDetailsNewDBV2(Request $request){
        try{
            $machine = Machine::all();

            // return response() -> json([$request->input('dashboardID'),'test']);

            $i = 0;
            $sumResult[] = array();

            foreach($machine as $data_machine){
                $item_no_2 = '-';
                $operation_2 = '-';
                $data_machine_queue = MachineQueue::where('queue_number' ,'1')->where('id_machine' ,$data_machine->id_mc)->first();
                $check_queue_2 = MachineQueue::where('id_machine',$data_machine->id_mc)->where('queue_number','2')->first();
                if($check_queue_2 != null){
                    $data_planning_queue_2 = DB::select('SELECT operation, item_no FROM planning where id_task=' . $check_queue_2->id_task);
                    $item_no_2 = $data_planning_queue_2[0]->item_no;
                    $operation_2 = $data_planning_queue_2[0]->operation;
                }
                if($data_machine_queue==null){
                    $sumResult[$i] = array(
                        "id_machine"=>$data_machine->id_mc,
                        "id_task"=>'',
                        "id_staff"=> '',
                        "status_work"=> '',
                        "qty_process"=> '',
                        "qty_accum"=> '',
                        "task_complete"=> '',
                        "status_backup"=> '',
                        "qty_order"=> '',
                        "qty_complete"=> '',
                        "qty_open"=> '',
                        "qty_per_pulse2"=> '',
                        "divider"=> '',
                        "item_no" => '',
                        "operation" => '',
                        "op_color" => '',
                        "op_side" => '',
                        "op_des" => '',
                        "date_due" =>'',
                        "run_time_actual"=> '',
                        "run_time_std"=> '',
                        "datetime_update" => '',
                        "id_code_downtime"=> '',
                        "code_downtime"=> '',
                        "des_downtime"=> '',
                        "des_downtime_thai"=> '',
                        "item_no_2" => $item_no_2,
                        "operation_2" => $operation_2,
                        "qty_accum_sum"=> '',
                        "no_pulse_sum"=>'',
                        "qty_percent" => '',
                        "id_rfid" => '',
                        "no_send" => '',
                     );
                     
                    if($request->input('dashboardID')==$data_machine->id_mc){
                        return response() -> json($sumResult[$i]);
                        
                    } 
                     $i++;
                     continue;
                }
                $data_activity_sum = DB::select('SELECT SUM(no_pulse2)+SUM(no_pulse3) AS qty_process FROM activity WHERE status_work<6 AND id_task='.$data_machine_queue->id_task);
                // $data_no_pulse_sum = DB::select('SELECT (no_pulse2)+(no_pulse3) AS no_pulse_sum FROM activity WHERE status_work<6 AND id_task='.$data_machine_queue->id_task);
                
                if($data_activity_sum[0]->qty_process == null){
                    $data_activity_sum[0]->qty_process = 0;
                }
                $data_planning = DB::select('SELECT task_complete, status_backup, qty_order, p.datetime_update, p.operation, p.run_time_actual,
                qty_comp AS qty_complete, qty_open, run_time_std, divider.divider as divider,
                p.op_color, p.op_side, p.op_des, p.item_no, p.operation, p.date_due, p.qty_per_pulse2, p.id_job
                FROM planning as p, divider
                where p.op_color=divider.op_color
                AND p.op_side=divider.op_side
                and id_task=' . $data_machine_queue->id_task);

                $due_date = date('d-m-Y', strtotime($data_planning[0]->date_due));

                $data_planning[0]->run_time_std = number_format((floatval($data_planning[0]->run_time_std)*3600)-2, 2);
                $number_count = 0;
                $item_no_2 = '-';
                $operation_2 = '-';
                $id_code_downtime = '-';
                $code_downtime = '-';
                $des_downtime = '-';
                $des_downtime_thai = '-';
                $type_activity = '-';
                

                $check_queue_2 = MachineQueue::where('id_machine',$data_machine_queue->id_machine)->where('queue_number','2')->first();
                if($check_queue_2 != null){
                    $data_planning_queue_2 = DB::select('SELECT operation, item_no FROM planning where id_task=' . $check_queue_2->id_task);
                    $item_no_2 = $data_planning_queue_2[0]->item_no;
                    $operation_2 = $data_planning_queue_2[0]->operation;
                }

                if($data_machine_queue->id_staff == null || $data_machine_queue->id_staff == ""){
                    // if($i==18){
                    //     return response() -> json([$data_planning,$i]);
                    // }
                    $sumResult[$i] = array(
                        "id_machine"=>$data_machine_queue->id_machine,
                        "id_task"=>$data_machine_queue->id_task,
                        "id_staff"=> '',
                        "status_work"=> 3,
                        "qty_process"=> '0',
                        "qty_accum"=> $data_planning[0]->qty_complete + $data_activity_sum[0]->qty_process,
                        "task_complete"=> $data_planning[0]->task_complete,
                        "status_backup"=> $data_planning[0]->status_backup,
                        "qty_order"=> $data_planning[0]->qty_order,
                        "qty_complete"=> $data_planning[0]->qty_complete,
                        "qty_open"=> $data_planning[0]->qty_open,
                        "qty_per_pulse2"=> $data_planning[0]->qty_per_pulse2,
                        "divider"=> $data_planning[0]->divider,
                        "item_no" => $data_planning[0]->item_no,
                        "id_job"=>$data_planning[0]->id_job,
                        "operation" => $data_planning[0]->operation,
                        "op_color" => $data_planning[0]->op_color,
                        "op_side" => $data_planning[0]->op_side,
                        "op_des" => $data_planning[0]->op_des,
                        "date_due" => $due_date,
                        "run_time_actual"=> '0',
                        "run_time_std"=> $data_planning[0]->run_time_std,
                        "datetime_update" => $data_planning[0]->datetime_update,
                        "id_code_downtime"=> $id_code_downtime,
                        "code_downtime"=> $code_downtime,
                        "des_downtime"=> $des_downtime,
                        "des_downtime_thai"=> $des_downtime_thai,
                        "item_no_2" => $item_no_2,
                        "operation_2" => $operation_2,
                        "type" => $type_activity,
                        "qty_accum_sum"=> round($data_planning[0]->qty_complete + $data_activity_sum[0]->qty_process),
                        "no_pulse_sum"=>'',
                        "qty_percent" => round((($data_planning[0]->qty_complete + $data_activity_sum[0]->qty_process) / $data_planning[0]->qty_order) * 100,0),
                        // "id_rfid" => '',
                        "no_send" => '',
                        "id_break"=> ''
                     );
                    //  return response()->json($sumResult);
                }
                else{
                    $data_activity;
                    $data_activity_backflush = Activity::where('id_staff',$data_machine_queue->id_staff)->where('id_task',$data_machine_queue->id_task)->orderBy('time_start','desc')->first();
                    $data_activity_downtime = ActivityDowntime::where('id_staff',$data_machine_queue->id_staff)->where('id_task',$data_machine_queue->id_task)->orderBy('time_start','desc')->first();
                    $data_activity_rework = ActivityRework::where('id_staff',$data_machine_queue->id_staff)->where('id_task',$data_machine_queue->id_task)->orderBy('time_start','desc')->first();

                    
                    // $data_break = Breaks::where('id_staff',$data_machine_queue->id_staff)->where('id_activity', $data_machine_queue->id_activity)->first();
                    // $data_break_rework = BreakRework::where('id_staff',$data_machine_queue->id_staff)->where('id_activity', $data_machine_queue->id_activity)->first();

                    
                    
                    if($data_activity_backflush != null){
                        $date_backflush = strtotime($data_activity_backflush['time_start']);
                        $data_activity = $data_activity_backflush;
                        if($data_activity['status_work'] > 3){
                            $data_activity['status_work'] = 3;
                        }
                        $type_activity = 'bf';
                        // print_r($data_activity);
                    }
                    else{
                        $date_backflush = 0;
                        $number_count++;
                    }

                    if($data_activity_rework != null){
                        $date_rework = strtotime($data_activity_rework['time_start']);
                        if($date_backflush < $date_rework){
                            $data_activity = $data_activity_rework;
                            if($data_activity['status_work'] > 3){
                                $data_activity['status_work'] = 3;
                            }
                            $type_activity = 'rw';
                            
                        }                                  
                    }
                    else{
                        $date_rework = 0;
                        $number_count++;
                    }
                    
                    if($data_activity_downtime != null){
                        $date_downtime = strtotime($data_activity_downtime['time_start']);
                        if(($date_backflush < $date_downtime) && ($date_rework < $date_downtime)){
                            $data_activity = $data_activity_downtime;
                            $data_activity['id_activity'] = $data_activity_downtime['id_activity_downtime'];
                            if($data_activity['status_downtime'] == 1){
                                $data_activity['status_work'] = 4;
                            }
                            else{
                                $data_activity['status_work'] = $data_activity['status_downtime'];
                            }
                            
                        if ($data_activity['run_time_actual'] == null) {
                            $data_activity['run_time_actual'] = 0;
                        }
                        // $data_activity['no_pulse1'] = 0;
                        $data_activity['no_pulse2'] = 0;
                        $data_activity['no_pulse3'] = 0;
                        $data_activity['no_send'] = 0;
                        $data_code_downtime = CodeDowntime::where('id_code_downtime',$data_activity['id_code_downtime'])->get();
                        // return response() -> json($data_code_downtime);
                        $id_code_downtime = $data_code_downtime[0]->id_code_downtime;
                        $code_downtime = $data_code_downtime[0]->code_downtime;
                        $des_downtime = $data_code_downtime[0]->des_downtime;
                        $des_downtime_thai = $data_code_downtime[0]->des_downtime_thai;
                        $type_activity = 'dt';
                        }
                        
                    }
                    else{
                        $number_count++;
                    }
                    if($type_activity =='rw'){
                        $data_activity_sum = DB::select('SELECT SUM(no_pulse2)+SUM(no_pulse3) AS qty_process FROM activity_rework WHERE status_work<6 AND id_task='.$data_machine_queue->id_task);
                        // $data_no_pulse_sum = DB::select('SELECT (no_pulse2)+(no_pulse3) AS no_pulse_sum FROM activity WHERE status_work<6 AND id_task='.$data_machine_queue->id_task);
                        
                        if($data_activity_sum[0]->qty_process == null){
                            $data_activity_sum[0]->qty_process = 0;
                }
                    }

                    
                    $sumResult[$i] = array(
                        "id_machine"=>$data_machine_queue->id_machine,
                        "id_task"=>$data_machine_queue->id_task,
                        "id_staff"=> $data_activity['id_staff'],
                        "status_work"=> $data_activity['status_work'],
                        "id_activity"=> $data_activity['id_activity'],
                        "qty_process"=> $data_activity_sum[0]->qty_process,
                        "qty_accum"=> $data_planning[0]->qty_complete + $data_activity_sum[0]->qty_process,
                        "task_complete"=> $data_planning[0]->task_complete,
                        "status_backup"=> $data_planning[0]->status_backup,
                        "qty_order"=> $data_planning[0]->qty_order,
                        "qty_complete"=> $data_planning[0]->qty_complete,
                        "qty_open"=> $data_planning[0]->qty_open,
                        "qty_per_pulse2"=> $data_planning[0]->qty_per_pulse2,
                        "divider"=> $data_planning[0]->divider,
                        "item_no" => $data_planning[0]->item_no,
                        "id_job"=>$data_planning[0]->id_job,
                        "operation" => $data_planning[0]->operation,
                        "op_color" => $data_planning[0]->op_color,
                        "op_side" => $data_planning[0]->op_side,
                        "op_des" => $data_planning[0]->op_des,
                        "date_due" => $due_date,
                        "run_time_actual"=> $data_activity['run_time_actual'],
                        "run_time_std"=> $data_planning[0]->run_time_std,
                        "datetime_update" => $data_planning[0]->datetime_update,
                        "id_code_downtime"=> $id_code_downtime,
                        "code_downtime"=> $code_downtime,
                        "des_downtime"=> $des_downtime,
                        "des_downtime_thai"=> $des_downtime_thai,
                        "item_no_2" => $item_no_2,
                        "operation_2" => $operation_2,
                        "type" => $type_activity,
                        "qty_accum_sum"=> round($data_planning[0]->qty_complete + $data_activity_sum[0]->qty_process),
                        "no_pulse_sum"=>$data_activity['no_pulse2']+$data_activity['no_pulse3'],
                        "qty_percent" => round((($data_planning[0]->qty_complete + $data_activity_sum[0]->qty_process) / $data_planning[0]->qty_order) * 100,0),
                        "id_rfid" => $data_activity['id_rfid'], 
                        "no_send" => $data_activity['no_send'],
                        "no_pulse1" => $data_activity['no_pulse1'],
                        "no_pulse2" => $data_activity['no_pulse2'],
                        "no_pulse3" => $data_activity['no_pulse3'],
                        'id_break' => $data_activity['id_break'],
                        // 'id_activity_downtime' => $data_activity_downtime['id_activity_downtime']
                     );
                    //  return response() -> json([$sumResult[$i],$i]);

                }
                if($request->input('dashboardID')==$data_machine->id_mc){
                    return response() -> json($sumResult[$i]);
                    
                } 
                $i++;
            }
                
            
            return response() -> json($sumResult);
        }
        catch(Exception $error){
            Log::error($error);
            return response() -> json($error    );
        }
    }
    
    // // old database 
    // //v4 runtime_actual = 0
    // //use it
    // public function dashboardRefreshV5old(){
    //     try{
    //         $machineId = MachineQueue::where('queue_number' ,'1')->get();
    //         $machineId_queue_2 = MachineQueue::where('queue_number' ,'2')->get();
    //         $id_mc = array();
    //         $id_mc_queue_2 =array();
    //         $sumResult = array();
    //         $count = $machineId->count();
    //         $count2 = $machineId_queue_2->count();
    //         for ($i=0;$i<$count;$i++){
    //             array_push($id_mc,$machineId[$i]->id_machine);
    //             }
    //         for ($i=0;$i<$count2;$i++){
    //             array_push($id_mc_queue_2,$machineId[$i]->id_machine);
    //             }
    //         // $data_activity = DB::select('SELECT * FROM (select max(id_activity) as id_activity_max FROM activity GROUP by id_machine) as max_activity , activity as a where a.id_activity = max_activity.id_activity_max');
    //         // print_r($count);
    //         for($i = 0 ; $i<$count ; $i++){
    //             $data_machine_queue = MachineQueue::where('id_machine',$id_mc[$i])->where('queue_number','1')->get();
    //             $data_activity_sum = DB::select('SELECT SUM(no_pulse1) AS qty_process, SUM(num_repeat) AS qty_repeat FROM activity WHERE status_work<6 AND id_task='.$data_machine_queue[0]->id_task);
    //             if($data_activity_sum[0]->qty_process == null){
    //                 $data_activity_sum[0]->qty_process = 0;
    //                 //echo $data_activity_sum[0]->qty_process;
    //             }
    //             if($data_activity_sum[0]->qty_repeat == null){
    //                 $data_activity_sum[0]->qty_repeat = 0;
    //                 //echo $data_activity_sum[0]->qty_repeat;
    //             }
    //             $data_planning = DB::select('SELECT task_complete, status_backup, qty_order, p.datetime_update, p.operation, p.run_time_actual,
    //             qty_comp AS qty_complete, qty_open, run_time_std, divider.divider as divider,
    //             p.op_color, p.op_side, p.op_des, p.item_no, p.operation, p.date_due
    //             FROM planning as p, divider
    //             where p.op_color=divider.op_color
    //             AND p.op_side=divider.op_side
    //             and id_task=' . $data_machine_queue[0]->id_task);
    //             $data_planning[0]->run_time_std = number_format((floatval($data_planning[0]->run_time_std)*3600)-2, 2);
    //             $number_count = 0;
    //             $id_code_downtime = '-';
    //             $code_downtime = '-';
    //             $des_downtime = '-';
    //             $des_downtime_thai = '-';
    //             $item_no_2 = '-';
    //             $operation_2 = '-';
    //             if($data_machine_queue[0]->id_activity != 0){
    //                 $number_count++;
    //                 $data_activity = Activity::where('id_activity',$data_machine_queue[0]->id_activity)->get();
    //             }
    //             if($data_machine_queue[0]->id_activity_downtime != 0){
    //                 $number_count++;
    //                 $data_activity = ActivityDowntime::where('id_activity_downtime',$data_machine_queue[0]->id_activity_downtime)->get();
    //                 $data_activity[0]->status_work=$data_activity[0]->status_downtime;
    //                 if ($data_activity[0]->run_time_actual == null) {
    //                     $data_activity[0]->run_time_actual = 0;
    //                 }
    //                 $data_code_downtime = CodeDowntime::where('id_code_downtime',$data_activity[0]->id_code_downtime)->get();
    //                 // return response() -> json($data_activity);
    //                 $id_code_downtime = $data_code_downtime[0]->id_code_downtime;
    //                 $code_downtime = $data_code_downtime[0]->code_downtime;
    //                 $des_downtime = $data_code_downtime[0]->des_downtime;
    //                 $des_downtime_thai = $data_code_downtime[0]->des_downtime_thai;
    //                 $data_activity[0]->status_work = $data_activity[0]->status_downtime;
    //             }
    //             if($data_machine_queue[0]->id_activity_rework != 0){
    //                 $number_count++;
    //                 $data_activity = ActivityRework::where('id_activity',$data_machine_queue[0]->id_activity_rework)->get();
    //             }
    //             ////////////////////////////////////////////
    //             foreach($id_mc_queue_2 as $values){
    //                 if($values == $id_mc[$i]){
    //                     $data_machine_queue_2 = MachineQueue::where('id_machine',$id_mc[$i])->where('queue_number','2')->get();
    //                     $data_planning_queue_2 = DB::select('SELECT operation, item_no FROM planning where id_task=' . $data_machine_queue_2[0]->id_task);
    //                     $item_no_2 = $data_planning_queue_2[0]->item_no;
    //                     $operation_2 = $data_planning_queue_2[0]->operation;
    //                 }
    //             }
    //             ////////////////////////////////////////////
    //             if ($number_count>=2 || $number_count<=0){
    //                 $sumResult[$i] = array(
    //                     "id_machine" => $id_mc[$i],
    //                     "code" => "020",
    //                     "message" => "The activity exists in both activity and activity_downtime tables or not found in both"
    //                 );
    //                 continue;
    //             }
    //             else{
    //                 // return response() -> json($data_planning[0]->operation);
    //                 if($data_activity[0]->status_work == 0 || $data_activity[0]->status_work==3 || $data_activity[0]->status_work==4 || $data_activity[0]->status_work==5 || $data_activity[0]->status_work==6){
    //                     $sumResult[$i] = array(
    //                         "id_machine"=>$id_mc[$i],
    //                         "id_task"=>$data_machine_queue[0]->id_task,
    //                         "id_staff"=> $data_activity[0]->id_staff,
    //                         "status_work"=> $data_activity[0]->status_work,
    //                         "qty_process"=> $data_activity_sum[0]->qty_process,
    //                         "qty_repeat"=> $data_activity_sum[0]->qty_repeat,
    //                         "task_complete"=> $data_planning[0]->task_complete,
    //                         "status_backup"=> $data_planning[0]->status_backup,
    //                         "qty_order"=> $data_planning[0]->qty_order,
    //                         "qty_complete"=> $data_planning[0]->qty_complete,
    //                         "qty_open"=> $data_planning[0]->qty_open,
    //                         "divider"=> $data_planning[0]->divider,
    //                         "item_no" => $data_planning[0]->item_no,
    //                         "operation" => $data_planning[0]->operation,
    //                         "op_color" => $data_planning[0]->op_color,
    //                         "op_side" => $data_planning[0]->op_side,
    //                         "op_des" => $data_planning[0]->op_des,
    //                         "date_due" =>$data_planning[0]->date_due,
    //                         //"date_due" =>'0',
    //                         "run_time_actual"=> '0',
    //                         "run_time_std"=> '0',
    //                         "datetime_update" => '0',
    //                         "id_code_downtime"=> $id_code_downtime,
    //                         "code_downtime"=> $code_downtime,
    //                         "des_downtime"=> $des_downtime,
    //                         "des_downtime_thai"=> $des_downtime_thai,
    //                         "item_no_2" => $item_no_2,
    //                         "operation_2" => $operation_2
    //                      );
    //                 }
    //                 else{
    //                     $sumResult[$i] = array(
    //                         "id_machine"=>$id_mc[$i],
    //                         "id_task"=>$data_machine_queue[0]->id_task,
    //                         "id_staff"=> $data_activity[0]->id_staff,
    //                         "status_work"=> $data_activity[0]->status_work,
    //                         "qty_process"=> $data_activity_sum[0]->qty_process,
    //                         "qty_repeat"=> $data_activity_sum[0]->qty_repeat,
    //                         "task_complete"=> $data_planning[0]->task_complete,
    //                         "status_backup"=> $data_planning[0]->status_backup,
    //                         "qty_order"=> $data_planning[0]->qty_order,
    //                         "qty_complete"=> $data_planning[0]->qty_complete,
    //                         "qty_open"=> $data_planning[0]->qty_open,
    //                         "divider"=> $data_planning[0]->divider,
    //                         "item_no" => $data_planning[0]->item_no,
    //                         "operation" => $data_planning[0]->operation,
    //                         "op_color" => $data_planning[0]->op_color,
    //                         "op_side" => $data_planning[0]->op_side,
    //                         "op_des" => $data_planning[0]->op_des,
    //                         "date_due" =>$data_planning[0]->date_due,
    //                         "run_time_actual"=> $data_activity[0]->run_time_actual,
    //                         "run_time_std"=> $data_planning[0]->run_time_std,
    //                         "datetime_update" => $data_planning[0]->datetime_update,
    //                         "id_code_downtime"=> $id_code_downtime,
    //                         "code_downtime"=> $code_downtime,
    //                         "des_downtime"=> $des_downtime,
    //                         "des_downtime_thai"=> $des_downtime_thai,
    //                         "item_no_2" => $item_no_2,
    //                         "operation_2" => $operation_2
    //                      );
    //                 }
                    
    //             }
    //         }
    //         return response() -> json($sumResult);
    //     }
    //     catch(Exception $error){
    //         Log::error($error);
    //     }
    // }

    //Get Indivvidual Dashboard data Modal old
    // public function getDashboardDetails(Request $request)
    // {
    //     try{
    //         $machineId = MachineQueue::where('queue_number' ,'1')->get();
    //         $machineId_queue_2 = MachineQueue::where('queue_number' ,'2')->get();
    //         $id_mc = array();
    //         $id_mc_queue_2 =array();
    //         $sumResult = array();
    //         $count = $machineId->count();
    //         $count2 = $machineId_queue_2->count();
    //         for ($i=0;$i<$count;$i++){
    //             array_push($id_mc,$machineId[$i]->id_machine);
    //             }
    //         for ($i=0;$i<$count2;$i++){
    //             array_push($id_mc_queue_2,$machineId[$i]->id_machine);
    //             }
    //         // $data_activity = DB::select('SELECT * FROM (select max(id_activity) as id_activity_max FROM activity GROUP by id_machine) as max_activity , activity as a where a.id_activity = max_activity.id_activity_max');
    //         // print_r($count);
    //         for($i = 0 ; $i<$count ; $i++){
    //             $data_machine_queue = MachineQueue::where('id_machine',$id_mc[$i])->where('queue_number','1')->get();
    //             $data_activity_sum = DB::select('SELECT SUM(no_pulse1) AS qty_process, SUM(num_repeat) AS qty_repeat FROM activity WHERE status_work<6 AND id_task='.$data_machine_queue[0]->id_task);
    //             if($data_activity_sum[0]->qty_process == null){
    //                 $data_activity_sum[0]->qty_process = 0;
    //                 //echo $data_activity_sum[0]->qty_process;
    //             }
    //             if($data_activity_sum[0]->qty_repeat == null){
    //                 $data_activity_sum[0]->qty_repeat = 0;
    //                 //echo $data_activity_sum[0]->qty_repeat;
    //             }
    //             $data_planning = DB::select('SELECT task_complete, status_backup, qty_order, p.datetime_update, p.operation, p.run_time_actual,
    //             qty_comp AS qty_complete, qty_open, run_time_std, divider.divider as divider,
    //             p.op_color, p.op_side, p.op_des, p.item_no, p.operation, p.date_due, p.id_job
    //             FROM planning as p, divider
    //             where p.op_color=divider.op_color
    //             AND p.op_side=divider.op_side
    //             and id_task=' . $data_machine_queue[0]->id_task);
    //             $data_planning[0]->run_time_std = number_format((floatval($data_planning[0]->run_time_std)*3600)-2, 2);
    //             $number_count = 0;
    //             $id_code_downtime = '-';
    //             $code_downtime = '-';
    //             $des_downtime = '-';
    //             $des_downtime_thai = '-';
    //             $item_no_2 = '-';
    //             $operation_2 = '-';

    //             if($data_machine_queue[0]->id_activity != 0){
    //                 $number_count++;
    //                 $data_activity = Activity::where('id_activity',$data_machine_queue[0]->id_activity)->get();
    //             }
    //             if($data_machine_queue[0]->id_activity_downtime != 0){
    //                 $number_count++;
    //                 $data_activity = ActivityDowntime::where('id_activity_downtime',$data_machine_queue[0]->id_activity_downtime)->get();
    //                 $data_activity[0]->status_work=$data_activity[0]->status_downtime;
    //                 if ($data_activity[0]->run_time_actual == null) {
    //                     $data_activity[0]->run_time_actual = 0;
    //                 }
    //                 $data_code_downtime = CodeDowntime::where('id_code_downtime',$data_activity[0]->id_code_downtime)->get();
    //                 // return response() -> json($data_activity);
    //                 $id_code_downtime = $data_code_downtime[0]->id_code_downtime;
    //                 $code_downtime = $data_code_downtime[0]->code_downtime;
    //                 $des_downtime = $data_code_downtime[0]->des_downtime;
    //                 $des_downtime_thai = $data_code_downtime[0]->des_downtime_thai;
    //                 $data_activity[0]->status_work = $data_activity[0]->status_downtime;
    //             }
    //             if($data_machine_queue[0]->id_activity_rework != 0){
    //                 $number_count++;
    //                 $data_activity = ActivityRework::where('id_activity',$data_machine_queue[0]->id_activity_rework)->get();
    //             }
    //             ////////////////////////////////////////////
    //             foreach($id_mc_queue_2 as $values){
    //                 if($values == $id_mc[$i]){
    //                     $data_machine_queue_2 = MachineQueue::where('id_machine',$id_mc[$i])->where('queue_number','2')->get();
    //                     $data_planning_queue_2 = DB::select('SELECT operation, item_no FROM planning where id_task=' . $data_machine_queue_2[0]->id_task);
    //                     $item_no_2 = $data_planning_queue_2[0]->item_no;
    //                     $operation_2 = $data_planning_queue_2[0]->operation;
    //                 }
    //             }
    //             ////////////////////////////////////////////
    //             if ($number_count>=2 || $number_count<=0){
    //                 $sumResult[$i] = array(
    //                     "id_machine" => $id_mc[$i],
    //                     "code" => "020",
    //                     "message" => "The activity exists in both activity and activity_downtime tables or not found in both"
    //                 );
    //                 continue;
    //             }
    //             else{
    //                 // return response() -> json($data_planning[0]->operation);
    //                 $sumResult[$i] = array(
    //                     "id_machine"=>$id_mc[$i],
    //                     "item_no" => $data_planning[0]->item_no,
    //                     "operation" => $data_planning[0]->operation,
    //                     "date_due" =>$data_planning[0]->date_due,
    //                     "qty_accum"=> $data_planning[0]->qty_complete + $data_activity_sum[0]->qty_process,
    //                     "qty_order"=> $data_planning[0]->qty_order,
    //                     "qty_percent" => round(($data_planning[0]->qty_complete + $data_activity_sum[0]->qty_process / $data_planning[0]->qty_order) * 100,0),
    //                     "id_task"=>$data_machine_queue[0]->id_task,
    //                     "id_job"=>$data_planning[0]->id_job,                        
    //                     "datetime_update" => $data_planning[0]->datetime_update
    //                  );
    //             }
    //             if($request->dashboardID==$id_mc[$i]){
    //                 return response() -> json($sumResult[$i]);
    //             }
    //         }
    //         return response() -> json($sumResult);
    //         // return response() -> json($sumResult[0]);
    //     }
    //     catch(Exception $error){
    //         Log::error($error);
    //     }
    // }
    //     try
    //     {
    //         $dashboardData = MachineQueue::findOrFail($request->get('dashboardID'));
    //         return response()->json($dashboardData);
    //     }
    //     catch(Exception $error)
    //     {
    //         Log::error($error);
    //     }
    // }

    //Get Indivvidual Dashboard data New Modal
    public function getDashboardDetailsNewDB(Request $request)
    {
        try{
            // print_r($request->input('dashboardID'));
            $machineId = Machine::all();
            $machineId_queue_1 = MachineQueue::where('queue_number' ,'1')->get();
            $machineId_queue_2 = MachineQueue::where('queue_number' ,'2')->get();
            $id_mc = array();
            $id_mc_queue_1 =array();
            $id_mc_queue_2 =array();
            $sumResult = array();
            $count = $machineId->count();
            $count2 = $machineId_queue_2->count();
            for ($i=0;$i<$count;$i++){
                array_push($id_mc,$machineId[$i]->id_mc);
                }
            for ($i=0;$i< $machineId_queue_1->count();$i++){
                array_push($id_mc_queue_1,$machineId_queue_1[$i]->id_machine);
                }
                
            for ($i=0;$i<$count2;$i++){
                array_push($id_mc_queue_2,$machineId_queue_2[$i]->id_machine);
                }
            sort($id_mc);
            sort($id_mc_queue_1);
            sort($id_mc_queue_2);
            // print_r($id_mc);
            
            for($i = 0 ; $i<$machineId->count() ; $i++){
                $item_no_2 = '-';
                $operation_2 = '-';
                foreach($id_mc_queue_2 as $values){
                    if($values == $id_mc[$i]){
                        // print_r($id_mc_queue_2);
                        $data_machine_queue_2 = MachineQueue::where('id_machine',$id_mc[$i])->where('queue_number','2')->get();
                        // print_r($data_machine_queue_2);
                        $data_planning_queue_2 = DB::select('SELECT operation, item_no FROM planning where id_task=' . $data_machine_queue_2[0]->id_task);
                        // print_r($data_planning_queue_2);
                        $item_no_2 = $data_planning_queue_2[0]->item_no;
                        $operation_2 = $data_planning_queue_2[0]->operation;
                    }
                }
                $data_machine_queue = MachineQueue::where('id_machine',$id_mc[$i])->where('queue_number','1')->get();

                if($data_machine_queue->isEmpty()){

                    $sumResult[$i] = array(
                        "id_machine"=>$id_mc[$i],
                        "status_work"=> '',
                        "operation" => '',
                        "date_due" =>'',
                        "qty_per_pulse2"=> '',
                        "no_pulse1"=>'',
                        "qty_accum"=> '',
                        "qty_order"=> '',
                        "qty_percent" => '',
                        "id_task"=>'',
                        "datetime_update" => '',
                     );
                     //print_r("qty_per_pulse2");
                    continue;
                }
                $data_activity_sum = DB::select('SELECT SUM(no_pulse1) AS qty_process FROM activity WHERE status_work<6 AND id_task='.$data_machine_queue[0]->id_task);
                
                if($data_activity_sum[0]->qty_process == null){
                    $data_activity_sum[0]->qty_process = 0;
                    //echo $data_activity_sum[0]->qty_process;
                }

                $data_planning = DB::select('SELECT task_complete, status_backup, qty_order, p.datetime_update, p.operation, p.run_time_actual,
                qty_comp AS qty_complete, qty_open, run_time_std, divider.divider as divider,
                p.op_color, p.op_side, p.op_des, p.item_no, p.operation, p.date_due, p.qty_per_pulse2, p.id_job
                FROM planning as p, divider
                where p.op_color=divider.op_color
                AND p.op_side=divider.op_side
                and id_task=' . $data_machine_queue[0]->id_task);

                $due_date = date('d-m-Y', strtotime($data_planning[0]->date_due));
                $data_planning[0]->run_time_std = number_format((floatval($data_planning[0]->run_time_std)*3600)-2, 2);
                $number_count = 0;
                $id_code_downtime = '-';
                $code_downtime = '-';
                $des_downtime = '-';
                $des_downtime_thai = '-';
                $item_no_2 = '-';
                $operation_2 = '-';
               
                
                $data_activity_backflush = Activity::where('id_task',$data_machine_queue[0]->id_task)->orderBy('time_start','desc')->first();
                $data_activity_downtime = ActivityDowntime::where('id_task',$data_machine_queue[0]->id_task)->orderBy('time_start','desc')->first();
                $data_activity_rework = ActivityRework::where('id_task',$data_machine_queue[0]->id_task)->orderBy('time_start','desc')->first();

                // if($data_activity_backflush != null){
                //     $date_backflush = strtotime($data_activity_backflush['time_start']);
                //     $data_activity = $data_activity_backflush;

                // }
                // else{
                //     $date_backflush = 0;
                //     $number_count++;
                // }

                // if($data_activity_rework != null){
                //     $date_rework = strtotime($data_activity_rework['time_start']);
                //     if($date_backflush < $date_rework){
                //         $data_activity = $data_activity_rework;
                //     }
                // }
                // else{
                //     $date_rework = 0;
                //     $number_count++;
                // }
                
                // if($data_activity_downtime != null){
                //     $date_downtime = strtotime($data_activity_downtime['time_start']);
                //     if(($date_backflush < $date_downtime) && ($date_rework < $date_downtime)){
                //         $data_activity = $data_activity_downtime;
                        
                //         $data_activity['status_work']=$data_activity['status_downtime'];
                //     if ($data_activity['run_time_actual'] == null) {
                //         $data_activity['run_time_actual'] = 0;
                //     }
                
                if($data_activity_backflush != null){
                    $date_backflush = strtotime($data_activity_backflush['time_start']);
                    $data_activity = $data_activity_backflush;
                    $data_activity_main =$data_activity_backflush['id_activity'];
                    $data_activity_pulse =$data_activity_backflush['no_pulse1'];
                    if($data_activity['status_work'] > 3){
                        $data_activity['status_work'] = 3;
                    }
                }
                else{
                    $date_backflush = 0;
                    $number_count++;
                }

                if($data_activity_rework != null){
                    $date_rework = strtotime($data_activity_rework['time_start']);
                    if($date_backflush < $date_rework){
                        $data_activity = $data_activity_rework;
                        $data_activity_main =$data_activity_rework['id_activity'];
                        $data_activity_pulse =$data_activity_rework['no_pulse1'];
                        if($data_activity['status_work'] > 3){
                            $data_activity['status_work'] = 3;
                        }
                    }
                    
                }
                else{
                    $date_rework = 0;
                    $number_count++;
                }
                
                if($data_activity_downtime != null){
                    $date_downtime = strtotime($data_activity_downtime['time_start']);
                    if(($date_backflush < $date_downtime) && ($date_rework < $date_downtime)){
                        $data_activity = $data_activity_downtime;
                        $data_activity['id_activity']=$data_activity_main;
                        $data_activity['no_pulse1']=$data_activity_pulse;
                        if($data_activity['status_downtime'] == 1){
                            $data_activity['status_work'] = 4;
                        }
                        else{
                            $data_activity['status_work'] = $data_activity['status_downtime'];
                        }
                    if ($data_activity['run_time_actual'] == null) {
                        $data_activity['run_time_actual'] = 0;
                    }
                    
                    $data_code_downtime = CodeDowntime::where('id_code_downtime',$data_activity['id_code_downtime'])->get();
                    $id_code_downtime = $data_code_downtime[0]->id_code_downtime;
                    $code_downtime = $data_code_downtime[0]->code_downtime;
                    $des_downtime = $data_code_downtime[0]->des_downtime;
                    $des_downtime_thai = $data_code_downtime[0]->des_downtime_thai;
                    }
                }
                else{
                    $number_count++;
                }
  
                foreach($id_mc_queue_2 as $values){
                    if($values == $id_mc[$i]){
                        $data_machine_queue_2 = MachineQueue::where('id_machine',$id_mc[$i])->where('queue_number','2')->get();
                        $data_planning_queue_2 = DB::select('SELECT operation, item_no FROM planning where id_task=' . $data_machine_queue_2[0]->id_task);
                        $item_no_2 = $data_planning_queue_2[0]->item_no;
                        $operation_2 = $data_planning_queue_2[0]->operation;
                    }
                }
                    if($request->input('dashboardID')==$id_mc[$i]){
                        $sumResult[$i] = array(
                            "id_machine"=>$id_mc[$i],
                            "status_work"=> $data_activity['status_work'],
                            "item_no" => $data_planning[0]->item_no,
                            "id_job"=>$data_planning[0]->id_job,
                            "operation" => $data_planning[0]->operation,
                            "date_due" =>$due_date,
                            "qty_per_pulse2"=> $data_planning[0]->qty_per_pulse2,
                            "qty_accum"=> round($data_planning[0]->qty_complete + $data_activity_sum[0]->qty_process),
                            "qty_accum_sum"=> round($data_planning[0]->qty_complete + ($data_activity_sum[0]->qty_process*$data_planning[0]->divider)),
                            // "qty_accum_sum"=> $data_planning[0]->qty_complete + ($data_activity_sum[0]->qty_process/$data_planning[0]->divider),
                            "qty_order"=> $data_planning[0]->qty_order,
                            "qty_percent" => round(($data_planning[0]->qty_complete + ($data_activity_sum[0]->qty_process / $data_planning[0]->qty_order)) * 100,0),
                            "id_task"=>$data_machine_queue[0]->id_task,
                            "datetime_update" => $data_planning[0]->datetime_update,
                            // "no_pulse1"=>$data_activity['no_pulse1']*$data_planning[0]->divider,
                            "no_pulse1"=>$data_activity['no_pulse1']*$data_planning[0]->divider,

                            "id_activity"=>  $data_activity['id_activity'],
                            "id_staff"=> $data_activity['id_staff'],
                            "id_rfid" => '',
                            "no_send" => $data_activity['no_send'],
                                       
                             
                         );
                    }
                    else if ($number_count>=2 || $number_count<=0){
                        $sumResult[$i] = array(
                            "id_machine" => $id_mc[$i],
                            "code" => "020",
                            "message" => "The activity exists in both activity and activity_downtime tables or not found in both"
                        );
                        // continue;
                    }
                    
                    else{
                        $sumResult[$i] = array(
                            "id_machine"=>$id_mc[$i],
                            "status_work"=> $data_activity['status_work'],
                            "id_activity"=>  $data_activity['id_activity'],
                            "item_no" => $data_planning[0]->item_no,
                            "id_job"=>$data_planning[0]->id_job,
                            "operation" => $data_planning[0]->operation,
                            "date_due" =>$due_date,
                            "qty_per_pulse2"=> $data_planning[0]->qty_per_pulse2,
                            "qty_accum"=> round($data_planning[0]->qty_complete + $data_activity_sum[0]->qty_process),
                            "qty_accum_sum"=> round($data_planning[0]->qty_complete + ($data_activity_sum[0]->qty_process*$data_planning[0]->divider)),
                            // "qty_accum_sum"=> $data_planning[0]->qty_complete + ($data_activity_sum[0]->qty_process/$data_planning[0]->divider),
                            "no_pulse1"=>$data_activity['no_pulse1']*$data_planning[0]->divider,
                            // "no_pulse1"=>$data_activity['no_pulse1']*$data_planning[0]->divider,
                            "qty_order"=> $data_planning[0]->qty_order,
                            "qty_percent" => round((($data_planning[0]->qty_complete + $data_activity_sum[0]->qty_process) / $data_planning[0]->qty_order) * 100,0),
                            "id_task"=>$data_machine_queue[0]->id_task,
                            "datetime_update" => $data_planning[0]->datetime_update,
                            "id_staff"=> $data_activity['id_staff'],
                            "id_rfid" => '',
                            "no_send" => $data_activity['no_send'],
                         
                         );         
                    }

                        // return response() -> json($id_mc);

                    if($request->input('dashboardID')==$id_mc[$i]){
                        return response() -> json($sumResult[$i]);
                        
                    }              
            }
            // return response() -> json([$request->input('dashboardID')]);
            return response() -> json(array(
                "id_machine"=>$request->input('dashboardID'),
                "status_work"=> '',
                "item_no" => '',
                "id_job"=>'',
                "operation" => '',
                "date_due" =>'',
                "qty_per_pulse2"=> '',
                "no_pulse1"=>'',
                "qty_accum"=> '',
                "qty_order"=> '',
                "qty_percent" => '',
                "id_task"=>'',
                "id_activity"=>'',
                "datetime_update" => '',  
                "id_staff" => '',
                "id_rfid" => '',
                "no_send" => '',
                // "test"=>'123',
            ));
        }
        
        catch(Exception $error){
            Log::error($error);
        }
    }



 

    public function dashboardRefreshQueue2(Request $request){
        // return response() -> json($sumResult);
        try{
            $machineId = MachineQueue::where('queue_number' ,'1')->get();
            $machineId_queue_2 = MachineQueue::where('queue_number' ,'2')->get();
            $id_mc = array();
            $id_mc_queue_2 =array();
            // $sumResult = array();
            $count = $machineId->count();
            $count2 = $machineId_queue_2->count();
            for ($i=0;$i<$count;$i++){
                array_push($id_mc,$machineId[$i]->id_machine);
                }
            for ($i=0;$i<$count2;$i++){
                array_push($id_mc_queue_2,$machineId_queue_2[$i]->id_machine);
                }
            // $data_activity = DB::select('SELECT * FROM (select max(id_activity) as id_activity_max FROM activity GROUP by id_machine) as max_activity , activity as a where a.id_activity = max_activity.id_activity_max');
            // return response() -> json($id_mc_queue_2);
            // print_r($count);
            $check = 0;
            // if($request->input('dashboardID')==$id_mc[$i]){
            //     return response() -> json($sumResult[$i]);
                
            // }
            // return response() -> json($id_mc_queue_2);
            // for($i = 0 ; $i<$count ; $i++){
                foreach($id_mc_queue_2 as $values){
                    if($values == $request->input('dashboardID')){
                        $data_machine_queue = MachineQueue::where('id_machine',$values)->where('queue_number','2')->get();
                        $data_activity_sum = DB::select('SELECT SUM(no_pulse1) AS qty_process FROM activity WHERE status_work<6 AND id_task='.$data_machine_queue[0]->id_task);
                        // return response() -> json($data_activity_sum);
                        $data_planning = DB::select('SELECT task_complete, status_backup, qty_order, p.datetime_update, p.operation,
                        qty_comp AS qty_complete, qty_open, run_time_std, divider.divider as divider,
                        p.op_color, p.op_side, p.op_des, p.item_no, p.date_due, p.id_job , p.qty_per_pulse2
                        FROM planning as p, divider
                        where p.op_color=divider.op_color
                        AND p.op_side=divider.op_side
                        and id_task=' . $data_machine_queue[0]->id_task);
                        
                        $data_planning[0]->run_time_std = number_format((floatval($data_planning[0]->run_time_std)*3600)-2, 2);
                        $check = 1;
                        $sumResult = array(
                            "id_machine"=>$request->input('dashboardID'),
                            "id_task"=>$data_machine_queue[0]->id_task,
                            "date_due" =>$data_planning[0]->date_due,
                            "qty_accum"=> $data_planning[0]->qty_complete + $data_activity_sum[0]->qty_process,
                            "id_job"=>$data_planning[0]->id_job,
                            "qty_percent" => round(($data_planning[0]->qty_complete + $data_activity_sum[0]->qty_process / $data_planning[0]->qty_order) * 100,0),
                            "operation" => $data_planning[0]->operation,
                            "qty_process"=> $data_activity_sum[0]->qty_process,
                            "qty_per_pulse2"=> $data_planning[0]->qty_per_pulse2,
                            "task_complete"=> $data_planning[0]->task_complete,
                            "status_backup"=> $data_planning[0]->status_backup,
                            "qty_order"=> $data_planning[0]->qty_order,
                            "qty_complete"=> $data_planning[0]->qty_complete,
                            "qty_open"=> $data_planning[0]->qty_open,
                            "run_time_std"=> $data_planning[0]->run_time_std,
                            "divider"=> $data_planning[0]->divider,
                            "op_color" => $data_planning[0]->op_color,
                            "op_side" => $data_planning[0]->op_side,
                            "op_des" => $data_planning[0]->op_des,
                            "item_no" => $data_planning[0]->item_no,
                            "status_work"=> '-',
                            "id_staff"=> '-',
                            "run_time_actual"=> '-',
                            "id_code_downtime"=> '-',
                            "code_downtime"=> '-',
                            "des_downtime"=> '-',
                            "des_downtime_thai"=> '-',
                            "datetime_update" => $data_planning[0]->datetime_update,
                        );
                        return response() -> json($sumResult);
                        
                    }
                }
                $sumResult = array(
                    "id_machine"=>$request->input('dashboardID'),
                    "status_work"=> '',
                    "item_no" => '',
                    "operation" => '',
                    "date_due" =>'',
                    "qty_per_pulse2"=> '',
                    "qty_accum"=> '',
                    "qty_order"=> '',
                    "qty_percent" => '',
                    "id_task"=>'',
                    "datetime_update" => '',  
                );
            // }
            return response() -> json($sumResult);
        }
        catch(Exception $error){
            Log::error($error);
        }
    }


    public function dashboardRefreshQueue2New(Request $request){
        try{
            $machineId = Machine::all();
            $machineId_queue_1 = MachineQueue::where('queue_number' ,'1')->get();
            $machineId_queue_2 = MachineQueue::where('queue_number' ,'2')->get();
            $id_mc = array();
            $id_mc_queue_1 =array();
            $id_mc_queue_2 =array();
            $sumResult = array();
            $count = $machineId->count();
            $count2 = $machineId_queue_2->count();
            for ($i=0;$i<$count;$i++){
                array_push($id_mc,$machineId[$i]->id_mc);
                }
            for ($i=0;$i< $machineId_queue_1->count();$i++){
                array_push($id_mc_queue_1,$machineId_queue_1[$i]->id_machine);
                }
            for ($i=0;$i<$count2;$i++){
                array_push($id_mc_queue_2,$machineId_queue_2[$i]->id_machine);
                }
            sort($id_mc);
            sort($id_mc_queue_1);
            sort($id_mc_queue_2);
            // print_r($id_mc);
            
            // $data_activity = DB::select('SELECT * FROM (select max(id_activity) as id_activity_max FROM activity GROUP by id_machine) as max_activity , activity as a where a.id_activity = max_activity.id_activity_max');
            
            for($i = 0 ; $i<$machineId->count() ; $i++){
                $item_no_2 = '-';
                $operation_2 = '-';
                foreach($id_mc_queue_2 as $values){
                    if($values == $id_mc[$i]){
                        // print_r($id_mc_queue_2);
                        $data_machine_queue_2 = MachineQueue::where('id_machine',$id_mc[$i])->where('queue_number','2')->get();
                        // print_r($data_machine_queue_2);
                        $data_planning_queue_2 = DB::select('SELECT operation, item_no FROM planning where id_task=' . $data_machine_queue_2[0]->id_task);
                        // print_r($data_planning_queue_2);
                        $item_no_2 = $data_planning_queue_2[0]->item_no;
                        $operation_2 = $data_planning_queue_2[0]->operation;
                    }
                }
                $data_machine_queue = MachineQueue::where('id_machine',$id_mc[$i])->where('queue_number','1')->get();
                // print_r($data_machine_queue . "00000000000000000000000000000000000");
                if($data_machine_queue->isEmpty()){
                    // print_r($data_machine_queue . "00000000000000000000000000000000000");
                    // print_r("1");
                    // return response() -> json($data_machine_queue);
                    $sumResult[$i] = array(
                        "id_machine"=>$id_mc[$i],
                        "id_task"=>'',
                        "id_staff"=> '',
                        "status_work"=> '',
                        "qty_process"=> '',
                        //"qty_repeat"=> $data_activity_sum[0]->qty_repeat,
                        "task_complete"=> '',
                        "status_backup"=> '',
                        "qty_order"=> '',
                        "qty_complete"=> '',
                        "qty_open"=> '',
                        "divider"=> '',
                        "item_no" => '',
                        "operation" => '',
                        "op_color" => '',
                        "op_side" => '',
                        "op_des" => '',
                        "date_due" =>'',
                        "run_time_actual"=> '',
                        "run_time_std"=> '',
                        "datetime_update" => '',
                        "id_code_downtime"=> '',
                        "code_downtime"=> '',
                        "des_downtime"=> '',
                        "des_downtime_thai"=> '',
                        "item_no_2" => $item_no_2,
                        "operation_2" => $operation_2
                     );
                     
                    continue;
                }
                $data_activity_sum = DB::select('SELECT SUM(no_pulse1) AS qty_process FROM activity WHERE status_work<6 AND id_task='.$data_machine_queue[0]->id_task);
                
                if($data_activity_sum[0]->qty_process == null){
                    $data_activity_sum[0]->qty_process = 0;
                    //echo $data_activity_sum[0]->qty_process;
                }
   
                $data_planning = DB::select('SELECT task_complete, status_backup, qty_order, p.datetime_update, p.operation, p.run_time_actual,
                qty_comp AS qty_complete, qty_open, run_time_std, divider.divider as divider,
                p.op_color, p.op_side, p.op_des, p.item_no, p.operation, p.date_due
                FROM planning as p, divider
                where p.op_color=divider.op_color
                AND p.op_side=divider.op_side
                and id_task=' . $data_machine_queue[0]->id_task);

                $data_planning[0]->run_time_std = number_format((floatval($data_planning[0]->run_time_std)*3600)-2, 2);
                $number_count = 0;
                $id_code_downtime = '-';
                $code_downtime = '-';
                $des_downtime = '-';
                $des_downtime_thai = '-';
               
                
                $data_activity_backflush = Activity::where('id_task',$data_machine_queue[0]->id_task)->orderBy('time_start','desc')->first();
                $data_activity_downtime = ActivityDowntime::where('id_task',$data_machine_queue[0]->id_task)->orderBy('time_start','desc')->first();
                $data_activity_rework = ActivityRework::where('id_task',$data_machine_queue[0]->id_task)->orderBy('time_start','desc')->first();
                
                if($data_activity_backflush != null){
                    $date_backflush = strtotime($data_activity_backflush['time_start']);
                    $data_activity = $data_activity_backflush;
                }
                else{
                    $date_backflush = 0;
                    $number_count++;
                }

                if($data_activity_rework != null){
                    $date_rework = strtotime($data_activity_rework['time_start']);
                    if($date_backflush < $date_rework){
                        $data_activity = $data_activity_rework;
                    }
                }
                else{
                    $date_rework = 0;
                    $number_count++;
                }
                
                if($data_activity_downtime != null){
                    $date_downtime = strtotime($data_activity_downtime['time_start']);
                    if(($date_backflush < $date_downtime) && ($date_rework < $date_downtime)){
                        $data_activity = $data_activity_downtime;
                        
                        $data_activity['status_work']=$data_activity['status_downtime'];
                    if ($data_activity['run_time_actual'] == null) {
                        $data_activity['run_time_actual'] = 0;
                    }
                    
                    $data_code_downtime = CodeDowntime::where('id_code_downtime',$data_activity['id_code_downtime'])->get();
                    // return response() -> json($data_code_downtime);
                    $id_code_downtime = $data_code_downtime[0]->id_code_downtime;
                    $code_downtime = $data_code_downtime[0]->code_downtime;
                    $des_downtime = $data_code_downtime[0]->des_downtime;
                    $des_downtime_thai = $data_code_downtime[0]->des_downtime_thai;
                    }
                }
                else{
                    $number_count++;
                }
                

                
                if($number_count>=3){
                    // print_r($id_mc[$i]);
                    $sumResult[$i] = array(
                        "id_machine"=>$id_mc[$i],
                        "id_task"=>'',
                        "id_staff"=> '',
                        "status_work"=> '',
                        "qty_process"=> '',
                        //"qty_repeat"=> $data_activity_sum[0]->qty_repeat,
                        "task_complete"=> '',
                        "status_backup"=> '',
                        "qty_order"=> '',
                        "qty_complete"=> '',
                        "qty_open"=> '',
                        "divider"=> '',
                        "item_no" => '',
                        "operation" => '',
                        "op_color" => '',
                        "op_side" => '',
                        "op_des" => '',
                        "date_due" =>'',
                        "run_time_actual"=> '',
                        "run_time_std"=> '',
                        "datetime_update" => '',
                        "id_code_downtime"=> $id_code_downtime,
                        "code_downtime"=> $code_downtime,
                        "des_downtime"=> $des_downtime,
                        "des_downtime_thai"=> $des_downtime_thai,
                        "item_no_2" => $item_no_2,
                        "operation_2" => $operation_2
                     );
                     
                    continue;
                }

                $data_planning[0]->run_time_std = number_format((floatval($data_planning[0]->run_time_std)*3600)-2, 2);
                $check = 1;
                        $sumResult[$i] = array(
                            "id_machine"=>$id_mc[$i],
                            "id_task"=>$data_machine_queue[0]->id_task,
                            "id_staff"=> $data_activity['id_staff'],
                            "status_work"=> $data_activity['status_work'],
                            "qty_process"=> $data_activity_sum[0]->qty_process,
                            //"qty_repeat"=> $data_activity_sum[0]->qty_repeat,
                            "task_complete"=> $data_planning[0]->task_complete,
                            "status_backup"=> $data_planning[0]->status_backup,
                            "qty_order"=> $data_planning[0]->qty_order,
                            "qty_complete"=> $data_planning[0]->qty_complete,
                            "qty_open"=> $data_planning[0]->qty_open,
                            "divider"=> $data_planning[0]->divider,
                            "item_no" => $data_planning[0]->item_no,
                            "operation" => $data_planning[0]->operation,
                            "op_color" => $data_planning[0]->op_color,
                            "op_side" => $data_planning[0]->op_side,
                            "op_des" => $data_planning[0]->op_des,
                            "date_due" =>$data_planning[0]->date_due,
                            //"date_due" =>'0',
                            "run_time_actual"=> '0',
                            "run_time_std"=> '0',
                            "datetime_update" => '0',
                            "id_code_downtime"=> $id_code_downtime,
                            "code_downtime"=> $code_downtime,
                            "des_downtime"=> $des_downtime,
                            "des_downtime_thai"=> $des_downtime_thai,
                            "item_no_2" => $item_no_2,
                            "operation_2" => $operation_2
                         );
                         
                         if($check == 1){
                            $check = 0;
                            continue;
                        }
                    else{
                        $sumResult[$i] = array(
                            "id_machine"=>$id_mc[$i],
                            "status_work"=> $data_activity['status_work'],
                            "item_no_2" => $item_no_2,
                            "operation_2" => $operation_2,
                            "date_due" =>$due_date,
                            "qty_per_pulse2"=> $data_planning[0]->qty_per_pulse2,
                            "qty_accum"=> $data_planning[0]->qty_complete + $data_activity_sum[0]->qty_process,
                            "qty_order"=> $data_planning[0]->qty_order,
                            "qty_percent" => round(($data_planning[0]->qty_complete + $data_activity_sum[0]->qty_process / $data_planning[0]->qty_order) * 100,0),
                            "id_task"=>$data_machine_queue[0]->id_task,
                            "datetime_update" => $data_planning[0]->datetime_update,

                         );
                         
                    }
                    if($request->input('dashboardID')==$id_mc[$i]){
                        return response() -> json($sumResult[$i]);
                        
                    }              
            }
            return response() -> json(array(
                "id_machine"=>$request->input('dashboardID'),
                "status_work"=> '',
                "item_no_2" =>  '',
                "operation_2" => '',
                "date_due" =>'',
                "qty_per_pulse2"=> '',
                "qty_accum"=> '',
                "qty_order"=> '',
                "qty_percent" => '',
                "id_task"=>'',
                "datetime_update" => '',  
            ));
        }
        
        catch(Exception $error){
            Log::error($error);
        }
    }

    //v4 runtime_actual = 0
    //use it
    // public function OperationRefreshV5(){
    //     try{

    //         // // $selectedOption = $request->input('selected_radio');
    //         // if (request()->selectedOption === 'radioChangeOp') {
    //         //     $planning = DB::table('planning')->get(); // ใช้ Query Builder ดึงข้อมูลตาราง planning
    //         //     // หรือ $planning = Planning::all(); ใช้ Eloquent ORM ดึงข้อมูลตาราง planning
        
    //         //     return response()->json($planning); // ส่งข้อมูลกลับไปยัง JavaScript ในรูปแบบ JSON
    //         // }
    //         $machineId = Machine::all();
    //         $machineId_queue_1 = MachineQueue::where('queue_number' ,'1')->get();
    //         $machineId_queue_2 = MachineQueue::where('queue_number' ,'2')->get();
    //         $id_mc = array();
    //         $id_mc_queue_1 =array();
    //         $id_mc_queue_2 =array();
    //         $sumResult = array();
    //         $count = $machineId->count();
    //         $count2 = $machineId_queue_2->count();
    //         for ($i=0;$i<$count;$i++){
    //             array_push($id_mc,$machineId[$i]->id_mc);
    //             }
    //         for ($i=0;$i< $machineId_queue_1->count();$i++){
    //             array_push($id_mc_queue_1,$machineId_queue_1[$i]->id_machine);
    //             }
    //         for ($i=0;$i<$count2;$i++){
    //             array_push($id_mc_queue_2,$machineId_queue_2[$i]->id_machine);
    //             }
    //         sort($id_mc);
    //         sort($id_mc_queue_1);
    //         sort($id_mc_queue_2);
            
    //         for($i = 0 ; $i<$machineId->count() ; $i++){
    //             $item_no_2 = '-';
    //             $operation_2 = '-';
    //             foreach($id_mc_queue_2 as $values){
    //                 if($values == $id_mc[$i]){
    //                     // print_r($id_mc_queue_2);
    //                     $data_machine_queue_2 = MachineQueue::where('id_machine',$id_mc[$i])->where('queue_number','2')->get();
    //                     // print_r($data_machine_queue_2);
    //                     $data_planning_queue_2 = DB::select('SELECT operation, item_no FROM planning where id_task=' . $data_machine_queue_2[0]->id_task);
    //                     // print_r($data_planning_queue_2);
    //                     $item_no_2 = $data_planning_queue_2[0]->item_no;
    //                     $operation_2 = $data_planning_queue_2[0]->operation;
    //                 }
    //             }
    //             $data_machine_queue = MachineQueue::where('id_machine',$id_mc[$i])->where('queue_number','1')->get();
    //             // print_r($data_machine_queue . "00000000000000000000000000000000000");
    //             if($data_machine_queue->isEmpty()){
    //                 // print_r($data_machine_queue . "00000000000000000000000000000000000");
    //                 // print_r("1");
    //                 // return response() -> json($data_machine_queue);
    //                 $sumResult[$i] = array(
    //                     "id_machine"=>$id_mc[$i],
    //                     "id_task"=>'',
    //                     "id_staff"=> '',
    //                     "status_work"=> '',
    //                     "qty_process"=> '',
    //                     //"qty_repeat"=> $data_activity_sum[0]->qty_repeat,
    //                     "task_complete"=> '',
    //                     "status_backup"=> '',
    //                     "qty_order"=> '',
    //                     "qty_complete"=> '',
    //                     "qty_open"=> '',
    //                     "qty_per_pulse2"=> '',
    //                     "divider"=> '',
    //                     "item_no" => '',
    //                     "operation" => '',
    //                     "op_color" => '',
    //                     "op_side" => '',
    //                     "op_des" => '',
    //                     "date_due" =>'',
    //                     "id_job"=>'', 
    //                     "work_order"=>'',   
    //                     "machine"=>'', 
    //                     "run_time_actual"=> '',
    //                     "run_time_std"=> '',
    //                     "datetime_update" => '',
    //                     "id_code_downtime"=> '',
    //                     "code_downtime"=> '',
    //                     "des_downtime"=> '',
    //                     "des_downtime_thai"=> '',
    //                     "item_no_2" => $item_no_2,
    //                     "operation_2" => $operation_2
    //                  );
                     
    //                 continue;
    //             }
    //             $data_activity_sum = DB::select('SELECT SUM(no_pulse1) AS qty_process FROM activity WHERE status_work<6 AND id_task='.$data_machine_queue[0]->id_task);
                
    //             if($data_activity_sum[0]->qty_process == null){
    //                 $data_activity_sum[0]->qty_process = 0;
    //                 //echo $data_activity_sum[0]->qty_process;
    //             }

    //             $data_planning = DB::select('SELECT task_complete, status_backup, qty_order, p.datetime_update, p.operation, p.run_time_actual,
    //             qty_comp AS qty_complete, qty_open, run_time_std, divider.divider as divider,
    //             p.op_color, p.op_side, p.op_des, p.item_no, p.operation, p.date_due, p.qty_per_pulse2, p.id_job, p.work_order, p.machine
    //             FROM planning as p, divider
    //             where p.op_color=divider.op_color
    //             AND p.op_side=divider.op_side
    //             and id_task=' . $data_machine_queue[0]->id_task);
    //             $due_date = date('d-m-Y', strtotime($data_planning[0]->date_due));
    //             $data_planning[0]->run_time_std = number_format((floatval($data_planning[0]->run_time_std)*3600)-2, 2);
    //             $number_count = 0;
    //             $id_code_downtime = '-';
    //             $code_downtime = '-';
    //             $des_downtime = '-';
    //             $des_downtime_thai = '-';
               
                
    //             $data_activity_backflush = Activity::where('id_task',$data_machine_queue[0]->id_task)->orderBy('time_start','desc')->first();
    //             $data_activity_downtime = ActivityDowntime::where('id_task',$data_machine_queue[0]->id_task)->orderBy('time_start','desc')->first();
    //             $data_activity_rework = ActivityRework::where('id_task',$data_machine_queue[0]->id_task)->orderBy('time_start','desc')->first();
                
    //             if($data_activity_backflush != null){
    //                 $date_backflush = strtotime($data_activity_backflush['time_start']);
    //                 $data_activity = $data_activity_backflush;

    //             }
    //             else{
    //                 $date_backflush = 0;
    //                 $number_count++;
    //             }

    //             if($data_activity_rework != null){
    //                 $date_rework = strtotime($data_activity_rework['time_start']);
    //                 if($date_backflush < $date_rework){
    //                     $data_activity = $data_activity_rework;
    //                 }
    //             }
    //             else{
    //                 $date_rework = 0;
    //                 $number_count++;
    //             }
                
    //             if($data_activity_downtime != null){
    //                 $date_downtime = strtotime($data_activity_downtime['time_start']);
    //                 if(($date_backflush < $date_downtime) && ($date_rework < $date_downtime)){
    //                     $data_activity = $data_activity_downtime;
                        
    //                     $data_activity['status_work']=$data_activity['status_downtime'];
    //                 if ($data_activity['run_time_actual'] == null) {
    //                     $data_activity['run_time_actual'] = 0;
    //                 }
                    
    //                 $data_code_downtime = CodeDowntime::where('id_code_downtime',$data_activity['id_code_downtime'])->get();
                    
    //                 $id_code_downtime = $data_code_downtime[0]->id_code_downtime;
    //                 $code_downtime = $data_code_downtime[0]->code_downtime;
    //                 $des_downtime = $data_code_downtime[0]->des_downtime;
    //                 $des_downtime_thai = $data_code_downtime[0]->des_downtime_thai;
    //                 }
    //             }
    //             else{
    //                 $number_count++;
    //             }
    //             // $data_planning_queue_2 = DB::select('SELECT operation, item_no FROM planning where id_task=' . $data_machine_queue_2[0]->id_task);
    //             // $data_planning = DB::table('planning')
    //             // ->where('id_job', $id_job)
    //             // ->where('status_backup', 0)
    //             // ->where('task_complete', 0)
    //             // ->whereIn('id_task', function($query) use ($id_mc) {
    //             //     $query->select('id_task')
    //             //             ->from('machine_queue')
    //             //             ->where('id_machine', $id_mc);
    //             // })
    //             // ->orderBy('date_due', 'asc')
    //             // ->get();
    //             // $data_planning_ex =  DB::select('SELECT * FROM planning where id_job=' . $data_machine_queue_2[0]->id_task);
    //                         // $selectedOption = $request->input('selected_radio');
                           
    //                         $selectedOption = $request->input('selectedOption');
    //                     if ($selectedOption === "radioChangeOp"){
    //                     $sumResult[$i] = array(
    //                         "id_machine"=>$id_mc[$i],
    //                         "id_task"=>$data_machine_queue[0]->id_task,
    //                         "id_staff"=> $data_activity['id_staff'],
    //                         "status_work"=> $data_activity['status_work'],
    //                         "qty_process"=> $data_activity_sum[0]->qty_process,
    //                         "task_complete"=> $data_planning[0]->task_complete,
    //                         "status_backup"=> $data_planning[0]->status_backup,
    //                         "qty_order"=> $data_planning[0]->qty_order,
    //                         "qty_complete"=> $data_planning[0]->qty_complete,
    //                         "qty_open"=> $data_planning[0]->qty_open,
    //                         "qty_per_pulse2"=> $data_planning[0]->qty_per_pulse2,
    //                         "divider"=> $data_planning[0]->divider,
    //                         "item_no" => $data_planning[0]->item_no,
    //                         "operation" => $data_planning[0]->operation,
    //                         "op_color" => $data_planning[0]->op_color,
    //                         "op_side" => $data_planning[0]->op_side,
    //                         "op_des" => $data_planning[0]->op_des,
    //                         "date_due" => $due_date,
    //                         "id_job"=>$data_planning[0]->id_job,   
    //                         "work_order"=>$data_planning[0]->work_order, 
    //                         "machine"=>$data_planning[0]->machine, 
    //                         //"date_due" =>'0',
    //                         "run_time_actual"=> '0',
    //                         "run_time_std"=> '0',
    //                         "datetime_update" => '0',
    //                         "id_code_downtime"=> $id_code_downtime,
    //                         "code_downtime"=> $code_downtime,
    //                         "des_downtime"=> $des_downtime,
    //                         "des_downtime_thai"=> $des_downtime_thai,
    //                         "item_no_2" => $item_no_2,
    //                         "operation_2" => $operation_2
    //                      );
                         
    //                 }
    //                 else{
    //                     $sumResult[$i] = array(
    //                         "id_machine"=>$id_mc[$i],
    //                         "id_task"=>$data_machine_queue[0]->id_task,
    //                         "id_staff"=> $data_activity['id_staff'],
    //                         "status_work"=> $data_activity['status_work'],
    //                         "qty_process"=> $data_activity_sum[0]->qty_process,
    //                         //"qty_repeat"=> $data_activity_sum[0]->qty_repeat,
    //                         "task_complete"=> $data_planning[0]->task_complete,
    //                         "status_backup"=> $data_planning[0]->status_backup,
    //                         "qty_order"=> $data_planning[0]->qty_order,
    //                         "qty_complete"=> $data_planning[0]->qty_complete,
    //                         "qty_open"=> $data_planning[0]->qty_open,
    //                         "qty_per_pulse2"=> $data_planning[0]->qty_per_pulse2,
    //                         "divider"=> $data_planning[0]->divider,
    //                         "item_no" => $data_planning[0]->item_no,
    //                         "operation" => $data_planning[0]->operation,
    //                         "op_color" => $data_planning[0]->op_color,
    //                         "op_side" => $data_planning[0]->op_side,
    //                         "op_des" => $data_planning[0]->op_des,
    //                         "date_due" => $due_date,
    //                         "id_job"=>$data_planning[0]->id_job,  
    //                         "work_order"=>$data_planning[0]->work_order, 
    //                         "machine"=>$data_planning[0]->machine, 
    //                         "run_time_actual"=> $data_activity['run_time_actual'],
    //                         "run_time_std"=> $data_planning[0]->run_time_std,
    //                         "datetime_update" => $data_planning[0]->datetime_update,
    //                         "id_code_downtime"=> $id_code_downtime,
    //                         "code_downtime"=> $code_downtime,
    //                         "des_downtime"=> $des_downtime,
    //                         "des_downtime_thai"=> $des_downtime_thai,
    //                         "item_no_2" => $item_no_2,
    //                         "operation_2" => $operation_2
    //                      );
                         
    //                 }
    //                 // if($i==7){
                        
    //                 //     return response() -> json($sumResult[$i]);
    //                 // }

    //         }
    //         return response() -> json($sumResult);
    //      }
    //      catch(Exception $error){
    //         Log::error($error);
    //      }
    // }



    public function updateModalDashboard(Request $request) {
        try {
            $dashboardIdModal = $request->get('dashboardId'); //id_task
            $dashboardIdactivityModal = $request->get('dashboardIdactivity'); //id_activity
            $currentDashboardQtypertray = $request->get('dashboardQtypertray'); //update qty_per_pulse2
            $currentDashboardQtyactivity = intval($request->get('dashboardQtyactivity'));

            $currentDashboardQtyactivityTemp = $request->get('activityTemp');

            $currentDashboardQtyaccumsum = $request->get('dashboardQtyaccumsum');
            $currentDashboardQtyaccumTemp = $request->get('dashboardQtyaccumTemp');
            $typeActivity = $request->get('Id_ActivityType');
            $diff = $currentDashboardQtyactivity - $currentDashboardQtyactivityTemp;
            $abs_diff = abs($diff);
            // dd($abs_diff);

            if ($currentDashboardQtyactivity == 0) {
                if($typeActivity === 'bf') {
                Activity::where('id_activity', $dashboardIdactivityModal)->update([
                    'no_pulse2' => 0,
                    'no_pulse3' => 0,
                ]);
            }else if($typeActivity === 'rw') {
                    ActivityRework::where('id_activity', $dashboardIdactivityModal)->update([
                        'no_pulse2' => 0,
                        'no_pulse3' => 0,
                    ]);
                }
            } else {
                if($typeActivity === 'bf') {
                    $activity_temp = Activity::where('id_activity',$dashboardIdactivityModal)->first();
                    // dd($activity_temp);

                    $no2 = 0;
                    $no3 = 0;
                    if($abs_diff >= $activity_temp->no_pulse2 and $currentDashboardQtyactivity < $currentDashboardQtyactivityTemp){
                        $temp_value = $abs_diff - $activity_temp->no_pulse2;
                        $no3 = $activity_temp->no_pulse3 - $temp_value;
                        $no3 = $no3<0? 0 : $no3; 
                        Activity::where('id_activity', $dashboardIdactivityModal)->update([
                            'no_pulse2' => $no2,
                            'no_pulse3' => $no3,
                        ]);

                    }
                    else{
                        $no2 = 0;
                        $no3 = 0;
                        $no2 = $activity_temp->no_pulse2+$diff > 0 ? $activity_temp->no_pulse2+$diff: 0;
                        $no3 = $activity_temp->no_pulse2+$diff <= 0 ? $activity_temp->no_pulse3+($activity_temp->no_pulse2+$diff) : $activity_temp->no_pulse3;
                        Activity::where('id_activity', $dashboardIdactivityModal)->update([
                            'no_pulse2' => $no2,
                            'no_pulse3' => $no3,
                        ]);
                    }

                    
                } else if($typeActivity === 'rw') {
                    $activity_temp = ActivityRework::where('id_activity',$dashboardIdactivityModal)->first();
                    // dd($activity_temp);
                    $no2 = 0;
                    $no3 = 0;
                    if($abs_diff >= $activity_temp->no_pulse2 and $currentDashboardQtyactivity < $currentDashboardQtyactivityTemp){
                        $temp_value = $abs_diff - $activity_temp->no_pulse2;
                        $no3 = $activity_temp->no_pulse3 - $temp_value;
                        $no3 = $no3<0? 0 : $no3; 
                        ActivityRework::where('id_activity', $dashboardIdactivityModal)->update([
                            'no_pulse2' => $no2,
                            'no_pulse3' => $no3,
                        ]);

                    }
                    else{
                        $no2 = 0;
                        $no3 = 0;
                        $no2 = $activity_temp->no_pulse2+$diff > 0 ? $activity_temp->no_pulse2+$diff: 0;
                        $no3 = $activity_temp->no_pulse2+$diff <= 0 ? $activity_temp->no_pulse3+($activity_temp->no_pulse2+$diff) : $activity_temp->no_pulse3;
                        ActivityRework::where('id_activity', $dashboardIdactivityModal)->update([
                            'no_pulse2' => $no2,
                            'no_pulse3' => $no3,
                        ]);
                    }
                }
            }

            //update qty_per_pulse2
            Planning::where('id_task',$dashboardIdModal)->update([
                'qty_per_pulse2' => $currentDashboardQtypertray,
            ]);

            return response()->json([
                'qty_per_pulse2' => $currentDashboardQtypertray, //update qty_per_pulse2
            ]);
        } catch(Exception $e) {
            Log::error($e);
            return response()->json($e);
        }
    }
}


