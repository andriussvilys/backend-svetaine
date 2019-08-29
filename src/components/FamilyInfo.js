import React, { Component } from 'react';
import { Context } from './Provider'
import "bootstrap/dist/css/bootstrap.min.css";
import '../css/components/jsonPreview.css';

export default class FamilyInfo extends Component {
    static contextType = Context;

    render(){
        return(
            <div>
                <div className="imageInfo--box"> 
                    <span>family(artwork) name:</span>                  
                    <input type="text" />
                </div>
                <div className="imageInfo--box" style={{display: 'flex'}}>
                    <span>use family setup</span>
                    <form 
                    // style={{display: 'flex'}}
                    >
                        <div className="container-radio">
                            <label for="familyDisplayIndex_yes">yes</label>
                            <input type="radio" name="familyDisplayIndex" id="familyDisplayIndex__yes" value="yes" />
                        </div>
                        <div className="container-radio">
                            <label for="familyDisplayIndex_no">no</label>
                            <input type="radio" name="familyDisplayIndex" id="familyDisplayIndex__no" value="no" />
                        </div>
                    </form>
                    
                </div>
                <div className="imageInfo--box">
                    <span>family display index:</span>
                    <input type="number" />
                </div>
            </div>
        )
    }
}