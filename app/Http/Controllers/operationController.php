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
   
    // const ACTIVITY_BACKFLUSH = 1;
    // const ACTIVITY_REWORK = 2;
    // const ACTIVITY_DOWNTIME = 3;

    // public function quitReset(Request $request)
    // {
    //     $id_machine = $request->input('modalId');
    //     $id_rfid = $request->get('id_rfid');
    //     $no_send = $request->get('no_send');
    //     $no_pulse1 = $request->get('no_pulse1');
    //     $no_pulse2 = $request->get('no_pulse2');
    //     $no_pulse3 = $request->get('no_pulse3');

    //     $id_staff = DB::table('staff')
    //         ->where('id_rfid', $id_rfid)
    //         ->value('id_staff');

    //     $data_activity = DB::table('activity')
    //         ->where('status_work', '<', 3)
    //         ->where('id_machine', $id_machine)
    //         ->where('id_staff', $id_staff)
    //         ->first();

    //     $activity_type = self::ACTIVITY;
    //     $table_activity = 'activity';

    //     if (empty($data_activity)) {
    //         $data_activity = DB::table('activity_rework')
    //             ->where('status_work', '<', 3)
    //             ->where('id_machine', $id_machine)
    //             ->where('id_staff', $id_staff)
    //             ->first();

    //         $activity_type = self::ACTIVITY_REWORK;
    //         $table_activity = 'activity_rework';
    //     }

    //     if (empty($data_activity)) {
    //         $data_activity = DB::table('activity_downtime')
    //             ->where('status_downtime', '<', 3)
    //             ->where('id_machine', $id_machine)
    //             ->where('id_staff', $id_staff)
    //             ->first();

    //         $activity_type = self::ACTIVITY_DOWNTIME;
    //         $table_activity = 'activity_downtime';
    //     }

    //     if (empty($data_activity)) {
    //         return response()->json(['code' => '011']);
    //     } else {
    //         $total_break = strtotime($data_activity->total_food) + strtotime($data_activity->total_toilet);
    //         $time_start = strtotime($data_activity->time_start);
    //         $time_current = time();
    //         $time_total = gmdate('H:i:s', $time_current - $time_start - $total_break);

    //         DB::table($table_activity)
    //             ->where('id_activity', $data_activity->id_activity)
    //             ->update([
    //                 'status_work' => 3,
    //                 'total_work' => $time_total,
    //                 'time_close' => date('Y-m-d H:i:s', $time_current),
    //                 'no_send' => $no_send,
    //                 'no_pulse1' => $no_pulse1,
    //                 'no_pulse2' => $no_pulse2,
    //                 'no_pulse3' => $no_pulse3,
    //             ]);

    //         DB::table('machine_queue')
    //             ->where('id_machine', $id_machine)
    //             ->where('queue_number', 1)
    //             ->update(['id_staff' => '']);

    //         if (empty($request->get('code_downtime'))) {
    //             return response()->json(['time_work' => $time_total]);
    //         }
    //     }

    //     return response()->json(['status' => 'success']);
    // }

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


    public function ResetActivittyV2(Request $request){
        try{
        //     $sql = "SELECT * FROM machine_queue
        //  INNER JOIN staff ON machine_queue.id_staff = staff.id_staff 
        //  WHERE id_machine = '" . $_GET['id_mc'] . "'";

            $data_machine_queue = DB::select('select * from machine_queue as m, staff as s where m.id_staff = s.id_staff');
            // return response() -> json($request->all());

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
                // get_staff_by_rfid($conn, $id_rfid);
                if(empty($data_staff_rfid)){
                    return response() -> json(['code'=>'011', 'message'=>'Invalid RFID']);
            //        print_r($data_json);
                }
                else {
                    $table;
                    $str_activity;
                    $str_status;
                    if($activity_type == 'dt'){
                        $table = 'activity_downtime';
                        $str_status = 'status_downtime';
                        $str_activity = 'id_activity_downtime';
                    }
                    else{
                        $str_status = 'status_work';
                        $str_activity = 'id_activity';
                        if($activity_type == 'bf'){
                            $table = 'activity';
                        }
                        else{
                            $table = 'activity_rework';
                        }
                    }

                    // list($table, $str_activity, $str_status) = get_info_from_activity_type($activity_type);
                    // $data_activity = get_active_activity_by_activity_id_type_staff_and_machine(
                    //     $conn,
                    //     $table,
                    //     $str_activity,
                    //     $str_status,
                    //     $id_activity,
                    //     $data_staff_rfid['id_staff'],
                    //     $id_mc);
                    $sql = "SELECT *, CURRENT_TIMESTAMP() AS time_current FROM " . $table . " WHERE " .
                            $str_activity . "=" . $id_activity . " AND 
                            id_staff = '" . $request->input('Idstaff') . "' AND 
                            id_machine = '" . $request->input('modalId') . "' AND " .
                            $str_status . "=1";
                    $data_activity = DB::select($sql);
                    // return response() ->  json( $data_activity);


                    if(empty($data_activity)) {
                        return response() ->  json(["code"=>"012", 'message'=>'Activity mismatches']);
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
                            // $result = $conn->query($sql);
                        // $data_json = update_count($conn, $is_quit, $table, $status_work,
                        //     $id_activity,
                        //     $no_send,
                        //     $no_pulse1,
                        //     $no_pulse2,
                        //     $no_pulse3,
                        //     $multiplier);

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


