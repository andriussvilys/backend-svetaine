import React, { Component } from 'react';
import { Context } from '../../Provider';
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/imageInfo.css";

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

                    <div className="DnD-imageInfo--box">
                        <div>
                        <p>Add Artwork title:</p> 
                        <p className="subtitle">(different from family name):</p>
                        </div>
                        <input 
                        type="text" 
                        // value={this.context.state.fileData.files[this.props.fileName].fileName} 
                        placeholder={this.context.state.fileData.files[this.props.fileName].fileName}
                        onChange={(e) => this.props.onChange(e, this.props.fileName, 'artworkTitle')} 
                        />
                    </div>

                    <div className="DnD-imageInfo--box">
                  <span>display on main page:</span>
                  <form>
                      <div className="container-radio">
                          <label htmlFor="mainDisplayIndex_yes">yes</label>
                          <input 
                            type="radio" 
                            name="mainDisplayIndex" 
                            id="mainDisplayIndex__yes" 
                            value={true} 
                            onChange={(e) => this.props.onChange(e, this.props.fileName, 'displayMain')}
                            />
                      </div>
                      <div className="container-radio">
                          <label htmlFor="mainDisplayIndex_no">no</label>
                          <input 
                            type="radio" 
                            defaultChecked 
                            name="mainDisplayIndex" 
                            id="mainDisplayIndex__no" 
                            value={false} 
                            onChange={(e) => this.props.onChange(e, this.props.fileName, 'displayMain')}
                            />
                      </div>
                    </form>
                    
                    </div>

                    <div className="DnD-imageInfo--box">
                        <span>year:</span>
                            <input 
                            type="number" 
                            min="1992" 
                            onChange={(e) => this.props.onChange(e, this.props.fileName, 'year')}  
                            />
                    </div>

                    <div className="DnD-imageInfo--box">
                        <span>location:</span>
                            <input 
                            type="text" 
                            onChange={(e) => this.props.onChange(e, this.props.fileName, 'location')}  
                            />
                    </div>


                    <div className="DnD-imageInfo--box"></div>

                    {/* DESCRIPTION */}
                    <div className="DnD-imageInfo--box"  style={{display: "block"}}>
                        <div>
                            <p>Artwork description:</p> 
                            <p className="subtitle">this is describes particulars of a work in a series or exhibit in a show</p>
                        </div>
                        <textarea
                        onChange={(e) => this.props.onChange(e, this.props.fileName, 'artworkDescription')} 
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