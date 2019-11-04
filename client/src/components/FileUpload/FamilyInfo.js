import React, { Component } from 'react';

import DropDownList from '../DropDownList'
import SeeAlsoSelector from './SeeAlsoSelector'
import Button from 'react-bootstrap/Button'

const FamilyInfo = (props) => {
    console.log('FAMILY INFO FILE NAME')
    console.log(props.seeAlso.fileName)
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
                        state={props.seeAlso.state}
                        context={props.seeAlso.context}
                        array={props.seeAlso.state.familySetupData.seeAlso}
                        stateNest={props.seeAlso.state.familySetupData.seeAlso}
                        onChange={props.seeAlso.context.fileDataMethods.onChange}
                        isChecked={props.seeAlso.context.fileDataMethods.isChecked}
                        serverFileDir={props.seeAlso.state.serverFileDir}
                    />

                </div>

            </div>
        </div>
        )
}

export default FamilyInfo