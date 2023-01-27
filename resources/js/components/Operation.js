import React, { Component } from 'react'
import Navbars from "./Dashboard/Navbar/Navbars";
import OperationCard from './Operation/OperationCard';

export class Operation extends Component {
  render(){
    return (
        <body>
            <div>
                <Navbars />
                <OperationCard />
            </div>
        </body>
    );
}
}

export default Operation