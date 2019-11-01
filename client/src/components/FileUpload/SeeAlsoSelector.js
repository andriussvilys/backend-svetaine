import React, { Fragment } from 'react';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

import FilePreview from '../FilePreview';
import DropDownList from '../DropDownList'

export default class SeeAlsoSelector extends React.Component{

    constructor(props){
        super(props);
        this.state = {}
    }
    /**
     * @params fileList = takes an object with file data 
     * 
     */
    //returns an array of files to be rendered
    renderAllFiles = (fileList) => {
        console.log(' seeAlsoSelector -FILE UPLOAD- ')
        console.log(this.state)
        if(!fileList){
            return
        }
        console.log(fileList)
        
    //    let domNodes =  Object.keys(fileList).map(fileName => {
    //     if(fileName === "fileNames"){
    //         return
    //     }

    //     console.log(fileList[fileName].file)
    //     return fileList[fileName].file
    // })

        let domNodes =  fileList.map(fileObj => {

            console.log(fileObj)
            return fileObj.file
        })
        console.log('domNodes', domNodes)
       return domNodes
    }

    componentDidMount(){
        console.log('FileUpload COmpoenent mounter')
        console.log(this.props.initialData)
        //initial data = this.context.state.artworkInfoData
        let dataArray = Object.keys(this.props.initialData)
        console.log('dataArray')
        console.log(dataArray)

        let fileList = dataArray.map(objName => {

            const file = this.props.initialData[objName]

            const highlighter = (objName) => {
                return this.props.highlightReference ? this.props.highlightReference.includes(objName) : false
                // return this.props.highlightReference.includes(objName)
            }

            let newFile = {
                fileName: file.fileName,
                artworkFamily: file.artworkFamily,
                checked: highlighter(file.fileName),
                file: 
                    <div key={`fileLibrary-${file.fileName}`} 
                    style={{maxWidth: "200px", display:"flex", flexDirection:"column", justifyContent:"space-between", border: "1px solid black", margin: "2px 1px 0 1px"}}
                    className={`${highlighter(file.fileName) ? 'themes-list--selected' : 'notSelected'}`} 
                    >
                        <div 
                        style={{display:"flex", flexDirection:"column", height: "100%", justifyContent:"space-between", marginBottom: "1px"}}
                        onClick={(e) => (console.log(file))}
                        >
                            <div>
                                <p className="subtitle">file name:</p>
                                <p style={{fontSize: "10px", fontWeight: "bold"}}>{file.fileName}</p>
                                <p className="subtitle">family name:</p>
                                <p style={{fontSize: "10px", fontWeight: "bold"}}>{!file.artworkFamily ? null : file.artworkFamily}</p>
                            </div>
                            <FilePreview 
                                key={`fileUpload-${file.fileName}`}
                                file={file}
                            />
                        </div>
    
                        <div style={{border: "1px solid grey", padding: "2px"}}>
                            <p style={{fontSize: "10px"}}>use as See Also recommendation</p>
                            <form style={{display:"flex", justifyContent:"space-evenly"}}>
                                <div className="container-radio">
                                    <input type="radio" 
                                    name="useAsSeeAlso" 
                                    id="useAsSeeAlso__radio-yes" 
                                    value="yes" 
                                    onChange={() => {this.props.onChange( file.fileName, "seeAlso", this.props.fileName)}}
                                    checked={highlighter(file.fileName)}
                                    />
                                    <label 
                                    htmlFor="useAsSeeAlso_yes"
                                    id="useAsSeeAlso_yes"
                                    >yes</label>
                                </div>
                                <div className="container-radio">
                                    <input type="radio" 
                                    name="useAsSeeAlso" 
                                    id="useAsSeeAlso__radio-no" 
                                    value="no" 
                                    onChange={() => {this.props.onChange(file.fileName, "seeAlso", this.props.fileName)}}
                                    checked={!highlighter(file.fileName)}
                                    />
                                    <label htmlFor="useAsSeeAlso_no">no</label>
                                </div>
                            </form>
                        </div>
    
                    </div>
            }

            return newFile
        })
        console.log('fileList')
        console.log(fileList)
        this.setState({fileList: fileList, renderList: fileList}, console.log('fileUpload state', this.state))
    }

    render(){
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
                                        fileName={this.props.fileName}
                                        onChange={this.props.context.fileDataMethods.filterByFamily}
                                        isChecked={this.props.context.fileDataMethods.isChecked}
                                        id="artworkFamily-fileUpdate"
                                        displayAddNew="none"
                                />
                                <Button
                                    size="sm"
                                    variant="primary"
                                    onClick={() => this.props.context.familySetupMethods.resetRenderFiles()}
                                >
                                    load all files
                                </Button>
                            </div>

                            <div style={{display: "flex", flexWrap: "wrap"}}>
                                {/* {!this.props.renderList ? null : this.renderAllFiles(this.props.renderList)} */}
                                {this.state.renderList ? this.renderAllFiles(this.state.renderList) : null}
                            </div>

                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
            </div>
        )
    }
}