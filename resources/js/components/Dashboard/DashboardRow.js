import React, { Component } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { FaCommentsDollar, FaFlag } from "react-icons/Fa";
import Blink from 'react-blink-text';
import DashboardButton from './Buttons/DashboardButton';
import DashboardButton2 from './Buttons/DashboardButton2';

var frequency = 10000; // 10 seconds in miliseconds
var interval_update = 0;

var qty_accum;
var percent;
var run_time_open;
var runtimes;

class DashboardRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ColorRuntime: 'black'
          }
    }

    componentDidMount=() =>{
        //console.log(this.props.data.run_time_std);
        //console.log(this.props.data.qty_per_pulse2);
        this.getRuntimecolor(this.props.data.run_time_actual,this.props.data.run_time_std,this.props.data.status_work);
    }

    //Data in Table on Dashboard
    //Status
    getStatusColor = (status_work) =>{    
        if (status_work === 0 || status_work==3 || status_work==5 || status_work==6) return 'blue';
        if (status_work === 1 || status_work==7 ) return 'green';
        if (status_work === 2 ) return 'orange';
        if (status_work === 4 ) return 'red';     
    }
    getIdstaff = (status_work) =>{    
        if (status_work === 0 || status_work==3 || status_work==5 || status_work==6) return '';
        if (status_work === 1 ) return this.props.data.id_staff;
        if (status_work === 2 ) return this.props.data.id_staff;
        if (status_work === 4 ) return this.props.data.id_staff;
        if (status_work === 7 ) return this.props.data.id_staff + '\n' + 'RW';
        return '';
    }
    getDowntime = (id_code_downtime,status_work) =>{    
        if ((id_code_downtime !== "-") && !(status_work === 0 || status_work==3 || status_work==5 || status_work==6)) return this.props.data.id_code_downtime;
        else return '';
    }

    // getDowntime = (status_work) =>{    
    //     if (status_work==4) return this.props.data.id_code_downtime;
    //     else return '';
    // }
    
    // getNAruntime = (status_work,run_time_actual) =>{
    //     if (status_work === 0 || status_work==3 || status_work==5 || status_work==6) 
    //     return run_time_actual = 'N/A';
    // }

    //Due_Date
    getformatDate(value) {
        let date = new Date(value);
        const day = date.toLocaleString('default', { day: '2-digit' });
        const month = date.toLocaleString('default', { month: '2-digit' });
        const year = date.toLocaleString('default', { year: 'numeric' });
        return day + '-' + month + '-' + year;
    }

    //Qty accum/Qty order
    getAccum = (qty_complete,qty_process,divider,qty_repeat) =>{           
        qty_accum = qty_complete + Math.floor(qty_process*divider);
        //qty_accum = qty_accum-qty_repeat;  //ไม่มี repeat ใน new db ********
        if (divider == '' ){
            return '';
        }else{
            //console.log(qty_accum);
            return qty_accum;
        }
    }

    //Progress
    getPercent = (qty_order) =>{ 
        percent = Math.round(qty_accum/qty_order*100);
        if (qty_order == '' ){
            return '';
        }else{
            //console.log(percent);
            return percent;
        }
    }
    getBlinkProgress = (qty_order) =>{
        if (qty_order - qty_accum <= 500){
            return  <Blink text={<ProgressBar /*className='progress-bar-color'*/ variant='warning' min={0} max={100} now={this.getPercent(this.props.data.qty_order)} label={`${this.getPercent(this.props.data.qty_order)}%` }/>} ></Blink>
        }else {
            return <ProgressBar min={0} max={100} now={this.getPercent(this.props.data.qty_order)} label={`${this.getPercent(this.props.data.qty_order)}%` }/>;
        }
    }

    //RunTime
    getRuntime = (run_time_actual,run_time_std,status_work) =>{
        const options = {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        };

        //if (status_work === 0 || status_work==3 || status_work==5 || status_work==6) return run_time_actual= 'N/A';
        //if (status_work === 0 || status_work==3 || status_work==5 || status_work==6) return run_time_actual = 0;
        runtimes = run_time_actual.toLocaleString('en-US', options) + ' / ' + run_time_std.toLocaleString('en-US', options);
        // if(run_time_actual === 0 ) return "N/A"
        // runtimes = run_time_actual + ' / ' + run_time_std;
        return runtimes;
    }
    getFlagcolor =(run_time_actual,run_time_std,status_work) =>{
    if (status_work === 0 || status_work==3 || status_work==5 || status_work==6) return <FaFlag color="black"/>;
    if(run_time_actual>run_time_std){
        return  <Blink className="text-runtime" text={<FaFlag/>} color="red" fontSize='5'></Blink>;
    }
    else {
        return  <FaFlag color="black"/>;
    }
    }
    getRuntimecolor =(run_time_actual,run_time_std) =>{ 
    if(run_time_actual>run_time_std){
            this.setState({
                ColorRuntime:'red'
            })
        }
    else {
        this.setState({
            ColorRuntime:'black'
        })
    }
}

    //Total Open Run Time
    getTotal = (qty_order,run_time_std) =>{
    run_time_std = parseInt(run_time_std);
    run_time_open = ((qty_order-qty_accum)*run_time_std);
    const seconds_of_a_day = 86400;
    var run_time_open_temp;
    var run_time_day=0, run_time_hr=0, run_time_min=0, run_time_sec=0;
    run_time_open_temp = run_time_open;
    run_time_day = Math.floor(run_time_open_temp/seconds_of_a_day);
    run_time_open_temp %= seconds_of_a_day;
    run_time_hr = Math.floor(run_time_open_temp/3600);
    run_time_open_temp %= 3600;
    run_time_min = Math.floor(run_time_open_temp/60);
    run_time_sec = run_time_open_temp % 60;
    
    const options_run_time_open = {
        minimumIntegerDigits: 2,
        useGrouping: false
    }
    var total_time = run_time_day + " days\n" + run_time_hr.toLocaleString('en-US', options_run_time_open) + ":" + run_time_min.toLocaleString('en-US', options_run_time_open) + ":" + run_time_sec.toLocaleString('en-US', options_run_time_open);
    // var total_time = run_time_day + " days\n" + run_time_hr + ":" + run_time_min + ":" + run_time_sec;
    if (run_time_hr<0 || run_time_min<0 || run_time_sec<0) return 'N/A';
    else 
    return total_time;       
    }

    //Estimated finish
    getEsDateTime = (qty_order,run_time_std,run_time_actual) =>{
        run_time_std = parseInt(run_time_std);
        run_time_open = ((qty_order-qty_accum)*run_time_std);
        const seconds_of_a_day = 86400;
        var run_time_open_temp;
        var est_time;
        var time_now, now_hr, now_min, now_sec;
        var now_date;
        var run_time_day=0, run_time_hr=0, run_time_min=0, run_time_sec=0;
        run_time_open_temp = run_time_open;
        run_time_day = Math.floor(run_time_open_temp/seconds_of_a_day);
        run_time_open_temp %= seconds_of_a_day;
        run_time_hr = Math.floor(run_time_open_temp/3600);
        run_time_open_temp %= 3600;
        run_time_min = Math.floor(run_time_open_temp/60);
        run_time_sec = run_time_open_temp % 60;
        time_now = new Date().getTime();
        now_date = new Date().getDate();
        now_hr = parseInt(new Date(time_now).toLocaleTimeString('es-CL').substr(0, 2));
        now_min = parseInt(new Date(time_now).toLocaleTimeString('es-CL').substr(3, 2));
        now_sec = parseInt(new Date(time_now).toLocaleTimeString('es-CL').substr(6, 2));
        const break_3am_start = 10800;
        const break_3am_stop = 12600;
        const break_11am_start = 39600;
        const break_11am_stop = 41400;
        const break_6pm_start = 64800;
        const break_6pm_stop = 66600;
        var midnight = new Date();
        midnight.setHours( 0 );
        midnight.setMinutes( 0 );
        midnight.setSeconds( 0 );
        midnight.setMilliseconds( 0 );
        var seconds_of_this_day=0,seconds_to_complete=0;
        seconds_of_this_day = Math.floor((new Date().getTime() - midnight.getTime())/1000);

        if (run_time_day>0){
            run_time_open = run_time_open + (run_time_day*5400);                        // ADD 3 BREAKS IN CASE THE WORKING DAYS > 0
        }
        run_time_open_temp = run_time_open % seconds_of_a_day;                          // FIND SECONDS IN A DAY TO COMPLETE -- FROM MIDNIGHT
        seconds_to_complete = run_time_open_temp + seconds_of_this_day;                 // FIND SECONDS IN A DAY TO COMPLETE -- FROM NOW

        if (seconds_to_complete > break_3am_start){                                     // IF COMPLETE TIME AFTER BREAK TIME 3AM TODAY
            if (seconds_of_this_day < break_3am_start){                                 // AND NOW IS NOT 3AM YET
                run_time_open += 1800;                                                  // ADD FULL BREAK DURATION
            }
            else if (seconds_of_this_day < break_3am_stop) {                            // BUT IF NOW IS DURING THE BREAK TIME TODAY
                run_time_open = run_time_open + (break_3am_stop - seconds_of_this_day); // ADD ONLY THE DIFFERENCE
            }
        }
        if (seconds_to_complete > break_11am_start){                                    // IF COMPLETE TIME AFTER BREAK TIME 11AM TODAY
            if (seconds_of_this_day < break_11am_start){                                // AND NOW IS NOT 11AM YET
                run_time_open += 1800;                                                  // ADD FULL BREAK DURATION
            }
            else if (seconds_of_this_day < break_11am_stop) {                           // BUT IF NOW IS DURING THE BREAK TIME TODAY
                run_time_open = run_time_open + (break_11am_stop - seconds_of_this_day);// ADD ONLY THE DIFFERENCE
            }
        }
        if (seconds_to_complete > break_6pm_start){                                     // IF COMPLETE TIME AFTER BREAK TIME 6PM TODAY
            if (seconds_of_this_day < break_6pm_start){                                 // AND NOW IS NOT 6PM YET
                run_time_open += 1800;                                                  // ADD FULL BREAK DURATION
            }
            else if (seconds_of_this_day < break_6pm_stop) {                            // BUT IF NOW IS DURING THE BREAK TIME TODAY
                run_time_open = run_time_open + (break_6pm_stop - seconds_of_this_day); // ADD ONLY THE DIFFERENCE
            }
        }
        if (seconds_to_complete > seconds_of_a_day){
            var seconds_of_tomorrow = seconds_to_complete%seconds_of_a_day;
            if (seconds_of_tomorrow > break_3am_start){                                 // IF COMPLETE TIME AFTER BREAK TIME 3AM TOMORROW
                run_time_open += 1800;                                                  // ADD FULL BREAK DURATION
            }
            if (seconds_of_tomorrow > break_11am_start){                                // IF COMPLETE TIME AFTER BREAK TIME 11AM TOMORROW
                run_time_open += 1800;                                                  // ADD FULL BREAK DURATION
            }
            if (seconds_of_tomorrow > break_6pm_start){                                 // IF COMPLETE TIME AFTER BREAK TIME 6PM TOMORROW
                run_time_open += 1800;                                                  // ADD FULL BREAK DURATION
            }
        }
        // if(this.props.data.date_due == '0' || this.props.data.date_due == 'N/A'){
        //     est_time = new Date(time_now + (run_time_open*1000));
        //     var est_date = ('0');
        //     var est_times = ('0');
        //     var ar_est = [est_date,est_times];
        //     return ar_est;
        // }
        if(this.props.data.run_time_actual == '0' || this.props.data.run_time_actual == 'N/A'){
            est_time = new Date(time_now + (run_time_open*1000));
            var est_date = ('0');
            var est_times = ('0');
            var ar_est = [est_date,est_times];
            return ar_est;
        }
        else{
            est_time = new Date(time_now + (run_time_open*1000));
            var est_date = (est_time.toLocaleDateString('es-CL'));
            var est_times = (est_time.toLocaleTimeString('es-CL'));
            var ar_est = [est_date,est_times];
            return ar_est;
        }
        
    }

    //Next item,op
    getItem_2 = (item_no_2) =>{
        if(item_no_2 !== "-") return this.props.data.item_no_2;
        else return '';
    }
    getOp_2 = (operation_2) =>{
        if(operation_2 !== "-") return this.props.data.operation_2;
        else return '';
    }

//     getItemNo = (item_no) =>{
//         if(item_no!='')
//         return id_machine;
    
// }

    render() {
        return (           
            <tr>
                <td style={{ backgroundColor: this.getStatusColor(this.props.data.status_work) }}>
                <td style={{ color: 'white' }}>
                    {(this.getIdstaff(this.props.data.status_work) )} <br/>
                    {(this.getDowntime(this.props.data.id_code_downtime,this.props.data.status_work) )} 
                    </td>
                </td>
                <td>{ this.props.data.id_machine }</td>       
                <td><DashboardButton eachRowId= {this.props.data.id_machine}/>{ this.props.data.item_no }</td>                
                <td>{ this.props.data.operation }</td>  
                <td>{ this.props.data.op_color }</td>
                <td>{ this.props.data.op_side }</td>          
                <td>{ this.props.data.date_due }</td>                              
                {/* <td>{ this.getformatDate(this.props.data.date_due) }</td> */}
                <td>{ this.props.data.qty_per_pulse2 }</td>
                <td>{ this.getAccum(this.props.data.qty_complete,this.props.data.qty_process,this.props.data.divider) } / { this.props.data.qty_order }</td> 
                <td>{this.getBlinkProgress(this.props.data.qty_order)}</td>
                {/* <td>{ this.getFlagcolor(this.props.data.run_time_actual,this.props.data.run_time_std)}{this.getRuntime(this.props.data.run_time_actual,this.props.data.run_time_std)} </td>  */}
                <td style={{ color: this.state.ColorRuntime}}>{ this.getFlagcolor(this.props.data.run_time_actual,this.props.data.run_time_std,this.props.data.status_work)}{this.getRuntime(this.props.data.run_time_actual,this.props.data.run_time_std,this.props.data.status_work)} </td>                  
                <td>{ this.getTotal(this.props.data['qty_order'],this.props.data['run_time_std']) }</td>    
                <td>{ this.getEsDateTime(this.props.data['qty_order'],this.props.data['run_time_std'])[0] }</td>  
                <td>{ this.getEsDateTime(this.props.data['qty_order'],this.props.data['run_time_std'])[1] }</td> 
                <td><DashboardButton2 eachRowId= {this.props.data.id_machine}/>{ this.getItem_2(this.props.data.item_no_2) }</td> 
                <td>{ this.getOp_2(this.props.data.operation_2) }</td>           
            </tr>
        );
    }
}

export default DashboardRow;
                                                                                         