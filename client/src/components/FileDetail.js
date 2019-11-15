import React from 'react';
import { Context } from './Provider';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import LoaderModal from './LoaderModal'
import FilePreview from './FilePreview';
import ArtowrkInfo from './DragAndDropList/infoComponents/ArtworkInfo';
import JsonPreview from './DragAndDropList/infoComponents/JsonPreview';
import FamilyInfo from './DragAndDropList/infoComponents/FamilyInfo';
import NavigationInfo from './DragAndDropList/infoComponents/NavigationInfo';

import './DragAndDropList/css/ImagesPreview.css'

export default class DnDListDraggable extends React.Component{
    static contextType = Context;

    constructor(props){
        super(props)
        this.state = {
            tomato: "yes"
        }
    }

    componentDidMount(){
        this.context.fileDataMethods.initialIndex()
    }

    render(){
        return(
            <Context.Consumer>
                {() => {
                    return(
                        <div className="ImagesPreview--container">     
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
                                            onClick={() => this.context.fileDataMethods.postArtworkInfo(this.props.file)}
                                        >
                                            Submit to server
                                        </Button>

                                        <LoaderModal
                                            showModal={this.context.state.showModal}
                                        />


                                    </div>    

                                    <div className="ImagesPreview--dragHandle custom-button"
                                        id={`draghandle--${this.props.index}`}
                                        onMouseDown={(e)=>{
                                            const dragHandle = e.target
                                            if(!e.target.classList.contains('mouseDown')){
                                                e.target.classList.add('mouseDown')
                                            }

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
                }
                }
            </Context.Consumer>
        )
    }
}
