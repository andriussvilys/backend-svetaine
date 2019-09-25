import React, { Component } from 'react';
import { Context } from './Provider';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import ThemeSelector from './ThemeSelector';
import FamilyInfo from './FamilyInfo';
import ArtworkInfo from './ArtworkInfo';
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
            <div className="imageInfo">
              <h3>image info:</h3>
              <div className="imageInfo--section">
                  <h5>file upload:</h5>
                  <div className="imageInfo--box">
                    <span>Upload file:</span> <input type="file" className="imageInfo--fileUpload" onChange={this.context.addFileToState} /><br/>
                  </div>
                  <div className="imageInfo--box">
                    <span>Change file name:</span> <input type="text" value={this.context.state.fileName} onChange={this.context.changeFileName} />
                </div>
              </div>

              <div className="imageInfo--section">
                <h5>family info:</h5>
                <FamilyInfo/>
              </div>

              <div className="imageInfo--section">
                <h5>artwork info:</h5>
                <ArtworkInfo/>
              </div>

            </div>
            )
          }}
        </Context.Consumer>
      )
  }
}