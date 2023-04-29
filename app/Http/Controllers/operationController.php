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


    public function ChangeOperation(Request $request){
        try{
            // $id_machine = $request->get('dashboardID');
            // $id_job = $request->get('dashboardIdjob');
            // $selectedOption = 'radioChangeOp';
            $selectedOption = $request->input('selectedOption');
            $id_machine = $request->input('modalId');
            $id_job = $request->input('Idjob');
            // Log::info('selectedOption: ' . $selectedOption);

                if ($selectedOption == 'radioChangeOp') {
                    $data_planning = DB::table('planning')
                        ->join('machine_queue', 'planning.id_task', '=', 'machine_queue.id_task')
                        ->select('*')
                        ->where([
                            ['planning.id_job', '=', $id_job],
                            ['planning.status_backup', '=', 0],
                            ['planning.task_complete', '=', 0],
                            ['machine_queue.id_machine', '=', $id_machine]
                        ])
                        ->orderBy('planning.date_due', 'asc')
                        ->get();
                        // Log::info('data_planning: ' . json_encode($data_planning));
                }
        
                // return response()->json(['selectedOption' => $selectedOption, 'data_planning' => $data_planning]);
            
            return response() -> json($data_planning);
        }
        catch(Exception $error){
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
   




public function updateOperation(Request $request, $id_mc)
{
    $newOp = $request->input('newOp');
    DB::table('Machine')
        ->where('id_mc', $id_mc)
        ->update(['op' => $newOp]);
        
    return response()->json(['message' => 'Operation updated successfully']);
}

}

