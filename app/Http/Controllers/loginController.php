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
}
