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

class newtaskController extends Controller
{
    //แสดงผลแบบเงื่อนไขทั้งสอง มารวมที่ตัวแปรเดียว
    // public function NewTask(Request $request)
    // {
    //     try {
    //         $selectedOption = $request->input('selectedOption');
    //         // $selectedOption = 'radioNewTask';
    //         $id_machine = $request->input('modalId');
    //         $id_job = $request->input('Idjob');
    //         $id_task = $request->input('Idtask');
    //         $current_operation = $request->input('operation');
    
    //         if ($selectedOption == 'radioNewTask') {
    //             // $data_newtask = Planning::whereIn('id_task', function ($query) use ($id_machine) {
    //             //     $query->select('id_task')
    //             //         ->from(with(new MachineQueue)->getTable())
    //             //         ->where('id_machine', $id_machine);
    //             // })
    //             // ->where('status_backup', 0)
    //             // ->where('task_complete', 0)
    //             // ->orderBy('date_due', 'asc')
    //             // ->orderBy('id_job', 'asc')
    //             // ->get();
    //             $data_newtask = Planning::whereIn('id_task', function ($query) use ($id_machine) {
    //                 $query->select('id_task')->from('machine_queue')->where('id_machine', $id_machine);
    //             })
    //             ->orWhereNotIn('id_task', function ($query) use ($id_machine) {
    //                 $query->select('id_task')->from('machine_queue')->where('id_machine', $id_machine);
    //             })
    //             ->where('status_backup', 0)
    //             ->where('task_complete', 0)
    //             ->orderBy('date_due', 'ASC')
    //             ->orderBy('id_job', 'ASC')
    //             ->get();
    //         }
    //         return response()->json($data_newtask);
            
    //     } catch (Exception $error) {
    //         Log::error($error);
    //     }
    // }

    public function NewTask(Request $request)
    {
        try {
            $selectedOption = $request->input('selectedOption');
            $id_machine = $request->input('modalId');
            $id_job = $request->input('Idjob');
            $id_task = $request->input('Idtask');
            $current_operation = $request->input('operation');
    
            if ($selectedOption == 'radioNewTask') {
                $data_newtask = DB::table('planning')
                    ->whereIn('id_task', function ($query) use ($id_machine) {
                        $query->select('id_task')
                            ->from('machine_queue')
                            ->where('id_machine', '=', $id_machine);
                    })
                    ->where('status_backup', '=', 0)
                    ->where('task_complete', '=', 0)
                    ->orderBy('date_due', 'asc')
                    ->orderBy('id_job', 'asc')
                    ->get();

                $data_newtask2 = DB::table('planning')
                    ->whereNotIn('id_task', function ($query) use ($id_machine){
                        $query->select('id_task')
                            ->from('machine_queue')
                            ->where('id_machine', '=',  $id_machine);
                    })
                    ->where('status_backup', '=', 0)
                    ->where('task_complete', '=', 0)
                    ->orderBy('date_due', 'asc')
                    ->orderBy('id_job', 'asc')
                    ->get();
                
                    $machine_queues = DB::table('machine_queue')
                    ->select('id_machine', 'queue_number')
                    ->where('id_task', $id_task)
                    ->orderBy('id_machine', 'asc')
                    ->get();    
                }

                return response()->json([
                'data_newtask' => $data_newtask,
                'data_newtask2' => $data_newtask2,
                'machine_queues' => $machine_queues
                ]);
            
        } catch (Exception $error) {
            Log::error($error);
        }
    }



    //สำหรับปุ้่ม add new task ยังไม่ได้นำเข้าค่า operation new
    public function AddNewtask(Request $request)
    {
        $selectedOption = $request->input('selectedOption');
        // $selectedOption = 'radioNewTask';
        $id_machine = $request->input('modalId');
        $id_job = $request->input('Idjob');
        $id_task = $request->input('Idtask');
        //$current_operation = $request->input('operation');

        $operation_new = $request->input('operation_new');

        $id_task = Planning::where('id_job', $id_job)
            ->where('operation', $operation_new)
            ->value('id_task');

        $machineQueue = new MachineQueue([
            'id_machine' => $id_machine,
            'queue_number' => 1,
            'id_task' => $id_task
        ]);

        $machineQueue->save();
    }
}


