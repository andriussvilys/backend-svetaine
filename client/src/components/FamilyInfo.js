import React, { Component } from 'react';
import { Context } from './Provider';
import ExtendedList from './ExtendedList';
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/components/jsonPreview.css';
import '../css/components/imageInfo.css'

export default class FamilyInfo extends Component {
    static contextType = Context;

    constructor(props){
        super(props);
    
        // this.artworks = [];
        this.artworks = () => {
            const objLength = Object.keys(this.context.artworkData).length;
            let artworkNames = [];
            for (let index = 0; index < objLength; index++) {
                artworkNames = [...artworkNames, this.context.artworkData[index].artwork]
            }
            console.log(Array.from(new Set (artworkNames)))
            return artworkNames = Array.from(new Set (artworkNames))
        }
    }

    render(){
        return(
            <Context.Consumer>
                {()=>{
                    return(
                        <div>
                            <div className="imageInfo--box">
                                <div>
                                    <p>Add Artwork title:</p> 
                                    <p className="subtitle">(different from family name):</p>
                                </div>
                                <input 
                                type="text" 
                                value={this.context.state.artworkTitle} 
                                onChange={(e) => this.context.onChange(e, 'artworkTitle')} 
                                />
                            </div>
                            <ExtendedList 
                                listName="select artwork family: "
                                array={this.artworks()}
                                string="artworkFamily"
                                id="familyList"
                            />
                            <div className="imageInfo--box" style={{display: 'flex'}}>
                                <span>use family setup</span>
                                <form >
                                    <div className="container-radio">
                                        <label htmlFor="familyDisplayIndex_yes">yes</label>
                                        <input type="radio" 
                                        defaultChecked 
                                        name="familyDisplayIndex" 
                                        id="familyDisplayIndex__yes" 
                                        value="yes" 
                                        disabled
                                        />
                                    </div>
                                    <div className="container-radio">
                                        <label htmlFor="familyDisplayIndex_no">no</label>
                                        <input type="radio" 
                                        name="familyDisplayIndex" 
                                        id="familyDisplayIndex__no" 
                                        value="no" 
                                        disabled
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="imageInfo--box">
                                <span>family display index:</span>
                                <input 
                                type="number" 
                                min="0" 
                                onChange={(e) => this.context.onChange(e, "familyDisplayIndex") } 
                                />
                            </div>
                            <ExtendedList 
                                listName="add 'see also' items: "
                                array={this.artworks()}
                                string="seeAlso"
                                id="seeAlso"
                            />

                        </div>
                    )
                }}
            </Context.Consumer>
        )
    }
}