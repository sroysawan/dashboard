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
use Carbon\Carbon;
use Exception;

class newtaskController extends Controller
{
    //แสดงผลแบบเงื่อนไขทั้งสอง มารวมที่ตัวแปรเดียว
    public function NewTask(Request $request)
    {
        try {
            $selectedOption = $request->input('selectedOption');
            $id_machine = $request->input('modalId');
            $id_job = $request->input('Idjob');
            $id_task = $request->input('Idtask');
            $current_operation = $request->input('operation');
    
            if ($selectedOption == 'radioNewTask') {
                $data_newtask = Planning::whereIn('id_task', function ($query) use ($id_machine) {
                    $query->select('id_task')->from('machine_queue')->where('id_machine', $id_machine);
                })
                ->orWhereNotIn('id_task', function ($query) use ($id_machine) {
                    $query->select('id_task')->from('machine_queue')->where('id_machine', $id_machine);
                })
                ->where('status_backup', 0)
                ->where('task_complete', 0)
                ->orderBy('date_due', 'ASC')
                ->orderBy('id_job', 'ASC')
                ->get();

                $machine_queues = DB::table('machine_queue')
                    ->select('id_machine', 'queue_number')
                    ->where('id_task', $id_task)
                    ->orderBy('id_machine', 'asc')
                    ->get();    
                }

                return response()->json([
                'data_newtask' => $data_newtask,
                'machine_queues' => $machine_queues
                ]);
            
        } catch (Exception $error) {
            Log::error($error);
        }
    }

    //สำหรับปุ้่ม add new task QUEUE 1
    public function AddNewtask(Request $request)
    {
        try {
        $id_machine = $request->input('id_machine');
        $id_job = $request->input('id_job');
        $new_operation = $request->input('operation_new');

        // $id_activity = $request->input('id_activity');
        $status_work = $request->input('status_work');
        // ค้นหา id_task จากตาราง planning
        // return response()->json($id_activity);
        $planning = Planning::where('id_job', $id_job)
        ->where('operation', $new_operation)
        ->first();

        if ($planning) {
        // สร้างรายการใหม่ในตาราง machine_queue       
        MachineQueue::create([
            "id_machine"=>$id_machine,
            "queue_number"=>1,
            "id_task"=>$planning->id_task,
            // "id_staff"=>"",
            // "comp_date"=>"0000-00-00",
            // "comp_time"=>"00:00:00"
        ]);
        }
        return response()->json(['success' => true]);
    

    } catch (Exception $error) {
        Log::error($error);
        return response()->json(['success' => false, 'message' => 'An error occurred' . $error->getMessage()]);
    }
}

//สำหรับปุ้่ม add new task QUEUE 2
public function AddNewtaskQ2(Request $request)
{
    try {
    $id_machine = $request->input('id_machine');
    $id_job = $request->input('id_job');
    $new_operation = $request->input('operation_new');

    // $id_activity = $request->input('id_activity');
    $status_work = $request->input('status_work');
    // ค้นหา id_task จากตาราง planning
    // return response()->json($id_activity);
    $planning = Planning::where('id_job', $id_job)
    ->where('operation', $new_operation)
    ->first();

    if ($planning) {
    // สร้างรายการใหม่ในตาราง machine_queue       
    MachineQueue::create([
        "id_machine"=>$id_machine,
        "queue_number"=>2,
        "id_task"=>$planning->id_task,
        // "id_staff"=>"",
        // "comp_date"=>"0000-00-00",
        // "comp_time"=>"00:00:00"
    ]);
    }
    return response()->json(['success' => true]);


} catch (Exception $error) {
    Log::error($error);
    return response()->json(['success' => false, 'message' => 'An error occurred' . $error->getMessage()]);
}
}
}


