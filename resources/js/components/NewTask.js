import React, { Component } from 'react'
import Navbars from "./Dashboard/Navbar/Navbars";
import NewtaskCard from './NewTask/NewtaskCard'


export class NewTask extends Component {
  render(){
    return (
        <body>
            <div>
                <Navbars />
                <NewtaskCard />
            </div>
        </body>
    );
}
}

export default NewTask