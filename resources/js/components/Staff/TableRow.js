import React, { Component } from 'react';
import Tablebutton from './Tablebutton';

class TableRow extends Component {

    constructor(props) {
        super(props);
    }

    render() {


        return (
            <tr>
                <td>{ this.props.data.id_staff}</td>
                <td>{ this.props.data.id_rfid }</td>
                <td>{this.props.data.prefix}</td>
                <td>{ this.props.data.name_first+"   "+this.props.data.name_last}</td>
                {/* <td>{ this.props.data.site }</td> */}
                <td>{this.props.data.role}</td>
                <td>{ this.props.data.id_shif }</td>
                <td>{ this.props.data.staff_img }</td>
                <td>
                    <Tablebutton eachRowId={ this.props.data.id_staff}/>
                </td>
            </tr>
        )
    }
}

export default TableRow;
