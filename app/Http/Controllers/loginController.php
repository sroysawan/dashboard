<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Models\Login;
use App\Models\UserSetting;
use Log;
use Exception;


class loginController extends Controller
{
    //
    public function authLogin(Request $request){
        try{
            // return response() -> json('TEST API.');
            $data=$request->only('id','pass');
            $user=Login::where('user_id',$data['id'])->first();
            if(!$user){
                return response() -> json([
                    'status'=>false,
                    'level'=>null,
                    'message'=>'not found user.',
                ]);
            }
            else{
                if($user->user_password != $data['pass']){
                    return response() -> json([
                        'status'=>false,
                        'level'=>null,
                        'message'=>'wrong password.',
                    ]);
                }
                else{
                    return response() -> json([
                        'status'=>true,
                        'level'=>$user->role,
                        'message'=>'successful.',
                    ]);
                }
            }

        }

        catch(Exception $error){
            
            Log::error($error);
            
        }
    }

    public function userSetting(Request $request)
{
    try {
        $userSetting = UserSetting::where('user_id', $user_id)->first();

        if (!$userSetting) {
            $userSetting = new UserSetting();
            $userSetting->user_id = $user_id;
        }

        $userSetting->setting_1 = $request->setting_1;
        $userSetting->setting_2 = $request->setting_2;
        $userSetting->setting_3 = $request->setting_3;
        $userSetting->save();

        return response()->json(['message' => 'User settings saved successfully']);
    } catch (\Exception $e) {
        // คุณสามารถใช้หรือบันทึกข้อผิดพลาดที่เกิดขึ้นใน $e->getMessage()
        return response()->json(['error' => 'An error occurred while saving user settings'], 500);
    }
}

}
