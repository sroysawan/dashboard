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
use Illuminate\Support\Facades\Log;
use Exception;
class dashboardRefreshController extends Controller
{
    //
    public function dashboardRefresh(){
        try
        {
            $machineId = Machine::all();
            $id_mc = array();
            for ($i=0;$i<6;$i++){
                array_push($id_mc,$machineId[$i]->id_mc);
            }
            foreach($id_mc as $value){
            $idMach = $value;
            $data_machine_queue  = MachineQueue::where('queue_number' ,'1') ->where('id_machine' ,$idMach)->get();
            $idTask = $data_machine_queue[0]->id_task;
            $idTask = (string)$idTask;
            // echo $idMach.'--';
            // echo $idTask.'--';
            // ACCUMULATE THE PROCESSED QTY WHICH HAS NOT BEEN RE-IMPORTED
            $data_activity_sum = DB::select('SELECT SUM(no_pulse1) AS qty_process, SUM(num_repeat) AS qty_repeat FROM activity WHERE status_work<6 AND id_task='.$idTask);
                // echo $data_activity_sum[0]->qty_process;
            if($data_activity_sum[0]->qty_process == null){
                $data_activity_sum[0]->qty_process = 0;
                //echo $data_activity_sum[0]->qty_process;
            }
            if($data_activity_sum[0]->qty_repeat == null){
                $data_activity_sum[0]->qty_repeat = 0;
                //echo $data_activity_sum[0]->qty_repeat;
            }
                // echo $data_activity_sum[0]->qty_process;
        // SELECT THE ACTIVE BACKFLUSH ACTIVITY
            $data_activity_time = Activity::where('id_task',$idTask)
                                        ->where('id_machine',$idMach)
                                        ->where('status_work','<','3')
                                        ->first();
            // $data_activity_time = json_encode($data_activity_time);
        // SELECT THE ACTIVE REWORK ACTIVITY
            $data_rework_time = ActivityRework::where('id_task',$idTask)
                                            ->where('id_machine',$idMach)
                                            ->where('status_work','<','3')
                                            ->first();
            // $data_rework_time = json_encode($data_rework_time);
        // SELECT THE DOWNTIME ACTIVITY OF SUCH TASK
            $data_activity_downtime = DB::select("SELECT ad.id_staff, ad.status_downtime, cd.code_downtime
            FROM activity_downtime as ad, code_downtime as cd where ad.id_code_downtime=cd.id_code_downtime
            and status_downtime < 3
            and id_task='".(string)$idTask."'
            and id_machine='".(string)$idMach."'");
            // $data_activity_downtime = json_encode($data_activity_downtime);
            // echo $data_activity_time;
            // echo $data_rework_time;
            // print_r ($data_activity_time);
            // print_r ($data_rework_time);
            // print_r ($data_activity_downtime);
            $active_work = 0;
            if(($data_activity_time) != null){
                $active_work++;
            }
            if(($data_activity_downtime) != null){
                $active_work++;
            }
            if(($data_rework_time) != null){
                $active_work++;
            }
            $rework='n';
            // echo $active_work;
            if ($active_work>1){
                $sumResult[$value] = json_encode([
                    "code" => "020",
                    "message" => "The activity exists in both activity and activity_downtime tables"
                ]);
            }
            else {
                $data_activity_time = new Activity();
                if($data_activity_downtime[0]->status_downtime != null){
                    $data_activity_time->status_work = 4;
                    $data_activity_time->id_staff = $data_activity_downtime[0]->id_staff;
                    $data_activity_time->code_downtime = $data_activity_downtime[0]->code_downtime;
                }
                elseif($data_rework_time[0]->status_work != null){
                    $data_activity_time = $data_rework_time;
                    $rework='y';
                }
                if($data_activity_time->status_work == null){
                    $data_activity_time->status_work = 0 ;
                }
                if ($data_activity_time->run_time_actual == null) {
                    $data_activity_time->run_time_actual = 0;
                }
                $data_planning = DB::select('SELECT task_complete, status_backup, qty_order,
                qty_comp AS qty_complete, qty_open, run_time_std, divider.divider  as divider,
                p.op_color, p.op_side, p.op_des, p.item_no
                FROM planning as p, divider
                where planning.op_color=divider.op_color
                AND planning.op_side=divider.op_side
                and id_task=' . $idTask);
                $data_planning[0]->run_time_std = number_format((floatval($data_planning[0]->run_time_std)*3600)-2, 2);
                // print_r($data_planning);
                $sumResult[$value] = json_encode([
                        "qty_process"=> $data_activity_sum[0]->qty_process,
                        "qty_repeat"=> $data_activity_sum[0]->qty_repeat,
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
                        "status_work"=> $data_activity_time->status_work,
                        "id_staff"=> $data_activity_time->id_staff,
                        "code_downtime"=> $data_activity_time->code_downtime,
                        "run_time_actual"=> $data_activity_time->run_time_actual,
                        "rework"=> $rework
                ]);
            }
        }
            echo $sumResult;
        }
        catch(Exception $error){
            Log::error($error);
        }
    }
    public function dashboardRefreshV2(){
    try{
        // $machineId = Machine::all();
        // $id_mc = array();
        // for ($i=0;$i<6;$i++){
        //     array_push($id_mc,$machineId[$i]->id_mc);
        //     }
        // $data_machine_queue  = MachineQueue::where('queue_number' ,'1') ->where('id_machine' ,$idMach)->get();
        // $idTask = $data_machine_queue[0]->id_task;
        // $idTask = (string)$idTask;
        // print_r($idTask);
        $data_activity = DB::select('SELECT * FROM (select max(id_activity) as id_activity_max FROM activity GROUP by id_machine) as max_activity , activity as a where a.id_activity = max_activity.id_activity_max');
        $count = count((array)$data_activity);
        for($i = 0 ; $i<$count ; $i++){
            $data_activity_sum = DB::select('SELECT SUM(no_pulse1) AS qty_process, SUM(num_repeat) AS qty_repeat FROM activity WHERE status_work<6 AND id_task='.$data_activity[$i]->id_task);
            $data_planning = DB::select('SELECT task_complete, status_backup, qty_order,
            qty_comp AS qty_complete, qty_open, run_time_std, divider.divider as divider,
            p.op_color, p.op_side, p.op_des, p.item_no, p.operation, p.date_due, p.datetime_update
            FROM planning as p, divider
            where p.op_color=divider.op_color
            AND p.op_side=divider.op_side
            and id_task=' . $data_activity[$i]->id_task);
            $data_planning[0]->run_time_std = number_format((floatval($data_planning[0]->run_time_std)*3600)-2, 2);
            $rework = 'y';
            $sumResult[$i] = array(
                "id_machine"=>$data_activity[$i]->id_machine,
                "qty_process"=> $data_activity_sum[0]->qty_process,
                "qty_repeat"=> $data_activity_sum[0]->qty_repeat,
                "task_complete"=> $data_planning[0]->task_complete,
                "status_backup"=> $data_planning[0]->status_backup,
                "qty_order"=> $data_planning[0]->qty_order,
                "qty_complete"=> $data_planning[0]->qty_complete,
                "qty_open"=> $data_planning[0]->qty_open,
                "date_due"=> $data_planning[0]->date_due,
                "run_time_std"=> $data_planning[0]->run_time_std,
                "divider"=> $data_planning[0]->divider,
                "op_color" => $data_planning[0]->op_color,
                "op_side" => $data_planning[0]->op_side,
                "op_des" => $data_planning[0]->op_des,
                "item_no" => $data_planning[0]->item_no,
                "operation" => $data_planning[0]->operation,
                "datetime_update" => $data_planning[0]->datetime_update,
                "status_work"=> $data_activity[$i]->status_work,
                "id_staff"=> $data_activity[$i]->id_staff,
                "run_time_actual"=> $data_activity[$i]->run_time_actual,
                "rework"=> $rework
        );
        }
        return response() -> json($sumResult);
    }
    catch(Exception $error){
        Log::error($error);
    }
    }

    public function dashboardRefreshV3(){
        try{
            $machineId = MachineQueue::where('queue_number' ,'1')->get();
            $machineId_queue_2 = MachineQueue::where('queue_number' ,'2')->get();
            $id_mc = array();
            $id_mc_queue_2 =array();
            $sumResult = array();
            $count = $machineId->count();
            $count2 = $machineId_queue_2->count();
            for ($i=0;$i<$count;$i++){
                array_push($id_mc,$machineId[$i]->id_machine);
                }
            for ($i=0;$i<$count2;$i++){
                array_push($id_mc_queue_2,$machineId[$i]->id_machine);
                }
            // $data_activity = DB::select('SELECT * FROM (select max(id_activity) as id_activity_max FROM activity GROUP by id_machine) as max_activity , activity as a where a.id_activity = max_activity.id_activity_max');
            // print_r($count);
            for($i = 0 ; $i<$count ; $i++){
                $data_machine_queue = MachineQueue::where('id_machine',$id_mc[$i])->where('queue_number','1')->get();
                $data_activity_sum = DB::select('SELECT SUM(no_pulse1) AS qty_process, SUM(num_repeat) AS qty_repeat FROM activity WHERE status_work<6 AND id_task='.$data_machine_queue[0]->id_task);
                if($data_activity_sum[0]->qty_process == null){
                    $data_activity_sum[0]->qty_process = 0;
                    //echo $data_activity_sum[0]->qty_process;
                }
                if($data_activity_sum[0]->qty_repeat == null){
                    $data_activity_sum[0]->qty_repeat = 0;
                    //echo $data_activity_sum[0]->qty_repeat;
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
                $item_no_2 = '-';
                $operation_2 = '-';
                if($data_machine_queue[0]->id_activity != 0){
                    $number_count++;
                    $data_activity = Activity::where('id_activity',$data_machine_queue[0]->id_activity)->get();
                }
                if($data_machine_queue[0]->id_activity_downtime != 0){
                    $number_count++;
                    $data_activity = ActivityDowntime::where('id_activity_downtime',$data_machine_queue[0]->id_activity_downtime)->get();
                    $data_activity[0]->status_work=$data_activity[0]->status_downtime;
                    if ($data_activity[0]->run_time_actual == null) {
                        $data_activity[0]->run_time_actual = 0;
                    }
                    $data_code_downtime = CodeDowntime::where('id_code_downtime',$data_activity[0]->id_code_downtime)->get();
                    // return response() -> json($data_activity);
                    $id_code_downtime = $data_code_downtime[0]->id_code_downtime;
                    $code_downtime = $data_code_downtime[0]->code_downtime;
                    $des_downtime = $data_code_downtime[0]->des_downtime;
                    $des_downtime_thai = $data_code_downtime[0]->des_downtime_thai;
                    $data_activity[0]->status_work = $data_activity[0]->status_downtime;
                }
                if($data_machine_queue[0]->id_activity_rework != 0){
                    $number_count++;
                    $data_activity = ActivityRework::where('id_activity',$data_machine_queue[0]->id_activity_rework)->get();
                }
                ////////////////////////////////////////////
                foreach($id_mc_queue_2 as $values){
                    if($values == $id_mc[$i]){
                        $data_machine_queue_2 = MachineQueue::where('id_machine',$id_mc[$i])->where('queue_number','2')->get();
                        $data_planning_queue_2 = DB::select('SELECT operation, item_no FROM planning where id_task=' . $data_machine_queue_2[0]->id_task);
                        $item_no_2 = $data_planning_queue_2[0]->item_no;
                        $operation_2 = $data_planning_queue_2[0]->operation;
                    }
                }
                ////////////////////////////////////////////
                if ($number_count>=2 || $number_count<=0){
                    $sumResult[$i] = array(
                        "id_machine" => $id_mc[$i],
                        "code" => "020",
                        "message" => "The activity exists in both activity and activity_downtime tables or not found in both"
                    );
                    continue;
                }
                else{
                    // return response() -> json($data_planning[0]->operation);
                    $sumResult[$i] = array(
                        "id_machine"=>$id_mc[$i],
                        "id_task"=>$data_machine_queue[0]->id_task,
                        "id_staff"=> $data_activity[0]->id_staff,
                        "status_work"=> $data_activity[0]->status_work,
                        "qty_process"=> $data_activity_sum[0]->qty_process,
                        "qty_repeat"=> $data_activity_sum[0]->qty_repeat,
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
                        "run_time_actual"=> $data_activity[0]->run_time_actual,
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
            }
            return response() -> json($sumResult);
        }
        catch(Exception $error){
            Log::error($error);
        }
    }

    //v4 N/A
    public function dashboardRefreshV4(){
        try{
            $machineId = MachineQueue::where('queue_number' ,'1')->get();
            $machineId_queue_2 = MachineQueue::where('queue_number' ,'2')->get();
            $id_mc = array();
            $id_mc_queue_2 =array();
            $sumResult = array();
            $count = $machineId->count();
            $count2 = $machineId_queue_2->count();
            for ($i=0;$i<$count;$i++){
                array_push($id_mc,$machineId[$i]->id_machine);
                }
            for ($i=0;$i<$count2;$i++){
                array_push($id_mc_queue_2,$machineId[$i]->id_machine);
                }
            // $data_activity = DB::select('SELECT * FROM (select max(id_activity) as id_activity_max FROM activity GROUP by id_machine) as max_activity , activity as a where a.id_activity = max_activity.id_activity_max');
            // print_r($count);
            for($i = 0 ; $i<$count ; $i++){
                $data_machine_queue = MachineQueue::where('id_machine',$id_mc[$i])->where('queue_number','1')->get();
                $data_activity_sum = DB::select('SELECT SUM(no_pulse1) AS qty_process, SUM(num_repeat) AS qty_repeat FROM activity WHERE status_work<6 AND id_task='.$data_machine_queue[0]->id_task);
                if($data_activity_sum[0]->qty_process == null){
                    $data_activity_sum[0]->qty_process = 0;
                    //echo $data_activity_sum[0]->qty_process;
                }
                if($data_activity_sum[0]->qty_repeat == null){
                    $data_activity_sum[0]->qty_repeat = 0;
                    //echo $data_activity_sum[0]->qty_repeat;
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
                $item_no_2 = '-';
                $operation_2 = '-';
                if($data_machine_queue[0]->id_activity != 0){
                    $number_count++;
                    $data_activity = Activity::where('id_activity',$data_machine_queue[0]->id_activity)->get();
                }
                if($data_machine_queue[0]->id_activity_downtime != 0){
                    $number_count++;
                    $data_activity = ActivityDowntime::where('id_activity_downtime',$data_machine_queue[0]->id_activity_downtime)->get();
                    $data_activity[0]->status_work=$data_activity[0]->status_downtime;
                    if ($data_activity[0]->run_time_actual == null) {
                        $data_activity[0]->run_time_actual = 0;
                    }
                    $data_code_downtime = CodeDowntime::where('id_code_downtime',$data_activity[0]->id_code_downtime)->get();
                    // return response() -> json($data_activity);
                    $id_code_downtime = $data_code_downtime[0]->id_code_downtime;
                    $code_downtime = $data_code_downtime[0]->code_downtime;
                    $des_downtime = $data_code_downtime[0]->des_downtime;
                    $des_downtime_thai = $data_code_downtime[0]->des_downtime_thai;
                    $data_activity[0]->status_work = $data_activity[0]->status_downtime;
                }
                if($data_machine_queue[0]->id_activity_rework != 0){
                    $number_count++;
                    $data_activity = ActivityRework::where('id_activity',$data_machine_queue[0]->id_activity_rework)->get();
                }
                ////////////////////////////////////////////
                foreach($id_mc_queue_2 as $values){
                    if($values == $id_mc[$i]){
                        $data_machine_queue_2 = MachineQueue::where('id_machine',$id_mc[$i])->where('queue_number','2')->get();
                        $data_planning_queue_2 = DB::select('SELECT operation, item_no FROM planning where id_task=' . $data_machine_queue_2[0]->id_task);
                        $item_no_2 = $data_planning_queue_2[0]->item_no;
                        $operation_2 = $data_planning_queue_2[0]->operation;
                    }
                }
                ////////////////////////////////////////////
                if ($number_count>=2 || $number_count<=0){
                    $sumResult[$i] = array(
                        "id_machine" => $id_mc[$i],
                        "code" => "020",
                        "message" => "The activity exists in both activity and activity_downtime tables or not found in both"
                    );
                    continue;
                }
                else{
                    // return response() -> json($data_planning[0]->operation);
                    if($data_activity[0]->status_work == 0 || $data_activity[0]->status_work==3 || $data_activity[0]->status_work==5 || $data_activity[0]->status_work==6){
                        $sumResult[$i] = array(
                            "id_machine"=>$id_mc[$i],
                            "id_task"=>$data_machine_queue[0]->id_task,
                            "id_staff"=> $data_activity[0]->id_staff,
                            "status_work"=> $data_activity[0]->status_work,
                            "qty_process"=> $data_activity_sum[0]->qty_process,
                            "qty_repeat"=> $data_activity_sum[0]->qty_repeat,
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
                            //"date_due" =>'N/A',
                            "run_time_actual"=> 'N/A',
                            "run_time_std"=> 'N/A',
                            "datetime_update" => 'N/A',
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
                            "id_staff"=> $data_activity[0]->id_staff,
                            "status_work"=> $data_activity[0]->status_work,
                            "qty_process"=> $data_activity_sum[0]->qty_process,
                            "qty_repeat"=> $data_activity_sum[0]->qty_repeat,
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
                            "run_time_actual"=> $data_activity[0]->run_time_actual,
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
                    
                }
            }
            return response() -> json($sumResult);
        }
        catch(Exception $error){
            Log::error($error);
        }
    }

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
                        "id_code_downtime"=> $id_code_downtime,
                        "code_downtime"=> $code_downtime,
                        "des_downtime"=> $des_downtime,
                        "des_downtime_thai"=> $des_downtime_thai,
                        "item_no_2" => $item_no_2,
                        "operation_2" => $operation_2
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
                            "operation_2" => $operation_2
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
    
    // // old database 
    // //v4 runtime_actual = 0
    // //use it
    public function dashboardRefreshV5old(){
        try{
            $machineId = MachineQueue::where('queue_number' ,'1')->get();
            $machineId_queue_2 = MachineQueue::where('queue_number' ,'2')->get();
            $id_mc = array();
            $id_mc_queue_2 =array();
            $sumResult = array();
            $count = $machineId->count();
            $count2 = $machineId_queue_2->count();
            for ($i=0;$i<$count;$i++){
                array_push($id_mc,$machineId[$i]->id_machine);
                }
            for ($i=0;$i<$count2;$i++){
                array_push($id_mc_queue_2,$machineId[$i]->id_machine);
                }
            // $data_activity = DB::select('SELECT * FROM (select max(id_activity) as id_activity_max FROM activity GROUP by id_machine) as max_activity , activity as a where a.id_activity = max_activity.id_activity_max');
            // print_r($count);
            for($i = 0 ; $i<$count ; $i++){
                $data_machine_queue = MachineQueue::where('id_machine',$id_mc[$i])->where('queue_number','1')->get();
                $data_activity_sum = DB::select('SELECT SUM(no_pulse1) AS qty_process, SUM(num_repeat) AS qty_repeat FROM activity WHERE status_work<6 AND id_task='.$data_machine_queue[0]->id_task);
                if($data_activity_sum[0]->qty_process == null){
                    $data_activity_sum[0]->qty_process = 0;
                    //echo $data_activity_sum[0]->qty_process;
                }
                if($data_activity_sum[0]->qty_repeat == null){
                    $data_activity_sum[0]->qty_repeat = 0;
                    //echo $data_activity_sum[0]->qty_repeat;
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
                $item_no_2 = '-';
                $operation_2 = '-';
                if($data_machine_queue[0]->id_activity != 0){
                    $number_count++;
                    $data_activity = Activity::where('id_activity',$data_machine_queue[0]->id_activity)->get();
                }
                if($data_machine_queue[0]->id_activity_downtime != 0){
                    $number_count++;
                    $data_activity = ActivityDowntime::where('id_activity_downtime',$data_machine_queue[0]->id_activity_downtime)->get();
                    $data_activity[0]->status_work=$data_activity[0]->status_downtime;
                    if ($data_activity[0]->run_time_actual == null) {
                        $data_activity[0]->run_time_actual = 0;
                    }
                    $data_code_downtime = CodeDowntime::where('id_code_downtime',$data_activity[0]->id_code_downtime)->get();
                    // return response() -> json($data_activity);
                    $id_code_downtime = $data_code_downtime[0]->id_code_downtime;
                    $code_downtime = $data_code_downtime[0]->code_downtime;
                    $des_downtime = $data_code_downtime[0]->des_downtime;
                    $des_downtime_thai = $data_code_downtime[0]->des_downtime_thai;
                    $data_activity[0]->status_work = $data_activity[0]->status_downtime;
                }
                if($data_machine_queue[0]->id_activity_rework != 0){
                    $number_count++;
                    $data_activity = ActivityRework::where('id_activity',$data_machine_queue[0]->id_activity_rework)->get();
                }
                ////////////////////////////////////////////
                foreach($id_mc_queue_2 as $values){
                    if($values == $id_mc[$i]){
                        $data_machine_queue_2 = MachineQueue::where('id_machine',$id_mc[$i])->where('queue_number','2')->get();
                        $data_planning_queue_2 = DB::select('SELECT operation, item_no FROM planning where id_task=' . $data_machine_queue_2[0]->id_task);
                        $item_no_2 = $data_planning_queue_2[0]->item_no;
                        $operation_2 = $data_planning_queue_2[0]->operation;
                    }
                }
                ////////////////////////////////////////////
                if ($number_count>=2 || $number_count<=0){
                    $sumResult[$i] = array(
                        "id_machine" => $id_mc[$i],
                        "code" => "020",
                        "message" => "The activity exists in both activity and activity_downtime tables or not found in both"
                    );
                    continue;
                }
                else{
                    // return response() -> json($data_planning[0]->operation);
                    if($data_activity[0]->status_work == 0 || $data_activity[0]->status_work==3 || $data_activity[0]->status_work==4 || $data_activity[0]->status_work==5 || $data_activity[0]->status_work==6){
                        $sumResult[$i] = array(
                            "id_machine"=>$id_mc[$i],
                            "id_task"=>$data_machine_queue[0]->id_task,
                            "id_staff"=> $data_activity[0]->id_staff,
                            "status_work"=> $data_activity[0]->status_work,
                            "qty_process"=> $data_activity_sum[0]->qty_process,
                            "qty_repeat"=> $data_activity_sum[0]->qty_repeat,
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
                    }
                    else{
                        $sumResult[$i] = array(
                            "id_machine"=>$id_mc[$i],
                            "id_task"=>$data_machine_queue[0]->id_task,
                            "id_staff"=> $data_activity[0]->id_staff,
                            "status_work"=> $data_activity[0]->status_work,
                            "qty_process"=> $data_activity_sum[0]->qty_process,
                            "qty_repeat"=> $data_activity_sum[0]->qty_repeat,
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
                            "run_time_actual"=> $data_activity[0]->run_time_actual,
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
                    
                }
            }
            return response() -> json($sumResult);
        }
        catch(Exception $error){
            Log::error($error);
        }
    }

    //Get Indivvidual Dashboard data Modal old
    public function getDashboardDetails(Request $request)
    {
        try{
            $machineId = MachineQueue::where('queue_number' ,'1')->get();
            $machineId_queue_2 = MachineQueue::where('queue_number' ,'2')->get();
            $id_mc = array();
            $id_mc_queue_2 =array();
            $sumResult = array();
            $count = $machineId->count();
            $count2 = $machineId_queue_2->count();
            for ($i=0;$i<$count;$i++){
                array_push($id_mc,$machineId[$i]->id_machine);
                }
            for ($i=0;$i<$count2;$i++){
                array_push($id_mc_queue_2,$machineId[$i]->id_machine);
                }
            // $data_activity = DB::select('SELECT * FROM (select max(id_activity) as id_activity_max FROM activity GROUP by id_machine) as max_activity , activity as a where a.id_activity = max_activity.id_activity_max');
            // print_r($count);
            for($i = 0 ; $i<$count ; $i++){
                $data_machine_queue = MachineQueue::where('id_machine',$id_mc[$i])->where('queue_number','1')->get();
                $data_activity_sum = DB::select('SELECT SUM(no_pulse1) AS qty_process, SUM(num_repeat) AS qty_repeat FROM activity WHERE status_work<6 AND id_task='.$data_machine_queue[0]->id_task);
                if($data_activity_sum[0]->qty_process == null){
                    $data_activity_sum[0]->qty_process = 0;
                    //echo $data_activity_sum[0]->qty_process;
                }
                if($data_activity_sum[0]->qty_repeat == null){
                    $data_activity_sum[0]->qty_repeat = 0;
                    //echo $data_activity_sum[0]->qty_repeat;
                }
                $data_planning = DB::select('SELECT task_complete, status_backup, qty_order, p.datetime_update, p.operation, p.run_time_actual,
                qty_comp AS qty_complete, qty_open, run_time_std, divider.divider as divider,
                p.op_color, p.op_side, p.op_des, p.item_no, p.operation, p.date_due, p.id_job
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
                $item_no_2 = '-';
                $operation_2 = '-';

                if($data_machine_queue[0]->id_activity != 0){
                    $number_count++;
                    $data_activity = Activity::where('id_activity',$data_machine_queue[0]->id_activity)->get();
                }
                if($data_machine_queue[0]->id_activity_downtime != 0){
                    $number_count++;
                    $data_activity = ActivityDowntime::where('id_activity_downtime',$data_machine_queue[0]->id_activity_downtime)->get();
                    $data_activity[0]->status_work=$data_activity[0]->status_downtime;
                    if ($data_activity[0]->run_time_actual == null) {
                        $data_activity[0]->run_time_actual = 0;
                    }
                    $data_code_downtime = CodeDowntime::where('id_code_downtime',$data_activity[0]->id_code_downtime)->get();
                    // return response() -> json($data_activity);
                    $id_code_downtime = $data_code_downtime[0]->id_code_downtime;
                    $code_downtime = $data_code_downtime[0]->code_downtime;
                    $des_downtime = $data_code_downtime[0]->des_downtime;
                    $des_downtime_thai = $data_code_downtime[0]->des_downtime_thai;
                    $data_activity[0]->status_work = $data_activity[0]->status_downtime;
                }
                if($data_machine_queue[0]->id_activity_rework != 0){
                    $number_count++;
                    $data_activity = ActivityRework::where('id_activity',$data_machine_queue[0]->id_activity_rework)->get();
                }
                ////////////////////////////////////////////
                foreach($id_mc_queue_2 as $values){
                    if($values == $id_mc[$i]){
                        $data_machine_queue_2 = MachineQueue::where('id_machine',$id_mc[$i])->where('queue_number','2')->get();
                        $data_planning_queue_2 = DB::select('SELECT operation, item_no FROM planning where id_task=' . $data_machine_queue_2[0]->id_task);
                        $item_no_2 = $data_planning_queue_2[0]->item_no;
                        $operation_2 = $data_planning_queue_2[0]->operation;
                    }
                }
                ////////////////////////////////////////////
                if ($number_count>=2 || $number_count<=0){
                    $sumResult[$i] = array(
                        "id_machine" => $id_mc[$i],
                        "code" => "020",
                        "message" => "The activity exists in both activity and activity_downtime tables or not found in both"
                    );
                    continue;
                }
                else{
                    // return response() -> json($data_planning[0]->operation);
                    $sumResult[$i] = array(
                        "id_machine"=>$id_mc[$i],
                        "item_no" => $data_planning[0]->item_no,
                        "operation" => $data_planning[0]->operation,
                        "date_due" =>$data_planning[0]->date_due,
                        "qty_accum"=> $data_planning[0]->qty_complete + $data_activity_sum[0]->qty_process,
                        "qty_order"=> $data_planning[0]->qty_order,
                        "qty_percent" => round(($data_planning[0]->qty_complete + $data_activity_sum[0]->qty_process / $data_planning[0]->qty_order) * 100,0),
                        "id_task"=>$data_machine_queue[0]->id_task,
                        "id_job"=>$data_planning[0]->id_job,                        
                        "datetime_update" => $data_planning[0]->datetime_update
                     );
                }
                if($request->dashboardID==$id_mc[$i]){
                    return response() -> json($sumResult[$i]);
                }
            }
            return response() -> json($sumResult);
            // return response() -> json($sumResult[0]);
        }
        catch(Exception $error){
            Log::error($error);
        }
    }
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
                        "status_work"=> '',
                        "operation" => '',
                        "date_due" =>'',
                        "qty_per_pulse2"=> '',
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
  
                
                // if($number_count>=3){
                //     // print_r($id_mc[$i]);
                //     $sumResult[$i] = array(
                //         "id_machine"=>$id_mc[$i],
                //         "operation" => '',
                //         "date_due" =>'',
                //         "qty_per_pulse2"=> '',
                //         "qty_accum"=> '',
                //         "qty_order"=> '',
                //         "qty_percent" => '',
                //         "id_task"=>'',
                //         "datetime_update" => '',
                //      );
                     
                //     continue;
                // }
                foreach($id_mc_queue_2 as $values){
                    if($values == $id_mc[$i]){
                        $data_machine_queue_2 = MachineQueue::where('id_machine',$id_mc[$i])->where('queue_number','2')->get();
                        $data_planning_queue_2 = DB::select('SELECT operation, item_no FROM planning where id_task=' . $data_machine_queue_2[0]->id_task);
                        $item_no_2 = $data_planning_queue_2[0]->item_no;
                        $operation_2 = $data_planning_queue_2[0]->operation;
                    }
                }
        
                    if ($number_count>=2 || $number_count<=0){
                        $sumResult[$i] = array(
                            "id_machine" => $id_mc[$i],
                            "code" => "020",
                            "message" => "The activity exists in both activity and activity_downtime tables or not found in both"
                        );
                        continue;
                    }
                    else{
                        $sumResult[$i] = array(
                            "id_machine"=>$id_mc[$i],
                            "status_work"=> $data_activity['status_work'],
                            "item_no" => $data_planning[0]->item_no,
                            "operation" => $data_planning[0]->operation,
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
                "item_no" => '',
                "operation" => '',
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
    public function OperationRefreshV5(){
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
                $due_date = date('d-m-Y', strtotime($data_planning[0]->date_due));
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
                            "date_due" => $due_date,
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
                            "date_due" => $due_date,
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

    //Modal Edit 
    public function updateModalDashboard(Request $request)
    {
        try
        {
        $dashboardIdModal = $request->get('dashboardId');
        $currentDashboardQtypertray =$request->get('dashboardQtypertray');
        $currentDashboardQtyaccum =$request->get('dashboardQtyaccum'); 
        $currentDashboardQtyaccumTemp =$request->get('accumTemp'); 
        $resultAccum = $currentDashboardQtyaccum - $currentDashboardQtyaccumTemp;    
        $data_planning = Planning::select('qty_comp')->where('id_task',$dashboardIdModal)->first();
        // return response()-> json($data_planning->qty_comp + $resultAccum);
        
        Planning::where('id_task',$dashboardIdModal)->update([
            'qty_per_pulse2' => $currentDashboardQtypertray,
            'qty_comp' => $data_planning->qty_comp + $resultAccum,
        ]);
        
         return response()-> json([
            'qty_per_pulse2' => $currentDashboardQtypertray,
            'qty_comp' => $currentDashboardQtyaccum
         ]);
        }
        catch(Exception $e)
         {
            Log::error($e);
         }
    }
}


