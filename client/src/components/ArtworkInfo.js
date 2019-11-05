import React, { Component } from 'react';
import { Context } from './Provider';
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
                        type="text" 
                        onChange={(e) => this.props.onChange(e.target.value, 'artworkTitle', this.props.fileName)} 
                        />
                    </div>

                    <div className="imageInfo--box">
                  <span>display on main page:</span>
                  <form className="artworkinfo--form">
                      <div className="container-radio">
                          <label htmlFor="mainDisplayIndex_yes">yes</label>
                          <input 
                            type="radio" 
                            defaultChecked 
                            name="mainDisplayIndex" 
                            id="mainDisplayIndex__yes" 
                            value="yes" 
                            onChange={(e)=>{this.props.onChange(true, "displayMain", this.props.fileName)}}
                            />
                      </div>
                      <div className="container-radio">
                          <label htmlFor="mainDisplayIndex_no">no</label>
                          <input 
                            type="radio" 
                            name="mainDisplayIndex" 
                            id="mainDisplayIndex__no" 
                            value="no" 
                            onChange={(e)=>{this.props.onChange(false, "displayMain", this.props.fileName)}}
                            />
                      </div>
                    </form>
                    
                    </div>

                    <div className="imageInfo--box">
                        <span>year:</span>
                            <input 
                            type="number" 
                            min="1992" 
                            onChange={(e) => this.props.onChange(e.target.value, "year", this.props.fileName) } 
                            />
                    </div>

                    <div className="imageInfo--box">
                        <span>location:</span>
                            <input 
                            type="text" 
                            onChange={(e) => this.props.onChange(e.target.value, "location", this.props.fileName) } 
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
                        onChange={
                            (e) => this.props.onChange(e.target.value, "artworkDescription", this.props.fileName)
                        }
                        style={{width: "100%"}}
                        ></textarea>
                    </div>

                </div>
                )

            }}    
            </Context.Consumer>
        )
    }


  }