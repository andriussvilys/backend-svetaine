import React, { Component } from 'react';
import { Context } from './Provider';
import ExtendedList from './ExtendedList';
import AddNew from './AddNew';
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/components/jsonPreview.css';
import '../css/components/imageInfo.css'

export default class FamilyInfo extends Component {
    static contextType = Context;

    constructor(props){
        super(props);
    
        // this.artworks = [];
        // this.artworks = () => {
        //     const objLength = Object.keys(this.context.artworkData).length;
        //     let artworkNames = [];
        //     for (let index = 0; index < objLength; index++) {
        //         artworkNames = [...artworkNames, this.context.artworkData[index].artwork]
        //     }
        //     // console.log(Array.from(new Set (artworkNames)))
        //     return artworkNames = Array.from(new Set (artworkNames))
        // }

        // this.isDisabled = () => { 
        //     if(this.context.state.artworkFamily.length < 0 ){

        //     }
        //     let isDisabled = this.context.state.artworkFamily.length < 0 ?   
        // }
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
                                        <label htmlFor="familyDisplayIndex_yes">yes</label>
                                        <input type="radio" 
                                        defaultChecked 
                                        name="familyDisplayIndex" 
                                        id="familyDisplayIndex__yes" 
                                        value="yes" 
                                        disabled={!this.context.state.artworkFamily}
                                        />
                                    </div>
                                    <div className="container-radio">
                                        <label htmlFor="familyDisplayIndex_no">no</label>
                                        <input type="radio" 
                                        name="familyDisplayIndex" 
                                        id="familyDisplayIndex__no" 
                                        value="no" 
                                        disabled={!this.context.state.artworkFamily}
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
                                array={this.context.state.artworkFamilyList}
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