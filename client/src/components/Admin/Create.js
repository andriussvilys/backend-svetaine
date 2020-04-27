import React, { Component, Fragment } from 'react';
import { Context } from '../Provider';
import { ProgressBar } from 'react-bootstrap'

import BootstrapModal from './components/BootstrapModal'
import { Tabs, Tab } from 'react-bootstrap'
import Filters from './components/Filters/Filters'
import FamilyDescription from './components/FamilyInfo/subcomponents/FamilyDescription'
import AddNew from './components/AddNew'

import MainContainer from './components/FileUpload/MainContainer';
import SubmitFamilyInfo from './components/FamilyInfo/subcomponents/SubmitFamilyInfo';
import Themes from './components/Filters/subcomponents/Themes';
import Categories from './components/Filters/subcomponents/Categories';

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
              <Fragment>
                  <div className="Tabs-container">
                    <Tabs defaultActiveKey="upload" transition={false} id="noanim-tab-example">
                      <Tab eventKey="upload" title="Upload new files">
                        <div className="FileUpload-container">
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

                            <div className="Tabs-container">
                              <Tabs eventKey="create_family" transition={false} title="Create a new Family">
                                <Tab eventKey="editFamilyInfo" title="Family Basics">
                                    <div className={"create-createFamily"}>
                                    <div style={{backgroundColor: "#e4e4e4", padding: "7px", width: "100%"}}>
                                      {this.submitButtons()}  
                                    </div>
                                        <AddNew 
                                          addNew
                                          router={'/api/familySetup/create'}
                                          stateKey={'artworkFamilyList'}
                                          requestKey={"artworkFamily"}
                                          addNewTitle="Add new Artwork Family name"
                                        />

                                        <FamilyDescription 
                                          context={this.context}
                                        />
                                    </div>
                                </Tab>
                                <Tab eventKey="filters" title="Filters">
                                  <Filters 
                                      context={this.context}
                                      modalInvoke={this.modalInvoke}
                                  />
                                </Tab>
                              </Tabs>
                            </div>
                      </Tab>
                      <Tab eventKey="new_theme" title="Create data filters">
                      <div className="Tabs-container">
                        <Tabs>
                          <Tab eventKey="new_theme" title="New Themes">
                            <Themes 
                            context={this.context}
                            dataArray={this.context.state.themesData}
                            onChange={this.context.familySetupMethods.onChange}
                            modalInvoke={this.modalInvoke}
                            addNew
                          />
                          </Tab>
                          <Tab eventKey="new_category" title="New Categories">
                            <Categories 
                            context={this.context}
                            modalInvoke={this.modalInvoke}
                            addNew
                            />
                          </Tab>
                        </Tabs>
                      </div>
                      </Tab>
                    </Tabs>
                  </div>
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
              </Fragment>
            )
          }}
        </Context.Consumer>
      )
  }
}