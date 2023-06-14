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
use App\Models\Staff;
use App\Models\Logs;
use App\Models\Breaks;
use App\Models\BreakRework;
use Illuminate\Support\Facades\Log;
use Exception;

class operationController extends Controller
{
    //แสดง operation ที่ทำงานอยู่และไม่ได้ทำงาน แบบรวมกัน
    public function ChangeOperation(Request $request)
    {
        try {
            $selectedOption = $request->input('selectedOption');
            $id_machine = $request->input('modalId');
            $id_job = $request->input('Idjob');
            $id_task = $request->input('Idtask');
            $current_operation = $request->input('operation');
    
            if ($selectedOption == 'radioChangeOp') {
                $data_planning = DB::table('planning')
                    ->where([
                        ['id_job', '=', $id_job],
                        ['status_backup', '=', 0],
                        ['task_complete', '=', 0]
                    ])
                    ->whereIn('id_task', function ($query) use ($id_machine) {
                        $query->select('id_task')
                            ->from('machine_queue')
                            ->where('id_machine', '=', $id_machine);
                    })
                    ->orderBy('date_due', 'asc')
                    ->orderBy('id_job', 'asc')
                    ->unionAll(DB::table('planning')
                        ->where([
                            ['id_job', '=', $id_job],
                            ['status_backup', '=', 0],
                            ['task_complete', '=', 0]
                        ])
                        ->whereNotIn('id_task', function ($query) use ($id_machine) {
                            $query->select('id_task')
                                ->from('machine_queue')
                                ->where('id_machine', '=', $id_machine);
                        })
                    ->orderBy('date_due', 'asc')
                    ->orderBy('id_job', 'asc')
                    )
                    ->get();

                $machine_queues = DB::table('machine_queue')
                    ->select('id_machine', 'queue_number')
                    ->where('id_task', $id_task)
                    ->orderBy('id_machine', 'asc')
                    ->get();                      
            }
 
            // return response()->json($data_planning);
            return response()->json([
                'data_planning' => $data_planning,
                'machine_queues' => $machine_queues
            ]);
            
        } catch (Exception $error) {
            Log::error($error);
        }
    }

    public function AddNewOperation(Request $request)
    {
        try {
            $id_machine = $request->input('id_machine');
            $id_job = $request->input('id_job');
            $new_operation = $request->input('operation_new');
            $id_activity = $request->input('id_activity');
            $status_work = $request->input('status_work');

            $id_task = DB::table('planning')
            ->where('id_job', $id_job)
            ->where('operation', $new_operation)
            ->value('id_task');

            DB::table('machine_queue')
                ->where('id_machine', $id_machine)
                ->where('queue_number', 1)
                ->update([
                    // 'comp_date' => '0000-00-00',
                    // 'comp_time' => '00:00:00',
                    'id_task' => $id_task
                ]);

            // ลดค่า queue_number ใน machine_queue ที่มีค่ามากกว่า 0
            DB::table('machine_queue')
                ->where('id_machine', $id_machine)
                ->where('queue_number', '>', 0)
                ->update(['queue_number'=> 1]);

            DB::table('activity')
                // >where('id_machine', $id_machine)
                // ->where('id_task', $id_task)
                ->where('id_activity', $id_activity)
                ->update(['status_work' => 3]);
            return response()->json(['success' => true]);

        } catch (Exception $error) {
            Log::error($error);
            return response()->json(['success' => false, 'message' => 'An error occurred' . $error->getMessage()]);
        }
    }

    public function AddNewOperationQ2(Request $request)
    {
        try {
            $id_machine = $request->input('id_machine');
            $id_job = $request->input('id_job');
            $new_operation = $request->input('operation_new');
            $id_activity = $request->input('id_activity');
            $status_work = $request->input('status_work');

            $id_task = DB::table('planning')
            ->where('id_job', $id_job)
            ->where('operation', $new_operation)
            ->value('id_task');

            DB::table('machine_queue')
                ->where('id_machine', $id_machine)
                ->where('queue_number', 2)
                ->update([
                    'id_task' => $id_task
                ]);

            // ลดค่า queue_number ใน machine_queue ที่มีค่ามากกว่า 0
            DB::table('machine_queue')
                ->where('id_machine', $id_machine)
                ->where('queue_number', '>', 1)
                ->update(['queue_number'=> 2]);

            DB::table('activity')
                // >where('id_machine', $id_machine)
                // ->where('id_task', $id_task)
                ->where('id_activity', $id_activity)
                ->update(['status_work' => 3]);
            return response()->json(['success' => true]);

        } catch (Exception $error) {
            Log::error($error);
            return response()->json(['success change op Q2' => false, 'message' => 'An error occurred' . $error->getMessage()]);
        }
    }

    public function RemoveMachine(Request $request)
    {
        try {
            $selectedOption = $request->input('selectedOption');
            $id_machine = $request->input('modalId');
    
            if ($selectedOption == 'radioRemove') {
                MachineQueue::where('id_machine', $id_machine)
                ->where('queue_number', 1)
                ->delete();
            }
            else if ($selectedOption == 'radioRemoveQ2') {
                MachineQueue::where('id_machine', $id_machine)
                ->where('queue_number', 2)
                ->delete();
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Machine removed successfully'
            ]);
        } catch (Exception $error) {
            Log::error($error);
        }
    }

    public function FeedMachine(Request $request)
    {
        try {
            $selectedOption = $request->input('selectedOption');
            $id_machine = $request->input('modalId');
    
            if ($selectedOption == 'radioNextQueue') {
                MachineQueue::where('id_machine', $id_machine)
                    ->where('queue_number', '>', 0)
                    ->decrement('queue_number', 1);
            }
            return response()->json([
                'status' => 'success',
                'message' => 'Machine feed q successfully'
            ]);
            
        } catch (Exception $error) {
            Log::error($error);
        }
    }

    public function ResetActivittyV1(Request $request){
        $id_machine = $request->input('modalId');
        $id_rfid = $request->get('Id_Rfid');
        $id_activity = $request->get('Idactivity');
        $id_activity_type = $request->get('Id_ActivityType');
        $no_send = $request->get('Id_Nosend');
        $no_pulse1 = $request->get('Id_NoPulse1');
        $no_pulse2 = $request->get('Id_NoPulse2');
        $no_pulse3 = $request->get('Id_NoPulse3');
        
        // dump($request->all());

        $machineQueue = MachineQueue::where('id_machine', $id_machine)
        ->join('staff', 'machine_queue.id_staff', '=', 'staff.id_staff')
        ->first();

    if (!empty($machineQueue)) {
        return redirect()->route('quit.machine', [
            'id_mc' => $machineQueue->id_machine,
            'id_rfid' => $machineQueue->id_rfid,
            'id_activity' => $machineQueue->id_activity,
            'activity_type' => $machineQueue->activity_type,
            'no_send' => -1,
            'no_pulse1' => 0,
            'no_pulse2' => 0,
            'no_pulse3' => 0,
            'multiplier' => -1,
            // 'dashboard' => 1
        ]);
    }
    }

    //reset all status keep all total
    public function ResetActivittyV2(Request $request){
        try{
        $id_break = $request->input('Idbreak');
        // $id_machine = $request->input('modalId');
        $id_activity = $request->input('Idactivity');
        $activity_type = $request->input('Id_ActivityType');

            $data_machine_queue = DB::select('select * from machine_queue as m, staff as s where m.id_staff = s.id_staff');
            if(!empty($data_machine_queue)){
                $id_rfid = $data_machine_queue[0]->id_rfid;
                $id_activity = $request->input('Idactivity');
                $activity_type = $request->input('Id_ActivityType');
                $no_send = 1;
                $no_pulse1 = 0;
                $no_pulse2 = 0;
                $no_pulse3 = 0;
                $multiplier = 1;
                $dashboard = 1;
                $id_mc = $request->input('modalId');

                $data_staff_rfid = Staff::where('id_rfid', $id_rfid)->first();
                if(empty($data_staff_rfid)){
                    return response() -> json(['code'=>'011', 'message'=>'Invalid RFID']);
                }else {
                    $table;
                    $str_activity;
                    $str_status;
                    if($activity_type == 'dt'){
                        $table = 'activity_downtime';
                        $str_status = 'status_downtime'; //3
                        $str_activity = 'id_activity_downtime';
                    }else{
                        $str_status = 'status_work'; //1
                        $str_activity = 'id_activity';
                        if($activity_type == 'bf'){
                            $table = 'activity';
                            $table_break = 'break';
                        }
                        else{
                            $table = 'activity_rework'; //2
                            $table_break = 'break_rework';
                        }
                    }
                    if($activity_type == 'dt'){
                        $sql = "SELECT *, CURRENT_TIMESTAMP() AS time_current FROM " . $table . " WHERE " .
                        $str_activity . " = :id_activity AND id_staff = :id_staff AND id_machine = :id_machine AND (" .
                        $str_status . " = 1 OR " . $str_status . " = 2)";
                        $data_activity = DB::select($sql, [
                        'id_activity' => $id_activity,
                        'id_staff' => $request->input('Idstaff'),
                        'id_machine' => $request->input('modalId'),
                    ]);
                    }
                    else{
                        $sql = "SELECT a.*, b.id_break, CURRENT_TIMESTAMP() AS time_current 
                        FROM " . $table . " AS a 
                        LEFT JOIN " . $table_break . " AS b ON a." . $str_activity . " = b." . $str_activity . "
                        WHERE a." . $str_activity . " = :id_activity 
                        AND a.id_staff = :id_staff 
                        AND a.id_machine = :id_machine 
                        AND (a." . $str_status . " = 1 OR a." . $str_status . " = 2)";
                
                        $data_activity = DB::select($sql, [
                            'id_activity' => $id_activity,
                            'id_staff' => $request->input('Idstaff'),
                            'id_machine' => $request->input('modalId'),
                        ]);
                    }

                    if($data_activity[0]->id_break != 0){
                        $has_break = $data_activity[0]->id_break != NULL ;
                    }
                    else{
                        $has_break = false;
                    }
                    $response = null;
                            if ($has_break) {
                        $data_break = DB::table($table_break)
                                    ->select('break_code', 'break_start AS time_break')
                                    ->where('id_break', $request->input('Idbreak'))
                                    ->first();

                        if(empty($data_break)){
                        return response() ->  json(['code'=>'009', 'message'=>'Invalid break ID']);
                        }
                        else{
                        $data_activity = DB::table($table)
                                        ->select('id_break', 'total_food', 'total_toilet', DB::raw('CURRENT_TIMESTAMP AS time_current'))
                                        ->where($str_status, 2)
                                        ->where($str_activity, $request->input('Idactivity'))
                                        ->where('id_machine', $request->input('modalId'))
                                        ->first();
                                        
                        if(empty($data_activity)){
                            return response() ->  json(['code'=>'010', 'message'=>'No break activity found']);
                        }
                        else{
                            $break_code = intval($data_break->break_code);
                            // BREAK CODE: 1=FOOD, 2=TOILET
                            if($break_code==1){
                                $total_break = strtotime("1970-01-01 " . $data_activity->total_food . " UTC");
                                $str_break = 'total_food';
                            }elseif ($break_code==2){
                                $total_break = strtotime("1970-01-01 " . $data_activity->total_toilet . " UTC");
                                $str_break = 'total_toilet';
                            }

                            $time_break = strtotime($data_break->time_break);
                            $time_current = strtotime($data_activity->time_current);
                            $break_duration = $time_current-$time_break;
                            $break_duration_text = gmdate('H:i:s', $break_duration);
                            $total_break_text =  gmdate('H:i:s', $break_duration + $total_break);

                            DB::transaction(function () use ($str_status, $str_break, $total_break_text, $str_activity, $id_activity, $table, $table_break, $id_break, $time_current, $break_duration_text) {
                                $break_stop_datetime = date("Y-m-d H:i:s", $time_current);  // convert Unix timestamp to MySQL datetime format
                                DB::table($table)
                                    ->where($str_activity, $id_activity)
                                    ->update([
                                        $str_status => 1,
                                        $str_break => $total_break_text
                                    ]);
                            
                                DB::table($table_break)
                                    ->where('id_break', $id_break)
                                    ->update([
                                        'break_stop' => $break_stop_datetime,  
                                        'break_duration' => $break_duration_text
                                    ]);
                            });
                            $response = ['total_break' => $total_break_text];
                        }
                        }
                        }
                    
                    if(empty($data_activity)) {
                        $response = ["code"=>"012", 'message'=>'Activity mismatches'];
            //            print_r($data_json);
                    } else {
                        $is_quit = true;
                        $status_work = 3;

                            if(strcmp('activity_downtime', $table) == 0){
                                $status_work_text = 'status_downtime=';
                                $id_activity_text = 'id_activity_downtime';
                            }else{
                                $id_activity_text = 'id_activity';
                                $status_work_text = 'status_work=';
                            }
                        
                            $sql = "SELECT id_task, time_start, total_work, total_food, total_toilet, no_pulse1, no_pulse2, no_pulse3, 
                            CURRENT_TIMESTAMP() AS time_current FROM " . $table . " WHERE " . $id_activity_text . "=" . $id_activity;

                            $data_activity = DB::select($sql);
                        
                            $sql = "SELECT planning.op_color, planning.op_side, planning.qty_per_pulse2, divider.divider AS multiplier 
                        FROM planning INNER JOIN divider ON planning.op_color=divider.op_color AND planning.op_side=divider.op_side 
                        WHERE planning.id_task=" . $data_activity[0]->id_task;

                            $data_planning = DB::select($sql);
                        
                            $multiplier = $data_planning[0]->multiplier;
                            //คำนวณเวลาทั้งหมดที่ใช้ทำงาน
                            $total_food = strtotime("1970-01-01 " . $data_activity[0]->total_food . " UTC");
                            $total_toilet = strtotime("1970-01-01 " . $data_activity[0]->total_toilet . " UTC");
                            $total_break = $total_food + $total_toilet;
                            $time_start = strtotime($data_activity[0]->time_start);
                            $time_current = strtotime($data_activity[0]->time_current);
                            $time_total_second = $time_current - $time_start - $total_break;
                            $time_total =  gmdate('H:i:s', $time_total_second);
                        
                            $no_pulse1 = floatval($data_activity[0]->no_pulse1) + ($no_pulse1 * floatval($multiplier));
                            $no_pulse2 = intval($data_activity[0]->no_pulse2) + ($no_pulse2 * intval($data_planning[0]->qty_per_pulse2));
                            $no_pulse3 = $no_pulse3 + intval($data_activity[0]->no_pulse3) ;
                        
                            $count_accum = $no_pulse2 + $no_pulse3;
                        
                            if($count_accum==0){
                                $run_time_actual=0.0;
                            }else{
                                $count_accum = floatval($count_accum);
                                $run_time_actual = round($time_total_second/$count_accum, 2);
                            }
                        
                            $sql = "UPDATE " . $table . " SET ";
                            $sql = $sql . $status_work_text . $status_work . ",";
                            if ($is_quit){
                                $sql = $sql . "time_close='" . $data_activity[0]->time_current . "',";
                            }
                            $sql = $sql . "total_work='" . $time_total . "',";
                            $sql = $sql . "run_time_actual=" . $run_time_actual . ",";
                            $sql = $sql . "no_send=" . $no_send . ",";
                            $sql = $sql . "no_pulse1=" . $no_pulse1 . ",";
                            $sql = $sql . "no_pulse2=" . $no_pulse2 . ",";
                            $sql = $sql . "no_pulse3=" . $no_pulse3 . ",";
                            $sql = $sql . "multiplier=" . $multiplier;
                            $sql = $sql . " WHERE " . $id_activity_text . "=" . $id_activity;
                            // return response() ->  json( $sql);
                            DB::update($sql);

                        $sql = "UPDATE machine_queue SET id_staff='' WHERE id_machine='" . $id_mc . "' AND queue_number=1";
                        DB::update($sql);

                        $data_json = [
                            'code'=>'200',
                            'message'=>'OK',
                            'qty_pulse1' => $no_pulse1,
                            'qty_pulse2' => $no_pulse2,
                            'qty_pulse3' => $no_pulse3,
                            'count_accum' => $count_accum,
                            'time_start' => $data_activity["time_start"],
                            'time_current' => $data_activity["time_current"],
                            'total_food' => $data_activity["total_food"],
                            'total_toilet' => $data_activity["total_toilet"],
                            'time_total_second' => $time_total_second,
                            'time_work' => $time_total,
                            'run_time_actual' => $run_time_actual,
                            "quit_complete"=>true,
                        ];
                        return response() ->json($data_json);
                    }
                }
            }
        
    }
        catch (Exception $error) {
            Log::error($error);
            return response()->json($error);
        }
    }
}
