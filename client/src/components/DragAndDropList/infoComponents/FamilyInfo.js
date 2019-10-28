import React, { Component } from 'react';
import { Context } from '../../Provider';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion' 
import Card from 'react-bootstrap/Card'

import DropDownList from '../../DropDownList'
import SeeAlsoSelector from './SeeAlsoSelector'
import FamilyPreview from '../../FamilyPreview'
import ExtendedList from './ExtendedList';
import ThemeSelector from './ThemeSelector';
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/jsonPreview.css';
import '../css/imageInfo.css'
import FamilyListDnDContainer from '../FamilyListDnD/FamilyListDnDContainer';

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

    familyListData = () => {
        if(!this.props.file.artworkFamily){
           return null
        }
        else{
            return this.context.state.relatedArtwork[this.props.file.artworkFamily]
        }
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
                                        onChange={() => {this.context.fileDataMethods.transferState(this.props.file)}}
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
                                        onChange={() => this.context.useFamilySetup(false)}
                                        checked={!this.context.state.fileData.files[this.props.fileName].useFamilySetup}
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
                                onChange={this.context.getFamilySetup}
                                isChecked={this.context.fileDataMethods.isChecked}
                                id="List-of-artwork-families"
                                router={'api/artworkFamilyList/update'}
                                addNewTarget={'artworkFamilyList'}
                                displayAddNew="initial"
                            />

                            {/* <FamilyListDnDContainer 
                            data={this.familyListData()}
                            fileName={this.props.file.fileName}
                            artworkFamily={this.props.file.artworkFamily}
                            /> */}

                            <Accordion >
                                <Card>
                                    <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0" className="accordion-secondary">
                                        Arrange family display order
                                        <p className="subtitle">{!this.props.file.artworkFamily ? "please select an artworkFamily first" : null}</p>
                                    </Accordion.Toggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                    <Card.Body>

                                    <FamilyListDnDContainer 
                                        data={this.familyListData()}
                                        fileName={this.props.file.fileName}
                                        artworkFamily={this.props.file.artworkFamily}
                                    />

                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>

                            <SeeAlsoSelector 
                                fileName={this.props.file.fileName}
                                renderAllFiles={this.context.familySetupMethods.renderAllFiles}
                                resetFilelist={this.context.familySetupMethods.resetRenderFiles}

                                fileList={this.context.state.artworkInfoData}
                                renderList={this.context.state.seeAlsoData.renderFiles}

                                state={this.context.state}
                                highlighterReference={this.context.state.fileData.files[this.props.fileName].seeAlso}
                                //array is for dropdown list of artworkFamily names
                                array={this.context.state.familySetupData.seeAlso}
                                //stateNest is for highlighting records already in state
                                stateNest={this.context.state.fileData.files[this.props.fileName]}

                                inputOnChange={this.context.fileDataMethods.onChange}
                                OnChange={this.context.familySetupMethods.filterByFamily}
                                isChecked={this.context.familySetupMethods.isChecked}

                                serverFileDir={this.context.state.serverFileDir}
                            />

                            <div className="DnD-imageInfo--box" style={{display: "block"}}>
                                <div>
                                    <p>Family description:</p> 
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