import React, { Component, Fragment } from 'react';
import { Context } from './Provider';
import Modal from 'react-bootstrap/Modal'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import ProgressBar from 'react-bootstrap/ProgressBar'
import BootstrapModal from './BootstrapModal'

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
            <Button
                onClick={() => {
                  const files = Object.keys(this.context.state.artworkInfoData)
              
                  this.setState({progress: 0, showModal: true, modalMessage: "ennumerating files"}, () => {
                    let progress = 0
                    let updateLength = files.length
                    files.forEach(fileName => {
                      console.log(fileName)
                      // let updateLength = Object.keys(this.context.state.artworkInfoData).length
                      
                      console.log("resize runs")
                      axios.post(`/resize/${fileName}`)
                      .then(res => { 
                        console.log("resize resolves")
                        progress += 1
                        let progressBar = Math.round(progress * 100 / updateLength)
                              this.setState({progress: progressBar, modalMessage: `updating ${fileName}`}, () => {
                                console.log("progress")
                                console.log(progress)
                                console.log("this.state.progress")
                                console.log(this.state.progress)

                                if(progress === updateLength){
                                  this.setState({modalMessage: "update complete"})
                                  this.context.readImageDir()
                                }
                              })
                            })
                            .catch(err => alert(err))
                    })
                  })
                }}
            >
                Resize all images
            </Button>
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
              {/* <Modal show={this.context.state.showModal || this.state.showModal} onHide={this.setState({showModal: false})}>          
                  <Modal.Body>
                    <Spinner animation="grow" variant="primary" />
                    <Spinner animation="grow" variant="primary" />
                    <Spinner animation="grow" variant="primary" />
                  </Modal.Body> 
              </Modal> */}

                  <BootstrapModal 
                    showModal={this.state.showModal || this.context.state.showModal}
                    message={this.state.modalMessage}
                    onClose={() => {this.setState({showModal: false})}}
                  >
                    {
                      // !this.state.progress ?    
                      //   <Fragment>
                      //     <Spinner animation="grow" variant="primary" />
                      //     <Spinner animation="grow" variant="primary" />
                      //     <Spinner animation="grow" variant="primary" />
                      //   </Fragment>   
                      //     :
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