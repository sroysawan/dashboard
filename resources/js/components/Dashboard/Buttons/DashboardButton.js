import axios from "axios";
import React, { Component } from "react";
import { FaRegEdit } from "react-icons/Fa";
import ViewModal from "../Modals/ViewModal";
import UpdateModal from "../Modals/UpdateModal";

class DashboardButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDashboardIdmc: null,
            currentDashboardItemno: null,
            currentDashboardIdjob: null,
            currentDashboardOp: null,
            currentDashboardDatedue: null,
            currentDashboardQtypertray: null,
            currentDashboardQtyactivity: null,
            currentDashboardQtyaccum: null,
            currentDashboardQtyaccumsum: null,
            currentDashboardQtyorder: null,
            currentDashboardQtypercent: null,
            currentDashboardIdtask: null,
            currentDashboardDtupdate: null,
            currentDashboardIdactivity: null,
        };
    }
    // componentDidMount = () =>{
    //     console.log("#updateModal" + this.props.eachRowId);
    // }

    //Getting Indivvidual Dashboard data
    // getDashboardDetails = (id_machine) => {
    //     console.log(id_machine);
    //     axios.post('/get/indivvidual/dashboard/details',{
    //         dashboardID: id_machine
    getDashboardDetailsNewDB = (id_machine) => {
        console.log(id_machine);
        axios
            .get("/get/indivvidual/dashboard/detailsNew", {
                params: { dashboardID: id_machine },
            })
            .then((response) => {
                console.log(response.data);
                this.setState({
                    currentDashboardIdmc: response.data.id_machine,
                    currentDashboardItemno: response.data.item_no,
                    currentDashboardIdjob: response.data.id_job,
                    currentDashboardOp: response.data.operation,
                    currentDashboardDatedue: response.data.date_due,
                    currentDashboardQtypertray: response.data.qty_per_pulse2,
                    currentDashboardQtyactivity:response.data.no_pulse1,
                    currentDashboardQtyaccum: response.data.qty_accum,
                    currentDashboardQtyaccumsum: response.data.qty_accum_sum,
                    currentDashboardQtyorder: response.data.qty_order,
                    currentDashboardQtypercent: response.data.qty_percent,
                    currentDashboardIdtask: response.data.id_task,
                    currentDashboardDtupdate: response.data.datetime_update,
                    currentDashboardIdactivity: response.data.id_activity,
                });

                //console.log(this.getDashboardDetailsNewDB);
                //console.log(Object.values(response.data));
            });
    };

    render() {
        return (
            <div className="btn-group" role="group">
                <button
                    type="button"
                    className="btn"
                    data-bs-toggle="modal"
                    data-bs-target={"#viewModal" + this.props.eachRowId}
                    onClick={() => {
                        this.getDashboardDetailsNewDB(this.props.eachRowId);
                    }}
                >
                    <FaRegEdit />
                </button>
                <ViewModal
                    modalId={this.props.eachRowId}
                    dashboardData={this.state}
                />
                {/* <UpdateModal
                    modalId={this.props.eachRowId}
                    dashboardData={this.state}
                /> */}
            </div>
        );
    }
}
export default DashboardButton;
