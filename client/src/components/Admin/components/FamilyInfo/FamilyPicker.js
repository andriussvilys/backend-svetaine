import React, { Fragment } from 'react';

import Button from 'react-bootstrap/Button';

import BootstrapModal from '../BootstrapModal';
import ImageBox from '../ImageBox/ImageBox';
import EditFileButtons from '../ImageBox/optionalComponents/EditFileButtons'
import FilePreview from '../FilePreview'
import SelectFamily from '../FamilyInfo/subcomponents/SelectFamily'
import Accordion from '../Accordion';

export default class FileUpdate extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            modalMessage: null,
            modalConfirm: true,
            fileList: this.props.context.state.artworkInfoData,
            allFiles: this.props.context.state.artworkInfoData
        }
    }

    EditDetail = (file) => {
        if(!file){return}
        return(
                <ImageBox
                    file={file}
                    key={`${file.fileName}-detail`}
                >
                    {this.props.children}
                    {/* <EditFileButtons 
                        file={file}
                        context={this.props.context}
                        onModalClose={this.onClose}
                        onModalClick={this.onModalClick}
                    /> */}
                </ImageBox>
        )
    }

    filterByFamily = (value) => {
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
        return new Promise((resolve, reject) => {
            this.props.context.fileDataMethods.deleteDBrecord(fileName, artworkFamily)
                .then(res => {resolve({
                        modalMessage: res,
                        modalConfirm: false
                    })
                })
                .catch(err => {reject({
                        modalMessage: err,
                        modalConfirm: false
                    })
                })
        })
    }

    componentDidMount(){
        if(this.props.context.state){
            this.setState({fileList: this.props.context.state.artworkInfoData})
        }
    }

    render(){
        if(this.state.fileList){
            return(
                    <div 
                    id={'familyContainer'}
                    className={"EditDetailContainer"}
                    >
                        <div className="familyPicker">
                            <button
                                // size="sm"
                                // variant="primary"
                                className={"btn-sm btn-primary familyPicker-reload"}
                                onClick={this.reloadAll}
                            >
                                reload file list
                            </button>
                            <Accordion
                                title={"filter by family"}
                            >
                                <SelectFamily 
                                    context={this.props.context}
                                    onChange={this.filterByFamily}
                                />
                            </Accordion>
                        </div>
    
    
                        <div 
                        className={"grid-wrapper"}
                        // style={{display: "flex", flexWrap: "wrap", justifyContent: "space-around"}}
                        >
                            {
                                Object.keys(this.state.fileList).map(fileName => {
                                    return this.EditDetail(this.props.context.state.artworkInfoData[fileName])
                                })
                            }
                        </div>
                        {/* {this.state.showModal ?                     
                            <BootstrapModal 
                                confirm={this.state.modalConfirm}
                                showModal={this.state.showModal}
                                onClose={this.onClose}
                                confirmedAction={() => this.deletePromise(this.state.fileToDelete.fileName, this.state.fileToDelete.artworkFamily)}
                            >
                                <div>
                                    <p>{this.state.modalMessage}</p>
                                    {this.state.fileToDelete ? 
                                        <FilePreview 
                                            file={this.state.fileToDelete}
                                        /> :
                                        null
                                    }
                                </div>
                            </BootstrapModal> :
                            null
                        } */}
                    </div>
            )
        }
        else{
            return(
                <div>no load</div>
            )
        }
    }
}