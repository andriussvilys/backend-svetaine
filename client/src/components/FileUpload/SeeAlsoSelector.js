import React, { Fragment } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

import { Context } from './Provider';
import FilePreview from './FilePreview';
import DropDownList from './DropDownList'

export default class SeeAlsoSelector extends React.Component{

    static contextType = Context;

    constructor(props){
        super(props);
        this.state = {fileList: [], renderList: []}
    }

    


    /**
     * @params fileList = takes an object with file data 
     */
    renderAllFiles = (fileList) => {
        console.log(' seeAlsoSelector -GLOBAL- ')
        console.log(fileList)
        
       let domNodes =  Object.keys(fileList).map(fileName => {
        if(fileName === "fileNames"){
            return
        }
        console.log(fileList[fileName].file)
        return fileList[fileName].file})
       return domNodes
    }

    componentDidMount(){
        this.setState({renderList: this.props.renderList})
    }

    render(){
        return(
            <Context.Consumer>
                {() => {
                    return(
                        <div className="themeSelector">
                                <Accordion >
                                    <Card>
                                        <Card.Header>
                                        <Accordion.Toggle as={Button} variant="link" eventKey="0" className="accordion-secondary">
                                            Select "see also" elements
                                        </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                        <Card.Body>

                                        <div>
                                            <DropDownList 
                                                    title={"filter by artwork families"}
                                                    state={this.props.state}
                                                    array={this.props.state.artworkFamilyList}
                                                    string={"fileNames"}
                                                    onChange={this.context.familySetupMethods.filterByFamily}
                                                    isChecked={this.context.familySetupMethods.isChecked}
                                                    id="artworkFamily-fileUpdata"
                                                    displayAddNew="none"
                                            />
                                            <Button
                                                size="sm"
                                                variant="primary"
                                                onClick={() => this.context.familySetupMethods.resetRenderFiles()}
                                            >
                                                load all files
                                            </Button>
                                        </div>

                                        <div style={{display: "flex", flexWrap: "wrap"}}>
                                            {/* {!this.props.renderList ? null : this.renderAllFiles(this.props.renderList)} */}
                                            {this.renderAllFiles(this.props.renderFiles)}
                                        </div>

                                        </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                        </div>
                    )
                }
            }
            </Context.Consumer>
        )
    }
}