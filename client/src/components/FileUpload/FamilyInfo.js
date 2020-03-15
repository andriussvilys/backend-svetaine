import React from 'react';

import DropDownList from '../DropDownList'
import SeeAlsoSelector from './SeeAlsoSelector'

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
                        router={'/api/familySetup/create'}
                        addNewTarget={'artworkFamilyList'}
                        displayAddNew="initial"
                        requestKey={"artworkFamily"}
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
                        requestKey={"list"}
                    />

                    <SeeAlsoSelector 
                        initialData={props.seeAlso.state.artworkInfoData}
                        highlightReference={props.seeAlso.highlightReference}
                        fileName={props.seeAlso.fileName}
                        state={props.seeAlso.state}
                        context={props.seeAlso.context}
                        onChange={props.seeAlso.context.fileDataMethods.onChange}
                        callBack={props.seeAlso.callBack}
                        isChecked={props.seeAlso.context.fileDataMethods.isChecked}
                    />
                    {props.children}
                </div>

            </div>
        </div>
        )
}

export default FamilyInfo