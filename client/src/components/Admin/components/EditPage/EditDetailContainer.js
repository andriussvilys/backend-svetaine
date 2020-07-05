import React, { Fragment } from 'react';

import Button from 'react-bootstrap/Button';

import BootstrapModal from '../BootstrapModal';
import ImageBox from '../ImageBox/ImageBox';
import EditFileButtons from '../ImageBox/optionalComponents/EditFileButtons'
import FilePreview from '../FilePreview'
import SelectFamily from '../FamilyInfo/subcomponents/SelectFamily'
import Accordion from '../Accordion';

export default class EditDetailContainer extends React.Component{

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
        this.setState({showModal: false, modalConfirm: true})
    }

    verify = () => {
        const result = this.props.context.verify()
        console.log("result")
        console.log(result)
        if(result.verified){
          return true
        }
        else{
          this.setState({...result})
          return false
        }
      }

    onModalClick = (fileName) => {
        if(!this.verify()){
            this.setState({modalConfirm: false})
            return
        }
        let newState = {...this.state}
        newState.fileToDelete = this.props.context.state.artworkInfoData[fileName]
        newState.showModal = true
        newState.modalMessage = <span>Delete <em>{fileName}</em>?</span>
        this.setState(newState)
    }

    EditDetail = (file) => {
        if(!file){return}
        return(
                <ImageBox
                    file={file}
                    key={`${file.fileName}-detail`}
                >
                    <EditFileButtons 
                        file={file}
                        context={this.props.context}
                        onModalClose={this.onClose}
                        onModalClick={this.onModalClick}
                    />
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
                .then(res => {
                    console.log("deletePromiseResovle")
                    console.log(res)
                        let newState = {...this.state}
                        newState.modalMessage = res.modalMessage
                        newState.modalConfirm = false
                        this.setState(newState)
                    resolve()
                })
                .catch(err => {reject({
                        modalMessage: err,
                        modalConfirm: false
                    })
                })
        })
    }

    componentDidMount(){
        this.setState({fileList: this.props.state.artworkInfoData})
    }

    render(){
        return(
                <div 
                id={'familyContainer'}
                className={"EditDetailContainer"}
                >
                    {/* <div className="familyPicker">
                        <SelectFamily 
                            context={this.props.context}
                            onChange={this.filterByFamily}
                            uncontrolled
                            radio
                        />
                        <button
                            // size="sm"
                            // variant="primary"
                            className={"btn-sm btn-primary familyPicker-reload"}
                            onClick={this.reloadAll}
                        >
                            reload file list
                        </button>
                    </div> */}

                        <div className="familyPicker">
                            <div className="familyPicker-toggleContainer">
                                <div className="familyPicker-toggleContainer-icons">
                                    <img 
                                        className={`viewControls-viewNext ${this.props.disabled ? "viewControls-button-disabled" : ''}`}
                                        alt="view next" 
                                        src="icons/svg/view-right.svg" 
                                    />
                                    <img 
                                        className={`viewControls-viewNext ${this.props.disabled ? "viewControls-button-disabled" : ''}`}
                                        alt="view next" 
                                        src="icons/svg/filter.svg" 
                                    />
                                </div>
                            </div>

                            <SelectFamily 
                                context={this.props.context}
                                onChange={this.filterByFamily}
                                uncontrolled
                                radio
                                containerModifier="grid-wrapper_filters"
                            />
                            <button
                                className={"btn-sm btn-primary familyPicker-reload"}
                                onClick={this.reloadAll}
                            >
                                reload file list
                            </button>
                        </div>


                    <div 
                    className={"grid-wrapper"}
                    // style={{display: "flex", flexWrap: "wrap", justifyContent: "space-around"}}
                    >
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
                    }
                </div>
        )
    }
}