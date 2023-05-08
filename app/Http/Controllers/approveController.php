<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\Models\Approve;
use App\Models\Staff;
use App\Models\Role;
use App\Models\Prefix;
use Carbon\Carbon;

class approveController extends Controller
{
    //
    public function getApprove(Request $request){
        try{
            // $data = $request->all();
            // $approve = Approve::all();
            $results = DB::table('approve')
            ->orderBy(DB::raw('CASE status
                WHEN 2 THEN 1
                WHEN 1 THEN 2
                WHEN 3 THEN 3
            END'))->orderBy('update_history','desc')
            ->get();
            return response()-> json($results);
    
        }
        catch(Exception $error)
    {
    Log::error($error);
    return response() -> json($error);
    }
    }

    public function confirmApprove(Request $request){
        try{
            $data_req = $request->all();
            $approve = Approve::where('id_approve',$data_req['id_approve'])->first();
            $edit_part = preg_split('/[,=>:]/', $approve->edit_data);
            $edit_filter = array_filter($edit_part, function($value) {
                return !empty($value);
            }); 
            $x = 0;
            $key = array();
            $before = array();
            $after = array();
            foreach ($edit_filter as $data) {
                if($x>2){
                    $x=0;
                }
                if($x==0){
                    $string = strtolower($data); // convert to lowercase
                    $string = str_replace(' ', '_', $string); // replace spaces with underscores
                    $string = trim($string, '_');
                    if($string == "shif"){
                        $string = "id_shif";
                    }
                    if($string == "role"){
                        $string = "id_role";
                    }
                    if($string == "first_name"){
                        $string = "name_first";
                    }
                    if($string == "last_name"){
                        $string = "name_last";
                    }
                    array_push($key,$string);
                }
                elseif($x==1){
                    $string = trim($data);
                    array_push($before,$string);
                }
                elseif($x==2){
                    $string = trim($data);
                    array_push($after,$string);
                }
                $x++;
            }
            // return response() -> json([$key,$before,$after]);
            // for ($i=0;$i<count($key);$i++){
            //     Staff::where('id_staff',$before[$i])->update([
            //         $key[$i] => $after[$i],
            //     ]);
            // }
            if($data_req['confirm_approve'] == true){
                Approve::where('id_approve',$data_req['id_approve'])->update([
                    'status' => 1,
                    'approve_datetime' => Carbon::now()->timezone('Asia/Bangkok'),
                ]);
                for ($i=0;$i<count($key);$i++){
                    if($key[$i]=='id_role'){
                        $after[$i] = Role::select('id_role')->where('role',$after[$i])->first();
                        Staff::where('id_staff',$approve->id_staff)->update([
                            $key[$i] => $after[$i]->id_role,
                        ]);
                    }
                    elseif($key[$i]=='prefix'){
                        $after[$i] = Prefix::select('id_prefix')->where('prefix',$after[$i])->first();
                        Staff::where('id_staff',$approve->id_staff)->update([
                            $key[$i] => $after[$i]->id_prefix,
                        ]);
                    }
                    else{
                        Staff::where('id_staff',$approve->id_staff)->update([
                            $key[$i] => $after[$i],
                        ]);
                        if($key[$i]=='id_staff'){
                            $approve->id_staff = $after[$i];
                        }
                    }
                    // return response() -> json($after[$i]);
                    
                }
                // Staff::where('id_staff',$before[0])->update([
                //     'id_staff' => $after[0],
                //     'id_rfid' => $after[1],
                //     'prefix' => $after[2],
                //     'name_first' => $after[3],
                //     'name_last' => $after[4],
                //     'id_role' => $after[5],
                //     'id_shif' => $after[6],
                // ]);
                return response() -> json([$approve->id_staff,'success is confirm',$key,$before,$after,count($key)]);
            }
            else{
                Approve::where('id_approve',$data_req['id_approve'])->update([
                    'status' => 3,
                    'approve_datetime' => Carbon::now()->timezone('Asia/Bangkok'),
                ]);
                return response() -> json('success is not confirm');
            }
            
        }
        catch(Exception $error)
    {
    Log::error($error);
    return response() -> json($error);
    }
    }
}
