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

    highlighter = (stateNest, fileName) => {
        // console.log('seealso at familysetupdata')
        // console.log(stateNest)
        // console.log(fileName)
        if(stateNest){
            if( typeof stateNest === 'string'|| Array.isArray(stateNest) ){
                    return stateNest.includes(fileName)
                }
        }
        else return null
    }
    getAllFiles = new Promise((resolve, rej) => {

        let serverFileNames = null;

        axios.get('/fetchImages')
            .then(res => {
                serverFileNames = res.data

                axios.get('/api/artworkInfo')
                    .then(res => {
                        let databaseFiles = []
                        let usedNames = []

                        serverFileNames.forEach(fileName => {
                            res.data.forEach(obj => {if(obj.fileName === fileName){return databaseFiles = [...databaseFiles, obj]}})
                        })

                        let fileList = []

                        databaseFiles.forEach((file, index) => {
                            if(usedNames.includes(file.fileName)){
                                return
                            }
                            usedNames = [...usedNames, file.fileName]
                            let newFile = {
                                fileName: file.fileName,
                                artworkFamily: file.artworkFamily,
                                file: 
                                    <div key={`fileLibrary-${file.fileName}`} 
                                    style={{maxWidth: "200px", display:"flex", flexDirection:"column", justifyContent:"space-between", border: "1px solid black", margin: "2px 1px 0 1px"}}
                                    className={`${this.highlighter(this.props.stateNest["seeAlso"], file.fileName) ? 'themes-list--selected' : null}`} 
                                    >
                                        <div style={{display:"flex", flexDirection:"column", height: "100%", justifyContent:"space-between", marginBottom: "1px"}}>
                                            <div>
                                                <p className="subtitle">file name:</p>
                                                <p style={{fontSize: "10px", fontWeight: "bold"}}>{file.fileName}</p>
                                                <p className="subtitle">family name:</p>
                                                <p style={{fontSize: "10px", fontWeight: "bold"}}>{!file.artworkFamily ? null : file.artworkFamily}</p>
                                            </div>
                                            <FilePreview 
                                                key={`fileUpload-${file.fileName}-${index}`}
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
                                                    checked={this.context.state.familySetupData.seeAlso.includes(file.fileName)} 
                                                    onChange={() => {this.props.onChange("seeAlso", file.fileName)}}
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
                                                    onChange={() => {this.props.onChange("seeAlso", file.fileName)}}
                                                    checked={!this.context.state.familySetupData.seeAlso.includes(file.fileName)}
                                                    />
                                                    <label htmlFor="useAsSeeAlso_no">no</label>
                                                </div>
                                            </form>
                                        </div>

                                    </div>
                            }
                            fileList = [...fileList, newFile] 

                        })

                        resolve(fileList)
                    })
            })   
    })

    filterByFamily = (value) => {
        const artworkFamily = value
        console.log(`filterByFmaily ${value}`)
        let newRenderList = []
        this.state.fileList.forEach(obj => {
            if(obj.artworkFamily === value){
                newRenderList = [...newRenderList, obj]
            }
        })
        this.setState({renderList: newRenderList})
    }

    resetRenderFiles = () => {
        this.setState({renderList: this.state.fileList})
    }

    // renderAllFiles = () => {
    //     console.log('render all files')

    //     this.getAllFiles.then(res => {
    //         console.log('all files fulfilled')
    //         console.log(res)
    //         return res})
    // }

    /**
     * @params fileList = takes an object with file data 
     */
    renderAllFiles = (fileList) => {
        console.log(' RENDER ALLL ')
       let domNodes =  Object.keys(fileList).map(fileName => {
        if(fileName === "fileNames"){
            return
        }
        return fileList[fileName].file})
       return domNodes
    }




    // componentDidMount(){
    //     console.log('SEE ALSO SELECTOR mounted')
    //     this.getAllFiles
    //         .then(res => {
    //             console.log('**********************************')
    //             console.log(res)
    //             this.setState({fileList: res, renderList: res})
    //         })
    // }

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
                                            {this.renderAllFiles(this.context.state.seeAlsoData.renderFiles)}
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