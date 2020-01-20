import React, { Component } from 'react';
import { Context } from './Provider';
// import {DisplayTriggerList as List} from './DisplayTriggerList'
import DisplayTriggerList from './DisplayTriggerList'
import DisplayTriggers from './DisplayTriggers';

import "bootstrap/dist/css/bootstrap.min.css";
import "../css/components/imageInfo.css";

export default class ImageInfo extends Component{

  static contextType = Context;

    constructor(props){
        super(props);
        this.state = {
        category: {}
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
                        value={this.props.file.artworkTitle}
                        type="text" 
                        onChange={(e) => this.props.onChange(e.target.value, 'artworkTitle', this.props.file.fileName)} 
                        />
                    </div>

                    <div className="imageInfo--box">
                  <span>display on main page:</span>
                  <form className="artworkinfo--form">
                      <div className="container-radio">
                          <label htmlFor="mainDisplayIndex_yes">yes</label>
                          <input 
                            type="radio" 
                            // defaultChecked 
                            checked={this.props.state.fileData.files[this.props.file.fileName].displayMain}
                            name="mainDisplayIndex" 
                            id="mainDisplayIndex__yes" 
                            value="yes" 
                            onChange={(e)=>{this.props.onChange(true, "displayMain", this.props.file.fileName)}}
                            />
                      </div>
                      <div className="container-radio">
                          <label htmlFor="mainDisplayIndex_no">no</label>
                          <input 
                            checked={!this.props.state.fileData.files[this.props.file.fileName].displayMain}
                            type="radio" 
                            name="mainDisplayIndex" 
                            id="mainDisplayIndex__no" 
                            value="no" 
                            onChange={(e)=>{this.props.onChange(false, "displayMain", this.props.file.fileName)}}
                            />
                      </div>
                    </form>
                    
                    </div>

                    <div className="imageInfo--box">
                        <span>year:</span>
                            <input 
                            type="number" 
                            min="1992" 
                            value={this.props.file.year}
                            onChange={(e) => this.props.onChange(e.target.value, "year", this.props.file.fileName) } 
                            />
                    </div>

                    <div className="imageInfo--box">
                        <span>location:</span>
                            <input 
                            type="text" 
                            value={this.props.file.location}
                            onChange={(e) => this.props.onChange(e.target.value, "location", this.props.file.fileName) } 
                            />
                    </div>

                    <div className="imageInfo--box"></div>

                    {/* DESCRIPTION */}
                    <div className="imageInfo--box"  style={{display: "block"}}>
                        <div>
                            <p>Artwork description:</p> 
                            <p className="subtitle">this is describes particulars of a work in a series or exhibit in a show</p>
                        </div>
                        <textarea
                            value={this.props.file.artworkDescription}
                        onChange={
                            (e) => this.props.onChange(e.target.value, "artworkDescription", this.props.file.fileName)
                        }
                        style={{width: "100%"}}
                        ></textarea>
                    </div>
                    
                    <DisplayTriggers 
                        file={this.props.file}
                        context={this.context}
                    />

                </div>
                )

            }}    
            </Context.Consumer>
        )
    }


  }