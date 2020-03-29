import React, { Component, Fragment } from 'react';
import { Context } from '../Provider';
import { ProgressBar, Button } from 'react-bootstrap'

import BootstrapModal from './components/BootstrapModal'
import Accordion from './components/Accordion'
import Filters from './components/Filters/Filters'
import EditFamilyInfo from './components/FamilyInfo/EditFamilyInfo'
import Auth from '../Auth'

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
//   submitButtons = () => {
//         return <Fragment>
//                           <div className="imageInfo--box">
//                             <span>record new family setup:</span>
//                             <Button
//                              variant="success" 
//                              size="sm"
//                              onClick={
//                                 () => {
//                                   if(!this.verify()){
//                                     return
//                                   }
//                                   else{
//                                     console.log("CREATE NEW FAM")
//                                     this.setState({
//                                       showModal: true,
//                                       modalMessage: "...loading..."
//                                     }, () => {
//                                         this.context.familySetupMethods.createFamilySetup()
//                                           .then(res => {
//                                             this.setState({
//                                               modalMessage: res
//                                             })
//                                           })
//                                           .catch(err => {
//                                             this.setState({
//                                               modalMessage: err
//                                             })
//                                           })
//                                     })
//                                     return
//                                   }
//                              }}
//                             >
//                                 SEND
//                             </Button>
//                         </div>      
//                         <div className="imageInfo--box">
//                             <span>update family setup:</span>
//                             <Button
//                              variant="primary" 
//                              size="sm"
//                              onClick={
//                                 () => {
//                                   if(!this.verify()){
//                                     return
//                                   }
//                                   this.setState({
//                                     showModal: true,
//                                     modalMessage: "...loading..."
//                                   }, () => {

//                                     this.context.familySetupMethods.updateFamilySetup(this.context.state.familySetupData.artworkFamily)
//                                       .then(res => {
//                                         this.setState({
//                                           modalMessage: res
//                                         })
//                                       })
//                                       .catch(err => {
//                                         this.setState({
//                                           modalMessage: err
//                                         })
//                                       })
//                                   })
//                                   return
//                                 }
//                              }
//                             >
//                                 SEND
//                             </Button>
//                         </div>  
//                         <div className="imageInfo--box">
//                             <span>update files in the family:</span>
//                             <Button
//                              variant="primary" 
//                              size="sm"
//                              onClick={() => {
//                                 if(!this.verify()){
//                                   return
//                                 }
//                                this.context.fileDataMethods.updateArtworkByFamily(this.context.state.familySetupData.artworkFamily)
//                              }
//                              }
//                             >
//                                 SEND
//                             </Button>
//                         </div>  
//         </Fragment>
// }

modalInvoke = (options, callbackPromise) => {
  const verify = new Promise((resolve, reject) => {
    const result = this.context.verify()
    if(result.verified){
      resolve({verified: true})
    }
    else{
      reject({verified: false, message: result.modalMessage})
    }
  })

  verify
    .then(res => {
      let newState = {...this.state}
      newState = {
        ...newState,         
        showModal: true,
        modalMessage: "...loading..."
      }
      if(options.requireActionConfirm){
        newState.confirm = true
      }

      console.log("CREATE -> MODAL INVOKE -> NEWSTATE")
      this.setState(newState, () => {
          let action = null
          if(!options.requireActionConfirm){
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
    })
    .catch(err => {
      this.setState({
        showModal: true,
        modalMessage: err.message
      })
    })
}

verify = () => {
  const result = this.context.verify()
  if(result.verified){
    return {verified: true}
  }
  else{
    return {verified: false, message: result.modalMessage}
  }
}

submitButtons = () => {
  const currentFamily = this.context.state.familySetupData.artworkFamily
  const recordedFamilyNames = this.context.state.artworkFamilyList

  const submitAction = () => {

    const verification = this.verify()

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
              <h3>Create</h3>

              <Accordion
                title={"Upload Files"}
              >
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
              </Accordion>

              <Accordion
                title="Set up global family template">
                  <EditFamilyInfo 
                      context={this.context}
                      addNew
                  />
                  <Filters 
                      context={this.context}
                      modalInvoke={this.modalInvoke}
                  />
                  {this.submitButtons()}  
              </Accordion>

              {/* {this.state.submitButtons} */}

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