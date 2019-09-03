import React from 'react';
import { Context } from './Provider';
import '../css/components/extendedList.css';
import '../css/components/imageInfo.css';
import {IoIosArrowDropdown, IoIosArrowDown} from "react-icons/io";
// import openIconic from 'open-iconic';

class ExtendedList extends React.Component{
  constructor(props){
    super(props);
}

static contextType = Context;
render(){
    return(
        <Context.Consumer>
        {()=>{
            return(
                    <div className="themeSelector">
                        <div className="extendedList--form imageInfo--box">
                            <span>{this.props.listName}</span>
                            {this.context.makeDataList(this.props.array, this.props.string, this.props.id)}
                        </div>
                        <div style={{width: '100%'}}>
                            <div className="imageInfo--box">
                                <span>extend full list: </span>
                                <button 
                                type="button" 
                                className="button-extend"
                                onClick={(e) => this.context.extendList(e, this.props.id)}
                                >    
                                    < IoIosArrowDown className="icon--chevron icon" />
                                </button>
                            </div>
                            <div className="themeSelector no-display" id={this.props.id}>                
                                {this.context.splitList(this.props.array, this.props.string)}
                            </div>
                        </div>
                    </div>
            )
        }}
        </Context.Consumer>
    )
}
}

export default ExtendedList;