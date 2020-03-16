import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Context } from './Provider';

import EditDetailContainer from './EditPage/EditDetailContainer';
import ServerFileUpdate from './EditPage/ServerFileUpdate';
import Accordion from './Admin/Accordion';
import BootstrapModal from './Admin/BootstrapModal';
import GlobalSetup from './Admin/Create/GlobalSetup';

export default class Edit extends Component{
    static contextType = Context;

    //returns an array from a names collection
    filesData = (dataObj) => Object.keys(dataObj).map(objName => {
        return dataObj[objName]
    })

    sortByFamily = () => {

        let fileByFamily = {}
        let familyNames = []
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

    render(){
        return(
                <Context.Consumer>
                {
                    () => {
                        return(
                                <Switch>
                                    <Route exact path="/admin/edit">
                                        <h3>Edit</h3>
                                        <Accordion
                                            title="Edit by artwork"
                                        >
                                            <EditDetailContainer 
                                                context={this.context}
                                                state={this.context.state}
                                                familySetupMethods={this.context.familySetupMethods}
                                            />
                                        </Accordion>

                                        <Accordion
                                            title={"Update or Create family record"}
                                        >
                                            <GlobalSetup
                                                context={this.context}
                                            >
                                                <div style={{width: "100%", height: "200px", backgroundColor: "yellow"}}>

                                                </div>
                                            </GlobalSetup>
                                        </Accordion>
                                    </Route>
                                    <Route 
                                        path="/admin/edit/:fileName"
                                        render={(props) => 
                                            {return <ServerFileUpdate 
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
                            
                                                    // relatedArtwork={this.context.state.relatedArtwork[familyName]}
                                                    context={this.context}
                                                    familyName={this.context.state.artworkInfoData[props.match.params.fileName].artworkFamily}
                                                    // file={this.context.state.artworkInfoData[props.match.params.fileName]}
                                                    file={this.context.state.fileData.files[props.match.params.fileName]}
                                                    files={this.sortByFamily().fileByFamily[this.context.state.artworkInfoData[props.match.params.fileName].artworkFamily]}
                                                    relatedArtwork={this.context.state.relatedArtwork[this.context.state.artworkInfoData[props.match.params.fileName].artworkFamily]}
                                                    controls={{
                                                        removeFile: this.context.fileDataMethods.removeFile,
                                                        updateArtworkInfo: this.context.fileDataMethods.updateArtworkInfo,
                                                        fileDataMethods: this.context.fileDataMethods,
                                                        onChange: this.context.onChange
                                                    }}
                                                />
                                            }
                                        }
                                    /> 
                                    <BootstrapModal 
                                        showModal={this.context.state.showModal}
                                        message="updating database"
                                        onClose={this.context.onClose}
                                    />
                                </Switch>
                        )
                    }
                }
                </Context.Consumer>
        )
    }
}