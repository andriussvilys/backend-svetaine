import React, { Fragment } from 'react';

import Button from 'react-bootstrap/Button';

import BootstrapModal from '../BootstrapModal';
import ImageBox from '../ImageBox/ImageBox';
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
    
    EditDetail = (file) => {
        if(!file){return}
        return(
                <ImageBox
                    file={file}
                    key={`${file.fileName}-detail`}
                    directory={this.state.selectedFiles}
                >
                    <Button
                        onClick={() => {
                            const selected = this.state.selectedFiles.includes(file.fileName)
                            let newState = {...this.state}
                            let selectedFiles = []
                            if(selected){
                                selectedFiles = newState.selectedFiles.filter(fileName => fileName !== file.fileName)
                            }
                            else{
                                selectedFiles = [...newState.selectedFiles, file.fileName]
                            }
                            newState.selectedFiles = selectedFiles
                            this.setState(newState)
                        }}
                    >{this.state.selectedFiles.includes(file.fileName) ? "Unselect" : "Select"}</Button>
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
        this.setState({fileList: newRenderList})
    }

    reloadAll = () => {
        this.setState({fileList: this.state.allFiles})
    }

    componentDidMount(){
        const allFileNames = Object.keys(this.props.state.artworkInfoData)
        const selectedFiles = this.props.highlightRef
        const withoutSelected = allFileNames.filter(fileName => !selectedFiles.includes(fileName))
        const orderedList = [...selectedFiles, ...withoutSelected]
        console.log(orderedList)
        const newState = {...this.state}
        newState.orderedList = orderedList
        newState.fileList = this.props.state.artworkInfoData
        newState.selectedFiles = this.props.highlightRef
        this.setState(newState)
        // this.setState({fileList: this.props.state.artworkInfoData})
    }

    render(){
        if(this.state.orderedList){
            return(
                <Fragment>
                    <div>
                    <Button
                            onClick={() => {

                                let artworkOnDisplay = {}
                                this.state.selectedFiles.forEach(fileName => {
                                    artworkOnDisplay[fileName] = this.state.fileList[fileName]
                                })

                                this.props.context.setArtworkOnDisplay(artworkOnDisplay)
                                let newState = {...this.state}
                                newState.showModal = true
                                newState.modalMessage = "Saved"
                                this.setState(newState)
                            }}
                        >Save
                        </Button>
                        <Button
                            onClick={() => {
                                this.setState({selectedFiles: []})
                            }}
                        >Unselect All
                        </Button>
                    </div>

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
                                    uncontrolled
                                    radio
                                />
                            </Accordion>
                        </div>
                        <div 
                        className={"grid-wrapper"}
                        >
                            {
                                this.state.orderedList.map(fileName => {
                                    return this.EditDetail(this.props.state.artworkInfoData[fileName])
                                })
                            }
                        </div>
                        {this.state.showModal ?                     
                            <BootstrapModal 
                                showModal={this.state.showModal}
                                // onClose={this.onClose}
                                onClose={() => {this.setState({showModal:false})}}
                            >
                                {this.state.modalMessage}
                            </BootstrapModal> :
                            null
                        }
                    </div>
                </Fragment>
        )
        }
        else return null
    }
}