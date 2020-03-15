import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

import FilePreview from '../FilePreview';
import DDList from './DropDownList'

export default class SeeAlso extends React.Component{

    constructor(props){
        super(props);
        this.state = {checkedFamily: []}
    }
    /**
     * @params fileList = takes an object with file data 
     * 
     */
    //returns an array of files to be rendered
    renderAllFiles = (fileList) => {
        if(!fileList){
            return
        }
        let domNodes =  fileList.map(fileObj => {
            return fileObj.file
        })
       return domNodes
    }
    filterByFamily = (value) => {
        let newRenderList = this.state.fileList.filter(obj => obj.artworkFamily === value).map(obj => obj.fileName)
        this.setState({fileNames: newRenderList})
    }
    resetData = () => {
        let initialData = this.state.fileList.map(obj => obj.fileName)
        this.setState({fileNames: initialData, checkedFamily: []})
    }
    onDropDownChange = (value) => {

        let checkedFamily = []
        let newFamilyList = []

        if(!this.state.checkedFamily.includes(value)){
            checkedFamily = [value]
            newFamilyList = this.state.fileList.filter(obj => obj.artworkFamily === value).map(obj => obj.fileName)
        }
        else{
            this.state.checkedFamily.includes(value)
            checkedFamily = []
            newFamilyList = this.state.constFileNames
        }
        this.setState({checkedFamily, fileNames: newFamilyList})
    }
    dropDownChecked = (value) => {
        this.state.checkedFamily.includes(value)
    }
    /**
     * @param {array}: takes an array of file names
     */
    createPreviews = (dataArray) => {
        let fileList = dataArray.map(objName => {

            const file = this.props.initialData[objName]

            const highlighter = (objName) => {
                return this.props.highlightReference ? this.props.highlightReference.includes(objName) : false
            }

            let newFile = {
                fileName: file.fileName,
                artworkFamily: file.artworkFamily,
                checked: highlighter(file.fileName),
                file: 
                    <div key={`fileLibrary-${file.fileName}`} 
                    style={{width: "200px", display:"flex", flexDirection:"column", justifyContent:"space-between", border: "1px solid black", margin: "2px 1px 0 1px"}}
                    className={`${highlighter(file.fileName) ? 'themes-list--selected' : 'notSelected'}`} 
                    >
                        <div 
                        style={{display:"flex", flexDirection:"column", height: "100%", justifyContent:"space-between", marginBottom: "1px"}}
                        onClick={(e) => (console.log(file))}
                        >
                            <div>
                                <p className="subtitle">file name:</p>
                                <p style={{fontSize: "10px", fontWeight: "bold"}}>{file.fileName}</p>
                                <p className="subtitle">family name:</p>
                                <p style={{fontSize: "10px", fontWeight: "bold"}}>{!file.artworkFamily ? null : file.artworkFamily}</p>
                            </div>
                            <FilePreview 
                                key={`fileUpload-${file.fileName}`}
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
                                    onChange={() => {

                                        this.props.onChange( file.fileName, "seeAlso", this.props.fileName, 
                                            this.props.callBack(file.fileName, this.props.fileName, true)
                                        )
                                        this.setState({renderList: this.state.renderList})
                                    }}
                                    checked={highlighter(file.fileName)}
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
                                    onChange={() => {
                                        this.props.onChange( file.fileName, "seeAlso", this.props.fileName)
                                        this.setState({renderList: this.state.renderList})
                                    }}
                                    checked={!highlighter(file.fileName)}
                                    />
                                    <label htmlFor="useAsSeeAlso_no">no</label>
                                </div>
                            </form>
                        </div>
    
                    </div>
            }

            return newFile
        })

        // this.setState({renderList: fileList})
        return fileList
    }

    componentDidMount(){
        const dataArray = Object.keys(this.props.initialData)
        let fileList =  this.createPreviews(dataArray)
        this.setState({fileList: fileList, constFileNames: dataArray, fileNames: dataArray})
    }

    render(){
        return(
            <div className="themeSelector">
                <div>
                    <DDList 
                            array={this.props.state.artworkFamilyList}
                            string={"checkedFamily"}
                            state={this.state}
                            fileName={this.props.fileName}
                            title={"filter by artwork families"}
                            onChange={this.onDropDownChange}
                            id="artworkFamily-fileUpdate"
                            displayAddNew="none"
                    />
                    <Button
                        size="sm"
                        variant="primary"
                        onClick={() => this.resetData()}
                    >
                        reload all files
                    </Button>
                </div>

                <div style={{display: "flex", flexWrap: "wrap", justifyContent:"center"}}>
                    {this.state.fileNames ? this.createPreviews(this.state.fileNames).map(fileObj => {return fileObj.file}) : null}
                </div>
            </div>
        )
    }
}