import React, { Component } from 'react';

import DropDownList from '../DropDownList'
import SeeAlsoSelector from './SeeAlsoSelector'
import Button from 'react-bootstrap/Button'

const FamilyInfo = (props) => {
        return(
            <div className="familyInfo-container">

                <div className="familyInfo-child">
                <div className="imageInfo--box">
                    <DropDownList 
                        title={'Select Artwork Family'}
                        state={props.familyDropDown.state}
                        array={props.familyDropDown.familyList}
                        string={"artworkFamily"}
                        fileName={props.familyDropDown.fileName}
                        onChange={props.familyDropDown.context.getFamilySetup}
                        isChecked={props.familyDropDown.context.familySetupMethods.isChecked}
                        id="List-of-artwork-families"
                        router={'api/artworkFamilyList/update'}
                        addNewTarget={'artworkFamilyList'}
                        displayAddNew="initial"
                    />

                    <DropDownList 
                        title={"Select Family Themes"}
                        state={props.themesDropDown.state}
                        array={props.themesDropDown.themesData}
                        string={"themes"}
                        fileName={props.familyDropDown.fileName}
                        onChange={props.themesDropDown.context.fileDataMethods.onChange}
                        isChecked={props.themesDropDown.context.familySetupMethods.isChecked}
                        id="Themes-list"
                        router={'/api/themes/update'}
                        addNewTarget={'themesData'}
                        displayAddNew="initial"
                    />

                    <SeeAlsoSelector 
                        initialData={props.seeAlso.state.artworkInfoData}
                        highlightReference={props.seeAlso.highlightReference}
                        fileName={props.seeAlso.fileName}
                        // renderFiles={props.seeAlso.state.seeAlsoData.renderFiles}
                        // renderAllFiles={props.seeAlso.context.familySetupMethods.renderAllFiles}
                        state={props.seeAlso.state}
                        context={props.seeAlso.context}
                        // highlighterReference={props.seeAlso.state.seeAlsoData.renderFiles}
                        array={props.seeAlso.state.familySetupData.seeAlso}
                        stateNest={props.seeAlso.state.familySetupData.seeAlso}
                        onChange={props.seeAlso.context.fileDataMethods.onChange}
                        isChecked={props.seeAlso.context.fileDataMethods.isChecked}
                        serverFileDir={props.seeAlso.state.serverFileDir}
                    />
                {/* </div>

                <div className="imageInfo--box" style={{display: "block"}}>
                    <div>
                        <p>Family description:</p> 
                    </div>
                    <textarea
                    value={this.context.state.familyDescription}
                    onChange={
                        (e) => this.context.onChange(e, "familyDescription")
                    }
                    style={{width: "100%"}}
                    value={this.context.state.familySetupData.familyDescription ? 
                        this.context.state.familySetupData.familyDescription : 
                        ""}
                    ></textarea>
                </div> */}

                {/* <div className="imageInfo--box">
                    <span>record new family setup:</span>
                    <Button
                        variant="success" 
                        size="sm"
                        onClick={
                            this.context.createFamilySetup
                        }
                    >
                        SEND
                    </Button>
                </div>      
                <div className="imageInfo--box">
                    <span>update family setup:</span>
                    <Button
                        variant="primary" 
                        size="sm"
                        onClick={
                        () => this.context.familySetupMethods.updateFamilySetup(this.context.state.familySetupData.artworkFamily)
                        }
                    >
                        SEND
                    </Button>
                </div>       */}

                </div>

            </div>
        </div>
        )
}

export default FamilyInfo