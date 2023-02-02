<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Log;
use Exception;
use App\Models\Staff;
use Illuminate\support\Carbon;
use Illuminate\support\Facades\DB;

class staffController extends Controller
{
    
    public function getInfoStaff(){
        try{
            $staff = DB::table('staff')
            ->select('*')
            ->join('role','role.id_role','=','staff.id_role')
            ->join('prefix','prefix.id_prefix','=','staff.prefix')    
            ->orderBy('name_first', 'asc')       
            ->get();
            return response()-> json($staff);

        }
        catch(Exception $error)
    {
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
        Staff::where('id_staff',$dashboardIdModal)->update([
            'id_staff' => $dashboardStaff,
            'id_rfid' => $dashboardRfid,
            'prefix' => $dashboardPrefix,
            'name_first' => $dashboardFirst,
            'name_last' => $dashboardLast,
            // 'site' => $dashboardsite,
            'id_role' => $dashboardRole,
            'id_shif' => $dashboardShif
        ]);

        // $data = Staff::where('id_staff','0997')->get();
        // 'staff_img' => $dashboardimg
        return response()-> json([

            'id_staff' => $dashboardStaff,
            'id_rfid' => $dashboardRfid,
            'prefix' => $dashboardPrefix,
            'name_first' => $dashboardFirst,
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
}