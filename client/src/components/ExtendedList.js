import React from 'react';
import { Context } from './Provider';
import Button from 'react-bootstrap/Button';
import '../css/components/extendedList.css';
import '../css/components/imageInfo.css';
import { IoIosArrowDown } from "react-icons/io";
// import openIconic from 'open-iconic';

class ExtendedList extends React.Component{

static contextType = Context;

// componentDidMount(){
//     console.log('component did mount')
//     this.context.loadData("themes")
// }

render(){
    return(
        <Context.Consumer>
        {()=>{
            return(
                    <div className="themeSelector ">
                        
                        <div className="extendedList--form imageInfo--box">
                            <span>{this.props.listName}</span>
                            {this.context.makeDataList(this.props.array, this.props.string, this.props.id)}
                        </div>

                        <div style={{width: '100%'}}>
                            <div className="imageInfo--box">
                                <span className="subtitle">extend full list: </span>
                                <Button 
                                variant="primary" size="sm"
                                className="button-extend"
                                onClick={(e) => this.context.extendList(e, this.props.id)}
                                >    
                                    < IoIosArrowDown className="icon--chevron icon" />
                                </Button>
                            </div>
                            <div className="themeSelector no-display" style={{margin: '0 70px'}} id={this.props.id}>                
                                {this.context.createDropDownList(this.props.array, this.props.string)}
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