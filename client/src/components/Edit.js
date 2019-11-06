import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Context } from './Provider';
import FileUpdate from './FileUpdate'
import EditDetailContainer from './EditPage/EditDetailContainer'
import DnDListContainer from './DragAndDropList/DnDListContainer'
import FilePreview from './FileUpload/FilePreview';
import FamilyList from './FileUpload/FamilyList';
import ServerFileUpdate from './EditPage/ServerFileUpdate';

export default class Edit extends Component{
    static contextType = Context;

    //returns an array from a names collection
    filesData = (dataObj) => Object.keys(dataObj).map(objName => {
        return dataObj[objName]
    })

    sortByFamily = () => {

        let fileByFamily = {}
        let familyNames = []
        console.log('ARTWORKinFO DATA -------------------')
        console.log(this.context.state.artworkInfoData)
            this.filesData(this.context.state.artworkInfoData).forEach(file => {
            if(!file.artworkFamily){
                if(!fileByFamily.none){
                    fileByFamily.none = []
                }
                return fileByFamily.none = [...fileByFamily.none, file]
            }
            if(!fileByFamily[file.artworkFamily]){
                fileByFamily[file.artworkFamily] = []
            }
            fileByFamily[file.artworkFamily] = [...fileByFamily[file.artworkFamily], file]
        })

        familyNames = Object.keys(fileByFamily)

        return {fileByFamily, familyNames}
    }

    returnFile = () => {
        if(!this.props.match || !this.props.location || !this.context.state.artworkInfoData){
            return
        }
        const location = this.props.location.pathname

        const fileName = location.substring(this.props.match.path.length + 1)
        const file = this.context.state.artworkInfoData[fileName]

        if(!file){
            return
        }
        console.log('EDIT PROPS')
        console.log(this.props)
        console.log('file')
        console.log(file)
        const familyName = file.artworkFamily

        let sortedData = this.sortByFamily()

        console.log("sortedData")
        console.log(sortedData)

                return <div>
                    <ServerFileUpdate 
                        familyDropDown={{
                            state:this.context.state,
                            familyList: this.context.state.artworkFamilyList,
                            context:this.context,
                        }}
                        themesDropDown={{
                            state:this.context.state,
                            themesData:this.context.state.themesData,
                            context: this.context
                        }}
                        seeAlso={{
                            state: this.context.state,
                            context: this.context,
                            initialData: this.context.state.artworkInfoData,
                            onChange: this.context.fileDataMethods.onChange, 
                        }}

                        relatedArtwork={this.context.state.relatedArtwork[familyName] ? this.context.state.relatedArtwork[familyName] : null}
                        context={this.context}
                        familyName={familyName}
                        file={file}
                        files={sortedData.fileByFamily[familyName]}
                        controls={{
                            removeFile: this.context.fileDataMethods.removeFile,
                            postArtworkInfo: this.context.fileDataMethods.postArtworkInfo,
                            fileDataMethods: this.context.fileDataMethods,
                            onChange: this.context.onChange
                        }}
                    />

                </div>

    }

    render(){
        return(
                <Context.Consumer>
                {
                    () => {
                        return(
                            <div>
                                <Route exact path="/admin/edit">
                                    <EditDetailContainer 
                                        context={this.context}
                                        state={this.context.state}
                                        familySetupMethods={this.context.familySetupMethods}
                                    />
                                </Route>
                                <Route path="/admin/edit/:fileName"
                                > 
                                    <div style={{
                                        height: "calc (100vh - 8px)",
                                        width: "calc (100vw - 8px)",
                                        border: "4px solid black",
                                        boxSizing: "content-box"
                                    }}>
                                       {this.returnFile()} 
                                    </div>
                                </Route>
                            </div>
                        )
                    }
                }
                </Context.Consumer>
        )
    }
}