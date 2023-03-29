import React, { Component, forEach } from "react";
import axios from "axios";
import Clock from "react-digital-clock";
import "./dashboardStyle.css";
import ProgressBar from 'react-bootstrap/ProgressBar';
import { FaFlag, FaSearch } from "react-icons/Fa";
import Blink from 'react-blink-text';
import DashboardButton from './Buttons/DashboardButton';
import DashboardButton2 from './Buttons/DashboardButton2';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DraggableHeader from "./DraggableHeader";

var tempData = [];
var qty_accum;
var percent;
var run_time_open;
var runtimes;
class DataDashboard extends Component {
    constructor(props) { 
        super(props); 
        this.state = {
            searchValue: "",
            DashboardRefresh: [],
            TempDashboardRefresh: [],
            ColorRuntime: 'black',       
            columnOrder: [
                'Status', 
                'M/C', 
                'Item number', 
                'Op.', 'Color', 
                'Side', 
                'Due Date', 
                'Qty per tray', 
                'Qty accum/Qty order', 
                'Progress (%)', 
                'Run time Actual/Std(Second)', 
                'Total open run time(Hr)',              
                'Estimated finish',
                // 'Date',
                // 'Time',
                'Next item number', 
                'Next Op.',
            ],
            // columnOrder: [
            //     {
            //         title: 'Status',
            //     },
            //     {
            //         title: 'M/C',
            //     },
            //     {
            //         title: 'Item Number',
            //     },
            //     {
            //         title: 'Op.',
            //     },
            //     {
            //         title: 'Color',
            //     },
            //     {
            //         title: 'Side',
            //     },
            //     {
            //         title: 'Due Date',
            //     },
            //     {
            //         title: 'Qty per tray',
            //     },
            //     {
            //         title: 'Qty accum/Qty order',
            //     },
            //     {
            //         title: 'Progress (%)',
            //     },
            //     {
            //         title: 'Run time Actual/Std(Second)',
            //     },
            //     {
            //         title: 'Total open run time(Hr)',
            //     },
            //     {
            //         title: 'Estimated finish',
            //         date: '',
            //         time: ''
            //     },
            //     {
            //         title: 'Next item number',
            //     },
            //     {
            //         title: 'Next Op.',
            //     },
            // ],
            hiddenRows: new Set(),
            isRowHidden: false,    
    };
    this.toggleRowVisibility = this.toggleRowVisibility.bind(this);
}

    componentDidMount = () => {
        this.getDashboardRefresh();
        // this.getRuntimecolor(this.props.run_time_actual,this.props.run_time_std,this.props.status_work);
    };

    getDashboardRefresh = () => {
        let self = this;
        axios.get("/update/DashboardRefresh/").then(function (response) {
            console.log(response.data);
            self.setState({
                DashboardRefresh: Object.values(response.data),
                TempDashboardRefresh: Object.values(response.data),
            });
            console.log(Object.values(response.data));
        });
    };

    searchData = (event) => {
        this.state.TempDashboardRefresh.map((x) => {
            if (
                x.operation.toLowerCase().includes(event.target.value.toLowerCase()) ||
                x.id_machine.toLowerCase().includes(event.target.value.toLowerCase()) ||
                x.item_no.toLowerCase().includes(event.target.value.toLowerCase()) ||
                x.item_no_2.toLowerCase().includes(event.target.value.toLowerCase()) ||
                x.operation_2.toLowerCase().includes(event.target.value.toLowerCase())
            ) {
                tempData.push(x);
                this.setState({
                    searchValue: event.target.value,
                    DashboardRefresh: tempData,
                });
                console.log(event.target.value);
                console.log(tempData);
            } else if (event.target.value === "") {
                this.setState({
                    DashboardRefresh: TempDashboardRefresh,
                    searchValue: event.target.value,
                });
            } else if (
                this.setState({
                    searchValue: event.target.value,
                    DashboardRefresh: tempData,
                }) === -1
            ) {
            }
        });
        tempData = [];
    };

    //reorder
    moveHeader = (dragIndex, hoverIndex) => {
        const columnOrder = [...this.state.columnOrder];
        const draggedHeader = columnOrder[dragIndex];
        columnOrder.splice(dragIndex, 1);
        columnOrder.splice(hoverIndex, 0, draggedHeader);
        this.setState({ columnOrder });
    };

    //hide-bt
    toggleRowVisibility() {
        if (this.state.isRowHidden) {
            // หากแถวถูกซ่อนอยู่แล้ว ให้แสดงแถวทั้งหมด
            this.setState({ hiddenRows: new Set(), isRowHidden: false });
          } else {
            // หากแถวไม่ถูกซ่อน ให้ซ่อนแถวตามเงื่อนไข
        const hiddenRows = new Set();
        this.state.DashboardRefresh.forEach((item, index) => {
            const status_work = item.status_work;
            // const nextQueue = item.item_no_2;
            if (status_work  === '') {
                hiddenRows.add(index);
            }
        });
        this.setState({ hiddenRows, isRowHidden: true });
      }
    }

    //Data in Table on Dashboard
    //Status
    getStatusColor = (status_work) =>{    
      if (status_work === 0 || status_work==3 || status_work==5 || status_work==6) return 'blue';
      if (status_work === 1 || status_work==7 ) return 'green';
      if (status_work === 2 ) return 'orange';
      if (status_work === 4 ) return 'red';     
  }
  getIdstaff = (status_work,id_staff) =>{    
      if (status_work === 0 || status_work==3 || status_work==5 || status_work==6) return '';
      if (status_work === 1 ) return id_staff;
      if (status_work === 2 ) return id_staff;
      if (status_work === 4 ) return id_staff;
      if (status_work === 7 ) return id_staff + '\n' + 'RW';
      return '';
  }
  getDowntime = (id_code_downtime,status_work) =>{    
      if ((id_code_downtime !== "-") && !(status_work === 0 || status_work==3 || status_work==5 || status_work==6)) return id_code_downtime;
      else return '';
  }

  //Due_Date
  getformatDate(value) {
      let date = new Date(value);
      const day = date.toLocaleString('default', { day: '2-digit' });
      const month = date.toLocaleString('default', { month: '2-digit' });
      const year = date.toLocaleString('default', { year: 'numeric' });
      return day + '-' + month + '-' + year;
  }

  //Qty accum/Qty order
  getAccum = (qty_complete,qty_process,divider,qty_order) =>{           
      qty_accum = qty_complete + Math.floor(qty_process*divider);
      //qty_accum = qty_accum-qty_repeat;  //ไม่มี repeat ใน new db ********
      if (divider == '' ){
          return '';
      }else{
          //console.log(qty_accum);
          return qty_accum + ' / ' + qty_order;
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
  getBlinkProgress = (qty_order,status_work) =>{
    if (status_work === '') {
        return null;
    }else if (qty_order - qty_accum <= 500){
          return  <Blink text={<ProgressBar /*className='progress-bar-color'*/ variant='warning' min={0} max={100} now={this.getPercent(qty_order)} label={`${this.getPercent(qty_order)}%` }/>} ></Blink>
      }else if(qty_order - qty_accum > 500) {
          return <ProgressBar min={0} max={100} now={this.getPercent(qty_order)} label={`${this.getPercent(qty_order)}%` }/>;
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
      if (status_work === '') {
        return null;
    } else if
      (runtimes = run_time_actual.toLocaleString('en-US', options) + ' / ' + run_time_std.toLocaleString('en-US', options)){
      // if(run_time_actual === 0 ) return "N/A"
      // runtimes = run_time_actual + ' / ' + run_time_std;
      return runtimes;
      }
  }
  getFlagcolor =(run_time_actual,run_time_std,status_work) =>{
    if (status_work === '') {
        return null;
    }
    else if (status_work === 0 || status_work==3 || status_work==5 || status_work==6) return <FaFlag color="black"/>;
  if(run_time_actual>run_time_std){
      return  <Blink className="text-runtime text-center" text={<FaFlag/>} color="red" fontSize='5'></Blink>;
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
  getTotal = (qty_order,run_time_std,status_work) =>{
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
  if (status_work === '') {
    return null;
}
  if (run_time_hr<0 || run_time_min<0 || run_time_sec<0) return 'N/A';
  else 
  return total_time;       
  }

  //Estimated finish
  getEsDateTime = (qty_order,run_time_std,run_time_actual,status_work) =>{
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

      if(run_time_actual === '' || status_work === ''){
          est_time = new Date(time_now + (run_time_open*1000));
          var est_date = ('');
          var est_times = ('');
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
      if(item_no_2 !== "-") return item_no_2;
      else return '';
  }
  getOp_2 = (operation_2) =>{
      if(operation_2 !== "-") return operation_2;
      else return '';
  }

  renderCell(item, columnName) {
    switch (columnName) {
        case 'Status':
            return (
                <td style={{ backgroundColor: this.getStatusColor(item.status_work) }}>
                                        <td style={{color: 'white' }}>
                                            {(this.getIdstaff(item.status_work,item.id_staff) )}
                                            {(this.getDowntime(item.id_code_downtime,item.status_work,item.id_staff) )} 
                                            </td>
                </td>
            );
        case 'M/C':
            return <td className="text-db-center">{item.id_machine}</td>;
        case 'Item number':
            return <td className="text-db-left"><DashboardButton eachRowId= {item.id_machine}/>{ item.item_no }</td>;  
        case 'Op.':
            return <td className="text-db-center">{ item.operation }</td>;
        case 'Color':
            return <td className="text-db-center">{ item.op_color }</td>;
        case 'Side':
            return <td className="text-db-center">{ item.op_side }</td>;
        case 'Due Date':
            return <td className="text-db-center">{ item.date_due }</td>;
        case 'Qty per tray':
            return <td className="text-db-center">{ item.qty_per_pulse2 }</td>;
        case 'Qty accum/Qty order':
            return <td className="text-db-left">{ this.getAccum(item.qty_complete,item.qty_process,item.divider,item.qty_order) }</td>;
        case 'Progress (%)':
            return <td className="text-db-center">{this.getBlinkProgress(item.qty_order,item.status_work)}</td>;
        case 'Run time Actual/Std(Second)':
            return  (
                <td style={{ color: this.state.ColorRuntime}}>{ this.getFlagcolor(item.run_time_actual,item.run_time_std,item.status_work)}{this.getRuntime(item.run_time_actual,item.run_time_std,item.status_work)} 
                </td>
                );
        case 'Total open run time(Hr)':
            return <td className="text-db-left">{ this.getTotal(item['qty_order'],item['run_time_std'],item.status_work) }</td>;
        case 'Estimated finish':
            return (
                <td className="text-db-left">
                    {this.getEsDateTime(item['qty_order'], item['run_time_std'], item.status_work)[0]} &nbsp;
                    {this.getEsDateTime(item['qty_order'], item['run_time_std'], item.status_work)[1]}
                </td>
            );
        // case 'Date':
        //     return null;
        // case 'Time':
        //     return null;
        case 'Next item number':
            return <td className="text-db-left"><DashboardButton2 eachRowId= {item.id_machine}/>{ this.getItem_2(item.item_no_2) }</td>;
        case 'Next Op.':
            return <td className="text-db-center">{ this.getOp_2(item.operation_2) }</td>;
        default:
            return null;
    }
}

    render() {
        return (
            <div>
                <header className="page-header page-header-dark pb-5"></header>
                <div className="container-fluid px-4 mt-n10">
                    <div className="card mb-4 w-100">
                        <div className="card-header bg-red fw-bold text-white fs-4 d-flex justify-content-between bg-danger">
                            <div>Job overview by Machine</div>
                            <Clock />
                        </div>
                        <div className="card-header text-black">
                            <div className="d-flex">
                                <div className="p-2 custom-div">
                                    <input
                                        className="hide-bt"
                                        type="checkbox"
                                        style={{ margin: "5px" }}
                                        onClick={this.toggleRowVisibility}
                                    />
                                    <label className="hide-label">
                                    Hide unassigned machines
                                    (ซ่อนเครื่องไม่มีงาน) 
                                    </label>
                                </div>
                                <div className="p-2-left ">
                                    <div
                                        style={{
                                            display: "inline-block",
                                            margin: "5px",
                                            backgroundColor: "blue",
                                            borderRadius: "2px",
                                            width: "40px",
                                            height: "25px",
                                            verticalAlign: "middle",
                                        }}
                                    />
                                    Machine not working (เครื่องว่าง)
                                    <div
                                        style={{
                                            display: "inline-block",
                                            margin: "5px",
                                            backgroundColor: "green",
                                            borderRadius: "2px",
                                            width: "40px",
                                            height: "25px",
                                            verticalAlign: "middle",
                                        }}
                                    />
                                    Machine working (เครื่องทำงาน)
                                    <div
                                        style={{
                                            display: "inline-block",
                                            margin: "5px",
                                            backgroundColor: "orange",
                                            borderRadius: "2px",
                                            width: "40px",
                                            height: "25px",
                                            verticalAlign: "middle",
                                        }}
                                    />
                                    Idle machine (เครื่องเบรก)
                                    <div
                                        style={{
                                            display: "inline-block",
                                            margin: "5px",
                                            backgroundColor: "red",
                                            borderRadius: "2px",
                                            width: "40px",
                                            height: "25px",
                                            verticalAlign: "middle",
                                        }}
                                    />
                                    Malfunctioning machine (เครื่องเสีย)
                                </div>
                                <div className="ms-auto p-2"> 
                                <div className="input-wrapper">
                                    <FaSearch id="search-icon"/>
                                    <input
                                        className="search-input"
                                        placeholder= "Search"
                                        onChange={this.searchData}
                                    />
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                            <DndProvider backend={HTML5Backend}>
                                <table className="table table-bordered table-striped text-left">
                                    <thead>
                                    <tr className="bg-warning">
                                        {this.state.columnOrder.map((header, index) => (
                                            <DraggableHeader key={header} columnName={header} index={index} moveHeader={this.moveHeader} />
                                        ))}
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.DashboardRefresh.map((item, index) => (
                                            !this.state.hiddenRows.has(index) && (
                                                <tr key={index}>
                                                    {this.state.columnOrder.map((columnName) => this.renderCell(item, columnName))}
                                                </tr>
                                            )
                                        ))}
                                    </tbody>
                                </table>
                                </DndProvider>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DataDashboard;
