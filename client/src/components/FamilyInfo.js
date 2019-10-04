import React, { Component } from 'react';
import { Context } from './Provider';
import ExtendedList from './ExtendedList';
import AddNew from './AddNew';
import ThemeSelector from './ThemeSelector';
import Button from 'react-bootstrap/Button'
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/components/jsonPreview.css';
import '../css/components/imageInfo.css'

export default class FamilyInfo extends Component {
    static contextType = Context;

    constructor(props){
        super(props);
    }

    render(){
        return(
            <Context.Consumer>
                {()=>{
                    return(
                        <div>
                            
                            <ExtendedList 
                                listName="select artwork family: "
                                // array={this.artworks()}
                                array={this.context.state.artworkFamilyList}
                                string="artworkFamily"
                                id="familyList"
                            />
                            <AddNew
                            router={'/api/artworkFamilyList/update'}
                            stateKey='artworkFamilyList'
                            requestKey="list"
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
                                        disabled={!this.context.state.artworkFamily}
                                        onClick={this.context.useFamilySetup}
                                        />
                                    </div>
                                    <div className="container-radio">
                                        <label htmlFor="familyDisplaySetup_no">no</label>
                                        <input type="radio" 
                                        name="familyDisplaySetup" 
                                        id="familyDisplaySetup__radio-no" 
                                        value="no" 
                                        disabled={!this.context.state.artworkFamily}
                                        defaultChecked 
                                        />
                                    </div>
                                </form>
                            </div>                      
                            <ExtendedList 
                                listName="add 'see also' items: "
                                array={this.context.state.artworkFamilyList}
                                string="seeAlso"
                                id="seeAlso"
                            />
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
                                placeholder={this.context.state.familyDescription ? this.context.state.familyDescription : null}
                                ></textarea>
                            </div>

                            <ThemeSelector/>

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