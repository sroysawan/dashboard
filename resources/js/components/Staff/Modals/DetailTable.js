import React, { Component } from 'react';


class DetailTable extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="modal fade" id={"detailModal"+this.props.modalId } tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Record</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">

                        Staff ID : <strong>{ this.props.dashboardData.currentDashboardStaff} </strong>
                        
                        <hr/>
                        RFID: <strong>{ this.props.dashboardData.currentDashboardRfid} </strong>
                        
                        <hr/>
                        Prefix: <strong>{ this.props.dashboardData.currentDashboardPrefix} </strong>
                        
                        <hr/>
                        First name: <strong>{ this.props.dashboardData.currentDashboardFirst} </strong>
                        
                        <hr/>
                        Last name: <strong>{ this.props.dashboardData.currentDashboardLast} </strong>
                        
                        <hr/>
                        Site: <strong>{ this.props.dashboardData.currentDashboardSite} </strong>
                        
                        <hr/>
                        Role: <strong>{ this.props.dashboardData.currentDashboardRole} </strong>
                        
                        <hr/>
                        Shif: <strong>{ this.props.dashboardData.currentDashboardShif} </strong>


                        <hr/>
                        Staff ID : <strong>{ this.props.dashboardData.currentDashboardStaff} </strong>
                        
                        <hr/>
                        RFID: <strong>{ this.props.dashboardData.currentDashboardRfid} </strong>
                        
                        <hr/>
                        Prefix: <strong>{ this.props.dashboardData.currentDashboardPrefix} </strong>
                        
                        <hr/>
                        First name: <strong>{ this.props.dashboardData.currentDashboardFirst} </strong>
                        
                        <hr/>
                        Last name: <strong>{ this.props.dashboardData.currentDashboardLast} </strong>
                        
                        <hr/>
                        Site: <strong>{ this.props.dashboardData.currentDashboardSite} </strong>
                        
                        <hr/>
                        Role: <strong>{ this.props.dashboardData.currentDashboardRole} </strong>
                        
                        <hr/>
                        Shif: <strong>{ this.props.dashboardData.currentDashboardShif} </strong>
                        
                    </div>




                    {/* <div className ="modal-footer">
                    <button type="button" 
            className="btn btn-primary"
            data-bs-toggle="modal" 
            data-bs-target={'#detailTable'+this.props.eachRowId}
            onClick={ () => { this.getDashboardDetails( this.props.eachRowId) }}
            >
                update
            </button>
            
                        
                    </div> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailTable;
