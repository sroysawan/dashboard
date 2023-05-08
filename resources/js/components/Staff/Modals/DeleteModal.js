import { data, toast } from 'autoprefixer';
import axios from 'axios';
import React, { Component } from 'react';


class DeleteModal extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            Staff : [],
        }
    }

    //Delete date.
    deletedashboardData = (num) =>{

        axios.get('/delete/dashboard/data/' + num)
    }
    render() {
        return (
            
            <div className="modal fade" id={"deleteModal"+ this.props.modalId } tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Dashboard Delete</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        
                         Are you sure, You want to delete this Dashboard data
                    </div>
                    <div className ="modal-footer">

                    <button type="button" 
                      className="btn btn-danger"
                      data-bs-dismiss="modal" 
                      onClick={ () => { this.deletedashboardData(this.props.modalId) }}>
                       Yes
                    </button>    
                    {/* <button type="button" className="btn btn-primary">changes</button> */}
                    <button type="button"
                     className="btn btn-secondary"
                     data-bs-dismiss="modal">
                        close
                    </button>  
                    </div>
                 </div>
                </div>
            </div>
        )
    }
}

export default DeleteModal;
