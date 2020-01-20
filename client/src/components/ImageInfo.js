import React, { Component } from 'react';
import { Context } from './Provider';
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'

import Accordion from './Accordion'
import FamilyInfo from './FamilyInfo';
import MainContainer from './FileUpload/MainContainer';
import UpdateAllArtworkInfo from './UpdateAllArtworkInfo';

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
              <UpdateAllArtworkInfo 
                context={this.context}
              />
              <div className="imageInfo--section">
                  <h5>file upload:</h5>
                  <div className="imageInfo--box">
                    <div>
                      <p>Upload file(-s):</p> 
                      <input type="file" multiple onChange={this.context.addFileToState} />
                      <p className="subtitle">The name of uploaded file cannot contain spaces or any special characters except for "-"</p>
                    </div>
                  </div>

                    {/* from FileUpload folder */}
                    {/* is populated with uploaded files*/}
                    <MainContainer
                     data={this.context.state.fileData}
                     />
                  
              </div>

              <Accordion
                title="set up global family template:">
                  <FamilyInfo/>
          
              </Accordion>

              {/* modal displayed before page is loaded */}
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