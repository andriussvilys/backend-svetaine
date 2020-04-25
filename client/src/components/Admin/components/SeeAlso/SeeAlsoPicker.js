import React, { Fragment } from 'react';

import Button from 'react-bootstrap/Button';

import BootstrapModal from '../BootstrapModal';
import ImageBox from '../ImageBox/ImageBox';
import EditFileButtons from '../ImageBox/optionalComponents/EditFileButtons'
import FilePreview from '../FilePreview'
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
        this.setState({fileList: this.props.context.state.artworkInfoData})
    }

    render(){
        return(
                <div 
                id={'familyContainer-seeAlso'}
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
                </div>
        )
    }
}