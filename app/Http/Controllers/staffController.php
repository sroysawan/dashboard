<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Log;
use Exception;
use App\Models\Staff;
use App\Models\Approve;
use Illuminate\support\Carbon;
use Illuminate\support\Facades\DB;

class staffController extends Controller
{
    
//     public function getInfoStaff(){
//         try{
//             $staff = DB::table('staff')
//             ->select('*')
//             ->join('role','role.id_role','=','staff.id_role')
//             ->join('prefix','prefix.id_prefix','=','staff.prefix')    
//             ->orderBy('name_first', 'asc')       
//             ->get();
//             return response()-> json($staff);

//         }
//         catch(Exception $error)
//     {
//     Log::error($error);
// }
// }

public function getInfoStaff()
{
    try {
        $staff = DB::table('staff')
            ->select('*')
            ->join('role', 'role.id_role', '=', 'staff.id_role')
            ->join('prefix', 'prefix.id_prefix', '=', 'staff.prefix')
            ->orderBy('name_first', 'asc')
            ->where(function ($query) {
                $query->where('role.id_role', '=', '6')
                    ->orWhere('role.id_role', '=', '7')
                    ->orWhere('role.id_role', '=', '9');
            })
            ->get();
        
        return response()->json($staff);
    } catch (Exception $error) {
        Log::error($error);
    }
}


public function getInfoStaffOperator(){
    try{
        $staff = DB::table('staff')
        ->select('*')
        ->join('role','role.id_role','=','staff.id_role')
        ->join('prefix','prefix.id_prefix','=','staff.prefix')    
        ->orderBy('name_first', 'asc')      
        ->where('role.id_role','=','1') 
        ->get();
        return response()-> json($staff);

    }
    catch(Exception $error)
{
Log::error($error);
}
}

public function getInfoStaffTechnician(){
    try{
        $staff = DB::table('staff')
        ->select('*')
        ->join('role','role.id_role','=','staff.id_role')
        ->join('prefix','prefix.id_prefix','=','staff.prefix')    
        ->orderBy('name_first', 'asc')      
        ->where('role.id_role','=','2') 
        ->get();
        return response()-> json($staff);

    }
    catch(Exception $error)
{
Log::error($error);
}
}


  //get individual Dashboard Details////

   public function getDashboardDetails(Request $request)
   {
    try
    {
        $dashboardData = Staff::where('id_staff',$request->get('dashboardId'))->get();
        return response()->json($dashboardData[0]);
    }
    catch(Exception $e)
    {
        Log::error($e);
    }
   }


   //Upadting dashboard data
   public function updateDashboardData(Request $request)
   {
        $dashboardIdModal = $request->get('dashboardId');
        $dashboardStaff  =$request->get('dashboardStaff');
        $dashboardRfid =$request->get('dashboardRfid');
        $dashboardPrefix =$request->get('dashboardPrefix');
        $dashboardFirst =$request->get('dashboardFirst');
        $dashboardLast =$request->get('dashboardLast');
        // $dashboardsite =$request->get('dashboardsite');
        $dashboardRole =$request->get('dashboardRole');
        $dashboardShif =$request->get('dashboardShif');
        // $dashboardimg =$request->get('dashboardimg');
        $data="";
        $oldData = Staff::where('id_staff',$dashboardIdModal)->first();
        $before_prefix = DB::table('prefix')->select('prefix')->where('id_prefix',$oldData['prefix'])->first();
        $after_prefix = DB::table('prefix')->select('prefix')->where('id_prefix',$dashboardPrefix)->first();
        $before_role = DB::table('role')->select('role')->where('id_role',$oldData['id_role'])->first();
        $after_role = DB::table('role')->select('role')->where('id_role',$dashboardRole)->first();
        // return response() -> json($after_prefix);
        if($oldData['id_staff'] != $dashboardStaff){
            $data = $data."ID Staff : ".$oldData['id_staff']." => ".$dashboardStaff.", ";
        }
        if($oldData['id_rfid'] != $dashboardRfid){
            $data = $data."ID RFID : ".$oldData['id_rfid']." => ".$dashboardRfid.", ";
        }
        if($oldData['prefix'] != $dashboardPrefix){
            $data = $data."Prefix : ".$before_prefix->prefix." => ".$after_prefix->prefix.", ";
        }
        if(trim($oldData['name_first']," ") != $dashboardFirst){
            $data = $data."First Name : ".$oldData['name_first']." => ".$dashboardFirst.", ";
        }
        if($oldData['name_last'] != $dashboardLast){
            $data = $data."Last Name : ".$oldData['name_last']." => ".$dashboardLast.", ";
        }
        if($oldData['id_role'] != $dashboardRole){
            $data = $data."Role : ".$before_role->role." => ".$after_role->role.", ";
        }
        if($oldData['id_shif'] != $dashboardShif){
            $data = $data."Shif : ".$oldData['id_shif']." => ".$dashboardShif.", ";
        }
        $data = rtrim($data, " ,");
        // $data = "ID Staff : ".$oldData['id_staff']." => ".$dashboardStaff.
        // ", ID RFID : ".$oldData['id_rfid']." => ".$dashboardRfid.
        // ", Prefix : ".$oldData['prefix']." => ".$dashboardPrefix.
        // ", First Name : ".$oldData['name_first']." => ".$dashboardFirst.
        // ", Last Name : ".$oldData['name_last']." => ".$dashboardLast.
        // ", Role : ".$oldData['id_role']." => ".$dashboardRole.
        // ", Shif : ".$oldData['id_shif']." => ".$dashboardShif;
        // return response() -> json($data);
        Approve::create([
            'id_staff' => $oldData['id_staff'],
            'edit_data' => $data,
            'update_history'=>Carbon::now()->timezone('Asia/Bangkok')->toDateTimeString(),
            'status'=>2,
        ]);
        // Staff::where('id_staff',$dashboardIdModal)->update([
        //     'id_staff' => $dashboardStaff,
        //     'id_rfid' => $dashboardRfid,
        //     'prefix' => $dashboardPrefix,
        //     'name_first' => $dashboardFirst,
        //     'name_last' => $dashboardLast,
        //     // 'site' => $dashboardsite,
        //     'id_role' => $dashboardRole,
        //     'id_shif' => $dashboardShif
        // ]);

        // $data = Staff::where('id_staff','0997')->get();
        // 'staff_img' => $dashboardimg
        return response()-> json([

            'id_staff' => $dashboardStaff,
            'id_rfid' => $dashboardRfid,
            'prefix' => $dashboardPrefix,
            'name_first' => $dashboardFirst,
            // 'name_first_change' => $oldData['name_first'],
            'name_last' => $dashboardLast,
            // 'site' => $dashboardsite,
            'id_role' => $dashboardRole,
            'id_shif' => $dashboardShif
            // 'staff_img' => $dashboardimg
        ]);
   }


   //Deleting dashboard.

   public function destroy($dashboard)
   {
    try
    {
      
        Staff::where('id_staff', $dashboard)->delete();
        
    }
    catch(Exception $e)
    {
        Log::error($e);
    }
   }


   //storing new dashboard.

   public function store(Request $request)
   {
    try
    {

        $dashboardStaff = $request->get('dashboardStaffID');
        $dashboardRfid = $request->get('dashboardRfid');
        $dashboardPrefix = $request->get('dashboardPrefix');
        $dashboardFirst = $request->get('dashboardFirst');
        $dashboardLast = $request->get('dashboardLast');
        $dashboardsite = $request->get('dashboardsite');
        $dashboardRole = $request->get('dashboardRole');
        $dashboardShif = $request->get('dashboardShif');
        // $dashboardimg = $request->get('dashboardimg');
        
        Staff::create([

            'id_staff' => $dashboardStaff,
            'id_rfid' => $dashboardRfid,
            'prefix' => $dashboardPrefix,
            'name_first' => $dashboardFirst,
            'name_last' => $dashboardLast,
            // 'site' => $dashboardsite,
            'dashboardRole' => $dashboardRole,
            'dashboardShif' => $dashboardShif
            // 'dashboardimg' => $dashboardimg

        ]);

        return response()-> json([


            'id_staff' => $dashboardStaff,
            'id_rfid' => $dashboardRfid,
            'prefix' => $dashboardPrefix,
            'name_first' => $dashboardFirst,
            'name_last' => $dashboardLast,
            // 'site' => $dashboardsite,
            'dashboardRole' => $dashboardRole,
            'dashboardShif' => $dashboardShif
            // 'dashboardimg' => $dashboardimg
        ]);    
    }
    catch(Exception $e)
    {
        Log::error($e);
    }

 }
 public function search($key)
   {
    return Staff::where('id_staff',$key)->get();
   }

   public function checkStatusButton($id)
   {
    return Approve::where('id_approve',$id)->get('status');
   }
}