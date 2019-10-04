import React from 'react';
import { Context } from '../../Provider';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import '../css/extendedList.css';
import '../css/imageInfo.css';
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
                        
                        <div className="extendedList--form DnD-imageInfo--box">
                            <p>{this.props.listName}</p>
                            {this.context.makeDataList(this.props.array, this.props.string, this.props.id)}
                        </div>

                        <div style={{width: '100%'}}>
                            {/* <div className="DnD-imageInfo--box">
                                <span className="subtitle">extend full list: </span>
                                <Button 
                                variant="primary" size="sm"
                                className="button-extend"
                                onClick={(e) => this.context.extendList(e, this.props.id)}
                                >    
                                    < IoIosArrowDown className="icon--chevron icon" />
                                </Button>
                            </div> */}

                            <Accordion >
                                <Card>
                                    <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                        View Full List
                                    </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        {this.context.createDropDownList(this.props.array, this.props.string)}
                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>  

                        </div>
                    </div>
            )
        }}
        </Context.Consumer>
    )
}
}

export default ExtendedList;