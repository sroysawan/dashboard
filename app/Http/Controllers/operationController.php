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
   
// public function resetActivity(Request $request){
//     try{
//         $selectedOption = $request->input('selectedOption');
//         $id_mc = $request->get('dashboardIdmc');
//         $data_activity = Activity::where('id_machine', $id_mc)->where('status_work', '<', 3)->first();
//         if (!empty($data_activity)) {
//             $data_staff = Staff::select('id_rfid')->where('id_staff', $data_activity->id_staff)->first();
//             $data_planning = Planning::where('id_task', $data_activity->id_task)->first();
            
//             return redirect()->route('quit_v2-reset', [
//                 'id_rfid' => $data_staff->id_rfid,
//                 'id_job' => $data_planning->id_job,
//                 'operation' => $data_planning->operation,
//                 'id_machine' => $data_activity->id_machine,
//                 'no_send' => $data_activity->no_send,
//                 'no_pulse1' => $data_activity->no_pulse1,
//                 'no_pulse2' => $data_activity->no_pulse2,
//                 'no_pulse3' => $data_activity->no_pulse3,
//             ]);
//         }

//         $data_downtime = ActivityDowntime::where('id_machine', $id_mc)->where('status_downtime', '<', 3)->first();
//         if (!empty($data_downtime)) {
//             $data_staff = Staff::select('id_rfid')->where('id_staff', $data_downtime->id_staff)->first();
//             $data_planning = Planning::where('id_task', $data_downtime->id_task)->first();

//         $data_activity_rework = ActivityRework::where('id_machine', $id_mc)->where('status_work', '<', 3)->first();
//         if (!empty($data_activity_rework)) {
//             $data_staff = Staff::select('id_rfid')->where('id_staff', $data_activity_rework->id_staff)->first();
//             $data_planning = Planning::where('id_task', $data_activity_rework->id_task)->first();
//         }

//         MachineQueue::where('id_machine', $id_mc)->where('queue_number', 1)->update(['id_staff' => '']);
//         MachineQueue::where('queue_number', '<', 1)->orWhere('queue_number', '>', 2)->delete();

//         // Call terminate function
//         terminate();

//         $data_json = json_encode(array("code" => "OK", "message" => "OK"), JSON_UNESCAPED_UNICODE);
//         print_r($data_json);

//         // if (strcmp($dashboard, '1') == 0) {
//         //     return redirect()->route('pp-machine');
//         // }
//     }
//         catch(Exception $error){
//             Log::error($error);
//         }
//     }
   
public function resetActivity(Request $request){
    try {
        $id_machine = $request->input('modalId');
        $id_job = $request->input('Idjob');
        $id_task = $request->input('Idtask');
        $current_operation = $request->input('operation');

        $id_rfid = $request->get('id_rfid');

        $no_send = $request->get('no_send');
        $no_pulse1 = $request->get('no_pulse1');
        $no_pulse2 = $request->get('no_pulse2');
        $no_pulse3 = $request->get('no_pulse3');

        

        // First part of the code
        $activity = Activity::where('id_machine', $id_mc)
                            ->where('status_work', '<', 3)
                            ->first();

        if(!empty($activity)) {
            // Insert your code here for handling $activity
        }

        // Continue with the rest of the first part of your code...

        // Second part of the code
        $activity_type = 0;
        $activity = Activity::where('status_work', '<', 3)
        ->where('id_machine', $id_mc)
        ->where('id_staff', function($query) use ($id_rfid) {
            $query->select('id_staff')
                ->from(with(new Staff)->getTable())
                ->where('id_rfid', $id_rfid);
        })->first();

        if(empty($activity)) {
            $activity = ActivityRework::where('status_work', '<', 3)
                ->where('id_machine', $id_mc)
                ->where('id_staff', function($query) use ($id_rfid) {
                    $query->select('id_staff')
                        ->from(with(new Staff)->getTable())
                        ->where('id_rfid', $id_rfid);
                })->first();

            if(empty($activity)) {
                $activity = ActivityDowntime::where('status_downtime', '<', 3)
                    ->where('id_machine', $id_mc)
                    ->where('id_staff', function($query) use ($id_rfid) {
                        $query->select('id_staff')
                            ->from(with(new Staff)->getTable())
                            ->where('id_rfid', $id_rfid);
                    })->first();

                if(!empty($activity)){
                    $activity_type = 3;
                }
            }else{
                $activity_type = 2;
            }
        }else{
            $activity_type = 1;
        }

        // Continue with the rest of the second part of your code...

        // Last part of the code
        MachineQueue::where('id_machine', $id_mc)
            ->where('queue_number', 1)
            ->update(['id_staff' => '']);

        MachineQueue::where('queue_number', '<', 1)
            ->orWhere('queue_number', '>', 2)
            ->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Machine feed q successfully'
        ]);
        
    } catch (Exception $error) {
        Log::error($error);
        return response()->json([
            'status' => 'error',
            'message' => 'An error occurred: '.$error->getMessage()
        ], 500); // This HTTP status code indicates a server error
        }
        }





        public function combinedFunction(Request $request) {
            $id_machine = $request->input('modalId');
            $id_job = $request->input('Idjob');
            $id_task = $request->input('Idtask');
            $current_operation = $request->input('operation');

            $activity = Activity::where('id_machine', $id_machine)
                ->where('status_work', '<', 3)
                ->first();
                
            if ($activity != null) {
                $staff = Staff::where('id_staff', $activity->id_staff)->first();
                $planning = Planning::where('id_task', $activity->id_task)->first();
        
                return redirect()->route('quit_v2_reset', [
                    'id_rfid' => $staff->id_rfid,
                    'id_job' => $planning->id_job,
                    'operation' => $planning->operation,
                    'id_mc' => $activity->id_machine,
                    'no_send' => $activity->no_send,
                    'no_pulse1' => $activity->no_pulse1,
                    'no_pulse2' => $activity->no_pulse2,
                    'no_pulse3' => $activity->no_pulse3
                ]);
            }
        
            $activity_downtime = ActivityDowntime::where('id_machine', $id_machine)
                ->where('status_downtime', '<', 3)
                ->first();
                
            if ($activity_downtime != null) {
                $staff = Staff::where('id_staff', $activity_downtime->id_staff)->first();
                $planning = Planning::where('id_task', $activity_downtime->id_task)->first();
        
                return redirect()->route('quit_dt_reset', [
                    'id_rfid' => $staff->id_rfid,
                    'id_job' => $planning->id_job,
                    'operation' => $planning->operation,
                    'id_mc' => $activity_downtime->id_machine,
                ]);
            }
        
            // Similar logic for 'activity_rework'...
        
            $machine_queue = MachineQueue::where('id_machine', $request->id_mc)
                ->where('queue_number', 1)
                ->first();
        
            if ($machine_queue != null) {
                $machine_queue->id_staff = '';
                $machine_queue->save();
            }
        
            return response()->json([
                'code' => 'OK',
                'message' => 'OK'
            ]);
        }
        


}

