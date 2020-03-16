import React from 'react';
import Button from 'react-bootstrap/Button'

import Accordion from '../Admin/Accordion'
import ArtworkInfo from '../Admin/ArtworkInfo/ArtworkInfo'
import ChangeIndex from '../DragAndDropList/FamilyListDnD/FamilyListDnDContainer'
import BootstrapModal from '../Admin/BootstrapModal'
import Filters from '../Admin/Filters/Filters'
import EditFamilyInfo from '../Admin/FamilyInfo/EditFamilyInfo';

import SeeAlsoContainer from '../Admin/SeeAlso/SeeAlsoContainer'
import ImageBox from '../Admin/ImageBox/ImageBox';

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
                <ImageBox 
                    file={this.props.file}
                />
            </div>
    
            <div className="FamilyList--detail__info">
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

