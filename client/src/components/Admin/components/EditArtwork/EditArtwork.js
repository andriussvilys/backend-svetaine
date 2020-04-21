import React from 'react'
import ArtworkInfo from '../ArtworkInfo/ArtworkInfo'
import Filters from '../Filters/Filters'
import Accordion from '../Accordion'
import BootstrapModal from '../BootstrapModal'
import { Button } from 'react-bootstrap' 
import ArrangeFamilyIndexes from '../ArrangeIndexes/ArrangeFamilyIndexes'
import SeeAlsoContainer from '../SeeAlso/SeeAlsoContainer'
import SelectFamily from '../FamilyInfo/subcomponents/SelectFamily'
import ImageBox from '../ImageBox/ImageBox'
import SelectGlobalSetup from '../ImageBox/optionalComponents/SelectGlobalSetup'

export default class EditArtwork extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          submitButtons: null,
          showModal: null,
          modalMessage: null
        }
      }

      render(){
          return (
              <div key={`FileInfo_${this.props.file.fileName}`} className="FamilyList--detail">
  
                  <ImageBox
                      file={this.props.file}
                  >
                      <SelectGlobalSetup 
                          file={this.props.file}
                          context={this.props.context}
                      />
                  </ImageBox>
  
                  <div className="FamilyList--detail__info">
  
                  {/* ARTWORK DATA */}
                  <Accordion
                      title={"Artwork Family"}
                  >
                      <SelectFamily 
                          context={this.props.context}
                          fileName={this.props.file.fileName}
                      />
                  </Accordion>
  
                  <Accordion
                      className={`UploadFile-${this.props.file.fileName}`}
                      title={'Edit Artwork Info'}
                  >
                      <ArtworkInfo 
                          file={this.props.file}
                          fileName={this.props.file.fileName}
                          onChange={this.props.context.onChange}
                          state={this.props.context.state}
                      />
                  </Accordion>

                <Accordion title={"Filters"}>
                    <Filters 
                        context={this.props.context}
                        fileName={this.props.file.fileName}
                    />
                </Accordion>
  
                  <Accordion
                      title={"Arrange Index"}
                  >
                      <ArrangeFamilyIndexes 
                          data={this.props.context.state.relatedArtwork[this.props.file.artworkFamily]}
                          file={this.props.file}
                      />
                  </Accordion>
  
                  <Accordion
                      title={"See Also"}
                  >
                      <SeeAlsoContainer 
                          directory={this.props.context.state.fileData.files[this.props.file.fileName].seeAlso}
                          initialData={this.props.context.state.artworkInfoData}
                          context={this.props.context}
                      />
                  </Accordion>
  
                  {/* FAMILY DATA */}
  
                  <div className="FamilyList--submit-delete-container">  
                      <Button
                          variant="danger"
                          className="custom-button"
                          onClick={ () => this.props.context.fileDataMethods.removeFile(this.props.file.fileName, this.props.artworkFamily)}
                      >
                          Remove
                      </Button>   
                      <Button
                          variant="success"
                          className="custom-button"
                          onClick={() => {
                              const verification = this.props.context.verify()
                              if(!verification.verified){
                                  return this.setState({showModal: true, modalMessage: verification.modalMessage})
                              }
                              this.setState({
                                  showModal: true,
                                  modalMessage: "loading..."
                              })
                              const postRes = this.props.context.fileDataMethods.postArtworkInfo(this.props.file)
                              postRes
                              .then( res => {
                                  this.setState({
                                      modalMessage: res
                                  })
                              })
                              .catch(err => {
                                  this.setState({
                                      modalMessage: err
                                  })
                              })
                          }
                          }
                      >
                          Submit to server
                      </Button>
  
                  </div>
  
                      <BootstrapModal 
                          showModal={this.state.showModal}
                          message={this.state.modalMessage}
                          onClose={() => {this.setState({showModal: false})}}
                      />
  
                  </div>    
  
              </div>
          )
      }
}

