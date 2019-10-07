import React, { Component } from 'react';
import { Context } from './Provider';
import ExtendedList from './ExtendedList';
import DropDownList from './DropDownList'
import ThemeSelector from './ThemeSelector';
import Button from 'react-bootstrap/Button'
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/components/jsonPreview.css';
import '../css/components/imageInfo.css';

export default class FamilyInfo extends Component {
    static contextType = Context;

    render(){
        return(
            <Context.Consumer>
                {()=>{
                    return(
                        <div>

                            {/* <ExtendedList 
                                listName="select artwork family: "
                                // array={this.artworks()}
                                array={this.context.state.artworkFamilyList}
                                string="artworkFamily"
                                id="familyList"
                            /> */}

                            <DropDownList 
                                title={'Select Artwork Family'}
                                state={this.context.state}
                                array={this.context.state.artworkFamilyList}
                                string={"artworkFamily"}
                                // onChange={this.context.familySetupMethods.onChange}
                                onChange={this.context.getFamilySetup}
                                isChecked={this.context.familySetupMethods.isChecked}
                                id="List-of-artwork-families"
                                router={'api/artworkFamilyList/update'}
                                addNewTarget={'artworkFamilyList'}
                                displayAddNew="initial"
                            />

                            <DropDownList 
                                title={"Select Family Themes"}
                                state={this.context.state}
                                array={this.context.state.themesData}
                                string={"themes"}
                                onChange={this.context.familySetupMethods.onChange}
                                isChecked={this.context.familySetupMethods.isChecked}
                                id="Themes-list"
                                router={'/api/themes/update'}
                                addNewTarget={'themesData'}
                                displayAddNew="initial"
                            />

                            <DropDownList 
                                title={"Set 'See Also' artwork families"}
                                state={this.context.state}
                                array={this.context.state.artworkFamilyList}
                                string={"seeAlso"}
                                onChange={this.context.familySetupMethods.onChange}
                                isChecked={this.context.familySetupMethods.isChecked}
                                id="seeAlso-list"
                                displayAddNew="none"
                            />

                            <div className="imageInfo--box" style={{display: 'flex'}}>
                                <span>use family setup</span>
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
                                        onClick={() => this.context.useFamilySetup(true)}
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
                                        defaultChecked 
                                        />
                                    </div>
                                </form>
                            </div>                      
                            {/* <ExtendedList 
                                listName="add 'see also' items: "
                                array={this.context.state.artworkFamilyList}
                                string="seeAlso"
                                id="seeAlso"
                            /> */}
                            <div className="imageInfo--box" style={{display: "block"}}>
                                <div>
                                    <p>Family description:</p> 
                                    {/* <p className="subtitle">(different from family name):</p> */}
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
                            </div>

                            {/* <ThemeSelector/> */}

                            <div className="imageInfo--box">
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




                        </div>
                    )
                }}
            </Context.Consumer>
        )
    }
}