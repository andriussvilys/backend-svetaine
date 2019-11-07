import React, { Fragment } from 'react';
import axios from 'axios';
import {BrowserRouter, Link} from 'react-router-dom'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

import DropDownList from '../DropDownList'
import EditDetail from './EditDetail'
import FilePreview from '../FilePreview'

export default class FileUpdate extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            fileList: [], 
            renderList: [],
            showPopUp: false
        }
    }

    EditDetail = (file) => {
        return(
            {
                fileName: file.fileName,
                artworkFamily: file.artworkFamily,
                file: 
                    <div 
                        key={`fileLibrary-${file.fileName}`} 
                        style={{
                            width: "200px", 
                            display:"flex", 
                            flexDirection:"column", 
                            justifyContent:"space-between", 
                            border: "1px solid black", 
                            margin: "2px 1px 0 1px"
                        }}
                    >
                        <div 
                            style={{
                            display:"flex", 
                            flexDirection:"column", 
                            height: "100%", 
                            justifyContent:"space-between", 
                            marginBottom: "1px"
                            }}
                        >
                            <div>
                                <p className="subtitle">file name:</p>
                                <p style={{fontSize: "10px", fontWeight: "bold"}}>{file.fileName}</p>
                                <p className="subtitle">family name:</p>
                                <p style={{fontSize: "10px", fontWeight: "bold"}}>{!file.artworkFamily ? null : file.artworkFamily}</p>
                            </div>
                            <FilePreview 
                                key={`fileUpload-${file.fileName}-EditDetail-FilePreview`}
                                file={file}
                            />
                        </div>
                        <div style={{border: "1px solid grey", padding: "2px"}}>
                            <Link to={`/admin/edit/${file.fileName}`}>
                                <Button
                                    onClick={(e) => {
                                        console.log("EIT DETAIL CONTAINER EDIT ONCLICK")
                                        this.props.context.fileDataMethods.serverFileToState(file)
                                    }}
                                >
                                    Edit
                                </Button>
                            </Link>
                        </div>
            
                    </div>
            }
        )
    }

    renderAllFiles = new Promise((resolve, rej) => {

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
                                let newFile = this.EditDetail(file)
                                fileList = [...fileList, newFile] 

                            })

                            resolve(fileList)
                        })
                })   
    })

    filterByFamily = (value) => {
        const artworkFamily = value
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

    createFileList = () => {
        let allPreviews = []
        this.renderAllFiles.then(res => allPreviews = res.map(filePreview => {return filePreview.file}))
        return allPreviews
    }

    componentDidMount(){
        this.renderAllFiles
            .then(res => {
                this.setState({fileList: res, renderList: res})
            })
    }


    render(){

        return(
                <div 
                id={'familyContainer'}
                style={{position: "relative"}}
                >
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
                            reload file list
                        </Button>
                    </div>

                    <div style={{display: "flex", flexWrap: "wrap"}}>
                        {this.state.renderList.map(preview => {
                            return preview.file
                            })
                        }
                    </div>
                </div>
        )
    }
}