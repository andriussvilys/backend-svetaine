import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Context } from '../Provider';

import EditDetailContainer from './components/EditPage/EditDetailContainer';
import ServerFileUpdate from './components/EditPage/ServerFileUpdate';
import Accordion from './components/Accordion';
import BootstrapModal from './components/BootstrapModal';
import Filters from './components/Filters/Filters';
import EditFamilyInfo from './components/FamilyInfo/EditFamilyInfo'

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
                                            <EditFamilyInfo 
                                                context={this.context}
                                            />
                                            <Filters 
                                                context={this.context}
                                            />
                                        </Accordion>

                                    </Route>
                                    <Route 
                                        path="/admin/edit/:fileName"
                                        render={(props) => 
                                            {return <ServerFileUpdate 
                                                    // relatedArtwork={this.context.state.relatedArtwork[familyName]}
                                                    context={this.context}
                                                    familyName={this.context.state.artworkInfoData[props.match.params.fileName].artworkFamily}
                                                    file={this.context.state.fileData.files[props.match.params.fileName]}
                                                    files={this.sortByFamily().fileByFamily[this.context.state.artworkInfoData[props.match.params.fileName].artworkFamily]}
                                                    relatedArtwork={this.context.state.relatedArtwork[this.context.state.artworkInfoData[props.match.params.fileName].artworkFamily]}

                                                    removeFile={this.context.fileDataMethods.removeFile}

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