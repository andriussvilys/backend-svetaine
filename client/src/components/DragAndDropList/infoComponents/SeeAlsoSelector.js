import React from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';

import FilePreview from '../../FilePreview';
import DropDownList from '../../DropDownList'

export default class SeeAlsoSelector extends React.Component{

    constructor(props){
        super(props);
        this.state = {fileList: [], renderList: []}
    }

    filterByFamily = (value) => {
        let newRenderList = []
        this.state.fileList.forEach(file => {
            if(file.artworkFamily === value){
                newRenderList = [...newRenderList, file]
                newRenderList.fileNames = newRenderList.map(file => file.fileName)
            }
        })

        this.setState({renderList: newRenderList})
    }

    reRenderAllFiles = (fileList, highlighterReference) => {

            let renderList = []

            const highlighter = (fileName) => {
                return highlighterReference.includes(fileName)
            }

            let usedNames = [];
    
            fileList.forEach((file, index) => {
                    if(usedNames.includes(file.fileName)){
                        return
                    }
                    usedNames = [...usedNames, file.fileName]
                    let newFile = 
                        // fileName: file.fileName,
                        // artworkFamily: file.artworkFamily,
                        // checked: highlighter(file.fileName),
                        // file: 
                            <div key={`fileLibrary-${file.fileName}`} 
                            style={{maxWidth: "200px", display:"flex", flexDirection:"column", justifyContent:"space-between", border: "1px solid black", margin: "2px 1px 0 1px"}}
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
                                        key={`fileUpload-${file.fileName}-${index}`}
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
                                            onChange={() => {this.props.inputOnChange(file.fileName, "seeAlso", this.props.fileName)}}
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
                                            onChange={() => {this.props.inputOnChange(file.fileName, "seeAlso", this.props.fileName)}}
                                            checked={!highlighter(file.fileName)}
                                            />
                                            <label htmlFor="useAsSeeAlso_no">no</label>
                                        </div>
                                    </form>
                                </div>
    
                            </div>
                    

                    renderList = [...renderList, newFile]
                })

            return renderList
        
                // this.setState({renderList: renderList})
    }

    componentMountRenderAllFiles = (fileList, highlighterReference) => {

        return new Promise ((resolve, reject) => {
            let renderList = []

            const fileListPromise = new Promise((res, rej) => {
                if(fileList && Object.keys(fileList).length > 0){
                    let newfileList = Object.keys(fileList).map(objName => fileList[objName]);
                    res(newfileList)
                }
            })

            fileListPromise
            .then(res => {
                let usedNames = [];
        
                res.forEach((file, index) => {
                        if(usedNames.includes(file.fileName)){
                            return
                        }
                        usedNames = [...usedNames, file.fileName]
                        let newFile = file
                        
                        renderList = [...renderList, newFile]
                    })
                
                resolve(renderList)
                }
            )
        })
    }

    resetFileList = () => {
        this.setState({renderList: this.state.fileList})
    }

    componentDidMount(){
        let newState = {...this.state}

        newState.fileList = this.props.fileList

        this.componentMountRenderAllFiles(this.props.fileList, this.props.highlighterReference).then(
            res => {
                newState.renderList = res
                this.setState(newState)
            }
        )
    }

    render(){
        return(
            <div className="themeSelector">
                <Accordion >
                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0" className="accordion-secondary">
                            Select "see also" elements
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>

                        <div>
                            <DropDownList 
                                    title={"filter by artwork families"}
                                    state={this.props.state}
                                    array={this.props.state.artworkFamilyList}
                                    string={"fileNames"}
                                    onChange={this.filterByFamily}
                                    isChecked={this.props.isChecked}
                                    id="artworkFamily-fileUpdata"
                                    displayAddNew="none"
                            />
                            <Button
                                size="sm"
                                variant="primary"
                                onClick={() => this.resetFileList()}
                            >
                                load all files
                            </Button>
                        </div>

                        <div style={{display: "flex", flexWrap: "wrap"}}>
                            {/* {this.renderAllFiles(this.state.fileList, this.props.highlighterReference)} */}
                            {!this.state.renderList ? null : this.reRenderAllFiles(this.state.renderList, this.props.highlighterReference).map(obj=> {return obj})}
                        </div>

                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
        </div>
        )
    }
}