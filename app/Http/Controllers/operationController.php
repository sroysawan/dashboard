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
   
    const ACTIVITY_BACKFLUSH = 1;
    const ACTIVITY_REWORK = 2;
    const ACTIVITY_DOWNTIME = 3;

    public function quitReset(Request $request)
    {
        $id_machine = $request->input('modalId');
        $id_rfid = $request->get('id_rfid');
        $no_send = $request->get('no_send');
        $no_pulse1 = $request->get('no_pulse1');
        $no_pulse2 = $request->get('no_pulse2');
        $no_pulse3 = $request->get('no_pulse3');

        $id_staff = DB::table('staff')
            ->where('id_rfid', $id_rfid)
            ->value('id_staff');

        $data_activity = DB::table('activity')
            ->where('status_work', '<', 3)
            ->where('id_machine', $id_machine)
            ->where('id_staff', $id_staff)
            ->first();

        $activity_type = self::ACTIVITY;
        $table_activity = 'activity';

        if (empty($data_activity)) {
            $data_activity = DB::table('activity_rework')
                ->where('status_work', '<', 3)
                ->where('id_machine', $id_machine)
                ->where('id_staff', $id_staff)
                ->first();

            $activity_type = self::ACTIVITY_REWORK;
            $table_activity = 'activity_rework';
        }

        if (empty($data_activity)) {
            $data_activity = DB::table('activity_downtime')
                ->where('status_downtime', '<', 3)
                ->where('id_machine', $id_machine)
                ->where('id_staff', $id_staff)
                ->first();

            $activity_type = self::ACTIVITY_DOWNTIME;
            $table_activity = 'activity_downtime';
        }

        if (empty($data_activity)) {
            return response()->json(['code' => '011']);
        } else {
            $total_break = strtotime($data_activity->total_food) + strtotime($data_activity->total_toilet);
            $time_start = strtotime($data_activity->time_start);
            $time_current = time();
            $time_total = gmdate('H:i:s', $time_current - $time_start - $total_break);

            DB::table($table_activity)
                ->where('id_activity', $data_activity->id_activity)
                ->update([
                    'status_work' => 3,
                    'total_work' => $time_total,
                    'time_close' => date('Y-m-d H:i:s', $time_current),
                    'no_send' => $no_send,
                    'no_pulse1' => $no_pulse1,
                    'no_pulse2' => $no_pulse2,
                    'no_pulse3' => $no_pulse3,
                ]);

            DB::table('machine_queue')
                ->where('id_machine', $id_machine)
                ->where('queue_number', 1)
                ->update(['id_staff' => '']);

            if (empty($request->get('code_downtime'))) {
                return response()->json(['time_work' => $time_total]);
            }
        }

        return response()->json(['status' => 'success']);
    }
}


