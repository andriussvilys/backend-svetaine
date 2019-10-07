import React, { Component } from 'react';
import { Context } from './Provider';
import FamilyInfo from './FamilyInfo';
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
                    <span>Upload file(-s):</span> 
                    <input type="file" multiple className="imageInfo--fileUpload" onChange={this.context.addFileToState} /><br/>
                  </div>
                  <div className="imageInfo--box" style={{display: "block"}}>
                    <span>DnD list</span>
                      <DnDListContainer 
                        data={Object.keys(this.context.state.fileData).length > 0 ? this.context.state.fileData : null}
                        contextMethods={this.context.removeFile}
                      />
                  </div>
              </div>

              <div className="imageInfo--section">
                <h5>family info:</h5>
                <FamilyInfo/>
              </div>

            </div>
            )
          }}
        </Context.Consumer>
      )
  }
}