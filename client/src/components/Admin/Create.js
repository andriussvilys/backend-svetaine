import React, { Component } from 'react';
import { Context } from '../Provider';
import ProgressBar from 'react-bootstrap/ProgressBar'

import BootstrapModal from './components/BootstrapModal'
import Accordion from './components/Accordion'

import MainContainer from './components/FileUpload/MainContainer';

import GlobalSetup from './components/Create/GlobalSetup';

export default class Create extends Component{

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
              <h3>Create</h3>

              <Accordion
                title={"Upload Files"}
              >
                <div className="imageInfo--section">
                    <div className="imageInfo--box">
                      <div>
                        <p>Upload file(-s):</p> 
                        <input type="file" multiple onChange={this.context.addFileToState} />
                        <p className="subtitle">The name of uploaded file cannot contain spaces or any special characters except for "-"</p>
                      </div>
                    </div>

                      <MainContainer
                      data={this.context.state.fileData}
                      />
                    
                </div>
              </Accordion>

              <Accordion
                title="Set up global family template">
                  <GlobalSetup 
                    context={this.context}
                    addNew={true}
                  />
              </Accordion>

                  <BootstrapModal 
                    showModal={this.state.showModal || this.context.state.showModal}
                    message={this.state.modalMessage}
                    onClose={() => {this.setState({showModal: false})}}
                  >
                    {
                        <ProgressBar now={this.state.progress ? this.state.progress : 100} />
                      }
                  </BootstrapModal>



            </div>
            )
          }}
        </Context.Consumer>
      )
  }
}