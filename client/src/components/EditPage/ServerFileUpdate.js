import React from 'react';
import Button from 'react-bootstrap/Button'

import FilePreview from '../FilePreview'
import Accordion from '../Accordion'
import FamilyInfo from '../FileUpload/FamilyInfo'
import ArtworkInfo from '../ArtworkInfo'
import ChangeIndex from '../DragAndDropList/FamilyListDnD/FamilyListDnDContainer'
import BootstrapModal from '../BootstrapModal'
import Filters from '../Admin/Filters/Filters'
import EditFamilyInfo from '../Admin/FamilyInfo/EditFamilyInfo';

import SeeAlsoV2 from '../Admin/SeeAlso/SeeAlso'
import SeeAlsoContainer from '../Admin/SeeAlso/SeeAlsoContainer'
import EditArtwork from '../Admin/EditArtwork/EditArtwork';

/**
 * @props file 
 * @props state
 * @props controls
 * @props familyDropDown 
 * @props themesDropDown
 * @props seeAlso {                    
 *  state: this.context.state,
    context: this.context,
    initialData: this.context.state.artworkInfoData,
    onChange: this.context.fileDataMethods.onChange, 
        }
 */
export default class ServerFileUpdate extends React.Component {
    constructor(props){
        super(props);
        this.state = {showModal: false, modalMessage: null}
    }

    onClose = () => {
        this.setState({showModal: false})
    }
    render(){
        return(
        <div className="FamilyList--detail_update">
    
            <div className="FamilyList--detail__image">
                <FilePreview 
                    file={this.props.file}
                >
                </FilePreview>
                <div className="FamilyList--detail__image__text">
                    <p className="title">fileName:</p> 
                    <p>{this.props.file.fileName}</p>
                </div>
                <div className="ImageInfo--transferState" style={{display: 'flex'}}>
                    <p>use global family setup</p>
    
                    <p className="subtitle"
                    style={
                        this.props.context.state.familySetupData.artworkFamily ? {transition: "all 0.2s", transform: "scaleY(0)"} : {transition: "all 0.2s", transform: "scaleY(1)"}
                    }
                    >
                    please select global artwork family 
                    </p>
        {/* 
                    {this.props.context.state.familySetupData.artworkFamily ? null : <p className="subtitle">please select global artwork family </p> } */}
                    <form className="ImageInfo--transferState__radios">
                        <div className="container-radio">
                            <input type="radio" 
                            name="familyDisplaySetup" 
                            id="familyDisplaySetup__radio-yes" 
                            value="yes" 
                            disabled={this.props.context.state.familySetupData.artworkFamily === null ? true : false}
                            onChange={() => {this.props.context.fileDataMethods.transferState(this.props.file, true)}}
                            checked={this.props.context.state.fileData.files[this.props.file.fileName].useFamilySetup}
                            />
                            <label 
                            htmlFor="familyDisplaySetup_yes"
                            id="familyDisplaySetup_yes"
                            >yes</label>
                        </div>
                        <div className="container-radio">
                            <input type="radio" 
                            name="familyDisplaySetup" 
                            id="familyDisplaySetup__radio-no" 
                            value="no" 
                            disabled={this.props.context.state.familySetupData.artworkFamily === null ? true : false}
                            onChange={() => this.props.context.fileDataMethods.transferState(this.props.file)}
                            checked={!this.props.context.state.fileData.files[this.props.file.fileName].useFamilySetup}
                            
                            />
                            <label htmlFor="familyDisplaySetup_no">no</label>
                        </div>
                    </form>
                </div>  
            </div>
    
            <div className="FamilyList--detail__info">
            {/* ARTWORK DATA */}
            <Accordion
                title={"Artwork Family"}
            >
                <EditFamilyInfo 
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
                    onChange={this.props.controls.fileDataMethods.onChange}
                    state={this.props.context.state}
                />
            </Accordion>

            <Filters 
                context={this.props.context}
                fileName={this.props.file.fileName}
            />

            <Accordion
                title={'Arrange Indexes'}
            >
                <ChangeIndex 
                    data={this.props.relatedArtwork}
                    fileName={this.props.file.fileName}
                    artworkFamily={this.props.file.artworkFamily}
                />
            </Accordion>
            
            <Accordion
                title={"See Also"}
            >
                <SeeAlsoContainer 
                    directory={this.props.context.state.fileData.files[this.props.file.fileName].seeAlso}
                    initialData={this.props.context.state.artworkInfoData}
                />
            </Accordion>


            <div className="FamilyList--submit-delete-container">  
                <Button
                    variant="danger"
                    className="custom-button"
                    onClick={ () => this.props.controls.removeFile(this.props.file.fileName)}
                >
                    Cancel
                </Button>   
                <Button
                    variant="success"
                    className="custom-button"
                    onClick={() => {
                        this.setState({showModal: true, modalMessage: "loading..."})
                        const postRes = this.props.controls.updateArtworkInfo(this.props.context.state.fileData.files[this.props.file.fileName])
                        postRes.then( res => {
                            this.setState({modalMessage: res})
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
                    onClose={this.onClose}
                />
            </div>    
    
        </div>
        )
    }
}

