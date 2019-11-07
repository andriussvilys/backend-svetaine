import React, { Component } from 'react';
import { Context } from './Provider';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import FamilyInfo from './FamilyInfo';
import DnDListContainer from './DragAndDropList/DnDListContainer'
import FamilyContainer from './FamilyContainer'

import FileUpdate from './FileUpdate';
import MainContainer from './FileUpload/MainContainer';
import BootstrapModal from './BootstrapModal';

export default class ImageInfo extends Component{

  static contextType = Context;

  constructor(props){
    super(props);
    this.state = {
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
                  
                    <MainContainer
                     data={this.context.state.fileData}
                     />
                  
              </div>

              <h3>set up global family data:</h3>
              <div className="imageInfo--section">
                <h5>family info:</h5>
                <FamilyInfo/>
              </div>

              <Modal show={this.context.state.showModal} onHide={this.handleClose}>
                <Modal.Body>
                  <Spinner animation="grow" variant="primary" />
                  <Spinner animation="grow" variant="primary" />
                  <Spinner animation="grow" variant="primary" />
                </Modal.Body>
            </Modal>

            </div>
            )
          }}
        </Context.Consumer>
      )
  }
}