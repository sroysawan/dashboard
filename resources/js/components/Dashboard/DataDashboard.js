import React, { Component } from "react";
import axios from "axios";
import Clock from "react-digital-clock";
import './dashboardStyle.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { FaFlag, FaSearch } from "react-icons/Fa";
import Blink from 'react-blink-text';
import DashboardButton from './Buttons/DashboardButton';
import DashboardButton2 from './Buttons/DashboardButton2';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Navbars from "./Navbar/Navbars";
import ReactPaginate from "react-paginate";
import "bootstrap/dist/css/bootstrap.min.css";

var tempData = [];
var qty_accum;
var percent;
var run_time_open;
var runtimes;
class DataDashboard extends Component {
    constructor(props) { 
        super(props); 
        const savedWarningValue = parseFloat(localStorage.getItem('warningValue')) || 500;
        this.state = {
            searchValue: "",
            DashboardRefresh: [],
            SearchDashboard: [],
            ColorRuntime: 'black',       
            hiddenRows: new Set(),
            isRowHidden: JSON.parse(localStorage.getItem(localStorage.getItem('token')+'_hide')),    
            warningValue:parseFloat(localStorage.getItem(localStorage.getItem('token')+'_value')),
            inputWarning: '',
            sortConfig: { key: localStorage.getItem(localStorage.getItem('token')+'_sort'), direction: localStorage.getItem(localStorage.getItem('token')+'_sortDirection') },
            currentPage: 0,
            itemsPerPage: 50,
            isManager:false,
            isDataEntry:false,
            isForeman:false,
            settings: null

    };
    this.toggleRowVisibility = this.toggleRowVisibility.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateWarning = this.updateWarning.bind(this);
}

    componentDidMount = () => {
        
        this.interval = setInterval(this.getDashboardRefresh, 10000);
        var user = localStorage.getItem('token');
        console.log(JSON.parse(localStorage.getItem(localStorage.getItem('token')+'_hide')));
        console.log(localStorage.getItem('token')+'_value'+'--'+(localStorage.getItem(localStorage.getItem('token')+'_hide')+"--"+localStorage.getItem('token')+'_value'+((localStorage.getItem(localStorage.getItem('token')+'_value')))));
            if(user == 'Data Entry'){
                this.setState({
                    isDataEntry:true,
                    // warningValue:parseFloat(localStorage.getItem(user+'_value')),
                })
            }
            else if(user == 'Manager'){
                this.setState({
                    isManager:true,
                    // warningValue:parseFloat(localStorage.getItem(user+'_value')),
                })
            }
            else if(user == 'Foreman'){
                this.setState({
                    isForeman:true,
                    // warningValue:parseFloat(localStorage.getItem(user+'_value')),
                })
            }
            else{
                window.location.href = '/login';
            }
             this.getDashboardRefresh().then(()=>{
                const hiddenRows = new Set();
                if(this.state.isRowHidden){
                this.state.DashboardRefresh.forEach((item) => {
                const status_work = item.status_work;
                const id_machine = item.id_machine;
                // const item_no = item.item_no;
                    if (status_work  === '') {
                        // if (item_no  === '') {
                        hiddenRows.add(id_machine);
                    }
                });
                this.setState({ hiddenRows,});
            }
            // this.sortBy(localStorage.getItem(localStorage.getItem('token')+'_sort'),localStorage.getItem(localStorage.getItem('token')+'_sortDirection'));
        });
            
            

        // this.getRuntimecolor(this.props.run_time_actual,this.props.run_time_std,this.props.status_work);
    };

    componentWillUnmount() {
        clearInterval(this.interval);
    }

     getDashboardRefresh = () => { 
        let self = this;
        return axios.get("/update/DashboardRefresh/").then(function (response) {
            console.log(response.data);
            self.setState({
                DashboardRefresh: Object.values(response.data),
                SearchDashboard: Object.values(response.data),
            });
        });
    };

    //Pagination
    handlePageClick = (data) => {
        this.setState({ currentPage: data.selected });
    };
    handleItemsPerPageChange = (event) => {
        const itemsPerPage = parseInt(event.target.value);
        this.setState({ itemsPerPage, currentPage: 0 });
    };


    //hide-bt
    toggleRowVisibility =()=> {
        // console.log(this.state.isRowHidden);
        if (this.state.isRowHidden) {
            this.setState({ hiddenRows: new Set(), isRowHidden: false });
            localStorage.setItem(localStorage.getItem('token')+'_hide','false');
        } else {
            const hiddenRows = new Set();
            this.state.DashboardRefresh.forEach((item) => {
            const status_work = item.status_work;
            const id_machine = item.id_machine;
            // const item_no = item.item_no;
            if (status_work  === '') {
                // if (item_no  === '') {
                hiddenRows.add(id_machine);
            }
        });
        this.setState({ hiddenRows, isRowHidden: true });
        localStorage.setItem(localStorage.getItem('token')+'_hide','true');
        
        }
        console.log(localStorage.getItem(localStorage.getItem('token')+'_hide'));
        console.log(this.state.isRowHidden);
        // console.log(123);
    }
    // changeHiddenRow = () =>{
    //     if(localStorage.getItem(localStorage.getItem('token')+'_hide') === 'false'){
    //         localStorage.setItem(localStorage.getItem('token')+'_hide','true');
    //     }
    //     else{
    //         localStorage.setItem(localStorage.getItem('token')+'_hide','false');
    //     }
    //     console.log(localStorage.getItem(localStorage.getItem('token')+'_hide'));
    //     console.log(this.state.isRowHidden);
    // }
    
    // update warning progress
    handleChange = (event) => {
        const inputValue = event.target.value;
        const isNumber = /^\d+$/.test(inputValue);
        if (isNumber || inputValue === "") {
            this.setState({
                inputWarning: inputValue,
            });
        } 
    }
    updateWarning = () => {
        this.setState(prevState => {
            const newWarning = parseFloat(prevState.inputWarning);
            localStorage.setItem('warningValue', newWarning);
            localStorage.setItem(localStorage.getItem('token')+'_value',newWarning.toString());
            console.log(localStorage.getItem(localStorage.getItem('token')+'_value'));
            return {
                warningValue: newWarning,
                inputWarning: '',
            };
        });
    }

    //search
    searchData = (event) => {
        if(event.target.value != ""){
            clearInterval(this.interval);
        }
        else{
            this.interval = setInterval(this.getDashboardRefresh, 10000);
        }
        this.state.SearchDashboard.map((x) => {
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
            } else if (event.target.value === "") {
                this.setState({
                    DashboardRefresh: SearchDashboard,
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
    // moveHeader = (dragIndex, hoverIndex) => {
    //     const columnOrder = [...this.state.columnOrder];
    //     const draggedHeader = columnOrder[dragIndex];
    //     columnOrder.splice(dragIndex, 1);
    //     columnOrder.splice(hoverIndex, 0, draggedHeader);
    //     this.setState({ columnOrder });
    // };

    //sort
    sortBy =(key) =>{
        let direction = 'asc';
        if (
          this.state.sortConfig &&
          this.state.sortConfig.key === key &&
          this.state.sortConfig.direction === 'asc'
        ) {
          direction = 'desc';
        }
        localStorage.setItem(localStorage.getItem('token')+'_sort',key);
        localStorage.setItem(localStorage.getItem('token')+'_sortDirection',direction);
        console.log(localStorage.getItem(localStorage.getItem('token')+'_sort')+localStorage.getItem(localStorage.getItem('token')+'_sortDirection'));
        this.setState({ sortConfig: { key, direction } });
      }

      compare =(a, b, direction) =>{
        if (a === b) {
          return 0;
        } else if (a < b) {
          return direction === 'asc' ? -1 : 1;
        } else {
          return direction === 'asc' ? 1 : -1;
        }
      }
      
      renderSortingArrow = (columnKey) =>{
        if (this.state.sortConfig.key === columnKey) {
          return this.state.sortConfig.direction === 'asc' ? '▴' : '▾';
        }
        return '▴';
      }

    //Data in Table on Dashboard
    //Status
    getStatusColor = (status_work) =>{    
      if (status_work === 0 || status_work== 3 || status_work== 5 || status_work== 6) return 'blue';
      if (status_work === 1 || status_work== 'y' ) return 'green';
      if (status_work === 2 || status_work== 42 ) return 'orange';
      if (status_work === 4 ) return 'red';     
  }
  getIdstaff = (status_work,id_staff,type_activity) =>{    
      if (status_work === 0 || status_work==3 || status_work==5 || status_work==6) return '';
      if (type_activity === 'rw' && status_work === 1 || type_activity === 'rw' && status_work === 2) return id_staff + '\n' + 'RW';
      if (status_work === 1 ) return id_staff;
      if (status_work === 2 ) return id_staff;
      if (status_work === 4 ) return id_staff;
    //   if (type_activity === 'rw' ) return id_staff + '\n' + 'RW';
      return '';
  }
  getDowntime = (id_code_downtime,status_work,code_downtime,des_downtime_thai) =>{    
      if ((id_code_downtime !== "-") && !(status_work === 0 || status_work==3 || status_work==5 || status_work==6)) return des_downtime_thai;
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
      qty_accum = parseInt(qty_complete) + parseInt(qty_process);;
      if (divider == '' ){
          return '';
      }else{
        //   console.log(qty_accum);
          return Math.round(qty_accum) + ' / ' + qty_order;
      }

  }

  //Progress
//   getPercent = (qty_order) =>{ 
//       percent = Math.round(qty_accum/qty_order*100);
//       if (qty_order == '' ){
//           return '';
//       }else{
//           //console.log(percent);
//           return percent;
//       }
//   }
  getPercent = (qty_order) =>{ 
    percent = Math.round(parseInt(qty_accum) / parseInt(qty_order) * 100);
    if (qty_order == '' ){
        return '';
    }else{
        return percent;
    }
}

  getBlinkProgress = (qty_order,item_no,qty_percent) =>{
    if (item_no === '') {
        return null;
        
    }else if (qty_order - qty_accum <= this.state.warningValue){
          return  <Blink text={<ProgressBar variant='warning' min={0} max={100} now={this.getPercent(qty_order)} label={`${this.getPercent(qty_order)}%` }/>} ></Blink>
      }else if(qty_order - qty_accum > this.state.warningValue) {
          return <ProgressBar min={0} max={100} now={this.getPercent(qty_order)} label={`${this.getPercent(qty_order)}%` }/>;
  }
}

  //RunTime
  getRuntime = (run_time_actual,run_time_std,item_no) =>{
      const options = {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
      };
      run_time_actual = parseFloat(run_time_actual); 
      //if (status_work === 0 || status_work==3 || status_work==5 || status_work==6) return run_time_actual= 'N/A';
      //if (status_work === 0 || status_work==3 || status_work==5 || status_work==6) return run_time_actual = 0;
      if (item_no === '') {
        return null;
    } else if
      (runtimes = run_time_actual.toLocaleString('en-US', options) + ' / ' + run_time_std.toLocaleString('en-US', options)){
      // if(run_time_actual === 0 ) return "N/A"
      // runtimes = run_time_actual + ' / ' + run_time_std;
      return runtimes;
      }
  }
  getFlagcolor =(run_time_actual,run_time_std,status_work,item_no) =>{
    if (item_no === '') {
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
      } else {
        this.setState({
            ColorRuntime:'black'
      })
  }
}

  //Total Open Run Time
  getTotal = (qty_order,run_time_std,status_work,item_no) =>{
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
//   console.log("Total Time: ", run_time_open);
  if (item_no=== '') {
    return null;
}
  if (run_time_hr<0 || run_time_min<0 || run_time_sec<0) 
  return '0';
  else 
  return total_time;       
  }

  //Estimated finish
  getEsDateTime = (qty_order,run_time_std,run_time_actual,status_work,item_no) =>{
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
    //   const break_6pm_start = 64800;
    //   const break_6pm_stop = 66600;
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
    //   if (seconds_to_complete > break_6pm_start){                                     // IF COMPLETE TIME AFTER BREAK TIME 6PM TODAY
    //       if (seconds_of_this_day < break_6pm_start){                                 // AND NOW IS NOT 6PM YET
    //           run_time_open += 1800;                                                  // ADD FULL BREAK DURATION
    //       }
    //       else if (seconds_of_this_day < break_6pm_stop) {                            // BUT IF NOW IS DURING THE BREAK TIME TODAY
    //           run_time_open = run_time_open + (break_6pm_stop - seconds_of_this_day); // ADD ONLY THE DIFFERENCE
    //       }
    //   }
      if (seconds_to_complete > seconds_of_a_day){
          var seconds_of_tomorrow = seconds_to_complete%seconds_of_a_day;
          if (seconds_of_tomorrow > break_3am_start){                                 // IF COMPLETE TIME AFTER BREAK TIME 3AM TOMORROW
              run_time_open += 1800;                                                  // ADD FULL BREAK DURATION
          }
          if (seconds_of_tomorrow > break_11am_start){                                // IF COMPLETE TIME AFTER BREAK TIME 11AM TOMORROW
              run_time_open += 1800;                                                  // ADD FULL BREAK DURATION
          }
        //   if (seconds_of_tomorrow > break_6pm_start){                                 // IF COMPLETE TIME AFTER BREAK TIME 6PM TOMORROW
        //       run_time_open += 1800;                                                  // ADD FULL BREAK DURATION
        //   }
      }

      if(run_time_actual === '' || item_no === ''){
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

    render() {
        const sortedData = [...this.state.DashboardRefresh];
        if (this.state.sortConfig.key) {
          sortedData.sort((a, b) =>
            this.compare(
              a[this.state.sortConfig.key],
              b[this.state.sortConfig.key],
              this.state.sortConfig.direction
            )
          );
        }
        const { currentPage, itemsPerPage } = this.state;
        // Logic for displaying current items
        const indexOfLastItem = (currentPage + 1) * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
        const pageCount = Math.ceil(sortedData.length / itemsPerPage);
        return (
            
            <div>
                <header className="page-header page-header-dark pb-5"></header>
                <div className="container-fluid px-4 mt-n10">
                <Navbars/>
                    <div className="card mb-4 w-100 border-black">
                        <div className="card-header bg-red fw-bold text-white fs-4 d-flex justify-content-between bg-danger">
                            <div>Job overview by Machine</div>
                            <Clock />
                        </div>
                        <div className="card-header text-black">
                            <div className="d-flex">
                                <div className="p-2 custom-header">
                                    <input
                                        className="hide-bt"
                                        type="checkbox"
                                        style={{ margin: "5px" }}
                                        onClick={this.toggleRowVisibility}
                                        // onChange={this.changeHiddenRow}
                                        checked={this.state.isRowHidden}
                                    />
                                    <label className="hide-label">
                                    Hide unassigned machines
                                    </label>
                                    </div>
                                <div className="p-2 warning-left">
                                    <label className="hide-label">Current warning value: {this.state.warningValue}</label>&nbsp;
                                    <input
                                        className="new-warning hide-label"
                                        type="number"
                                        min="0"
                                        value={this.state.inputWarning}
                                        onChange={this.handleChange}
                                        placeholder="Value"
                                        disabled={this.state.isDataEntry}
                                    />&nbsp;
                                    <button type="button" className="warning-bt hide-label" onClick={this.updateWarning} 
                                        disabled={this.state.inputWarning === "" || this.state.isDataEntry}>Update</button>
                                </div> 
                                <div className="p-2 color-left">
                                    <div
                                        style={{
                                            display: "inline-block",
                                            margin: "5px",
                                            backgroundColor: "blue",
                                            borderRadius: "2px",
                                            width: "40px",
                                            height: "25px",
                                            verticalAlign: "middle",
                                            transform: "translate(0px,5px)",
                                        }}
                                    />
                                    <label className="hide-label">
                                    Idle machine
                                    </label>
                                    <div
                                        style={{
                                            display: "inline-block",
                                            margin: "5px",
                                            backgroundColor: "green",
                                            borderRadius: "2px",
                                            width: "40px",
                                            height: "25px",
                                            verticalAlign: "middle",
                                            transform: "translate(0px,5px)",
                                        }}
                                    />
                                    <label className="hide-label">
                                    Machine is working 
                                    </label>
                                    <div
                                        style={{
                                            display: "inline-block",
                                            margin: "5px",
                                            backgroundColor: "orange",
                                            borderRadius: "2px",
                                            width: "40px",
                                            height: "25px",
                                            verticalAlign: "middle",
                                            transform: "translate(0px,5px)",
                                        }}
                                    />
                                    <label className="hide-label">
                                    Break machineIdle
                                    </label>
                                    <div
                                        style={{
                                            display: "inline-block",
                                            margin: "5px",
                                            backgroundColor: "red",
                                            borderRadius: "2px",
                                            width: "40px",
                                            height: "25px",
                                            verticalAlign: "middle",
                                            transform: "translate(0px,5px)",
                                        }}
                                    />
                                    <label className="hide-label">
                                    Malfunctioning machine 
                                    </label>
                                </div>
                                <div className="p-2 ms-auto">
                                <div className="input-wrapper">
                                    <FaSearch id="search-icon"/>
                                    <input
                                        className="search-input"
                                        placeholder= "Search M/C, Item no, Op"
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
                                            <th rowSpan="2" className="status-box" scope="col">Status</th>
                                            <th rowSpan="2" className="mc-box" scope="col">
                                                M/C
                                                <span className="mc-box sortable-header" onClick={() => this.sortBy('id_machine')}>{this.renderSortingArrow('id_machine')}</span>
                                            </th>
                                            <th rowSpan="2" className="itemno-box" scope="col">Item number</th>
                                            <th rowSpan="2" className="op-box" scope="col">Op.</th>
                                            <th rowSpan="2" className="color-box" scope="col">Color</th>
                                            <th rowSpan="2" className="side-box" scope="col">Side</th>
                                            <th rowSpan="2" className="duedate-box" scope="col">Due Date</th>
                                            <th rowSpan="2" className="qtypt-box" scope="col">Qty per tray</th>
                                            <th rowSpan="2" className="qtyac-ord-box" scope="col">Qty accum/Qty order</th>
                                            <th rowSpan="2" className="progress-box" scope="col">
                                                Progress (%)
                                                <span className="mc-box sortable-header" onClick={() => this.sortBy('qty_percent')}>{this.renderSortingArrow('qty_percent')}</span>
                                            </th>
                                            <th rowSpan="2" className="runt-box" scope="col">Run time Actual/Std(Second)</th>
                                            <th rowSpan="2" className="total-box" scope="col">
                                                Total open run time(Hr)
                                                <span className="mc-box sortable-header" onClick={() => this.sortBy('run_time_open')}>{this.renderSortingArrow('run_time_open')}</span>
                                            </th>
                                            <th colSpan="2" className="est-box" scope="col">Estimated finish</th>
                                            <th rowSpan="2" className="nextitemno-box" scope="col">Next item number</th>
                                            <th rowSpan="2" className="nextop-box" scope="col">Next Op.</th>
                                        </tr>
                                        <tr className="fw-bold second-row bg-warning">
                                            <th className="date-box" scope="col"> Date </th>
                                            <th className="time-box" scope="col"> Time </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((item, index) => (
                                             !this.state.hiddenRows.has(item.id_machine) && (
                                            <tr key={index}>
                                            <td style={{ backgroundColor: this.getStatusColor(item.status_work) }}>
                                                <td style={{color: 'white' }}>
                                                {(this.getIdstaff(item.status_work,item.id_staff,item.type) + '\n' )} 
                                                <br />
                                                {(this.getDowntime(item.id_code_downtime,item.status_work,item.id_staff,item.code_downtime,item.des_downtime_thai) )} 
                                                </td>
                                            </td>
                                            <td className="text-db-center">{item.id_machine}</td>
                                            <td className="text-db-left"><DashboardButton eachRowId= {item.id_machine} level={this.state.isDataEntry}/>{ item.item_no }</td>
                                            <td className="text-db-center">{ item.operation }</td>
                                            <td className="text-db-center">{ item.op_color }</td>
                                            <td className="text-db-center">{ item.op_side }</td>
                                            <td className="text-db-center">{ item.date_due }</td>
                                            <td className="text-db-center">{ item.qty_per_pulse2 }</td>
                                            {/* {console.log('qty_process:', item.qty_process)} */}
                                            <td className="text-db-center">{ this.getAccum(item.qty_complete,item.qty_process,item.divider,item.qty_order) }</td>
                                            <td className="text-db-center">{this.getBlinkProgress(item.qty_order,item.item_no,item.qty_percent)}</td>
                                            <td style={{ color: this.state.ColorRuntime}}>
                                                { this.getFlagcolor(item.run_time_actual,item.run_time_std,item.status_work,item.item_no)}
                                                { this.getRuntime(item.run_time_actual,item.run_time_std,item.item_no)} 
                                            </td>
                                            <td className="text-db-left">{ this.getTotal(item['qty_order'],item['run_time_std'],item.status_work,item.item_no) }</td>
                                            <td className="text-db-center">{this.getEsDateTime(item['qty_order'], item['run_time_std'], item.item_no)[0]}</td> 
                                            <td className="text-db-center">{this.getEsDateTime(item['qty_order'], item['run_time_std'], item.item_no)[1]}</td> 
                                            <td className="text-db-left"><DashboardButton2 eachRowId= {item.id_machine} level={this.state.isDataEntry}/>{ this.getItem_2(item.item_no_2) }</td>
                                            <td className="text-db-center">{ this.getOp_2(item.operation_2) }</td>
                                            </tr>
                                             )
                                        ))}
                                        </tbody>
                                </table>
                                </DndProvider>
                            </div>
                            <div className="d-flex justify-content-center mt-3 pagination">
                            <div>
                                <label>Row per page: </label>
                                <select value={itemsPerPage} onChange={this.handleItemsPerPageChange}>
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                                </select>
                            </div>
                            <div className="dataTables_paginate">
                            <ReactPaginate
                                previousLabel={"<"}
                                nextLabel={">"}
                                breakLabel={"..."}
                                breakClassName={"break-me"}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={this.handlePageClick}
                                containerClassName={"pagination"}
                                subContainerClassName={"pages pagination"}
                                activeClassName={"active"}
                            />
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DataDashboard;
