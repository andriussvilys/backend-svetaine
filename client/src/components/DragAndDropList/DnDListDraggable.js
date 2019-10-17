import React from 'react';
import { Context } from '../Provider';
import { Draggable } from 'react-beautiful-dnd';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

import DropDownList from '../DropDownList';

import LoaderModal from '../LoaderModal'
import FilePreview from '../FilePreview';
import FamilyPreview from '../FamilyPreview';
import ArtowrkInfo from './infoComponents/ArtworkInfo';
import JsonPreview from './infoComponents/JsonPreview';
import FamilyInfo from './infoComponents/FamilyInfo';
import NavigationInfo from './infoComponents/NavigationInfo';

import FamilyListDnDContainer from './FamilyListDnD/FamilyListDnDContainer';

import './css/ImagesPreview.css';

export default class DnDListDraggable extends React.Component{
    static contextType = Context;

    constructor(props){
        super(props)
        this.state = {
            tomato: "yes"
        }
    }

    // componentDidMount(){
    //     this.context.fileDataMethods.transferState(this.props.file.fileName)
    // }

    componentDidMount(){
        this.context.fileDataMethods.initialIndex()
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
                                        
                                        <div className="image-index-box">

                                            <FilePreview 
                                                file={this.props.file}
                                            />

                                            <div className="ImagesPreview--indexContainer">
                                                <div>artwork family name:</div>
                                                <div>{this.props.file.artworkFamily ? this.props.file.artworkFamily : "N/A"}</div>
                                            </div>        
                                            <div className="ImagesPreview--indexContainer">
                                                <span>family display index:</span>
                                                <div className="ImagesPreview--index">{ this.props.file.familyDisplayIndex }</div>
                                            </div>
                                        </div>
                                        
                                        <div style={{flex: "1"}}>

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

                                                        <FamilyInfo
                                                            fileName={this.props.file.fileName}
                                                            file={this.props.file}
                                                            state={this.context.state}
                                                            context={this.context}
                                                            onChange={this.context.fileDataMethods.onChange}
                                                        />

                                                        <Accordion >
                                                            <Card>
                                                                <Card.Header>
                                                                <Accordion.Toggle as={Button} variant="link" eventKey="0" className="accordion-secondary">
                                                                    Update Search Categories
                                                                </Accordion.Toggle>
                                                                </Card.Header>
                                                                <Accordion.Collapse eventKey="0">
                                                                <Card.Body>
                                                                    <NavigationInfo
                                                                        fileName={this.props.file.fileName}
                                                                    />
                                                                </Card.Body>
                                                                </Accordion.Collapse>
                                                            </Card>
                                                        </Accordion>
                                                        
                                                    </Card.Body>
                                                    </Accordion.Collapse>
                                                </Card>
                                            </Accordion>

                                            <div className="button-container">    
                                            <div className="submit-delete-container">                                                
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
                                                    onClick={() => this.context.fileDataMethods.postArtworkInfo(this.props.file.artworkFamily)}
                                                >
                                                    Submit to server
                                                </Button>

                                                <LoaderModal
                                                    showModal={this.context.state.showModal}
                                                />


                                            </div>    

                                            {/* <Button
                                                variant="primary"
                                                className="custom-button"
                                                disabled={!this.props.file.artworkFamily ? true : false}
                                                onClick={() => this.context.familySetupMethods.getAllByArtworkFamily(this.props.file.artworkFamily, this.props.file.fielName)}
                                            >
                                                Get a list of related artwork <span>{!this.props.file.artworkFamily ? "disabled" : ""}</span>
                                            </Button> */}

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
                                        </div>
                                        </div>
                                                                   
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
