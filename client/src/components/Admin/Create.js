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
      submitButtons: null
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

submitButtons = () => {
  const currentFamily = this.context.state.familySetupData.artworkFamily
  const recordedFamilyNames = this.context.state.artworkFamilyList

  const submitAction = () => {

    const verify = () => {
      const result = this.context.verify()
      console.log("result")
      console.log(result)
      if(result.verified){
        return {verified: true}
      }
      else{
        return {verified: false, message: result.modalMessage}
      }
    }

    console.log("Auth")
    const verification = verify()

    if(!verification.verified){
      console.log("NOT VERIFIED")
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
        console.log("SUBMIT UPDATE")
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
        console.log("SUBMIT NEW")
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
                  <EditFamilyInfo 
                      context={this.context}
                      addNew
                  />
                  <Filters 
                      context={this.context}
                  />
              </Accordion>

              {/* {this.state.submitButtons} */}
              {this.submitButtons()}

                  <BootstrapModal 
                    showModal={this.state.showModal || this.context.state.showModal}
                    message={this.state.modalMessage}
                    onClose={() => {this.setState({showModal: false})}}
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