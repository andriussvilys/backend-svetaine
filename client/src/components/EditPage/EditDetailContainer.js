import React, { Fragment } from 'react';
import axios from 'axios';

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
                            maxWidth: "200px", 
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
                            <Button
                                onClick={() => {this.setState({showPopUp: true})}}
                            >
                                Edit
                            </Button>
            
                        </div>
            
                    </div>
            }
        )
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
                                let newFile = this.EditDetail(file)
                                console.log("newFile")
                                console.log(newFile)
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
    }

    render(){
        return(
            <div 
            id={'familyContainer'}
            style={{position: "relative"}}
            >
                <div 
                className={!this.state.showPopUp ? "no-display" : null }
                id={'EditDetailPopUp'}
                style={{
                    position:"absolute",
                    height: "92vh",
                    width: "96vw",
                    margin: "0 2vw 2vw 2vw",
                    opacity: "0.8",
                    backgroundColor: "yellow",
                    zIndex: "10"
                }}
                >

                </div>
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
            </div>
        )
    }
}