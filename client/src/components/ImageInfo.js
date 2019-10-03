import React, { Component } from 'react';
import { Context } from './Provider';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import ThemeSelector from './ThemeSelector';
import FamilyInfo from './FamilyInfo';
import ArtworkInfo from './ArtworkInfo';
import ImagesPreview from './ImagesPreview';
import DnDListContainer from './DragAndDropList/DnDListContainer'
import "bootstrap/dist/css/bootstrap.min.css";

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
                    <span>Upload file:</span> 
                    <input type="file" multiple className="imageInfo--fileUpload" onChange={this.context.addFileToState} /><br/>
                  </div>
                  <div className="imageInfo--box">
                    <span>Change file name:</span> <input type="text" value={this.context.state.fileName} onChange={this.context.changeFileName} />
                  </div>
                  <ImagesPreview data={this.context.state.fileArray} />
                  <div className="imageInfo--box" style={{display: "block"}}>
                    <span>DnD list</span>
                      <DnDListContainer 
                        data={Object.keys(this.context.state.fileData).length > 0 ? this.context.state.fileData : null}
                      />
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