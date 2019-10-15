import React, { Component } from 'react';
import { Context } from '../../Provider';

import DropDownList from '../../DropDownList'
import FamilyPreview from '../../FamilyPreview'
import ExtendedList from './ExtendedList';
import ThemeSelector from './ThemeSelector';
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/jsonPreview.css';
import '../css/imageInfo.css'

export default class FamilyInfo extends Component {
    static contextType = Context;

    constructor(props){
        super(props)
    }

    useFamilySetup = (stateKey) => {
        if(this.context.state.familySetupData[stateKey] 
            && this.context.state.familySetupData.useFamilySetup
            && !this.context.state.fileData.files[this.props.fileName][stateKey]){
                return this.context.state.familySetupData[stateKey] 
            }
        if(this.context.state.fileData.files[this.props.fileName][stateKey]){
            return this.context.state.fileData.files[this.props.fileName][stateKey]
        }
        else return null
    }

    render(){
        return(
            <Context.Consumer>
                {()=>{
                    return(
                        <div>
                            <div className="DnD-imageInfo--box" style={{display: 'flex'}}>
                                <span>use global family setup</span>
                                <form >
                                    <div className="container-radio">
                                        <label 
                                        htmlFor="familyDisplaySetup_yes"
                                        id="familyDisplaySetup_yes"
                                        >yes</label>
                                        <input type="radio" 
                                        name="familyDisplaySetup" 
                                        id="familyDisplaySetup__radio-yes" 
                                        value="yes" 
                                        disabled={this.context.state.familySetupData.artworkFamily === null ? true : false}
                                        onClick={() => {this.context.fileDataMethods.transferState(this.props.file)}}
                                        checked={this.context.state.fileData.files[this.props.fileName].useFamilySetup}
                                        />
                                    </div>
                                    <div className="container-radio">
                                        <label htmlFor="familyDisplaySetup_no">no</label>
                                        <input type="radio" 
                                        name="familyDisplaySetup" 
                                        id="familyDisplaySetup__radio-no" 
                                        value="no" 
                                        disabled={this.context.state.familySetupData.artworkFamily === null ? true : false}
                                        onClick={() => this.context.useFamilySetup(false)}
                                        checked={!this.context.state.fileData.files[this.props.fileName].useFamilySetup}
                                        // defaultChecked 
                                        />
                                    </div>
                                </form>
                            </div>  

                            <DropDownList 
                                title={'Select Artwork Family'}
                                state={this.context.state}
                                fileName={this.props.fileName}
                                array={this.context.state.artworkFamilyList}
                                string={"artworkFamily"}
                                // onChange={this.context.fileDataMethods.onChange}
                                onChange={this.context.getFamilySetup}
                                isChecked={this.context.fileDataMethods.isChecked}
                                id="List-of-artwork-families"
                                router={'api/artworkFamilyList/update'}
                                addNewTarget={'artworkFamilyList'}
                                displayAddNew="initial"
                            />

                            <FamilyPreview
                                file={this.props.file}
                                context={this.props.context}
                                state={this.context.state}
                            /> 

                            <DropDownList 
                                title={"Set 'See Also' artwork families"}
                                state={this.context.state}
                                fileName={this.props.fileName}
                                array={this.context.state.artworkFamilyList}
                                string={"seeAlso"}
                                onChange={this.context.fileDataMethods.onChange}
                                isChecked={this.context.fileDataMethods.isChecked}
                                id="seeAlso-list"
                                displayAddNew="none"
                            />
                            <div className="DnD-imageInfo--box" style={{display: "block"}}>
                                <div>
                                    <p>Family description:</p> 
                                    {/* <p className="subtitle">(different from family name):</p> */}
                                </div>
                                <textarea
                                value={this.useFamilySetup("familyDescription") ? this.useFamilySetup("familyDescription") : ""}
                                onChange={
                                    (e) => this.props.onChange(e.target.value, "familyDescription", this.props.fileName)
                                }
                                style={{width: "100%"}}
                                ></textarea>
                            </div>

                            
                            <DropDownList 
                                title={"Select Family Themes"}
                                state={this.context.state}
                                fileName={this.props.fileName}
                                array={this.context.state.themesData}
                                string={"themes"}
                                onChange={this.context.fileDataMethods.onChange}
                                isChecked={this.context.fileDataMethods.isChecked}
                                id="Themes-list"
                                router={'/api/themes/update'}
                                addNewTarget={'themesData'}
                                displayAddNew="initial"
                            />
                        </div>
                    )
                }}
            </Context.Consumer>
        )
    }
}