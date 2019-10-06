import React from 'react';
import { Context } from '../Provider';
import { Draggable } from 'react-beautiful-dnd';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion' 
import Card from 'react-bootstrap/Card'

import ArtowrkInfo from './infoComponents/ArtworkInfo'
import JsonPreview from './infoComponents/JsonPreview'
import FamilyInfo from './infoComponents/FamilyInfo'
import NavigationInfo from './infoComponents/NavigationInfo'
import './css/ImagesPreview.css';

export default class DnDListDraggable extends React.Component{
    static contextType = Context;

    constructor(props){
        super(props)
        this.state = {
            tomato: "yes"
        }
    }

    render(){
        return(
            <Context.Consumer>
                {() => {
                    return(
                        <Draggable
                        draggableId={this.props.file.fileName} 
                        index={this.props.index}
                        >
                        {(provided)=>{
                            // console.log('DRAGGABLE PROPS')
                            // console.log(this.props)
                            // if(this.context.state)
                            return(
                                <div className="ImagesPreview--container"
                                    {...provided.draggableProps}
                                    ref={provided.innerRef}
                                >
        
                                        <div style={{display: "flex", width: "100%"}}>
                                            <div className="image-index-box">
                                                <div className="ImagesPreview--imageContainer">
                                                    <img className="ImagesPreview--image" alt={this.props.file.fileName} src={this.props.file.preview} />
                                                    <input
                                                    type="text" 
                                                    className="ImagesPreview--fileName"
                                                    placeholder={this.props.file.fileName}
                                                    >
                                                    </input>
                                                </div>
        
                                                <div className="ImagesPreview--indexContainer">
                                                    <span>index:</span>
                                                    <div className="ImagesPreview--index">{this.props.index}</div>
                                                </div>
                                            </div>
        
                                            <div style={{width: "100%"}}>
                                                <Accordion>
                                                    <Card>
                                                        <Card.Header>
                                                        <Accordion.Toggle as={Button} variant="link" eventKey="0" className="accordion-main">
                                                            View Data
                                                        </Accordion.Toggle>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey="0">
                                                        <Card.Body>
                                                            <JsonPreview 
                                                                fileName={this.props.file.fileName}
                                                                file={this.props.file}
                                                                index={this.props.index}
                                                            />
                                                        </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                </Accordion>  
                                                
                                                <Accordion >
                                                    <Card>
                                                        <Card.Header>
                                                        <Accordion.Toggle as={Button} variant="link" eventKey="0" className="accordion-main">
                                                            Edit Artwork info
                                                        </Accordion.Toggle>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey="0">
                                                        <Card.Body style={{padding: "15px"}}>
                                                            <ArtowrkInfo 
                                                            fileName={this.props.file.fileName}
                                                            onChange={this.context.fileDataMethods.onChange}
                                                            />
                                                        </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                </Accordion>

                                                <Accordion>
                                                    <Card>
                                                        <Card.Header>
                                                        <Accordion.Toggle as={Button} variant="link" eventKey="0" className="accordion-main">
                                                            Update Family Info
                                                        </Accordion.Toggle>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey="0">
                                                        <Card.Body style={{padding: "15px"}} >
                                                            <FamilyInfo/>

                                                            <Accordion >
                                                                <Card>
                                                                    <Card.Header>
                                                                    <Accordion.Toggle as={Button} variant="link" eventKey="0" className="accordion-secondary">
                                                                        Update Search Categories
                                                                    </Accordion.Toggle>
                                                                    </Card.Header>
                                                                    <Accordion.Collapse eventKey="0">
                                                                    <Card.Body>
                                                                        <NavigationInfo/>
                                                                    </Card.Body>
                                                                    </Accordion.Collapse>
                                                                </Card>
                                                            </Accordion>
                                                            
                                                        </Card.Body>
                                                        </Accordion.Collapse>
                                                    </Card>
                                                </Accordion>
                                            </div>
        
                                        
                                            
                                            <div className="button-container">
                                                <div className="ImagesPreview--dragHandle custom-button"
                                                id={`draghandle--${this.props.index}`}
                                                {...provided.dragHandleProps}
                                                onMouseDown={(e)=>{
                                                    const dragHandle = e.target
                                                    if(!e.target.classList.contains('mouseDown')){
                                                        e.target.classList.add('mouseDown')
                                                    }
                                                    provided.dragHandleProps.onMouseDown(e)
        
                                                    document.addEventListener('mouseup', () => {dragHandle.classList.remove('mouseDown')})
                                                    }
                                                }
                                                >
                                                    DRAG
                                                </div>   
        
                                                <div>
                                                    <Button
                                                        variant="danger"
                                                        className="custom-button"
                                                        onClick={ () => this.context.removeFile(this.props.file.fileName)}
                                                    >
                                                        Remove
                                                    </Button>   
                                                    <Button
                                                        variant="success"
                                                        className="custom-button"
                                                    >
                                                        Submit
                                                    </Button>
                                                </div>
                                            </div>
        
                                        </div>
                                 
                                    
                                    {/* <Accordion >
                                        <Card>
                                            <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                Edit Artwork info
                                            </Accordion.Toggle>
                                            </Card.Header>
                                            <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                <ArtowrkInfo style={{width: "75%"}} />
                                            </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion> */}
                               
                                </div>
                            )
                        }}
                    </Draggable>
                    )
                }
                }
            </Context.Consumer>
        )
    }
}
