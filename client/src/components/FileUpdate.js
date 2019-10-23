import React, { Fragment } from 'react';
import FilePreview from './FilePreview';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

import DropDownList from './DropDownList'

export default class FileUpdate extends React.Component{

    constructor(props){
        super(props);
        this.state = {fileList: [], renderList: []}
    }

    renderAllFiles = new Promise((resolve, rej) => {

            let serverFileNames = null;

            axios.get('/fetchImages')
                .then(res => {
                    console.log('renderall fiels runs')
                    console.log(res.data)
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
                                        <div key={`fileLibrary-${file.fileName}`} style={{maxWidth: "200px", display:"flex", flexDirection:"column", justifyContent:"space-between", border: "1px solid black", margin: "2px 1px 0 1px"}}>
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
                                                        // onClick={() => {this.context.fileDataMethods.transferState(this.props.file)}}
                                                        // checked={this.context.state.fileData.files[this.props.fileName].useFamilySetup}
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
                                                        // onClick={() => this.context.useFamilySetup(false)}
                                                        // checked={!this.context.state.fileData.files[this.props.fileName].useFamilySetup}
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

    componentDidMount(){
        this.renderAllFiles
            .then(res => {
                console.log('component mount res.data')
                console.log(res)
                this.setState({fileList: res, renderList: res})
            })
    }

    createFileList = () => {
        let allPreviews = []
        this.renderAllFiles.then(res => allPreviews = res.map(filePreview => {return filePreview.file}))
        console.log('allPreviews**********************************************')
        console.log(allPreviews)
        return allPreviews

        // this.renderAllFiles
        // .then(res => {
        //     console.log('component mount res.data')
        //     console.log(res)
        //     return res
        // })
    }

    render(){
        return(
            <div>
                <div>
                    <Accordion >
                        <Card>
                            <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0" className="accordion-secondary">
                                View all server files
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body>

                            <div>
                                <DropDownList 
                                        title={"filter by artwork families"}
                                        state={this.props.state}
                                        array={this.props.state.artworkFamilyList}
                                        string={"artworkFamily"}
                                        onChange={this.filterByFamily}
                                        // isChecked={this.props.familySetupMethods.isChecked}
                                        id="artworkFamily-fileUpdata"
                                        displayAddNew="none"
                                />
                                <Button
                                    size="sm"
                                    variant="primary"
                                    onClick={this.resetRenderFiles}
                                >
                                    load all files
                                </Button>
                            </div>

                            <div style={{display: "flex", flexWrap: "wrap"}}>

                                {this.state.renderList.map(preview => {
                                    return preview.file
                                    })
                                }
                            </div>

                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </div>
            </div>
        )
    }
}