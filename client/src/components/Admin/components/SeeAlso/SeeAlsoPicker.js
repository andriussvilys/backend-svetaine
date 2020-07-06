import React, { Fragment } from 'react';
import SelectFamily from '../FamilyInfo/subcomponents/SelectFamily'
import Accordion from '../Accordion';
import SeeAlso from './SeeAlso'

export default class SeeAlsoPicker extends React.Component{

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

    EditDetail = (file) => {
        return <SeeAlso 
                    key={`seeAlso-${file.fileName}`}
                    file={file}
                    directory={this.props.directory}
                    onChange={this.props.context.fileDataMethods.updateSeeAlso}
                    parent={this.props.parent.fileName}
                    // onChange={this.props.context.onChange}
                />
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

    componentDidMount(){
        // this.setState({fileList: this.props.context.state.artworkInfoData})
        console.log("SEE ALSO PICKER PROPS")
        console.log(this.props)

        const allFileNames = Object.keys(this.props.state.artworkInfoData)
        const selectedFiles = this.props.highlightRef
        const withoutSelected = allFileNames.filter(fileName => !selectedFiles.includes(fileName))
        const orderedList = [...selectedFiles, ...withoutSelected]
        const newState = {...this.state}
        newState.orderedList = orderedList
        newState.fileList = this.props.state.artworkInfoData
        newState.allFiles = this.props.state.artworkInfoData
        newState.selectedFiles = this.props.highlightRef
        console.log("ORDERED LIST")
        console.log(orderedList)
        this.setState(newState)
    }

    render(){
        if(this.state.orderedList){
            return(
                    <div 
                    id={'familyContainer-seeAlso'}
                    className={"EditDetailContainer"}
                    >
                            <div className={`familyPicker ${this.state.open ? "" : "familyPicker_closed"}`}>
                                <div className="familyPicker-toggleContainer">
                                    <div 
                                        className="familyPicker-toggleContainer-icons"
                                        onClick={() => {
                                            this.setState({open: !this.state.open})
                                        }}    
                                    >
                                        {this.state.open ?                                     
                                            <img 
                                                alt="view next" 
                                                src="/icons/svg/view-right.svg" 
    
                                            /> : null
                                        }
                                        <img 
                                            alt="view next" 
                                            src="/icons/svg/filter.svg" 
                                        />
                                        {!this.state.open ?                                     
                                            <img 
                                                alt="view next" 
                                                src="/icons/svg/view-left.svg" 
                                            /> : null
                                        }
                                    </div>
                                </div>
                                {this.state.open ?     
                                    <Fragment>
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
                                    </Fragment>                       
                                    : null
                                }            
                            </div>
    
    
                        <div 
                        className={"grid-wrapper"}
                        // style={{display: "flex", flexWrap: "wrap", justifyContent: "space-around"}}
                        >
                            {
                                this.state.orderedList.map(fileName => {
                                // Object.keys(this.state.fileList).map(fileName => {
                                    console.log("RENDER EDIT DETAIL")
                                    console.log(fileName)
                                    return this.EditDetail(this.props.context.state.artworkInfoData[fileName])
                                })
                            }
                        </div>
                    </div>
            )
        }
        else{
            return null
        }

    }
}