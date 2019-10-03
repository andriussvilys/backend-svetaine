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
        
                                            <div class="accordion-container">
                                                <Accordion >
                                                    <Card>
                                                        <Card.Header>
                                                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
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
                                                </Accordion>

                                                <Accordion >
                                                    <Card>
                                                        <Card.Header>
                                                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                                            Edit Artwork info
                                                        </Accordion.Toggle>
                                                        </Card.Header>
                                                        <Accordion.Collapse eventKey="0">
                                                        <Card.Body>
                                                            <FamilyInfo/>
                                                            <NavigationInfo/>
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
