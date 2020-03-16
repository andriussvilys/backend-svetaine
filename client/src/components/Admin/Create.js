import React, { Component, Fragment } from 'react';
import { Context } from '../Provider';
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import ProgressBar from 'react-bootstrap/ProgressBar'

import BootstrapModal from './components/BootstrapModal'
import Accordion from './components/Accordion'

import MainContainer from './components/FileUpload/MainContainer';
import UpdateAllArtworkInfo from './UpdateAllArtworkInfo';

import auth from '../Auth'
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

              {!auth.guest ?
                <Fragment>
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
                </Fragment> :
                <Fragment/>
              }

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