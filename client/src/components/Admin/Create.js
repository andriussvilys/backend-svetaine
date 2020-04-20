import React, { Component } from 'react';
import { Context } from '../Provider';
import { ProgressBar } from 'react-bootstrap'

import BootstrapModal from './components/BootstrapModal'
import Accordion from './components/Accordion'
import { Tabs, Tab } from 'react-bootstrap'
import Filters from './components/Filters/Filters'
import EditFamilyInfo from './components/FamilyInfo/EditFamilyInfo'

import MainContainer from './components/FileUpload/MainContainer';
import SubmitFamilyInfo from './components/FamilyInfo/subcomponents/SubmitFamilyInfo';

export default class Create extends Component{

  static contextType = Context;

  constructor(props){
    super(props);
    this.state = {
      submitButtons: null,
      confirmedAction: null
    }
  }

modalInvoke = (options, callbackPromise) => {
      let newState = {...this.state}
      newState = {
        ...newState,         
        showModal: true,
        modalMessage: "...loading..."
      }
      if(options && options.requireActionConfirm){
        newState.confirm = true
      }
      else{
        newState.confirm = false
      }

      this.setState(newState, () => {
          let action = null
          if(!options || !options.requireActionConfirm){
            callbackPromise
            .then(res => {
              this.setState({
                modalMessage: res.modalMessage
              })
            })
            .catch(err => {
              this.setState({
                modalMessage: err.modalMessage
              })
            })
          }
          else{
                this.setState({
                  confirmedAction: options.confirmedAction,
                  modalMessage: options.modalMessage,
                })
          }

        })
}

submitButtons = () => {
  const currentFamily = this.context.state.familySetupData.artworkFamily
  const recordedFamilyNames = this.context.state.artworkFamilyList

  const submitAction = () => {

    const verification = this.context.verify()

    if(!verification.verified){
      const refuseAction = () => {
        this.setState({
          showModal: true,
          modalMessage: verification.message
        })
      }
      return refuseAction
    }

    if(recordedFamilyNames.includes(currentFamily)){
      const submitUpdate = () => {
        this.setState({
          showModal: true,
          modalMessage: "...loading..."
          }, () => {

            this.context.familySetupMethods.updateFamilySetup(this.context.state.familySetupData.artworkFamily)
              .then(res => {
                this.setState({
                  modalMessage: res
                })
              })
              .catch(err => {
                this.setState({
                  modalMessage: err
                })
              })
        })
      }
      return submitUpdate
    }

    else{
      const submitNew = () => {
        this.setState({
          showModal: true,
          modalMessage: "...loading..."
          }, () => {
              this.context.familySetupMethods.createFamilySetup()
                .then(res => {
                  this.setState({
                    modalMessage: res
                  })
                })
                .catch(err => {
                  this.setState({
                    modalMessage: err
                  })
                })
          })
      }
      return submitNew
    }
  }
  return(
    <SubmitFamilyInfo 
      context={this.context}
      submitAction={submitAction()}
    />
  )
}

componentDidMount(){
  this.setState({submitButtons: this.submitButtons()})
}

  render(){
      return(
        <Context.Consumer>
          {() => {
            return(
            <div className="imageInfo">
              {/* <h3>Create</h3> */}

              <Tabs defaultActiveKey="upload" transition={false} id="noanim-tab-example">
              <Tab eventKey="upload" title="Upload new files">
                <div className="imageInfo--section">
                    <div className="imageInfo--box">
                      <div>
                        <p>Upload file(-s):</p> 
                        <input 
                        id="uploadFileInput" 
                        type="file" 
                        multiple 
                        onChange={(e) => {
                          const event = e
                          this.context.addFileToState(event)
                          .then(res => this.setState({
                            modalMessage: res
                          }))
                          .catch(err => {
                            this.setState({
                              modalMessage: err
                            })
                          })

                          this.setState({
                            showModal: true,
                            modalMessage: "uploading File(-s)"
                          }, () => {
                            
                          })
                          
                          }} />
                        <p className="subtitle">The name of uploaded file cannot contain spaces or any special characters except for "-"</p>
                      </div>
                    </div>

                      <MainContainer
                      data={this.context.state.fileData}
                      />
                    
                </div>
              </Tab>
              <Tab eventKey="create_family" title="Create a new Family">
                  <Tabs eventKey="create_family" transition={false} title="Create a new Family">
                    <Tab eventKey="editFamilyInfo" title="Family Basics">

                      <EditFamilyInfo 
                          context={this.context}
                          addNew
                      />

                    </Tab>
                    <Tab eventKey="filters" title="Filters">

                      <Filters 
                          context={this.context}
                          modalInvoke={this.modalInvoke}
                          allowCategoriesDelete={true}
                          allowThemesDelete={true}
                      />
                      {this.submitButtons()}  
                      
                    </Tab>
                  </Tabs>
              </Tab>
            </Tabs>

            <BootstrapModal 
                    showModal={this.state.showModal || this.context.state.showModal}
                    message={this.state.modalMessage}
                    onClose={() => {this.setState({showModal: false})}}
                    confirm={this.state.confirm || false}
                    confirmedAction={() => {
                      this.state.confirmedAction()
                        .then(res => {
                          this.setState({
                            confirm: res.confirm,
                            modalMessage: res.modalMessage
                          })
                        })
                        .catch(err => {
                          this.setState({
                            confirm: err.confirm,
                            modalMessage: err.modalMessage
                          })
                        })
                    }}
                  >
                    {this.state.progress ?
                      <ProgressBar now={this.state.progress ? this.state.progress : 100} /> :
                      null
                    }
                  </BootstrapModal>
            </div>
            )
          }}
        </Context.Consumer>
      )
  }
}