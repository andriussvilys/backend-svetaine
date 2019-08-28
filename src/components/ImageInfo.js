import React, { Component } from 'react';
import { Context } from './Provider';
import ThemeSelector from './ThemeSelector';
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
          {() => {
            return(
            <div>
              <div className="imageInfo">
                <h3>image info</h3>
                <div className="imageInfo--box">
                  <span>Upload file:</span> <input type="file" className="imageInfo--fileUpload" onChange={this.context.uploadFile} /><br/>
                </div>
                <div className="imageInfo--box">
                  <span>Change name:</span> <input type="text" value={this.context.state.fileName} onChange={this.context.changeFileName} />
                </div>
              </div>
              <ThemeSelector/>
            </div>
            )
          }}
        </Context.Consumer>
      )
  }
}