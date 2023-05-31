<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Log;
use Exception;
use App\Models\Staff;
use App\Models\Role;
use App\Models\Prefix;
use App\Models\Approve;
use Illuminate\support\Carbon;
use Illuminate\support\Facades\DB;
use Illuminate\support\Facades\File; 
use Shuchkin\SimpleXLSX;
use Shuchkin\SimpleXLS;

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
                    ->orWhere('role.id_role', '=', '9')
                    ->orWhere('role.id_role', '=', '11');
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
        $checkApprove = Approve::where('id_staff',$request->get('dashboardId'))->orderBy('update_history','desc')->first();
        $isClear = true;
        if(empty($checkApprove) || $checkApprove['status']!=2){
            $isClear = false;
        }
        $dashboardData[0]->approve_status = $isClear;
        return response()->json($dashboardData[0]);
    }
    catch(Exception $e)
    {
        Log::error($e);
    }
   }

   public function uploadFileImage(Request $request){
    try{
        $request->validate([
            'file' => 'required|file|max:4096', // max file size is 4MB
        ]);
        $file = $request->file('file');
        $fileName = $file->getClientOriginalName();
        // return response() -> json($fileName);
        // Store the file in the public/images/machines directory
        $filePath = $file->move(public_path('images/staff'), $fileName);
        // Save the file information to the database
        // $fileData = new File();
        // $fileData->name = $fileName;
        // $fileData->path = '/images/machines/'.$filePath;
        // $fileData->save();

        return redirect()->back()->with('success', 'File uploaded successfully.');
        // return response() -> json(['event'=>'upload_image','status' => 'OK']);
    }
    catch(Exception $error){
        Log::error($error);
    }
}

public function updateFileImage(Request $request){
    try{
        
        $request->validate([
            'file' => 'required|file|max:4096', // max file size is 4MB
            'id_staff' => 'required',
        ]);
        $file = $request->file('file');
        $id = $request->input('id_staff');
        $check_img = Staff::where('id_staff', $id)->first();
        // return response() -> json($check_img);
        $path = public_path('images/staff/' . $check_img->staff_img);
                            if (File::exists($path)) {
                                File::delete($path);
                            }
        
        $fileName = $file->getClientOriginalName();
        // return response() -> json($fileName);
        // Store the file in the public/images/machines directory
        $filePath = $file->move(public_path('images/staff'), $fileName);
        Staff::where('id_staff', $id)->update([
            'staff_img'=>$fileName,
        ]);
        // Save the file information to the database
        // $fileData = new File();
        // $fileData->name = $fileName;
        // $fileData->path = '/images/machines/'.$filePath;
        // $fileData->save();

        return redirect()->back()->with('success', 'File uploaded successfully.');
        // return response() -> json(['event'=>'upload_image','status' => 'OK']);
    }
    catch(Exception $error){
        Log::error($error);
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
        $roleLogin =$request->get('dashboardLogin');
        // $dashboardimg =$request->get('dashboardimg');
        // return response() -> json($roleLogin);
        $data="";
        $oldData = Staff::where('id_staff',$dashboardIdModal)->first();
        $before_prefix = DB::table('prefix')->select('prefix')->where('id_prefix',$oldData['prefix'])->first();
        $after_prefix = DB::table('prefix')->select('prefix')->where('id_prefix',$dashboardPrefix)->first();
        $before_role = DB::table('role')->select('role')->where('id_role',$oldData['id_role'])->first();
        $after_role = DB::table('role')->select('role')->where('id_role',$dashboardRole)->first();
        
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
            'id_manager' => $roleLogin,
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

   public function addStaff(Request $request){
    try{
        $staff = $request->get('data');
        // return response() -> json($staff['id_staff']);
        Staff::create([
            'id_staff' =>$staff['id_staff'],
            'id_rfid' =>$staff['id_rfid'],
            'prefix' =>$staff['prefix'],
            'name_first' =>$staff['name_first'],
            'name_last' =>$staff['name_last'],
            // 'site' => '-',
            'status_staff'=>2,
            'id_role'=>$staff['id_role'],
            'id_shif'=>$staff['id_shif'],
            'staff_img' => $staff['img'],
        ]);
        return response() -> json(['status'=>'OK', 'method'=>'Create']);
    }
    catch(Exception $e){
        {
            Log::error($e);
            return response() -> json($e);
        }
    }
   }

   //upload file to public storage in laravel project
   public function UploadFileImport(Request $request){
    try{
        $file = $request->file('file');
        $fileName = $file->getClientOriginalName();
        // return response() -> json($fileName);
        // Store the file in the public/images/machines directory
        $filePath = $file->move(public_path('import/'), $fileName);
        return response() -> json(['event'=>'upload_import_file','status' => 'OK']);

    }
    catch(Exception $e){
        Log::error($e);
        return response() -> json($e);
    }
   }


    //Upload file staff
   public function addStaffUpload(Request $request){
    try{
        ini_set('error_reporting', E_ALL);
            ini_set('display_errors', true);

            // require_once __DIR__.'/../vendor/autoload.php';
            // include __DIR__.'/../src/SimpleXLS.php';
            // include __DIR__.'/../src/SimpleXLSX.php';

            $data = $request->all();
            $filename = $data['filename'];
            $filePath = public_path('import/'.$filename);
            // return response()->json($filename);

            // Check if the file exists in the specified path
            if (file_exists($filePath)) {
                $extension = pathinfo($filePath, PATHINFO_EXTENSION);
                $fileContents = file_get_contents($filePath);
                $allowed_types = array('xlsx','xls');

                if (!in_array($extension, $allowed_types)) {
                    return response() -> json(["status"=>"error","detail"=>"Not file type .xlsx ."]);
                } else {
                    
                    if($extension == 'xls'){
                        $xlsx = SimpleXLS::parse($filePath);
                        // return response() -> json(["status"=>"OK","detail"=>"Found SimpleXLS"]);
                    }
                    elseif($extension == 'xlsx'){
                        $xlsx = SimpleXLSX::parse($filePath);
                        // return response() -> json(["status"=>"OK","detail"=>"Found SimpleXLSX"]);
                    }
                    // $sql = "UPDATE staff set 'status_staff'='2'";
                    
                    // return response()->json(['message' => 'QUERY SUCCESS']);

                    define("STAFF_ID", 1);
                    define("PREFIX", 2);
                    define("FIRST_NAME", 3);
                    define("LAST_NAME", 4);
                    define("SITE", 5);
                    define("ROLE", 6);
                    define("SHIF", 8);
                    define("RFID", 9);

                    $i = 0;
                    Staff::query()->update(['status_staff' => 0]);
                    foreach ($xlsx->rows() as $p => $fields)
                    {
                        $i++;

                        if ($i<3){
                            continue;
                        }
                        $id_staff = str_pad($fields[STAFF_ID], 4, "0", STR_PAD_LEFT);
                        // $sql = "SELECT id_staff FROM staff WHERE id_staff='" . $id_staff . "'";
                        $query_staff = Staff::where('id_staff',$id_staff)->first();
                        // if($i == 4){
                        //     return response()->json($query_staff);
                        // }    
                        
                        if (empty($query_staff)){

                            $role = Role::select('id_role')->where('role', $fields[ROLE])->first();
                            $prefix = Prefix::select('id_prefix')->where('prefix', $fields[PREFIX])->first();
                            // return response()->json([$role, $prefix]);
                            // $sql = "INSERT INTO staff (id_staff, prefix, name_first, name_last, site, id_role, id_shif, id_rfid, status_staff) VALUES (";
                            // $sql = $sql . "'" . $id_staff . "', " . "(SELECT id_prefix FROM prefix WHERE prefix='" . $fields[PREFIX] . "'), '" .
                            //     $fields[FIRST_NAME] . "', '" .
                            //     $fields[LAST_NAME] . "', '" .
                            //     $fields[SITE] . "', " . "(SELECT id_role FROM role WHERE role='" . $fields[ROLE] . "'), '" .
                            //     $fields[SHIF] . "', '" .
                            //     $fields[RFID] . "', '" .
                            //     "1" . "')";
                            Staff::create([
                                'id_staff'=>$id_staff,
                                'id_rfid'=>$fields[RFID],
                                'prefix'=>$prefix->id_prefix,
                                'name_first'=>$fields[FIRST_NAME],
                                'name_last'=>$fields[LAST_NAME],
                                'site'=>$fields[SITE],
                                'id_role'=>$role->id_role,
                                'id_shif'=>$fields[SHIF],
                                'status_staff'=>1,
                                'staff_img'=>'-',
                            ]);
                                
                            // DB::query($sql);
                            
                        }
                        else{
                            // $sql = "UPDATE staff set status_staff=1 WHERE id_staff=".$fields[STAFF_ID];
                            Staff::where('id_staff',$id_staff)->update(['status_staff'=>1]);
                        }
                    }
                    
                } 
            }
            else {
                return response()->json(['message' => 'File not found']);
            }
            return response()->json(['message' => 'Import Success.']);
    }
    catch(Exception $e){
        Log::error($e);
        return response() -> json($e);
    }
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