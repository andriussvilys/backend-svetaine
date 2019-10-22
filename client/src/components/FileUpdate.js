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
                                        <div style={{maxWidth: "200px"}}>
                                            <FilePreview 
                                                key={`fileUpload-${file.fileName}-${index}`}
                                                file={file}
                                            />
                                            <p style={{fontSize: "10px"}}>{file.fileName}</p>
                                            <p style={{fontSize: "12px", fontWeight: "bold"}}>{!file.artworkFamily ? null : file.artworkFamily}</p>
                                        </div>
                                }
                                    // <div style={{maxWidth: "200px"}}>
                                    //     <FilePreview 
                                    //         key={`fileUpload-${file.fileName}-${index}`}
                                    //         file={file}
                                    //     />
                                    //     <p style={{fontSize: "10px"}}>{file.fileName}</p>
                                    //     <p style={{fontSize: "12px", fontWeight: "bold"}}>{!file.artworkFamily ? null : file.artworkFamily}</p>
                                    // </div>
                                return fileList = [...fileList, newFile] 

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
                                {this.state.renderList.length > 0 ?
                                this.state.renderList.map(filePreview => filePreview.file)
                                : null}
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