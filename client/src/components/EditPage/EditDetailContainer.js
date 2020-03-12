import React from 'react';
import { Link} from 'react-router-dom'

import Button from 'react-bootstrap/Button';

import DropDownList from '../DropDownList'
import FilePreview from '../FilePreview'
import BootstrapModal from '../BootstrapModal';

export default class FileUpdate extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            modalMessage: null,
            modalConfirm: true,
            fileList: this.props.state.artworkInfoData,
            allFiles: this.props.state.artworkInfoData
        }
    }

    onClose = () => {
        this.setState({showModal: false})
    }

    EditDetail = (file) => {
        if(!file){return}
        return(
            // {
            //     fileName: file.fileName,
            //     artworkFamily: file.artworkFamily,
            //     file: 
                    <div 
                        className="EditDetail-container"
                        key={`fileLibrary-${file.fileName}`} 
                    >
                        <div 
                        style={{display: "flex", flexDirection:"column", justifyContent:"space-between", height: "100%"}}
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
                            <div className="EditDetailContainer--button-wrapper">
                                <Link to={`/admin/edit/${file.fileName}`}>
                                    <Button
                                        onClick={(e) => {
                                            this.props.context.fileDataMethods.serverFileToState(file)
                                        }}
                                    >
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                        className="delete-button"
                                        onClick={() => {
                                            this.setState({
                                                modalConfirm: true,
                                                showModal: true, 
                                                fileToDelete: this.props.state.artworkInfoData[file.fileName],
                                                modalMessage: `delete ${file.fileName}?`,
                                            })
                                            // this.props.context.fileDataMethods.deleteDBrecord(file.fileName, file.artworkFamily)
                                        }}
                                    >
                                        Delete
                                </Button>
                            </div>

                        </div>
            
                    </div>
            // }
        )
    }

    filterByFamily = (value) => {
        console.log('call filterByFamily')
        console.log(value)
        const artworkFamily = value
        let newRenderList = {}
        const data = this.state.allFiles
        const list = Object.keys(this.state.allFiles)
        list.forEach(objName => {
            if(data[objName].artworkFamily === value){
                const obj = data[objName]
                newRenderList = {...newRenderList, [objName]: obj}
            }
        })
        this.setState({fileList: newRenderList}, () => {console.log('filter done'); console.log(this.state)})
    }

    reloadAll = () => {
        this.setState({fileList: this.state.allFiles})
    }

    deletePromise = (fileName, artworkFamily) => {
        this.props.context.fileDataMethods.deleteDBrecord(fileName, artworkFamily)
            .then(res => {
                console.log(res)
                let newState = {...this.state}
                const noFile = {...this.state.fileToDelete} 
                noFile.fileName = null
                newState.modalMessage = res
                newState.modalConfirm = false
                newState.fileToDelete = noFile
                console.log("no File")
                console.log(noFile)
                // this.setState(newState, console.log(this.state))
            })

    }

    componentDidMount(){
        this.setState({fileList: this.props.state.artworkInfoData})
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
                            onClick={this.reloadAll}
                        >
                            reload file list
                        </Button>
                    </div>

                    <div style={{display: "flex", flexWrap: "wrap"}}>
                        {
                            Object.keys(this.state.fileList).map(fileName => {
                                return this.EditDetail(this.props.state.artworkInfoData[fileName])
                            })
                        }
                    </div>
                    {this.state.showModal ?                     
                        <BootstrapModal 
                            confirm={this.state.modalConfirm}
                            showModal={this.state.showModal}
                            // message={this.state.modalMessage}
                            onClose={this.onClose}
                            confirmedAction={() => this.deletePromise(this.state.fileToDelete.fileName, this.state.fileToDelete.artworkFamily)}
                        >
                            <div>
                                <p>{this.state.modalMessage}</p>
                                {this.state.fileToDelete.fileName ? 
                                <img style={{height: "150px"}} alt={`delete-${this.state.fileToDelete.fileName}`} src={`/uploads/${this.state.fileToDelete.fileName}`} /> :
                                null 
                                }
                            </div>
                        </BootstrapModal> :
                        null
                    }
                </div>
        )
    }
}