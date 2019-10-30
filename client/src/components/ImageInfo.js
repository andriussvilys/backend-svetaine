import React, { Component } from 'react';
import { Context } from './Provider';
import FamilyInfo from './FamilyInfo';
import DnDListContainer from './DragAndDropList/DnDListContainer'
import FamilyContainer from './FamilyContainer'
import "bootstrap/dist/css/bootstrap.min.css";
import FileUpdate from './FileUpdate';
import MainContainer from './FileUpload/MainContainer';

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
                    <span>List of Files</span>
                      <DnDListContainer 
                        data={Object.keys(this.context.state.fileData).length > 0 ? this.context.state.fileData : null}
                        contextMethods={this.context.removeFile}
                      />
                  </div>
                  <div>
                    <MainContainer
                     data={this.context.state.fileData}
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