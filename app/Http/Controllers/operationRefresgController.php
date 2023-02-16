<?php
namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\MachineQueue;
use App\Models\Activity;
use App\Models\ActivityRework;
use App\Models\ActivityDowntime;
use App\Models\Machine;
use App\Models\CodeDowntime;
use Illuminate\Support\Facades\Log;
use Exception;
class OperationRefreshController extends Controller
{

    //v4 runtime_actual = 0
    //use it
    public function operationRefreshV5(){
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
                        "qty_per_pulse2"=> '',
                        "divider"=> '',
                        "item_no" => '',
                        "operation" => '',
                        "op_color" => '',
                        "op_side" => '',
                        "op_des" => '',
                        "date_due" =>'',
                        "id_job"=>'', 
                        "work_order"=>'',   
                        "machine"=>'', 
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
                p.op_color, p.op_side, p.op_des, p.item_no, p.operation, p.date_due, p.qty_per_pulse2, p.id_job, p.work_order, p.machine
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
                        "id_job"=>'',   
                        "work_order"=>'', 
                        "machine"=>'', 
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
                

                    if($data_activity['status_work'] == 0 || $data_activity['status_work']==3 || $data_activity['status_work']==4 || $data_activity['status_work']==5 || $data_activity['status_work']==6){
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
                            "qty_per_pulse2"=> $data_planning[0]->qty_per_pulse2,
                            "divider"=> $data_planning[0]->divider,
                            "item_no" => $data_planning[0]->item_no,
                            "operation" => $data_planning[0]->operation,
                            "op_color" => $data_planning[0]->op_color,
                            "op_side" => $data_planning[0]->op_side,
                            "op_des" => $data_planning[0]->op_des,
                            "date_due" =>$data_planning[0]->date_due,
                            "id_job"=>$data_planning[0]->id_job,   
                            "work_order"=>$data_planning[0]->work_order, 
                            "machine"=>$data_planning[0]->machine, 
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
                         
                    }
                    else{
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
                            "qty_per_pulse2"=> $data_planning[0]->qty_per_pulse2,
                            "divider"=> $data_planning[0]->divider,
                            "item_no" => $data_planning[0]->item_no,
                            "operation" => $data_planning[0]->operation,
                            "op_color" => $data_planning[0]->op_color,
                            "op_side" => $data_planning[0]->op_side,
                            "op_des" => $data_planning[0]->op_des,
                            "date_due" =>$data_planning[0]->date_due,
                            "id_job"=>$data_planning[0]->id_job,  
                            "work_order"=>$data_planning[0]->work_order, 
                            "machine"=>$data_planning[0]->machine, 
                            "run_time_actual"=> $data_activity['run_time_actual'],
                            "run_time_std"=> $data_planning[0]->run_time_std,
                            "datetime_update" => $data_planning[0]->datetime_update,
                            "id_code_downtime"=> $id_code_downtime,
                            "code_downtime"=> $code_downtime,
                            "des_downtime"=> $des_downtime,
                            "des_downtime_thai"=> $des_downtime_thai,
                            "item_no_2" => $item_no_2,
                            "operation_2" => $operation_2
                         );
                         
                    }
                    // if($i==7){
                        
                    //     return response() -> json($sumResult[$i]);
                    // }
                    
                
            }
            return response() -> json($sumResult);
        }
        catch(Exception $error){
            Log::error($error);
        }
    }
}

